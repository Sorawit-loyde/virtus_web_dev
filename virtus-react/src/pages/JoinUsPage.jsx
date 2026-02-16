import { Text } from '../components/common/Text';
import { Users, Briefcase, GraduationCap, Heart, CheckCircle2, Star, Sparkles, Target, Zap } from 'lucide-react';

export const JoinUsPage = () => {
    return (
        <main className="flex-grow pt-32 pb-20 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Simplified Hero */}
                <header className="text-center mb-24">
                    <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-4 block">
                        <Text en="Believe in Human Potential" th="เชื่อมั่นในศักยภาพของมนุษย์" />
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                        <Text
                            en="Career at Virtus"
                            th="ร่วมงานกับเวอร์ทัส"
                        />
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed italic">
                        <Text
                            en="We believe that humans are our most important resource. We provide an environment that fosters growth and reward integrity."
                            th="บริษัทมีความเชื่อมั่นในศักยภาพของมนุษย์อันเป็นทรัพยากรที่สำคัญที่สุด จึงจัดให้มีบรรยากาศการทำงานที่เหมาะสม สะดวกสบาย และท้าทายความสามารถ"
                        />
                    </p>
                </header>

                {/* Culture & Systems Section */}
                <section className="mb-32 space-y-12 max-w-5xl mx-auto">
                    <div className="p-8 border-l-4 border-brand-500 bg-slate-50 rounded-r-2xl">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Zap className="w-6 h-6 text-brand-600" />
                            <Text en="Our Professional Environment" th="สภาพแวดล้อมการทำงาน" />
                        </h2>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            <Text
                                en="Our systems are designed for transparency and simplicity. We provide efficient tools to ensure accuracy, speed, and effectiveness in every task."
                                th="มีระบบการปฎิบัติงานและตรวจสอบที่สุจริต เปิดเผยเรียบง่าย ไม่สลับซับซ้อน พร้อมเครื่องมืออุปกรณ์ที่มีประสิทธิภาพ เอื้อให้พนักงานปฎิบัติงานได้อย่างถูกต้องแม่นยำ รวดเร็ว และมีประสิทธิผล"
                            />
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Target className="w-5 h-5 text-brand-600" />
                                <Text en="Merit-Based Rewards" th="การประเมินผลตามเนื้องาน" />
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                <Text
                                    en="Reasonable compensation under a performance appraisal system based on knowledge, and value added."
                                    th="มีผลตอบแทนที่สมเหตุสมผล ภายใต้ระบบประเมินผลงานตามคุณงามความดี ความรู้ความสามารถ และมูลค่าเพิ่มของผลงาน"
                                />
                            </p>
                        </div>
                        <div className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-brand-600" />
                                <Text en="Lifelong Learning" th="การส่งเสริมการเรียนรู้" />
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                <Text
                                    en="We support employees to continuously enhance their skills to be ready for higher responsibilities."
                                    th="บริษัทส่งเสริมให้พนักงานศึกษาหาความรู้เพิ่มพูนความสามารถตนเองตลอดเวลา เพื่อพร้อมต่อความรับผิดชอบที่สูงขึ้น"
                                />
                            </p>
                        </div>
                    </div>
                </section>

                {/* Inclusion Policy Section */}
                <section className="bg-slate-900 text-white rounded-[2rem] p-12 text-center mb-32 relative overflow-hidden max-w-5xl mx-auto">
                    <div className="relative z-10">
                        <div className="inline-block p-3 bg-brand-500/20 rounded-xl mb-6">
                            <Sparkles className="w-8 h-8 text-brand-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-8">
                            <Text en="Opportunity for Everyone" th="โอกาสสำหรับทุกคน" />
                        </h2>
                        <div className="space-y-6 text-lg text-brand-100 leading-relaxed">
                            <p>
                                <Text
                                    en="We provide opportunities for advancement regardless of race, religion, experience, or even educational background."
                                    th="บริษัทมีความยินดียิ่งที่จะได้ร่วมงานกับท่าน และให้โอกาสความเจริญก้าวหน้าแก่ท่านโดยไม่คำนึงถึงเชื้อชาติ ศาสนา ประสบการณ์ ผลการศึกษาหรือแม้แต่วุฒิการศึกษาของท่าน"
                                />
                            </p>
                            <p className="text-sm border-t border-brand-800 pt-6 italic opacity-70">
                                <Text
                                    en="Requires integrity, diligence, self-discipline, and a love for learning."
                                    th="ขอเพียงท่านเป็นผู้ที่มีความซื่อสัตย์สุจริต วิริยอุตสาหะ มีวินัยต่อตนเองและหน้าที่ และรักการเรียนรู้"
                                />
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
};
