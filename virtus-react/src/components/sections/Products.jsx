import { LayoutGrid, CircleDot, Link2, Settings, ArrowRight } from 'lucide-react';
import { Text } from '../common/Text';

const productCategories = [
    {
        icon: LayoutGrid,
        enTitle: 'Anti-Vibration',
        thTitle: 'ยางกันสะเทือน',
        enDesc: 'Advanced mounting solutions to reduce noise and vibration in machinery.',
        thDesc: 'โซลูชั่นการติดตั้งขั้นสูงเพื่อลดเสียงรบกวนและการสั่นสะเทือนในเครื่องจักร',
        color: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600',
    },
    {
        icon: CircleDot,
        enTitle: 'Bearings',
        thTitle: 'ตลับลูกปืน',
        enDesc: 'High-precision bearings for all types of industrial applications.',
        thDesc: 'ตลับลูกปืนความแม่นยำสูงสำหรับงานอุตสาหกรรมทุกประเภท',
        color: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600',
    },
    {
        icon: Link2,
        enTitle: 'Chains & Belts',
        thTitle: 'โซ่และสายพาน',
        enDesc: 'Durable power transmission components for efficient operations.',
        thDesc: 'อุปกรณ์ส่งกำลังที่ทนทานเพื่อการดำเนินงานที่มีประสิทธิภาพ',
        color: 'bg-cyan-100 text-cyan-600 group-hover:bg-cyan-600',
    },
    {
        icon: Settings,
        enTitle: 'Components',
        thTitle: 'ชิ้นส่วนอุตสาหกรรม',
        enDesc: 'A wide range of general industrial spare parts and tools.',
        thDesc: 'เครื่องมือและอะไหล่อุตสาหกรรมทั่วไปที่หลากหลาย',
        color: 'bg-sky-100 text-sky-600 group-hover:bg-sky-600',
    },
];

export const Products = () => {
    return (
        <section id="products" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        <Text en="Our Core Products" th="สินค้าหลักของเรา" />
                    </h2>
                    <p className="text-slate-600 text-lg">
                        <Text
                            en="High-quality industrial components sourced from top global manufacturers."
                            th="ชิ้นส่วนอุตสาหกรรมคุณภาพสูงจากผู้ผลิตชั้นนำระดับโลก"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {productCategories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group"
                        >
                            <div
                                className={`w-14 h-14 ${cat.color} rounded-xl flex items-center justify-center mb-6 group-hover:text-white transition-colors`}
                            >
                                <cat.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                <Text en={cat.enTitle} th={cat.thTitle} />
                            </h3>
                            <p className="text-slate-500 mb-6">
                                <Text en={cat.enDesc} th={cat.thDesc} />
                            </p>
                            <a
                                href="/contact"
                                className="text-brand-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                            >
                                <Text en="Learn more" th="ดูเพิ่มเติม" />
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
