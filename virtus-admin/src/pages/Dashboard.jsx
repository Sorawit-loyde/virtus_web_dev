import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Package, FolderOpen, ExternalLink, RefreshCw, X, Image as ImageIcon, Upload, BookOpen } from 'lucide-react';
import { getCategories, deleteCategory, addCategory, uploadFile } from '../services/api';

const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
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

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await addCategory(formData);
            setIsAdding(false);
            setFormData({ id: '', enTitle: '', thTitle: '', imageUrl: '' });
            fetchCategories();
        } catch (err) {
            alert('Failed to add category. Check if ID is unique.');
        }
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
                        className="p-2 text-slate-400 hover:text-brand-600 transition-colors"
                        title="Refresh"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="bg-brand-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-700 transition-all shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        Add Category
                    </button>
                    <Link
                        to="/catalogues"
                        className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-sm"
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
                            <h2 className="text-xl font-bold text-slate-900">Create New Category</h2>
                            <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAdd} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-tight text-[10px]">ID (Slug - e.g. bearings)</label>
                                <input
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand-500 transition-all outline-none"
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
                                    onClick={() => setIsAdding(false)}
                                    className="flex-grow px-4 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="flex-grow bg-brand-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-md disabled:bg-slate-300"
                                >
                                    {uploading ? 'Uploading...' : 'Save Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <div key={cat.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="aspect-video bg-slate-50 relative overflow-hidden">
                            <img
                                src={cat.imageUrl}
                                alt={cat.enTitle}
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                                <button className="p-1.5 bg-white/90 rounded-md text-slate-600 hover:text-brand-600 transition-colors shadow-sm">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="p-1.5 bg-white/90 rounded-md text-slate-600 hover:text-red-600 transition-colors shadow-sm"
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
                                    href={`http://localhost:5173/products/${cat.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-400 hover:text-slate-600 transition-colors"
                                    title="View on Website"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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
