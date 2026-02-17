import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Contact, branches } from '../components/sections/Contact';
import { Text } from '../components/common/Text';

export const ContactPage = () => {
    const [selectedBranch, setSelectedBranch] = useState(branches[0]);

    return (
        <main className="flex-grow pt-20 bg-slate-50 min-h-screen pb-32">
            {/* Dark Premium Hero Section */}
            <section className="bg-slate-900 py-32 text-white relative overflow-hidden mb-24">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-full h-full bg-brand-600/10 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] opacity-30" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
                    <span className="text-brand-400 font-black uppercase tracking-[0.2em] text-sm mb-6 block">
                        <Text en="Regional Support Network" th="เครือข่ายสนับสนุนระดับภูมิภาค" />
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-10 tracking-tighter leading-[1.1]">
                        <Text
                            en="Connect With Us"
                            th="ติดต่อ เวอร์ทัส"
                        />
                    </h1>
                    <p className="text-slate-400 text-xl md:text-2xl max-w-3xl leading-relaxed mx-auto md:mx-0 font-medium italic border-l-4 border-brand-500 pl-8">
                        <Text
                            en="Expert engineering support and technical component availability across four strategic locations."
                            th="การสนับสนุนทางวิศวกรรมโดยผู้เชี่ยวชาญ และความพร้อมของคุณภาพชิ้นส่วนใน 4 สถานที่เชิงกลยุทธ์"
                        />
                    </p>
                </div>
            </section>

            <Contact
                activeBranchId={selectedBranch.id}
                onBranchSelect={(branch) => setSelectedBranch(branch)}
            />

            {/* Interactive Map Section */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[3rem] p-12 lg:p-20 border border-slate-100 shadow-xl overflow-hidden relative">
                        {/* Decorative background for map section */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
                                <div className="max-w-2xl">
                                    <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                                        <Text en="Selected Location" th="สถานที่ที่เลือก" />
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">
                                        <Text en={selectedBranch.enName} th={selectedBranch.thName} />
                                    </h3>
                                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                                        <Text en={selectedBranch.addressEn} th={selectedBranch.addressTh} />
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                                        <MapPin className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>

                            <div className="aspect-video w-full rounded-[1.5rem] overflow-hidden bg-white shadow-2xl border border-slate-100">
                                <iframe
                                    key={selectedBranch.id}
                                    src={selectedBranch.embedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`Map location for ${selectedBranch.enName}`}
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
