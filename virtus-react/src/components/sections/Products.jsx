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
                const response = await fetch('http://localhost:5000/api/categories');
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
                                    <p className="text-slate-500 text-sm sm:text-base mt-1 italic">
                                        <Text en="Download PDF catalogues from our world-leading partners." th="ดาวน์โหลดแคตตาล็อก PDF จากแบรนด์ชั้นนำระดับโลก" />
                                    </p>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat) => (
                        <a
                            key={cat.id}
                            href={`/products/${cat.id}`}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
                        >
                            {/* Image Placeholder Area */}
                            <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                                <img
                                    src={cat.imageUrl}
                                    alt={cat.enTitle}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                                />
                                <div className="absolute inset-0 bg-brand-900/5 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors leading-tight min-h-[3.5rem] flex items-center">
                                    <Text en={cat.enTitle} th={cat.thTitle} />
                                </h3>

                                <div className="mt-auto flex items-center justify-between text-brand-600 font-bold text-sm">
                                    <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
                                        <Text en="View Products" th="ดูสินค้า" />
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
