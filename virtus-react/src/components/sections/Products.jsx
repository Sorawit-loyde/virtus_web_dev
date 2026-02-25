import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, BookOpen } from 'lucide-react';
import { Text } from '../common/Text';

export const Products = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex justify-center items-center bg-slate-50">
                <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-24 text-center bg-slate-50 text-red-500">
                <Text en={`Error: ${error}`} th={`ข้อผิดพลาด: ${error}`} />
            </div>
        );
    }

    return (
        <section id="products" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto mb-16">
                    <Link
                        to="/catalogues"
                        className="relative group block p-0.5 rounded-[2rem] overflow-hidden transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl hover:shadow-brand-500/10"
                    >
                        {/* Animated Gradient Border */}
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-400 via-blue-500 to-brand-600 animate-gradient-x" />

                        <div className="relative bg-white rounded-[1.95rem] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 opacity-50" />

                            <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-200 group-hover:rotate-6 transition-transform duration-500 flex-shrink-0">
                                    <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                </div>
                                <div className="text-left">
                                    <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2">
                                        <Text en="Comprehensive Catalogues" th="แคตตาล็อกฉบับสมบูรณ์" />
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                                        <Text en="Looking for full specifications?" th="ต้องการข้อมูลทางเทคนิคทั้งหมด?" />
                                    </h3>
                                </div>
                            </div>

                            <div className="relative z-10 flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0">
                                <div className="flex-grow md:flex-grow-0 bg-brand-600 text-white px-8 py-4 rounded-xl font-black flex items-center justify-center gap-3 group-hover:bg-brand-700 transition-all shadow-lg group-hover:translate-x-1">
                                    <Text en="View All Catalogues" th="ดูรายการทั้งหมด" />
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 font-thai">
                        <Text en="Product Categories" th="หมวดหมู่สินค้า" />
                    </h2>
                    <p className="text-slate-600 text-lg">
                        <Text
                            en="Select a category to view our high-quality industrial components."
                            th="เลือกหมวดหมู่เพื่อดูรายละเอียดชิ้นส่วนอุตสาหกรรมคุณภาพสูง"
                        />
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/products/${cat.id}`}
                            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 border border-slate-100 flex flex-col h-full transform hover:-translate-y-2"
                        >
                            {/* Category Image */}
                            <div className="aspect-[1.2/1] bg-slate-50 relative overflow-hidden flex-shrink-0">
                                <img
                                    src={cat.imageUrl}
                                    alt={cat.enTitle}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-brand-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
                                        <ArrowRight className="w-6 h-6 text-brand-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <span className="inline-block text-xs font-black uppercase tracking-[0.15em] text-brand-500 mb-3">
                                        <Text en="Technical Category" th="หมวดหมู่ทางเทคนิค" />
                                    </span>
                                    <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors leading-tight min-h-[4rem] flex items-start uppercase tracking-tight">
                                        <Text en={cat.enTitle} th={cat.thTitle} />
                                    </h3>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between text-slate-400 font-black text-[10px] uppercase tracking-widest">
                                    <span><Text en="Explore Range" th="สำรวจสินค้า" /></span>
                                    <ArrowRight className="w-4 h-4 text-brand-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
