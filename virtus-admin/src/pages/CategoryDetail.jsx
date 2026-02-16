import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Package, Tag, Layers, ImageIcon, X, Upload } from 'lucide-react';
import { getProductsByCategory, addProduct, deleteProduct, uploadImage } from '../services/api';

const CategoryDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [newProduct, setNewProduct] = useState({
        enName: '',
        thName: '',
        spec: '',
        imageUrl: ''
    });

    const fileInputRef = useRef(null);

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
            const { data } = await uploadImage(file);
            setNewProduct(prev => ({ ...prev, imageUrl: data.imageUrl }));
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await addProduct({ ...newProduct, categoryId: id });
            setNewProduct({ enName: '', thName: '', spec: '', imageUrl: '' });
            setIsAdding(false);
            fetchData();
        } catch (err) {
            console.error('ERROR details:', err.response?.data);
            const errorMsg = err.response?.data?.detail || err.message;
            alert(`Failed to add product: ${errorMsg}`);
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

    if (loading) return <div className="p-8 text-center text-slate-500">Loading...</div>;
    if (!data) return <div className="p-8 text-center text-red-500">Category not found</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-8 transition-colors">
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
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-700 transition-all shadow-md self-end md:self-start"
                >
                    {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {isAdding ? 'Cancel' : 'New Product'}
                </button>
            </div>

            {isAdding && (
                <div className="bg-brand-50 rounded-3xl p-8 mb-8 border border-brand-100 animate-in slide-in-from-top duration-300">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-brand-600" />
                        Add New Item
                    </h3>
                    <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">English Name</label>
                            <input
                                required
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                value={newProduct.enName}
                                onChange={e => setNewProduct({ ...newProduct, enName: e.target.value })}
                                placeholder="e.g. Deep Groove Ball Bearing"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">Thai Name</label>
                            <input
                                required
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                value={newProduct.thName}
                                onChange={e => setNewProduct({ ...newProduct, thName: e.target.value })}
                                placeholder="เช่น ตลับลูกปืนเม็ดกลม..."
                            />
                        </div>
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
                                            <span className="text-[8px] text-slate-400 font-bold uppercase mt-1">Upload</span>
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
                                    <p className="text-[10px] text-slate-400 leading-tight">Pick a local image file for this specific product.</p>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-xs font-bold text-brand-600 hover:underline"
                                    >
                                        {newProduct.imageUrl ? 'Change Image' : 'Select File'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">Specification / Detail</label>
                            <input
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                value={newProduct.spec}
                                onChange={e => setNewProduct({ ...newProduct, spec: e.target.value })}
                                placeholder="e.g. Series 6000, 2RS, C3"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-4 mt-2">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 shadow-md transition-all disabled:bg-slate-300"
                            >
                                {uploading ? 'Uploading...' : 'Save Product'}
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
                        <h3 className="text-lg font-medium text-slate-500">No products in this category yet</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {data.products.map(product => (
                            <div key={product.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center group hover:border-brand-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                                        <img src={product.imageUrl} alt={product.enName} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{product.enName}</h4>
                                        <p className="text-sm text-slate-500">{product.thName}</p>
                                        <p className="text-[10px] bg-slate-50 text-slate-500 inline-block px-2 py-0.5 rounded mt-1">{product.spec || 'No spec'}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-2 text-slate-300 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetail;
