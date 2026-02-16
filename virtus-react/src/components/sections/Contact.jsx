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
        embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d484.5444065476731!2d100.481032!3d13.696921!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299ea6a15c55b%3A0x345510168c40152c!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4p-C4reC4o-C5jOC4l-C4seC4qiDguIjguLPguIHguLHguJQgKOC4quC4s-C4meC4seC4geC4h-C4suC4meC4lOC4suC4p-C4hOC4sOC4meC4reC4hyk!5e0!3m2!1sen!2sus!4v1771234847931!5m2!1sen!2sus"
    },
    {
        id: 'khlong-thom',
        enName: 'Khlong Thom Branch',
        thName: 'สาขาคลองถม',
        addressEn: '378 Worachak Rd. (Opposite Khlong Thom Center), Ban Bat, Pom Prap Sattru Phai, Bangkok 10100',
        addressTh: '378 ถ.วรจักร (ตรงข้ามคลองถมเซ็นเตอร์) แขวงบ้านบาตร เขตป้อมปราบฯ กรุงเทพ 10100',
        phones: ['0 2621 2790', '0 2621 2791', '0 2621 2793'],
        fax: '0 2221 4390',
        embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d484.44132075699275!2d100.506297!3d13.746847!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2993d4e7717f9%3A0xbe046badd3b7d9b7!2z4Lia4LiI4LiBLiDguYDguKfguK3guKPguYzguJfguLHguKog4Liq4Liy4LiC4Liy4LiE4Lil4Lit4LiH4LiW4Lih!5e0!3m2!1sen!2sus!4v1771234875837!5m2!1sen!2sus"
    },
    {
        id: 'phetkasem',
        enName: 'Phetkasem Branch',
        thName: 'สาขาเพชรเกษม',
        addressEn: '36/1, 2 Moo 7, Phetkasem Rd. Km.23.5, Om Noi, Krathum Baen, Samut Sakhon 74130',
        addressTh: '36/1,2 หมู่ 7 (ติดสถานีตำรวจทางหลวงศรีสำราญ) ถ.เพชรเกษม กม.23.5 ต.อ้อมน้อย อ.กระทุ่มแบน จ.สมุทรสาคร 74130',
        phones: ['0 2420 3494', '0 2420 3495', '0 2023 4697', '0 2023 4698'],
        fax: ['0 2420 3493', '0 2023 4699'],
        embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31010.60565705853!2d100.32055391009521!3d13.698712733453805!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29583bbb9cd49%3A0x643bd5380f7e3ff0!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4p-C4reC4o-C5jOC4l-C4seC4qiDguIjguLPguIHguLHguJQg4Liq4Liy4LiC4Liy4LmA4Lie4LiK4Lij4LmA4LiB4Lip4Lih!5e0!3m2!1sen!2sus!4v1771234886133!5m2!1sen!2sus"
    },
    {
        id: 'chonburi',
        enName: 'Chonburi Branch',
        thName: 'สาขาชลบุรี',
        addressEn: '15/11 Moo 1, Bypass Chonburi Rd. (Km.7), Nong Ri, Mueang Chon Buri, Chon Buri 20000',
        addressTh: '15/11 หมู่ที่ 1 ถ.เลี่ยงเมืองชลบุรี (กม.7) ต.หนองรี อ.เมืองชลบุรี จ.ชลบุรี 20000',
        phones: ['0 3814 8037', '0 3814 8038', '0 3814 8039'],
        fax: '0 3814 8036',
        embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1940.8917897679157!2d101.017775!3d13.363729!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d35b11c6b6ca3%3A0x2aa23e2e72f63f83!2sVirtus!5e0!3m2!1sen!2sus!4v1771234905676!5m2!1sen!2sus"
    },
];

const ContactCard = ({ branch, isActive, onClick }) => (
    <div
        onClick={onClick}
        className={`p-8 rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col h-full ${isActive ? 'bg-brand-50 border-brand-200' : 'bg-white border-slate-100'}`}
    >
        <div className="flex-grow">
            <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${isActive ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                    <Text en={branch.enName} th={branch.thName} />
                </h3>
            </div>

            <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed min-h-[4rem]">
                <Text en={branch.addressEn} th={branch.addressTh} />
            </p>
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-50 mt-auto">
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
