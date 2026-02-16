import { useState } from 'react';
import { Contact, branches } from '../components/sections/Contact';

export const ContactPage = () => {
    const [selectedBranch, setSelectedBranch] = useState(branches[0]);

    return (
        <main className="flex-grow pt-20">
            <Contact
                activeBranchId={selectedBranch.id}
                onBranchSelect={(branch) => setSelectedBranch(branch)}
            />

            {/* Interactive Map Section */}
            <section className="pb-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-50 rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                    {selectedBranch.enName}
                                </h3>
                                <p className="text-slate-500">
                                    {selectedBranch.addressEn}
                                </p>
                            </div>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedBranch.enName + ' ' + selectedBranch.addressEn)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-brand-600 px-6 py-2.5 rounded-xl font-bold border border-brand-100 hover:bg-brand-50 transition-all shadow-sm flex items-center gap-2"
                            >
                                Open in Google Maps
                            </a>
                        </div>

                        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-200 shadow-inner border border-slate-200">
                            <iframe
                                src={selectedBranch.embedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Map location for ${selectedBranch.enName}`}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
