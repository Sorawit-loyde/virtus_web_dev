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
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${categoryId}`);
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
                    <Text en="Back to Products" th="กลับหน้าหมวดหมู่สินค้า" />
                </Link>
            </div>
        );
    }

    const { category, products } = data;

    return (
        <main className="flex-grow pt-20 bg-slate-50 min-h-screen pb-32">
            {/* Dark Premium Hero Section */}
            <section className="bg-slate-900 py-32 text-white relative overflow-hidden mb-24">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-full h-full bg-brand-600/10 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] opacity-30" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/products" className="inline-flex items-center gap-3 text-brand-400 hover:text-white mb-16 transition-all group font-black uppercase text-[10px] tracking-[0.2em] bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <Text en="Back to All Categories" th="กลับไปหน้าหมวดหมู่" />
                    </Link>

                    <div className="flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
                        <div className="w-48 h-48 md:w-56 md:h-56 bg-white/10 backdrop-blur-2xl rounded-[2rem] p-1 overflow-hidden border border-white/20 shadow-2xl flex-shrink-0">
                            <img src={category.imageUrl} alt={category.enTitle} className="w-full h-full object-cover rounded-[1.8rem]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                                <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                                    <Layers className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-black text-brand-400 uppercase tracking-[0.2em]">
                                    <Text en="Technical Category" th="หมวดหมู่ทางเทคนิค" />
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter uppercase leading-[1.1]">
                                <Text en={category.enTitle} th={category.thTitle} />
                            </h1>
                            <div className="w-20 h-2 bg-brand-600 rounded-full mx-auto md:mx-0"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid Section */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                            <Package className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                            <Text en={`Product Range (${products.length})`} th={`รายการสินค้า (${products.length})`} />
                        </h2>
                    </div>

                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-100 px-6 py-3 rounded-full">
                        <Text en="Verified Specifications" th="ข้อมูลทางเทคนิคที่ผ่านการตรวจสอบ" />
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[4rem] border border-dashed border-slate-200">
                        <Tag className="w-16 h-16 text-slate-200 mx-auto mb-8" />
                        <h3 className="text-2xl font-black text-slate-400 uppercase tracking-tight">
                            <Text en="No products found in this category" th="ยังไม่มีรายการสินค้าในหมวดหมู่นี้" />
                        </h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 group overflow-hidden flex flex-col h-full transform hover:-translate-y-2">
                                {/* Product Image */}
                                <div className="aspect-square bg-slate-50 relative overflow-hidden flex-shrink-0">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.enName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-brand-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <span className="inline-block text-[9px] font-black uppercase tracking-[0.2em] text-brand-500 mb-4">
                                        <Text en="Engineering Part" th="ชิ้นส่วนวิศวกรรม" />
                                    </span>
                                    <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors leading-tight mb-8 flex-grow uppercase tracking-tight">
                                        <Text en={product.enName} th={product.thName} />
                                    </h3>

                                    <div className="mt-auto">
                                        {product.pdfUrl ? (
                                            <a
                                                href={product.pdfUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-full inline-flex items-center justify-center bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-brand-600 transition-all shadow-xl gap-3 text-xs uppercase tracking-widest group/btn"
                                            >
                                                <FileText className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                <Text en="Download Spec" th="ข้อมูลผลิตภัณฑ์" />
                                            </a>
                                        ) : (
                                            <div className="w-full py-4 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center gap-3 opacity-60 bg-slate-50">
                                                <FileText className="w-4 h-4 text-slate-300" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    <Text en="Spec Pending" th="กำลังอัปเดตข้อมูล" />
                                                </span>
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
