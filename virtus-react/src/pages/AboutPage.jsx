import { Text } from '../components/common/Text';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Zap, Factory, Rocket, Award, Users, Warehouse, Microscope } from 'lucide-react';

const ValueCard = ({ icon: Icon, titleEn, titleTh }) => (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 group transform hover:-translate-y-2">
        <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-brand-500/5">
            <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors uppercase tracking-tight leading-tight">
            <Text en={titleEn} th={titleTh} />
        </h3>
    </div>
);

export const AboutPage = () => {
    const { lang } = useLanguage();

    const values = [
        { icon: Shield, titleEn: "Integrity", titleTh: "ความซื่อสัตย์สุจริต" },
        { icon: Zap, titleEn: "Simplicity but Effective", titleTh: "ความเรียบง่ายแต่มีประสิทธิผล" },
        { icon: Factory, titleEn: "Creator and Producer", titleTh: <>ความเป็นผู้สร้าง<br />เป็นผู้ผลิต</> },
        { icon: Rocket, titleEn: "Progress, Leadership, and Innovation", titleTh: <>ความก้าวหน้า<br />ความเป็นผู้นำ และนวัตกรรม</> }
    ];

    return (
        <main className="flex-grow pt-20 bg-slate-50 min-h-screen pb-32">
            {/* Dark Premium Hero Section */}
            <section className="bg-slate-900 py-32 text-white relative overflow-hidden mb-24">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-full h-full bg-brand-600/10 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] opacity-30" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
                    <span className="text-brand-400 font-black uppercase tracking-[0.2em] text-sm mb-6 block">
                        <Text en="Engineered for Excellence" th="ออกแบบมาเพื่อความเป็นเลิศ" />
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-10 tracking-tighter leading-[1.1]">
                        <Text
                            en="About Virtus"
                            th="เกี่ยวกับ เวอร์ทัส"
                        />
                    </h1>
                    <p className="text-slate-400 text-xl md:text-2xl max-w-3xl leading-relaxed mx-auto md:mx-0 font-medium italic border-l-4 border-brand-500 pl-8">
                        <Text
                            en="A leading regional manufacturer and distributor of mechanical engineering parts and industrial machinery spares."
                            th="ผู้ผลิตและจัดจำหน่าย ชิ้นส่วนวิศวกรรมเครื่องกลและอะไหล่เครื่องจักรชั้นนำของภูมิภาคเอเชียตะวันออกเฉียงใต้"
                        />
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Company Expertise */}
                <section className="mb-40">
                    <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-sm border border-slate-100 relative overflow-hidden mb-12">

                        <div className="relative z-10 max-w-4xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-slate-950 rounded-2xl text-white">
                                    <Award className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                                    <Text en="Industry Leadership" th="ภาวะผู้นำในอุตสาหกรรม" />
                                </h2>
                            </div>
                            <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                <Text
                                    en="We lead the industry by providing real value to customers. This is done by keeping the most diverse and complete inventory in the country and Southeast Asia."
                                    th="บริษัทรักษาความเป็นผู้นำด้วยการสร้างมูลค่าเพิ่มอันเป็นประโยชน์อย่างแท้จริงต่อลูกค้า นั่นคือการสำรองสินค้าอย่างหลากหลายและครบถ้วนที่สุดในประเทศ และไม่เป็นรองใครในภูมิภาคเอเชียตะวันออกเฉียงใต้"
                                />
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        <div className="p-12 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
                            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-600 group-hover:text-white transition-all">
                                <Microscope className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                                <Text en="Technical Excellence" th="ความเป็นเลิศทางเทคนิค" />
                            </h3>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                <Text
                                    en="Our support extends from basic academic principles to advanced engineering theories and practical field experience."
                                    th="การสนับสนุนทางเทคนิค ทั้งจากหลักเทคนิควิชาการ ไปจนถึงทฤษฎีวิศวกรรมขั้นสูง และจากประสบการณ์จริงจากภาคสนาม"
                                />
                            </p>
                        </div>
                        <div className="p-12 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
                            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-600 group-hover:text-white transition-all">
                                <Users className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                                <Text en="Community Impact" th="ผลกระทบต่อสังคม" />
                            </h3>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                <Text
                                    en="We are regularly invited to lecture at leading technical universities and provide professional training to major engineering organizations."
                                    th="บริษัทได้รับเชิญเพื่อทำการบรรยายให้แก่นิสิตนักศึกษาทางเทคนิคและวิศวกรรม และให้การอบรมทางเทคนิค แก่ผู้ปฏิบัติงานจริงขององค์กร"
                                />
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Values - The Foundation */}
                <section className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center md:text-left">
                        <span className="text-brand-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Our DNA</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">
                            <Text en="Our Core Values" th="คุณค่าหลักองค์กร" />
                        </h2>
                        <div className="w-20 h-2 bg-brand-600 rounded-full mb-8"></div>
                        <p className="text-slate-500 text-lg font-medium">
                            <Text
                                en="Our business is built upon a firm foundation of four core values that define who we are."
                                th="บริษัทดำเนินธุรกิจบนพื้นฐานความเชื่อมั่นอย่างมั่นคงต่อคุณค่า 4 ประการ"
                            />
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <ValueCard key={i} icon={v.icon} titleEn={v.titleEn} titleTh={v.titleTh} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

