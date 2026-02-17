import React, { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, FileText, Download, Upload, X, Loader2, BookOpen, Package, AlertCircle, GripVertical } from 'lucide-react';
import { getCatalogues, addCatalogue, deleteCatalogue, uploadFile, reorderItems } from '../services/api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Set worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Mini Preview Component for Admin
const AdminPdfPreview = memo(({ url }) => {
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let renderTask = null;
        let loadingTask = null;

        const render = async () => {
            if (!url) return;
            setLoading(true);
            setError(false);
            try {
                loadingTask = pdfjsLib.getDocument({
                    url: url,
                    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/cmaps/',
                    cMapPacked: true,
                    standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/standard_fonts/',
                });
                const pdf = await loadingTask.promise;
                const page = await pdf.getPage(1);

                const viewport = page.getViewport({ scale: 1.0 });
                const canvas = canvasRef.current;
                if (!canvas) return;

                const context = canvas.getContext('2d');
                const scale = 400 / viewport.width;
                const scaledViewport = page.getViewport({ scale });

                canvas.height = scaledViewport.height;
                canvas.width = scaledViewport.width;

                if (isMounted) {
                    renderTask = page.render({ canvasContext: context, viewport: scaledViewport });
                    await renderTask.promise;
                    if (isMounted) setLoading(false);
                }
            } catch (err) {
                console.error('Admin Preview Error:', err);
                if (isMounted) {
                    setLoading(false);
                    setError(true);
                }
            }
        };
        render();
        return () => {
            isMounted = false;
            if (renderTask) renderTask.cancel();
            if (loadingTask) loadingTask.destroy();
        };
    }, [url]);

    return (
        <div className="w-full h-full flex items-center justify-center bg-slate-100 relative overflow-hidden rounded-xl">
            {loading && <Loader2 className="w-6 h-6 animate-spin text-brand-600 absolute z-10" />}
            {error ? (
                <div className="flex flex-col items-center gap-1 opacity-20">
                    <AlertCircle className="w-8 h-8" />
                    <span className="text-[8px] font-bold uppercase">No Preview</span>
                </div>
            ) : (
                <canvas ref={canvasRef} className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`} />
            )}
        </div>
    );
});

const SortableCatalogueCard = React.memo(({ cat, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: cat.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        willChange: 'transform',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500"
        >
            <div className="aspect-[2/3] bg-slate-50 relative overflow-hidden">
                <AdminPdfPreview url={cat.pdfUrl} />
                <button
                    {...attributes}
                    {...listeners}
                    className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur rounded-xl text-slate-400 hover:text-brand-600 hover:scale-110 active:scale-90 shadow-sm transition-all z-20 cursor-grab active:cursor-grabbing"
                    title="Drag to reorder"
                >
                    <GripVertical className="w-5 h-5" />
                </button>
                <button
                    onClick={() => onDelete(cat.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-xl text-slate-400 hover:text-red-500 hover:scale-110 active:scale-90 shadow-sm opacity-0 group-hover:opacity-100 transition-all z-20"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
            <div className="p-8 pb-0 flex-grow">
                <h3 className="text-xl font-black text-slate-900 leading-tight mb-2 group-hover:text-brand-600 transition-colors uppercase tracking-tight">{cat.enTitle}</h3>
                <p className="text-slate-500 text-sm font-medium italic mb-6">{cat.thTitle}</p>
            </div>
            <div className="p-8">
                <a
                    href={cat.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-slate-900 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-brand-600 hover:shadow-lg active:scale-95 transition-all group-hover:translate-x-1"
                >
                    <Download className="w-4 h-4" />
                    View Technical PDF
                </a>
            </div>
        </div>
    );
});

const CataloguesManagement = () => {
    const [catalogues, setCatalogues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [pdfUploading, setPdfUploading] = useState(false);
    const [formData, setFormData] = useState({
        enTitle: '',
        thTitle: '',
        pdfUrl: ''
    });

    const pdfInputRef = useRef(null);

    const fetchCatalogues = async () => {
        setLoading(true);
        try {
            const { data } = await getCatalogues();
            setCatalogues(data);
        } catch (err) {
            console.error('Failed to fetch catalogues:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCatalogues();
    }, []);

    const handlePdfChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPdfUploading(true);
        try {
            const { data } = await uploadFile(file);
            setFormData(prev => ({ ...prev, pdfUrl: data.url }));
        } catch (err) {
            console.error('PDF upload failed:', err);
            alert('PDF upload failed');
        } finally {
            setPdfUploading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await addCatalogue(formData);
            setIsAdding(false);
            setFormData({ enTitle: '', thTitle: '', pdfUrl: '' });
            fetchCatalogues();
        } catch (err) {
            alert('Failed to add catalogue');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this catalogue?')) {
            try {
                await deleteCatalogue(id);
                fetchCatalogues();
            } catch (err) {
                alert('Failed to delete');
            }
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = catalogues.findIndex(c => c.id === active.id);
        const newIndex = catalogues.findIndex(c => c.id === over.id);

        const newCatalogues = arrayMove(catalogues, oldIndex, newIndex);
        setCatalogues(newCatalogues);

        reorderItems('catalogues', newCatalogues.map(c => c.id)).catch(err => {
            console.error('Failed to save order:', err);
            fetchCatalogues();
        });
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="p-2 bg-white rounded-xl shadow-sm text-slate-400 hover:text-brand-600 hover:bg-brand-50 hover:shadow-md active:scale-95 transition-all border border-slate-100">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-brand-600" />
                        Catalogues Management
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your technical product catalogues</p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Package className="w-4 h-4" />
                    <span>{catalogues.length} catalogues</span>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 ${isAdding ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/20'
                        }`}
                >
                    {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {isAdding ? 'Cancel' : 'New Catalogue'}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-brand-50 rounded-2xl">
                                <FileText className="w-6 h-6 text-brand-600" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">New Catalogue</h2>
                        </div>
                        <button onClick={() => setIsAdding(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
                            <X className="w-8 h-8" />
                        </button>
                    </div>

                    <form onSubmit={handleAdd} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">English Title</label>
                                <input
                                    type="text"
                                    value={formData.enTitle}
                                    onChange={(e) => setFormData({ ...formData, enTitle: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Thai Title</label>
                                <input
                                    type="text"
                                    value={formData.thTitle}
                                    onChange={(e) => setFormData({ ...formData, thTitle: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">PDF Document</label>
                            <input
                                type="file"
                                ref={pdfInputRef}
                                onChange={handlePdfChange}
                                accept=".pdf"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => pdfInputRef.current?.click()}
                                className={`w-full p-6 border-2 border-dashed rounded-2xl transition-all ${formData.pdfUrl
                                        ? 'border-brand-300 bg-brand-50 hover:bg-brand-100'
                                        : 'border-slate-200 hover:border-brand-300 hover:bg-slate-50'
                                    }`}
                                disabled={pdfUploading}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    {pdfUploading ? (
                                        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
                                    ) : formData.pdfUrl ? (
                                        <>
                                            <FileText className="w-8 h-8 text-brand-600" />
                                            <span className="text-sm font-bold text-brand-600">PDF Uploaded ✓</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-slate-400" />
                                            <span className="text-sm font-bold text-slate-600">Upload PDF</span>
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button type="button" onClick={() => setIsAdding(false)} className="flex-grow p-4 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 hover:text-slate-700 transition-all">Cancel</button>
                            <button type="submit" disabled={!formData.pdfUrl || pdfUploading} className="flex-[2] p-4 bg-brand-600 text-white font-black rounded-2xl hover:bg-brand-700 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] active:scale-95 transition-all disabled:opacity-50 shadow-xl">Publish Catalogue</button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-brand-600 mx-auto" />
                </div>
            ) : catalogues.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-500">No catalogues yet</h3>
                </div>
            ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={catalogues.map(c => c.id)} strategy={rectSortingStrategy}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {catalogues.map((cat) => (
                                <SortableCatalogueCard key={cat.id} cat={cat} onDelete={handleDelete} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    );
};

export default CataloguesManagement;
