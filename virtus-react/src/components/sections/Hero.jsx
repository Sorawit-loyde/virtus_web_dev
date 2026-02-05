import { ArrowRight } from 'lucide-react';
import { Text } from '../common/Text';

export const Hero = () => {
    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-brand-900/80 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2670"
                    alt="Industrial Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                <div className="lg:w-2/3">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                        <span className="block"><Text en="Industrial Components" th="ชิ้นส่วนอุตสาหกรรม" /></span>
                        <span className="text-white block">
                            <Text en="Expertise & Quality" th="คุณภาพและความเชี่ยวชาญ" />
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-white mb-10 max-w-2xl leading-relaxed">
                        <Text
                            en="Leading importer and stockist of genuine tools and components in Southeast Asia. We provide deep technical understanding and professional service."
                            th="ผู้นำเข้าและจัดจำหน่ายเครื่องมือและชิ้นส่วนอุตสาหกรรมแท้ชั้นนำในเอเชียตะวันออกเฉียงใต้ เราให้บริการด้วยความเข้าใจทางเทคนิคอย่างลึกซึ้ง"
                        />
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="/products"
                            className="bg-white text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-brand-50 transition-colors shadow-xl flex items-center justify-center gap-2"
                        >
                            <Text en="Explore Products" th="ดูสินค้าทั้งหมด" />
                            <ArrowRight className="w-5 h-5" />
                        </a>
                        <a
                            href="/contact"
                            className="bg-transparent border-2 border-slate-300 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center"
                        >
                            <Text en="Contact Sales" th="ติดต่อฝ่ายขาย" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
