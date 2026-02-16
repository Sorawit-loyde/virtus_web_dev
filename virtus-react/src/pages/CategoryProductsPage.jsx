import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Package, Tag, Layers, Settings, ExternalLink } from 'lucide-react';
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
            <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 pt-20 px-4">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center max-w-md">
                    <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        <Text en="Category Not Found" th="ไม่พบหมวดหมู่สินค้านี้" />
                    </h2>
                    <p className="text-slate-500 mb-6">
                        <Text
                            en="The product category you are looking for does not exist or has been moved."
                            th="ไม่พบหมวดหมู่สินค้าที่คุณกำลังมองหา หรืออาจมีการเปลี่ยนแปลงข้อมูล"
                        />
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <Text en="Back to Products" th="กลับสู่หน้ารวมสินค้า" />
                    </Link>
                </div>
            </div>
        );
    }

    const { category, products } = data;

    return (
        <main className="flex-grow pt-20 bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-brand-900 py-16 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src={category.imageUrl} className="w-full h-full object-cover blur-2xl scale-150" alt="" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/products" className="inline-flex items-center gap-2 text-brand-200 hover:text-white mb-8 transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        <Text en="Back to All Categories" th="กลับไปหน้าหมวดหมู่ทั้งหมด" />
                    </Link>
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 backdrop-blur-md rounded-2xl p-1 overflow-hidden border border-white/20 shadow-2xl flex-shrink-0">
                            <img
                                src={category.imageUrl}
                                alt={category.enTitle}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Layers className="w-5 h-5 text-brand-300" />
                                <span className="text-xs font-bold text-brand-200 uppercase tracking-widest">
                                    <Text en="Category" th="หมวดหมู่" />
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-thai uppercase lg:leading-tight">
                                <Text en={category.enTitle} th={category.thTitle} />
                            </h1>
                            <p className="text-brand-100 text-lg max-w-2xl">
                                <Text
                                    en={`Professional range of ${category.enTitle} for various industrial applications.`}
                                    th={`ชิ้นส่วน ${category.thTitle} คุณภาพสูงสำหรับงานอุตสาหกรรมหลากหลายประเภท`}
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-10 text-center md:text-left justify-center md:justify-start">
                        <Package className="w-6 h-6 text-brand-600" />
                        <h2 className="text-2xl font-bold text-slate-900">
                            <Text
                                en={`Available Products (${products.length})`}
                                th={`รายการสินค้า (${products.length})`}
                            />
                        </h2>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                            <Tag className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-slate-400">
                                <Text en="No products found in this category" th="ยังไม่มีรายการสินค้าในหมวดหมู่นี้" />
                            </h3>
                            <Link to="/contact" className="text-brand-600 font-bold mt-4 inline-block hover:underline">
                                <Text en="Contact us for inquiries" th="ติดต่อสอบถามข้อมูลเพิ่มเติม" />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:border-brand-200 overflow-hidden flex flex-col h-full">
                                    {/* Product Image */}
                                    <div className="aspect-square bg-slate-50 relative overflow-hidden">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.enName}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/5 transition-colors" />
                                    </div>

                                    {/* Product Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-tight min-h-[3rem] flex items-center h-full">
                                                <Text en={product.enName} th={product.thName} />
                                            </h3>
                                        </div>

                                        <div className="h-0.5 w-10 bg-brand-600 rounded-full mb-4 opacity-30 group-hover:w-full group-hover:opacity-100 transition-all duration-500" />

                                        {product.spec && (
                                            <div className="flex items-center gap-2 mb-6 text-slate-400">
                                                <Settings className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest truncate">
                                                    {product.spec}
                                                </span>
                                            </div>
                                        )}

                                        <div className="mt-auto">
                                            <Link
                                                to="/contact"
                                                className="inline-flex items-center justify-center w-full bg-slate-50 text-slate-700 py-3 rounded-xl font-bold hover:bg-brand-600 hover:text-white transition-all group-hover:shadow-md border border-slate-100 hover:border-brand-600 gap-2 text-sm"
                                            >
                                                <Text en="Inquiry" th="สอบถาม" />
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};
