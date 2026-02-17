import { Products } from '../components/sections/Products';
import { Text } from '../components/common/Text';

export const ProductsPage = () => {
    return (
        <main className="flex-grow pt-20 bg-slate-50 min-h-screen pb-32">
            {/* Dark Premium Hero Section */}
            <section className="bg-slate-900 py-32 text-white relative overflow-hidden mb-24">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-full h-full bg-brand-600/10 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] opacity-30" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
                    <span className="text-brand-400 font-black uppercase tracking-[0.2em] text-sm mb-6 block">
                        <Text en="Engineered Solutions" th="โซลูชันด้านวิศวกรรม" />
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-10 tracking-tighter leading-[1.1]">
                        <Text
                            en="Industrial Products"
                            th="สินค้าอุตสาหกรรม"
                        />
                    </h1>
                    <p className="text-slate-400 text-xl md:text-2xl max-w-3xl leading-relaxed mx-auto md:mx-0 font-medium italic border-l-4 border-brand-500 pl-8">
                        <Text
                            en="A comprehensive range of high-performance industrial components from world-leading engineering manufacturers."
                            th="ชิ้นส่วนวิศวกรรมเครื่องกลและอะไหล่เครื่องจักรที่ครบวงจรจากผู้ผลิตชั้นนำระดับโลก พร้อมการรับประกันคุณภาพอย่างดีที่สุด"
                        />
                    </p>
                </div>
            </section>

            <Products />


        </main>
    );
};
