import { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
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
