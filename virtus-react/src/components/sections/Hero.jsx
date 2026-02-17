import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Text } from '../common/Text';

const backgroundImages = [
    '/assets/background_loop/Banner-Craft-Bearings-2.jpg',
    '/assets/background_loop/Covergif.gif',
    '/assets/background_loop/gifFB180213.gif',
    '/assets/background_loop/gifMPZ.gif',
    '/assets/background_loop/gifPneumatics.gif',
    '/assets/background_loop/hepyc.gif',
    '/assets/background_loop/motorbase.gif'
];

export const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative min-h-[700px] lg:min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Background Slideshow Container */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pt-[90px] pb-[10px]">
                {/* Consistent Uniform Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 z-20 pointer-events-none" />

                <div className="relative w-full h-full flex items-center justify-center">
                    {backgroundImages.map((img, index) => (
                        <div
                            key={img}
                            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                }`}
                        >
                            <img
                                src={img}
                                alt={`Industrial ${index + 1}`}
                                className="w-full h-full object-cover lg:object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className={`relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="max-w-3xl">
                    <span className="text-brand-400 font-black uppercase tracking-[0.2em] text-sm mb-6 block">
                        <Text en="Leading Industrial Excellence" th="ผู้นำด้านความเป็นเลิศในอุตสาหกรรม" />
                    </span>
                    <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-[1.1] drop-shadow-2xl">
                        <Text en="VIRTUS" th="บริษัท" /> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600 uppercase">
                            <Text en="Company" th="เวอร์ทัส" />
                        </span>
                    </h1>

                    <div className="relative mb-10">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-500 to-transparent rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)]"></div>
                        <h2 className="text-slate-200 text-xl sm:text-2xl font-medium max-w-2xl leading-relaxed pl-4">
                            <Text
                                en="Importer & Stockist of Genuine Industrial Tools & Components with deep technical expertise."
                                th="ผู้นำเข้าและผู้จัดจำหน่ายเครื่องมืออุตสาหกรรมของแท้ พร้อมทีมงานผู้เชี่ยวชาญทางเทคนิค"
                            />
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-5">
                        <Link
                            to="/catalogues"
                            className="group bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-brand-900/20 flex items-center gap-3 cursor-pointer hover:-translate-y-1"
                        >
                            <Text en="View Catalog" th="ดูรายการสินค้า" />
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/about"
                            className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <Text en="Our Expertise" th="ความเชี่ยวชาญของเรา" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
