import { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, FileText, Download, Upload, X, Loader2, BookOpen, Package, AlertCircle } from 'lucide-react';
import { getCatalogues, addCatalogue, deleteCatalogue, uploadFile } from '../services/api';
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
            const { data: pdfData } = await uploadFile(file);
            setFormData(prev => ({ ...prev, pdfUrl: pdfData.url }));
        } catch (err) {
            console.error('PDF upload failed:', err);
            alert('Failed to upload PDF');
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

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="p-2 bg-white rounded-xl shadow-sm hover:text-brand-600 transition-all border border-slate-100">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Catalogue Manager</h1>
                    <p className="text-slate-500 text-sm italic underline decoration-brand-200">First page of PDF is used as cover automatically</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="ml-auto bg-brand-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-700 transition-all shadow-md active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    New Catalogue
                </button>
            </div>

            {isAdding && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-brand-50 rounded-2xl">
                                    <BookOpen className="w-6 h-6 text-brand-600" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900">New Catalogue</h2>
                            </div>
                            <button onClick={() => setIsAdding(false)} className="p-2 text-slate-400 hover:text-slate-600">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <form onSubmit={handleAdd} className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">English Title</label>
                                    <input
                                        required
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-500 outline-none"
                                        value={formData.enTitle}
                                        onChange={e => setFormData({ ...formData, enTitle: e.target.value })}
                                        placeholder="e.g. Bearings Catalogue"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Thai Title</label>
                                    <input
                                        required
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-500 outline-none"
                                        value={formData.thTitle}
                                        onChange={e => setFormData({ ...formData, thTitle: e.target.value })}
                                        placeholder="ชื่อภาษาไทย"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Upload PDF</label>
                                    {formData.pdfUrl && <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase tracking-widest">Document Loaded</span>}
                                </div>
                                <div className="flex gap-4">
                                    <input type="file" ref={pdfInputRef} onChange={handlePdfChange} className="hidden" accept=".pdf" />
                                    <button
                                        type="button"
                                        disabled={pdfUploading}
                                        onClick={() => pdfInputRef.current?.click()}
                                        className={`w-full py-12 rounded-[2rem] font-bold flex flex-col items-center justify-center gap-4 border-4 border-dashed transition-all ${formData.pdfUrl
                                                ? 'bg-green-50 border-green-200 text-green-700'
                                                : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-brand-500 hover:text-brand-600'
                                            }`}
                                    >
                                        {pdfUploading ? (
                                            <Loader2 className="w-12 h-12 animate-spin text-brand-600" />
                                        ) : formData.pdfUrl ? (
                                            <div className="w-32 h-44 shadow-2xl overflow-hidden border border-white">
                                                <AdminPdfPreview url={formData.pdfUrl} />
                                            </div>
                                        ) : (
                                            <Upload className="w-12 h-12" />
                                        )}
                                        <div className="text-center mt-2">
                                            <span className="block text-xl font-black">{pdfUploading ? 'Uploading...' : formData.pdfUrl ? 'Catalogue Ready' : 'Choose Catalogue PDF'}</span>
                                            {!pdfUploading && !formData.pdfUrl && <span className="text-xs font-medium opacity-60">System will automatically use the first page of your PDF</span>}
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setIsAdding(false)} className="flex-grow p-4 bg-slate-100 text-slate-500 font-bold rounded-2xl">Cancel</button>
                                <button type="submit" disabled={!formData.pdfUrl || pdfUploading} className="flex-[2] p-4 bg-brand-600 text-white font-black rounded-2xl hover:bg-brand-700 shadow-xl disabled:opacity-50">Publish Catalogue</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {catalogues.map((cat) => (
                    <div key={cat.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500">
                        <div className="aspect-[2/3] bg-slate-50 relative overflow-hidden">
                            <AdminPdfPreview url={cat.pdfUrl} />
                            <button
                                onClick={() => handleDelete(cat.id)}
                                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-xl text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all z-20"
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
                                className="w-full bg-slate-900 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-brand-600 transition-all group-hover:translate-x-1"
                            >
                                <Download className="w-4 h-4" />
                                View Technical PDF
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {catalogues.length === 0 && !loading && (
                <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
                    <Package className="w-20 h-20 text-slate-200 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-slate-300">No catalogues yet</h3>
                </div>
            )}
        </div>
    );
};

export default CataloguesManagement;
