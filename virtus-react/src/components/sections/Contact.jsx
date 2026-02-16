import { MapPin, Phone, Printer, Mail, Clock } from 'lucide-react';
import { Text } from '../common/Text';

export const branches = [
    {
        id: 'office',
        enName: 'Dao Khanong (Head Office)',
        thName: 'สำนักงานดาวคะนอง (สำนักงานใหญ่)',
        addressEn: '120 Soi Somdet Phra Chao Tak Sin 44, Dao Khanong, Thon Buri, Bangkok 10600',
        addressTh: '120 ซอยสมเด็จพระเจ้าตากสิน 44 แขวงดาวคะนอง เขตธนบุรี กรุงเทพ 10600',
        phones: ['0 2876 2727', '0 2876 2828', '0 2468 0871'],
        fax: '0 2476 1711',
        email: 'welcome@virtus.co.th',
        highlight: true,
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.495034637402!2d100.4828113!3d13.7020817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299aa129e7e7d%3A0xc6657803e73afc90!2sVirtus%20Co.%2C%20Ltd.!5e0!3m2!1sen!2sth!4v1710570000000!5m2!1sen!2sth"
    },
    {
        id: 'khlong-thom',
        enName: 'Khlong Thom Branch',
        thName: 'สาขาคลองถม',
        addressEn: '378 Worachak Rd. (Opposite Khlong Thom Center), Ban Bat, Pom Prap Sattru Phai, Bangkok 10100',
        addressTh: '378 ถ.วรจักร (ตรงข้ามคลองถมเซ็นเตอร์) แขวงบ้านบาตร เขตป้อมปราบฯ กรุงเทพ 10100',
        phones: ['0 2621 2790', '0 2621 2791', '0 2621 2793'],
        fax: '0 2221 4390',
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.526462791168!2d100.5042296!3d13.7481816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29910601235b3%3A0xf639e3d99e7e0e0a!2zVmlydHVzIENvLiwgTHRkLiAoS2hsb25nIFRob20gQnJhbmNoKQ!5e0!3m2!1sen!2sth!4v1710570000000!5m2!1sen!2sth"
    },
    {
        id: 'phetkasem',
        enName: 'Phetkasem Branch',
        thName: 'สาขาเพชรเกษม',
        addressEn: '36/1, 2 Moo 7, Phetkasem Rd. Km.23.5, Om Noi, Krathum Baen, Samut Sakhon 74130',
        addressTh: '36/1,2 หมู่ 7 (ติดสถานีตำรวจทางหลวงศรีสำราญ) ถ.เพชรเกษม กม.23.5 ต.อ้อมน้อย อ.กระทุ่มแบน จ.สมุทรสาคร 74130',
        phones: ['0 2420 3494', '0 2420 3495', '0 2023 4697', '0 2023 4698'],
        fax: ['0 2420 3493', '0 2023 4699'],
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.541445781!2d100.32!3d13.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e295...!5e0!3m2!1sen!2sth!4v1710570000000!5m2!1sen!2sth"
    },
    {
        id: 'chonburi',
        enName: 'Chonburi Branch',
        thName: 'สาขาชลบุรี',
        addressEn: '15/11 Moo 1, Bypass Chonburi Rd. (Km.7), Nong Ri, Mueang Chon Buri, Chon Buri 20000',
        addressTh: '15/11 หมู่ที่ 1 ถ.เลี่ยงเมืองชลบุรี (กม.7) ต.หนองรี อ.เมืองชลบุรี จ.ชลบุรี 20000',
        phones: ['0 3814 8037', '0 3814 8038', '0 3814 8039'],
        fax: '0 3814 8036',
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.2!2d101.0!3d13.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310...!5e0!3m2!1sen!2sth!4v1710570000000!5m2!1sen!2sth"
    },
];

const ContactCard = ({ branch, isActive, onClick }) => (
    <div
        onClick={onClick}
        className={`p-8 rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${isActive ? 'bg-brand-50 border-brand-200' : 'bg-white border-slate-100'}`}
    >
        <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-xl ${isActive ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
                <Text en={branch.enName} th={branch.thName} />
            </h3>
        </div>

        <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">
            <Text en={branch.addressEn} th={branch.addressTh} />
        </p>

        <div className="space-y-4 pt-6 border-t border-slate-50">
            <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                    {branch.phones.map((phone, i) => (
                        <a key={i} href={`tel:${phone.replace(/\s/g, '')}`} className="text-slate-700 font-medium hover:text-brand-600 transition-colors">
                            {phone}
                        </a>
                    ))}
                </div>
            </div>

            {branch.fax && (
                <div className="flex items-start gap-3">
                    <Printer className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div className="text-slate-500 font-medium">
                        {Array.isArray(branch.fax) ? branch.fax.join(', ') : branch.fax}
                    </div>
                </div>
            )}

            {branch.email && (
                <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <a href={`mailto:${branch.email}`} className="text-slate-700 font-medium hover:text-brand-600 transition-colors break-all">
                        {branch.email}
                    </a>
                </div>
            )}
        </div>
    </div>
);

export const Contact = ({ activeBranchId, onBranchSelect }) => {
    return (
        <section id="contact" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mx-auto mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-bold mb-6 italic">
                        <Text en="Multiple Locations" th="เปิดให้บริการหลายสาขา" />
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 font-thai">
                        <Text en="Contact Us" th="ติดต่อเรา" />
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        <Text
                            en="Visit any of our regional branches or contact our specialists via phone or email for technical support and inquiries."
                            th="เยี่ยมชมสาขาหรือโทรสอบถามข้อมูลเพิ่มเติมเกี่ยวกับชิ้นส่วนวิศวกรรมและอะไหล่เครื่องจักร"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
                    {branches.map((branch) => (
                        <ContactCard
                            key={branch.id}
                            branch={branch}
                            isActive={activeBranchId === branch.id}
                            onClick={() => onBranchSelect?.(branch)}
                        />
                    ))}
                </div>

                <div className="mt-20 p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Clock className="w-6 h-6 text-brand-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 leading-tight">
                                <Text en="Opening Hours" th="เวลาทำการ" />
                            </h4>
                            <p className="text-sm text-slate-500">
                                <Text
                                    en="Mon-Sat: 8:30 - 17:30"
                                    th="จันทร์-เสาร์: 8:30 - 17:30 น."
                                />
                            </p>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-sm text-slate-500 mb-1">
                            <Text
                                en="*Dao Khanong Head Office closed on Saturdays"
                                th="*สาขาดาวคะนอง (สำนักงานใหญ่) หยุดวันเสาร์"
                            />
                        </p>
                        <p className="text-sm text-red-500 font-medium">
                            <Text
                                en="Closed on Sundays & Public Holidays"
                                th="หยุดวันอาทิตย์ และวันหยุดนักขัตฤกษ์"
                            />
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
