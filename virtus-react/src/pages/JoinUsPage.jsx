import { Text } from '../components/common/Text';
import { Users, Briefcase, GraduationCap, Heart, CheckCircle2, Star, Sparkles, Target, Zap } from 'lucide-react';

export const JoinUsPage = () => {
    return (
        <main className="flex-grow pt-20 bg-slate-50 min-h-screen pb-32">
            {/* Dark Premium Hero Section */}
            <section className="bg-slate-900 py-32 text-white relative overflow-hidden mb-24">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-full h-full bg-brand-600/10 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] opacity-30" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
                    <span className="text-brand-400 font-black uppercase tracking-[0.2em] text-sm mb-6 block">
                        <Text en="Believe in Human Potential" th="เชื่อมั่นในศักยภาพของมนุษย์" />
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-10 tracking-tighter leading-[1.1]">
                        <Text
                            en="Career at Virtus"
                            th="ร่วมงานกับ เวอร์ทัส"
                        />
                    </h1>
                    <p className="text-slate-400 text-xl md:text-2xl max-w-3xl leading-relaxed mx-auto md:mx-0 font-medium italic border-l-4 border-brand-500 pl-8">
                        <Text
                            en="Humans are our most critical resource. We foster an environment that rewards integrity, technical prowess, and growth."
                            th="บริษัทมีความเชื่อมั่นในศักยภาพของมนุษย์อันเป็นทรัพยากรที่สำคัญที่สุด จึงจัดให้มีบรรยากาศการทำงานที่เหมาะสม สะดวกสบาย และท้าทายความสามารถ"
                        />
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Culture & Systems Section */}
                <section className="mb-40">
                    <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-sm border border-slate-100 relative overflow-hidden mb-12">
                        <div className="relative z-10 max-w-4xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-brand-600 rounded-2xl text-white shadow-xl shadow-brand-500/20">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                                    <Text en="Professional Environment" th="สภาพแวดล้อมการทำงาน" />
                                </h2>
                            </div>
                            <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                <Text
                                    en="Our systems aim for simplicity and transparency. You can focus on creating value by using our efficient tools to assure accuracy, speed, and effectiveness in every task."
                                    th="มีระบบการปฎิบัติงานและตรวจสอบที่สุจริต เปิดเผยเรียบง่าย ไม่สลับซับซ้อน พร้อมเครื่องมืออุปกรณ์ที่มีประสิทธิภาพ เอื้อให้พนักงานปฎิบัติงานได้อย่างถูกต้องแม่นยำ รวดเร็ว และมีประสิทธิผล"
                                />
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        <div className="p-12 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
                            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-600 group-hover:text-white transition-all">
                                <Target className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                                <Text en="Merit-Based Rewards" th="การประเมินผลตามเนื้องาน" />
                            </h3>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                <Text
                                    en="Reasonable compensation under a performance appraisal system based on knowledge, capability, and value added to the company."
                                    th="มีผลตอบแทนที่สมเหตุสมผล ภายใต้ระบบประเมินผลงานตามคุณงามความดี ความรู้ความสามารถ และมูลค่าเพิ่มของผลงาน"
                                />
                            </p>
                        </div>
                        <div className="p-12 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
                            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-600 group-hover:text-white transition-all">
                                <GraduationCap className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                                <Text en="Lifelong Learning" th="การส่งเสริมการเรียนรู้" />
                            </h3>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                <Text
                                    en="We support employees to continuously enhance their skills to be ready for higher responsibilities and personal professional growth."
                                    th="บริษัทส่งเสริมให้พนักงานศึกษาหาความรู้เพิ่มพูนความสามารถตนเองตลอดเวลา เพื่อพร้อมต่อความรับผิดชอบที่สูงขึ้น"
                                />
                            </p>
                        </div>
                    </div>
                </section>

                {/* Inclusion Policy Section */}
                <section className="bg-slate-900 text-white rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden max-w-7xl mx-auto shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-transparent" />
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <div className="inline-block p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-8">
                            <Sparkles className="w-10 h-10 text-brand-400" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-10 tracking-tight uppercase px-4">
                            <Text en="Opportunity for Everyone" th="โอกาสสำหรับทุกคน" />
                        </h2>
                        <div className="space-y-10 text-xl text-brand-100 leading-relaxed font-medium">
                            <p className="px-4">
                                <Text
                                    en="We provide opportunities for advancement regardless of race, religion, experience, or even educational background. Your growth is defined by your contribution."
                                    th="บริษัทมีความยินดียิ่งที่จะได้ร่วมงานกับท่าน และให้โอกาสความเจริญก้าวหน้าแก่ท่านโดยไม่คำนึงถึงเชื้อชาติ ศาสนา ประสบการณ์ ผลการศึกษาหรือแม้แต่ววุฒิการศึกษาของท่าน"
                                />
                            </p>
                            <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-8 opacity-80">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-brand-400" />
                                    <span className="text-sm font-bold uppercase tracking-widest"><Text en="Integrity" th="ความซื่อสัตย์" /></span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-brand-400" />
                                    <span className="text-sm font-bold uppercase tracking-widest"><Text en="Diligence" th="ความเพียร" /></span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-brand-400" />
                                    <span className="text-sm font-bold uppercase tracking-widest"><Text en="Discipline" th="วินัย" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

