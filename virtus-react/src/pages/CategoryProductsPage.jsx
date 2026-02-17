import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Package, Tag, Layers, ExternalLink, FileText } from 'lucide-react';
import { Text } from '../components/common/Text';

export const CategoryProductsPage = () => {
    const { categoryId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/products/${categoryId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [categoryId]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-slate-50 pt-20">
                <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 pt-20 px-4 text-center">
                <Package className="w-12 h-12 text-slate-200 mb-4 mx-auto" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    <Text en="Category Not Found" th="ไม่พบหมวดหมู่สินค้า" />
                </h2>
                <Link to="/products" className="text-brand-600 font-bold hover:underline flex items-center gap-2 justify-center mt-4">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>
            </div>
        );
    }

    const { category, products } = data;

    return (
        <main className="flex-grow pt-20 bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-brand-900 py-16 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src={category.imageUrl} className="w-full h-full object-cover blur-2xl scale-125" alt="" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/products" className="inline-flex items-center gap-2 text-brand-200 hover:text-white mb-8 transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        <Text en="Back to All Categories" th="กลับไปหน้าหมวดหมู่" />
                    </Link>
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 backdrop-blur-md rounded-2xl p-1 overflow-hidden border border-white/20 shadow-2xl flex-shrink-0">
                            <img src={category.imageUrl} alt={category.enTitle} className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Layers className="w-5 h-5 text-brand-300" />
                                <span className="text-xs font-bold text-brand-200 uppercase tracking-widest">
                                    <Text en="Category" th="หมวดหมู่" />
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-thai uppercase lg:leading-tight tracking-tight">
                                <Text en={category.enTitle} th={category.thTitle} />
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-10 text-center md:text-left justify-center md:justify-start">
                    <Package className="w-6 h-6 text-brand-600" />
                    <h2 className="text-2xl font-bold text-slate-900">
                        <Text en={`Available Products (${products.length})`} th={`รายการสินค้า (${products.length})`} />
                    </h2>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                        <Tag className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-slate-400">
                            <Text en="No products in this category yet" th="ยังไม่มีรายการสินค้าในหมวดหมู่นี้" />
                        </h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col h-full">
                                {/* Product Image */}
                                <div className="aspect-square bg-slate-50 relative overflow-hidden flex-shrink-0">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.enName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/5 transition-colors" />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-tight mb-6 flex-grow flex items-center h-full">
                                        <Text en={product.enName} th={product.thName} />
                                    </h3>

                                    <div className="mt-auto">
                                        {product.pdfUrl ? (
                                            <a
                                                href={product.pdfUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-full inline-flex items-center justify-center bg-red-50 text-red-700 py-3 rounded-2xl font-black hover:bg-red-600 hover:text-white transition-all shadow-sm gap-2 text-xs"
                                            >
                                                <FileText className="w-4 h-4" />
                                                <Text en="View Full Specification" th="ดูข้อมูลผลิตภัณฑ์" />
                                            </a>
                                        ) : (
                                            <div className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center gap-2 opacity-60">
                                                <FileText className="w-4 h-4 text-slate-300" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Spec Pending</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};
