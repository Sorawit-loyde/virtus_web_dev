import { MapPin, Phone } from 'lucide-react';
import { Text } from '../common/Text';

const branches = [
    {
        enName: 'Dao Khanong',
        thName: 'ดาวคะนอง',
        enRole: 'Head Office',
        thRole: 'สำนักงานใหญ่',
        phone: '0 2876 2727',
        link: 'tel:028762727',
    },
    {
        enName: 'Khlong Thom',
        thName: 'คลองถม',
        enRole: 'Branch',
        thRole: 'สาขา',
        phone: '0 2621 2790-3',
        link: 'tel:026212790',
    },
    {
        enName: 'Phetkasem',
        thName: 'เพชรเกษม',
        enRole: 'Branch',
        thRole: 'สาขา',
        phone: '0 2420 3494-5',
        link: 'tel:024203494',
    },
    {
        enName: 'Chonburi',
        thName: 'ชลบุรี',
        enRole: 'Branch',
        thRole: 'สาขา',
        phone: '0 3814 8037-9',
        link: 'tel:038148037',
    },
];

export const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        <Text en="Contact Us" th="ติดต่อเรา" />
                    </h2>
                    <p className="text-slate-600 text-lg">
                        <Text
                            en="Visit one of our branches or call us for inquiry."
                            th="เยี่ยมชมสาขาของเราหรือโทรสอบถามข้อมูล"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {branches.map((branch, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-brand-600" />
                                <Text en={branch.enName} th={branch.thName} />
                            </h3>
                            <p className="text-slate-500 mb-4 text-sm">
                                <Text en={branch.enRole} th={branch.thRole} />
                            </p>
                            <a
                                href={branch.link}
                                className="flex items-center gap-2 text-slate-700 font-medium hover:text-brand-600 transition-colors"
                            >
                                <Phone className="w-4 h-4" /> {branch.phone}
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-sm">
                        <Text
                            en="Opening Hours: Mon-Sat 8:30-17:30 (Dao Khanong closed Sat) | Closed Sun & Public Holidays"
                            th="เวลาทำการ: จันทร์-เสาร์ 8:30-17:30 (สาขาดาวคะนอง หยุดวันเสาร์) | หยุดวันอาทิตย์ และวันหยุดนักขัตฤกษ์"
                        />
                    </p>
                </div>
            </div>
        </section>
    );
};
