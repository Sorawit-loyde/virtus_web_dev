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
        <section className="bg-slate-950 overflow-hidden relative py-32">
            {/* Soft Radial Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-900/10 via-transparent to-transparent opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="mb-8 w-20 h-20 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-all duration-700 shadow-2xl backdrop-blur-sm group-hover:-translate-y-2">
                                <stat.icon className="w-10 h-10" />
                            </div>
                            <div className="text-5xl lg:text-7xl font-black text-white mb-4 tracking-tighter">
                                {stat.value}
                            </div>
                            <div className="text-slate-500 font-black text-[11px] lg:text-xs uppercase tracking-[0.2em]">
                                <Text en={stat.en} th={stat.th} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
