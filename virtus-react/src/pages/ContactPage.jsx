import { useState } from 'react';
import { Contact, branches } from '../components/sections/Contact';
import { Text } from '../components/common/Text';

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
                                    <Text en={selectedBranch.enName} th={selectedBranch.thName} />
                                </h3>
                                <p className="text-slate-500">
                                    <Text en={selectedBranch.addressEn} th={selectedBranch.addressTh} />
                                </p>
                            </div>

                        </div>

                        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-200 shadow-inner border border-slate-200">
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
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
