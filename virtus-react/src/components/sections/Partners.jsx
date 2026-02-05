import { Text } from '../common/Text';
import { ShieldCheck, Star } from 'lucide-react';

export const Partners = () => {
    return (
        <section id="partners" className="py-32 bg-[#fafcfe] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0c4a6e_1px,transparent_1px)] [background-size:40px_40px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-sm font-bold uppercase tracking-widest mb-6 border border-brand-100">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <Text en="Track Record of Excellence" th="ผลงานแห่งความภาคภูมิใจ" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        <Text
                            en="Trusted by Industry Leaders"
                            th="ได้รับความไว้วางใจจากผู้นำอุตสาหกรรม"
                        />
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                        <Text
                            en="We collaborate with world-class manufacturers to provide the highest quality components to thousands of businesses across Thailand."
                            th="เราทำงานร่วมกับผู้ผลิตระดับโลกเพื่อส่งมอบชิ้นส่วนคุณภาพสูงสุดให้กับธุรกิจมากมายทั่วประเทศไทย"
                        />
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Valued Customers Card */}
                    <div className="group">
                        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
                            <h3 className="text-2xl font-bold text-slate-800">
                                <Text en="Our Valued Customers" th="กลุ่มลูกค้าที่ไว้วางใจเรา" />
                            </h3>
                            <div className="text-brand-600 font-bold text-sm tracking-widest uppercase border border-brand-100 bg-brand-50/50 px-3 py-1 rounded-lg">
                                <Text en="Domestic" th="ภายในประเทศ" />
                            </div>
                        </div>
                        <div className="relative aspect-[16/7] overflow-hidden rounded-3xl bg-white border border-slate-200 hover:border-brand-300 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-brand-900/10 hover:-translate-y-2">
                            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                                <img
                                    src="/assets/customer_&_partner/Customer.jpg"
                                    alt="Our Valued Customers"
                                    className="max-w-full max-h-full w-auto h-auto object-contain transition-all duration-700"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Global Partners Card */}
                    <div className="group">
                        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
                            <h3 className="text-2xl font-bold text-slate-800">
                                <Text en="Authorized Brands & Partners" th="แบรนด์และพันธมิตรระดับโลก" />
                            </h3>
                            <div className="text-brand-600 font-bold text-sm tracking-widest uppercase border border-brand-100 bg-brand-50/50 px-3 py-1 rounded-lg">
                                <Text en="International" th="ต่างประเทศ" />
                            </div>
                        </div>
                        <div className="relative aspect-[16/7] overflow-hidden rounded-3xl bg-white border border-slate-200 hover:border-brand-300 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-brand-900/10 hover:-translate-y-2">
                            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                                <img
                                    src="/assets/customer_&_partner/PartnersWithTools2025-1.gif"
                                    alt="Global Partners and Brands"
                                    className="max-w-full max-h-full w-auto h-auto object-contain transition-all duration-700"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>

                {/* Footer Quote */}
                <div className="mt-24 flex flex-col items-center">
                    <div className="w-16 h-1.5 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full mb-8 shadow-sm shadow-brand-500/20"></div>
                    <div className="flex items-center gap-3 text-brand-800 font-bold text-lg md:text-xl">
                        <div className="p-2 rounded-lg bg-brand-50 border border-brand-100">
                            <ShieldCheck className="w-6 h-6 text-brand-600" />
                        </div>
                        <Text
                            en="Quality Guaranteed by VIRTUS Standards."
                            th="รับประกันคุณภาพตามมาตรฐานระดับ VIRTUS"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
