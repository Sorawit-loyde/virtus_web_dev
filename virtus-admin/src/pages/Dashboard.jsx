import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Package, FolderOpen, ExternalLink, RefreshCw } from 'lucide-react';
import { getCategories, deleteCategory } from '../services/api';

const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="p-8">
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
                    <button className="bg-brand-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-700 transition-all shadow-sm">
                        <Plus className="w-5 h-5" />
                        Add Category
                    </button>
                </div>
            </div>

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
                            <h3 className="font-bold text-slate-900 mb-1">{cat.enTitle}</h3>
                            <p className="text-sm text-slate-500 mb-4">{cat.thTitle}</p>

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
