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
        <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-3">
                            <Text en="Full Range Catalog" th="แคตตาล็อกสินค้าทั้งหมด" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            <Text en="Industrial Product Gallery" th="แกลเลอรีสินค้าอุตสาหกรรม" />
                        </h2>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={prevSlide}
                            className="p-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all cursor-pointer shadow-sm hover:shadow-brand-200"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all cursor-pointer shadow-sm hover:shadow-brand-200"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="relative group perspective-1000">
                    <div className="relative aspect-[16/7] sm:aspect-[21/9] lg:aspect-[25/8] overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100">
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
