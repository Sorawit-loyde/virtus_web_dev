import { Text } from '../components/common/Text';
import { Shield, Zap, Factory, Rocket, Award, Users, Warehouse, Microscope } from 'lucide-react';

const ValueCard = ({ icon: Icon, titleEn, titleTh }) => (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:border-brand-200 transition-all duration-300">
        <div className="w-12 h-12 bg-slate-50 text-brand-600 rounded-xl flex items-center justify-center mb-6">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 border-l-2 border-brand-500 pl-4">
            <Text en={titleEn} th={titleTh} />
        </h3>
    </div>
);

export const AboutPage = () => {
    const values = [
        { icon: Shield, titleEn: "Integrity", titleTh: "ความซื่อสัตย์สุจริต" },
        { icon: Zap, titleEn: "Simplicity but Effective", titleTh: "ความเรียบง่ายแต่มีประสิทธิผล" },
        { icon: Factory, titleEn: "Creator and Producer", titleTh: "ความเป็นผู้สร้าง เป็นผู้ผลิต" },
        { icon: Rocket, titleEn: "Progress, Leadership, and Innovation", titleTh: "ความก้าวหน้า ความเป็นผู้นำ และนวัตกรรม" }
    ];

    return (
        <main className="flex-grow pt-32 pb-20 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Simplified Hero */}
                <header className="mb-24 text-center">
                    <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-4 block">
                        <Text en="Established Manufacturer" th="ผู้ผลิตและจัดจำหน่ายชั้นนำ" />
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                        <Text
                            en="Virtus Co., Ltd."
                            th="บริษัท เวอร์ทัส จำกัด"
                        />
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto italic">
                        <Text
                            en="A leading regional manufacturer and distributor of mechanical engineering parts and industrial machinery spares in Southeast Asia."
                            th="ผู้ผลิตและจัดจำหน่าย ชิ้นส่วนวิศวกรรมเครื่องกลและอะไหล่เครื่องจักรชั้นนำของภูมิภาคเอเชียตะวันออกเฉียงใต้"
                        />
                    </p>
                </header>

                {/* Company Expertise */}
                <section className="space-y-12 mb-32">
                    <div className="p-8 border-l-4 border-slate-900 bg-slate-50 rounded-r-2xl shadow-sm max-w-5xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Award className="w-6 h-6 text-brand-600" />
                            <Text en="Industry Leadership" th="ภาวะผู้นำในอุตสาหกรรม" />
                        </h2>
                        <p className="text-lg text-slate-700 leading-relaxed mb-6">
                            <Text
                                en="We maintain our industry leadership by creating genuine value for our customers. This is achieved through maintaining the most diverse and comprehensive inventory in the country, and indeed, within Southeast Asia."
                                th="บริษัทรักษาความเป็นผู้นำด้วยการสร้างมูลค่าเพิ่มอันเป็นประโยชน์อย่างแท้จริงต่อลูกค้า นั่นคือการสำรองสินค้าอย่างหลากหลายและครบถ้วนที่สุดในประเทศ และไม่เป็นรองใครใน ภูมิภาคเอเชียตะวันออกเฉียงใต้"
                            />
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="p-8 bg-white border border-slate-100 rounded-2xl">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Microscope className="w-5 h-5 text-brand-500" />
                                <Text en="Technical Excellence" th="ความเป็นเลิศทางเทคนิค" />
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                <Text
                                    en="Our support extends from basic academic principles to advanced engineering theories and practical field experience."
                                    th="การสนับสนุนทางเทคนิค ทั้งจากหลักเทคนิควิชาการ ไปจนถึงทฤษฎีวิศวกรรมขั้นสูง และจากประสบการณ์จริงจากภาคสนาม"
                                />
                            </p>
                        </div>
                        <div className="p-8 bg-white border border-slate-100 rounded-2xl">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5 text-brand-500" />
                                <Text en="Community Impact" th="ผลกระทบต่อสังคม" />
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                <Text
                                    en="We are regularly invited to lecture at leading technical universities and provide professional training to major engineering organizations."
                                    th="บริษัทได้รับเชิญเพื่อทำการบรรยายให้แก่นิสิตนักศึกษาทางเทคนิคและวิศวกรรม และให้การอบรมทางเทคนิค แก่ผู้ปฏิบัติงานจริงของหน่วยงานวิศวกรรมในองค์กรธุรกิจที่มีชื่อเสียง"
                                />
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Values - The Foundation */}
                <section className="max-w-5xl mx-auto">
                    <div className="mb-12 border-b border-slate-100 pb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            <Text en="Our Core Values" th="คุณค่าหลักองค์กร" />
                        </h2>
                        <p className="text-slate-500">
                            <Text
                                en="Our business is built upon a firm foundation of four core values:"
                                th="บริษัทดำเนินธุรกิจบนพื้นฐานความเชื่อมั่นอย่างมั่นคงต่อคุณค่า 4 ประการคือ"
                            />
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((v, i) => (
                            <ValueCard key={i} icon={v.icon} titleEn={v.titleEn} titleTh={v.titleTh} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};
