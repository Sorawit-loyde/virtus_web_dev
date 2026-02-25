import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Package, FolderOpen, ExternalLink, RefreshCw, X, Image as ImageIcon, Upload, BookOpen, GripVertical } from 'lucide-react';
import { getCategories, deleteCategory, addCategory, uploadFile, reorderItems } from '../services/api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableCategoryCard = React.memo(({ cat, onDelete, onEdit }) => {
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
        zIndex: isDragging ? 1000 : 'auto',
        willChange: 'transform',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 group relative"
        >
            <div className="aspect-video bg-slate-50 relative overflow-hidden">
                <img
                    src={cat.imageUrl}
                    alt={cat.enTitle}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                    <button
                        {...attributes}
                        {...listeners}
                        className="p-1.5 bg-white/90 backdrop-blur rounded-md text-slate-400 hover:text-brand-600 hover:scale-110 active:scale-90 transition-all shadow-sm cursor-grab active:cursor-grabbing"
                        title="Drag to reorder"
                    >
                        <GripVertical className="w-4 h-4" />
                    </button>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                    <button
                        onClick={() => onEdit(cat)}
                        className="p-1.5 bg-white/90 backdrop-blur rounded-md text-slate-600 hover:text-brand-600 hover:scale-110 active:scale-90 transition-all shadow-sm"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(cat.id)}
                        className="p-1.5 bg-white/90 backdrop-blur rounded-md text-slate-600 hover:text-red-600 hover:scale-110 active:scale-90 transition-all shadow-sm"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="p-5">
                <h3 className="font-bold text-slate-900 mb-1 leading-tight h-10 flex items-center">{cat.enTitle}</h3>
                <p className="text-sm text-slate-500 mb-4 truncate">{cat.thTitle}</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <Link
                        to={`/category/${cat.id}`}
                        className="text-brand-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                        Manage Products
                        <FolderOpen className="w-4 h-4" />
                    </Link>
                    <a
                        href={`${import.meta.env.VITE_WEBSITE_URL}/products/${cat.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-slate-400 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-all"
                        title="View on Website"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
});

const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        enTitle: '',
        thTitle: '',
        imageUrl: ''
    });

    const fileInputRef = useRef(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const { data } = await getCategories();
            setCategories(data);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure? This will also delete all products in this category.')) {
            try {
                await deleteCategory(id);
                fetchCategories();
            } catch (err) {
                alert('Failed to delete');
            }
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const { data } = await uploadFile(file);
            setFormData(prev => ({ ...prev, imageUrl: data.url }));
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (cat) => {
        setFormData({
            id: cat.id,
            enTitle: cat.enTitle,
            thTitle: cat.thTitle,
            imageUrl: cat.imageUrl
        });
        setEditingId(cat.id);
        setIsAdding(true);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateCategory(editingId, formData);
            } else {
                await addCategory(formData);
            }
            setIsAdding(false);
            setEditingId(null);
            setFormData({ id: '', enTitle: '', thTitle: '', imageUrl: '' });
            fetchCategories();
        } catch (err) {
            alert(editingId ? 'Failed to update category.' : 'Failed to add category. Check if ID is unique.');
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Reduced from 8px for faster response
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = categories.findIndex(cat => cat.id === active.id);
        const newIndex = categories.findIndex(cat => cat.id === over.id);

        const newCategories = arrayMove(categories, oldIndex, newIndex);
        setCategories(newCategories);

        // Fire and forget - don't wait for API response
        reorderItems('categories', newCategories.map(cat => cat.id)).catch(err => {
            console.error('Failed to save order:', err);
            fetchCategories(); // Revert on error
        });
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Virtus Admin Panel</h1>
                    <p className="text-slate-500">Manage your website categories and products</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={fetchCategories}
                        className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
                        title="Refresh"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={() => {
                            setEditingId(null);
                            setFormData({ id: '', enTitle: '', thTitle: '', imageUrl: '' });
                            setIsAdding(true);
                        }}
                        className="bg-brand-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-700 transition-all shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        Add Category
                    </button>
                    <Link
                        to="/catalogues"
                        className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-800 hover:shadow-lg active:scale-95 transition-all shadow-sm"
                    >
                        <BookOpen className="w-5 h-5" />
                        Manage Catalogues
                    </Link>
                </div>
            </div>

            {/* Modal for Adding Category */}
            {isAdding && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Category' : 'Create New Category'}</h2>
                            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAdd} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-tight text-[10px]">ID (Slug - e.g. bearings)</label>
                                <input
                                    required
                                    disabled={!!editingId}
                                    className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand-500 transition-all outline-none ${editingId ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    value={formData.id}
                                    onChange={e => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                    placeholder="bearings"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-tight text-[10px]">English Title</label>
                                <input
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                                    value={formData.enTitle}
                                    onChange={e => setFormData({ ...formData, enTitle: e.target.value })}
                                    placeholder="Bearings (Original)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-tight text-[10px]">Thai Title</label>
                                <input
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                                    value={formData.thTitle}
                                    onChange={e => setFormData({ ...formData, thTitle: e.target.value })}
                                    placeholder="ตลับลูกปืน ของแท้"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-tight text-[10px]">Image</label>
                                <div className="flex gap-4 items-center">
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-24 h-24 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-brand-400 hover:bg-brand-50 cursor-pointer overflow-hidden transition-all group"
                                    >
                                        {formData.imageUrl ? (
                                            <img src={formData.imageUrl} className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <Upload className={`w-6 h-6 ${uploading ? 'animate-bounce text-brand-600' : 'text-slate-400'}`} />
                                                <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Upload</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex-grow space-y-2">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <p className="text-[10px] text-slate-400 leading-tight">
                                            Upload a local image file. It will be saved permanently to the backend.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="text-xs font-bold text-brand-600 hover:underline"
                                        >
                                            {formData.imageUrl ? 'Change Image' : 'Select File'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setIsAdding(false); setEditingId(null); }}
                                    className="flex-grow px-4 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="flex-grow bg-brand-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-md disabled:bg-slate-300"
                                >
                                    {uploading ? 'Uploading...' : editingId ? 'Update Category' : 'Save Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={categories.map(cat => cat.id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map((cat) => (
                            <SortableCategoryCard key={cat.id} cat={cat} onDelete={handleDelete} onEdit={handleEdit} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {categories.length === 0 && !loading && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900">No categories found</h3>
                    <p className="text-slate-500">Get started by creating your first category</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
