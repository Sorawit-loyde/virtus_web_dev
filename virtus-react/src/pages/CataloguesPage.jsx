import { useState, useEffect } from 'react';
import { Text } from '../components/common/Text';
import { Download, BookOpen, Loader2, Package, FileText } from 'lucide-react';
import { PdfThumbnail } from '../components/PdfThumbnail';

export const CataloguesPage = () => {
    const [catalogues, setCatalogues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCatalogues = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/catalogues`);
                if (!response.ok) {
                    throw new Error('Failed to fetch catalogues');
                }
                const data = await response.json();
                setCatalogues(data);
            } catch (err) {
                console.error('Error fetching catalogues:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCatalogues();
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="flex-grow pt-20 bg-slate-50 min-h-screen pb-32">
            {/* Dark Premium Hero Section */}
            <section className="bg-slate-900 py-32 text-white relative overflow-hidden mb-24">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-full h-full bg-brand-600/10 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] opacity-30" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
                    <span className="text-brand-400 font-black uppercase tracking-[0.2em] text-sm mb-6 block">
                        <Text en="Comprehensive Digital Archive" th="ศูนย์รวบรวมเอกสารทางเทคนิคมืออาชีพ" />
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-10 tracking-tighter leading-[1.1]">
                        <Text
                            en="Technical Library"
                            th="ห้องสมุดทางเทคนิค"
                        />
                    </h1>
                    <p className="text-slate-400 text-xl md:text-2xl max-w-3xl leading-relaxed mx-auto md:mx-0 font-medium italic border-l-4 border-brand-500 pl-8">
                        <Text
                            en="Access our complete database of brand-official catalogues, precise specifications, and professional engineering assets."
                            th="เข้าถึงฐานข้อมูลแคตตาล็อกอย่างเป็นทางการ ข้อมูลทางเทคนิคที่แม่นยำ และเอกสารอ้างอิงทางวิศวกรรมระดับมืออาชีพทั้งหมดของเรา"
                        />
                    </p>
                </div>
            </section>

            {/* Catalog Grid Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-brand-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Accessing Library...</p>
                    </div>
                ) : catalogues.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[4rem] border border-dashed border-slate-200">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                            <Package className="w-10 h-10 text-slate-200" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-400 mb-4">
                            <Text en="No documents available" th="ยังไม่มีเอกสารในขณะนี้" />
                        </h3>
                        <a href="/contact" className="inline-flex bg-slate-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-brand-600 transition-all shadow-xl">
                            <Text en="Contact Support" th="ติดต่อสอบถาม" />
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {catalogues.map((item) => (
                            <div key={item.id} className="group flex flex-col h-full">
                                {/* Vertical "Book-Style" Thumbnail Rendering First Page */}
                                <div className="aspect-[2/3] bg-white rounded-[2rem] overflow-hidden shadow-sm group-hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] transition-all duration-700 relative border border-slate-100">
                                    <PdfThumbnail url={item.pdfUrl} />

                                    {/* Download Overlay on Hover */}
                                    <div className="absolute inset-0 bg-brand-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                        <a
                                            href={item.pdfUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="bg-white text-brand-900 px-8 py-4 rounded-2xl font-black shadow-2xl scale-90 group-hover:scale-100 transition-all flex items-center gap-3"
                                        >
                                            <Download className="w-5 h-5 text-brand-600" />
                                            <Text en="View Full PDF" th="เปิดไฟล์ PDF" />
                                        </a>
                                    </div>
                                </div>

                                {/* Content Below Thumbnail */}
                                <div className="mt-8 px-2 flex-grow">
                                    <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-brand-600 transition-colors uppercase tracking-tight">
                                        <Text en={item.enTitle} th={item.thTitle} />
                                    </h3>
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <FileText className="w-4 h-4 text-brand-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Digital Catalogue</span>
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
