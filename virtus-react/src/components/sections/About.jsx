import { CheckCircle2, Factory, Link } from 'lucide-react';
import { Text } from '../common/Text';

export const About = () => {
    return (
        <section id="about" className="py-24 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-5xl">
                    <div className="inline-block bg-brand-50 text-brand-700 px-4 py-2 rounded-full font-bold text-sm mb-6">
                        <Text en="About Virtus" th="เกี่ยวกับเวอร์ทัส" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                        <Text
                            en="Regional Excellence in Engineering Components"
                            th="ความเป็นเลิศด้านชิ้นส่วนวิศวกรรมในระดับภูมิภาค"
                        />
                    </h2>
                    <p className="text-slate-600 text-lg mb-8 leading-relaxed italic border-l-4 border-brand-500 pl-6">
                        <Text
                            en="A top regional manufacturer and distributor, ensuring industry leadership with real added value and a full inventory."
                            th="ผู้ผลิตและจัดจำหน่ายชั้นนำ รักษาความเป็นผู้นำด้วยการสร้างมูลค่าเพิ่มและสำรองสินค้าอย่างครบถ้วนที่สุด"
                        />
                    </p>

                    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                        {[
                            { en: 'Authentic International Standards', th: 'มาตรฐานสากลของแท้' },
                            { en: 'Largest Regional Inventory', th: 'คลังสินค้าที่ใหญ่ที่สุดในภูมิภาค' },
                            { en: 'Advanced Technical Support', th: 'การสนับสนุนทางเทคนิคขั้นสูง' },
                            { en: 'Professional Field Experience', th: 'ประสบการณ์ตรงจากภาคสนาม' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
                                <span className="text-slate-700 font-medium">
                                    <Text en={item.en} th={item.th} />
                                </span>
                            </div>
                        ))}
                    </div>

                    <a
                        href="/about"
                        className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-500/20"
                    >
                        <Text en="Full Company Profile" th="รายละเอียดบริษัท" />
                    </a>
                </div>
            </div>

            {/* Minimalist Background Decoration (No real images) */}
            <div className="absolute top-1/2 -right-20 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                <Factory className="w-[600px] h-[600px] -rotate-12" />
            </div>
        </section>
    );
};
