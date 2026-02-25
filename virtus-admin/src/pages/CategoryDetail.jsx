import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Package, Tag, Layers, ImageIcon, X, Upload, FileText, GripVertical } from 'lucide-react';
import { getProductsByCategory, addProduct, deleteProduct, uploadFile, reorderItems } from '../services/api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableProductRow = React.memo(({ product, onDelete, onEdit }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: product.id });

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
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center group hover:border-brand-200 hover:shadow-md transition-all"
        >
            <div className="flex items-center gap-4">
                <button
                    {...attributes}
                    {...listeners}
                    className="p-1.5 text-slate-300 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all cursor-grab active:cursor-grabbing"
                    title="Drag to reorder"
                >
                    <GripVertical className="w-5 h-5" />
                </button>
                <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <img src={product.imageUrl} alt={product.enName} className="w-full h-full object-cover" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors uppercase tracking-tight">{product.enName}</h4>
                        {product.pdfUrl && <FileText className="w-3.5 h-3.5 text-red-500" />}
                    </div>
                    <p className="text-sm text-slate-500 font-medium">{product.thName}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onEdit(product)}
                    className="p-2 text-slate-300 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all active:scale-90"
                >
                    <Edit2 className="w-5 h-5" />
                </button>
                <button
                    onClick={() => onDelete(product.id)}
                    className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
});

const CategoryDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [pdfUploading, setPdfUploading] = useState(false);
    const [newProduct, setNewProduct] = useState({
        enName: '',
        thName: '',
        imageUrl: '',
        pdfUrl: ''
    });

    const fileInputRef = useRef(null);
    const pdfInputRef = useRef(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data } = await getProductsByCategory(id);
            setData(data);
        } catch (err) {
            console.error('Failed to fetch category data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const { data } = await uploadFile(file);
            setNewProduct(prev => ({ ...prev, imageUrl: data.url }));
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handlePdfChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPdfUploading(true);
        try {
            const { data } = await uploadFile(file);
            setNewProduct(prev => ({ ...prev, pdfUrl: data.url }));
        } catch (err) {
            console.error('PDF upload failed:', err);
            alert('PDF upload failed');
        } finally {
            setPdfUploading(false);
        }
    };

    const handleEditProduct = (product) => {
        setNewProduct({
            enName: product.enName,
            thName: product.thName,
            imageUrl: product.imageUrl,
            pdfUrl: product.pdfUrl || ''
        });
        setEditingId(product.id);
        setIsAdding(true);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateProduct(editingId, { ...newProduct, categoryId: id });
            } else {
                await addProduct({ ...newProduct, categoryId: id });
            }
            setNewProduct({ enName: '', thName: '', imageUrl: '', pdfUrl: '' });
            setEditingId(null);
            setIsAdding(false);
            fetchData();
        } catch (err) {
            alert(editingId ? 'Failed to update product' : 'Failed to add product');
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Delete this product?')) {
            try {
                await deleteProduct(productId);
                fetchData();
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

        const oldIndex = data.products.findIndex(p => p.id === active.id);
        const newIndex = data.products.findIndex(p => p.id === over.id);

        const newProducts = arrayMove(data.products, oldIndex, newIndex);
        setData({ ...data, products: newProducts });

        reorderItems('products', newProducts.map(p => p.id)).catch(err => {
            console.error('Failed to save order:', err);
            fetchData();
        });
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading...</div>;
    if (!data) return <div className="p-8 text-center text-red-500">Category not found</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 px-3 py-1.5 rounded-lg mb-8 transition-all active:scale-95">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-48 aspect-video rounded-2xl overflow-hidden bg-slate-50">
                    <img src={data.category.imageUrl} alt={data.category.enTitle} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                        <Layers className="w-5 h-5 text-brand-600" />
                        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Category</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{data.category.enTitle}</h1>
                    <p className="text-lg text-slate-500">{data.category.thTitle}</p>
                </div>
                <button
                    onClick={() => {
                        if (isAdding) {
                            setEditingId(null);
                            setNewProduct({ enName: '', thName: '', imageUrl: '', pdfUrl: '' });
                        }
                        setIsAdding(!isAdding);
                    }}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 ${isAdding
                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        : 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/20'
                        } self-end md:self-start`}
                >
                    {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {isAdding ? 'Cancel' : 'New Product'}
                </button>
            </div>

            {isAdding && (
                <div className="bg-brand-50 rounded-3xl p-8 mb-8 border border-brand-100 animate-in slide-in-from-top duration-300">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        {editingId ? <Edit2 className="w-5 h-5 text-brand-600" /> : <Plus className="w-5 h-5 text-brand-600" />}
                        {editingId ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">English Name</label>
                            <input
                                required
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                value={newProduct.enName}
                                onChange={e => setNewProduct({ ...newProduct, enName: e.target.value })}
                                placeholder="Product Name (English)"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">Thai Name</label>
                            <input
                                required
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                value={newProduct.thName}
                                onChange={e => setNewProduct({ ...newProduct, thName: e.target.value })}
                                placeholder="Product Name (Thai)"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight text-[11px]">Product Image</label>
                            <div className="flex gap-4 items-center">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-20 h-20 bg-white rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-brand-400 hover:bg-brand-50 cursor-pointer overflow-hidden transition-all group flex-shrink-0"
                                >
                                    {newProduct.imageUrl ? (
                                        <img src={newProduct.imageUrl} className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <Upload className={`w-5 h-5 ${uploading ? 'animate-bounce text-brand-600' : 'text-slate-400'}`} />
                                            <span className="text-[8px] text-slate-400 font-bold uppercase mt-1">Image</span>
                                        </>
                                    )}
                                </div>
                                <div className="flex-grow space-y-1">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-xs font-bold text-brand-600 hover:underline"
                                    >
                                        {newProduct.imageUrl ? 'Change Image' : 'Select Image'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* PDF Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight text-[11px]">Product PDF (Spec)</label>
                            <div className="flex gap-4 items-center">
                                <div
                                    onClick={() => pdfInputRef.current?.click()}
                                    className="w-20 h-20 bg-white rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-brand-400 hover:bg-brand-50 cursor-pointer overflow-hidden transition-all group flex-shrink-0"
                                >
                                    {newProduct.pdfUrl ? (
                                        <div className="text-center">
                                            <FileText className="w-8 h-8 text-red-500 mx-auto" />
                                            <span className="text-[8px] text-slate-500 font-bold uppercase block mt-1 truncate px-2">PDF Ready</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className={`w-5 h-5 ${pdfUploading ? 'animate-bounce text-brand-600' : 'text-slate-400'}`} />
                                            <span className="text-[8px] text-slate-400 font-bold uppercase mt-1">PDF File</span>
                                        </>
                                    )}
                                </div>
                                <div className="flex-grow space-y-1">
                                    <input
                                        type="file"
                                        ref={pdfInputRef}
                                        onChange={handlePdfChange}
                                        className="hidden"
                                        accept=".pdf"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => pdfInputRef.current?.click()}
                                        className="text-xs font-bold text-brand-600 hover:underline"
                                    >
                                        {newProduct.pdfUrl ? 'Change PDF' : 'Select PDF'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-4 mt-2">
                            <button
                                type="button"
                                onClick={() => { setIsAdding(false); setEditingId(null); setNewProduct({ enName: '', thName: '', imageUrl: '', pdfUrl: '' }); }}
                                className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={uploading || pdfUploading}
                                className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/20 transition-all active:scale-95 disabled:bg-slate-300"
                            >
                                {uploading || pdfUploading ? 'Uploading...' : editingId ? 'Update Product' : 'Save Product'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                    <Package className="w-5 h-5 text-slate-400" />
                    <h2 className="text-xl font-bold text-slate-800">Products ({data.products.length})</h2>
                </div>

                {data.products.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <Tag className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-500">No products yet</h3>
                    </div>
                ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={data.products.map(p => p.id)} strategy={verticalListSortingStrategy}>
                            <div className="grid grid-cols-1 gap-4">
                                {data.products.map(product => (
                                    <SortableProductRow key={product.id} product={product} onDelete={handleDeleteProduct} onEdit={handleEditProduct} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
};

export default CategoryDetail;
