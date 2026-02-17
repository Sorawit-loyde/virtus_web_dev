import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Text } from '../common/Text';

const slideImages = [
    '/assets/slide/Bearing.png',
    '/assets/slide/Bearing2.png',
    '/assets/slide/Belts.png',
    '/assets/slide/Couplings-Corousel.png',
    '/assets/slide/Ludecke.png',
    '/assets/slide/Pulleys.png',
    '/assets/slide/Speedy.png',
    '/assets/slide/mix.png'
];

export const ProductSlideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-100/30 via-transparent to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
                    <div>
                        <span className="text-brand-600 font-black tracking-[0.15em] uppercase text-sm mb-4 block">
                            <Text en="Full Range Catalog" th="แคตตาล็อกสินค้าทั้งหมด" />
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase">
                            <Text en="Product Gallery" th="แกลเลอรีสินค้า" />
                        </h2>
                        <div className="w-20 h-2 bg-brand-600 rounded-full mt-6 mb-2 mx-auto md:mx-0"></div>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={prevSlide}
                            className="w-16 h-16 rounded-[1.2rem] bg-white border border-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-500 cursor-pointer shadow-xl flex items-center justify-center transform hover:-translate-x-1"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-16 h-16 rounded-[1.2rem] bg-white border border-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-500 cursor-pointer shadow-xl flex items-center justify-center transform hover:translate-x-1"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>
                </div>

                <div className="relative group">
                    <div className="relative aspect-[16/8] sm:aspect-[21/9] lg:aspect-[25/8] overflow-hidden rounded-[3rem] bg-white shadow-2xl border border-slate-100">
                        {slideImages.map((img, index) => (
                            <div
                                key={img}
                                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${index === currentIndex
                                    ? 'opacity-100 translate-x-0 scale-100'
                                    : index < currentIndex
                                        ? 'opacity-0 -translate-x-12 scale-95'
                                        : 'opacity-0 translate-x-12 scale-95'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-full object-contain p-4 md:p-8"
                                />

                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots Overlay */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                        {slideImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${index === currentIndex
                                    ? 'bg-brand-600 w-12'
                                    : 'bg-slate-300 w-3 hover:bg-slate-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
