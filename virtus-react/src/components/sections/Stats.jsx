import { Award, Box, Globe, ShieldCheck } from 'lucide-react';
import { Text } from '../common/Text';

export const Stats = () => {
    const stats = [
        {
            icon: Award,
            value: '25+',
            en: 'Years Experience',
            th: 'ปีแห่งประสบการณ์',
            color: 'text-blue-500'
        },
        {
            icon: Globe,
            value: '4',
            en: 'Major Branches',
            th: 'สาขาหลักทั่วไทย',
            color: 'text-indigo-500'
        },
        {
            icon: Box,
            value: '10k+',
            en: 'Products Sourced',
            th: 'รายการสินค้าพร้อมส่ง',
            color: 'text-sky-500'
        },
        {
            icon: ShieldCheck,
            value: '100%',
            en: 'Genuine Parts',
            th: 'ของแท้ รับประกันคุณภาพ',
            color: 'text-cyan-500'
        },
    ];

    return (
        <section className="bg-slate-900 overflow-hidden relative">
            {/* Glossy line at the top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="mb-4 p-3 rounded-2xl bg-white/5 border border-white/10 text-brand-400 group-hover:scale-110 transition-transform duration-500">
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-slate-400 font-medium text-sm lg:text-base tracking-wide max-w-[150px]">
                                <Text en={stat.en} th={stat.th} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom glossy line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
        </section>
    );
};
