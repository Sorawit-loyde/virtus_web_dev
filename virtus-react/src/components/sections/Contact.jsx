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
        className={`p-10 rounded-[2.5rem] border transition-all duration-700 cursor-pointer shadow-sm hover:shadow-2xl flex flex-col h-full transform hover:-translate-y-2 ${isActive ? 'bg-white border-brand-500 ring-4 ring-brand-50' : 'bg-white border-slate-100 hover:border-brand-200'}`}
    >
        <div className="flex-grow">
            <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-brand-600 text-white rotate-6 shadow-lg shadow-brand-200' : 'bg-slate-100 text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600'}`}>
                    <MapPin className="w-7 h-7" />
                </div>
                <h3 className={`text-xl font-black uppercase tracking-tight leading-tight ${isActive ? 'text-brand-600' : 'text-slate-900'}`}>
                    <Text en={branch.enName} th={branch.thName} />
                </h3>
            </div>

            <p className="text-slate-500 font-medium mb-8 text-sm md:text-base leading-relaxed">
                <Text en={branch.addressEn} th={branch.addressTh} />
            </p>
        </div>

        <div className="space-y-5 pt-8 border-t border-slate-50 mt-auto">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-600" />
                </div>
                <div className="flex flex-col gap-1">
                    {branch.phones.map((phone, i) => (
                        <a key={i} href={`tel:${phone.replace(/\s/g, '')}`} className="text-slate-900 font-black text-sm hover:text-brand-600 transition-colors">
                            {phone}
                        </a>
                    ))}
                </div>
            </div>

            {branch.fax && (
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                        <Printer className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="text-slate-500 font-bold text-sm pt-2">
                        {Array.isArray(branch.fax) ? branch.fax.join(', ') : branch.fax}
                    </div>
                </div>
            )}

            {branch.email && (
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-brand-600" />
                    </div>
                    <a href={`mailto:${branch.email}`} className="text-slate-900 font-black text-sm hover:text-brand-600 transition-colors break-all flex items-center h-10">
                        {branch.email}
                    </a>
                </div>
            )}
        </div>
    </div>
);

export const Contact = ({ activeBranchId, onBranchSelect }) => {
    return (
        <section id="contact" className="py-24 bg-transparent relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-5xl mx-auto mb-20">
                    <span className="text-brand-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Get In Touch</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">
                        <Text en="Our Locations" th="สาขาของเรา" />
                    </h2>
                    <div className="w-20 h-2 bg-brand-600 rounded-full mx-auto mb-8"></div>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        <Text
                            en="Visit any of our regional branches or contact our specialists for comprehensive technical support."
                            th="เยี่ยมชมสาขาหรือโทรสอบถามข้อมูลเพิ่มเติมเกี่ยวกับชิ้นส่วนวิศวกรรมและอะไหล่เครื่องจักร"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
                    {branches.map((branch) => (
                        <ContactCard
                            key={branch.id}
                            branch={branch}
                            isActive={activeBranchId === branch.id}
                            onClick={() => onBranchSelect?.(branch)}
                        />
                    ))}
                </div>

                <div className="mt-24 p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] bg-slate-900 border border-brand-500/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="flex items-center gap-6 sm:gap-8 relative z-10 w-full lg:w-auto">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-600 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                            <Mail className="w-8 h-8 sm:w-10 sm:h-10" />
                        </div>
                        <div>
                            <span className="text-brand-400 font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-2 block">Premium Support</span>
                            <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase tracking-tight">
                                <Text en="Request For Quotation" th="ขอใบเสนอราคา" />
                            </h4>
                            <p className="text-slate-400 font-medium text-sm sm:text-base">
                                <Text
                                    en="Contact our sales team for project-specific pricing and bulk orders."
                                    th="ติดต่อฝ่ายขายของเราเพื่อรับใบเสนอราคาพิเศษสำหรับโครงการและการสั่งซื้อจำนวนมาก"
                                />
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full lg:w-auto">
                        <a href="mailto:welcome@virtus.co.th" className="w-full sm:w-auto bg-white text-slate-900 px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black hover:bg-brand-500 hover:text-white transition-all text-center shadow-xl">
                            <Text en="SEND EMAIL" th="ส่งอีเมลขอราคา" />
                        </a>
                        <a href="tel:028762727" className="w-full sm:w-auto bg-brand-600/10 text-brand-400 border border-brand-500/30 px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black hover:bg-brand-600 hover:text-white transition-all text-center">
                            <Text en="CALL NOW" th="โทรสอบถาม" />
                        </a>
                    </div>
                </div>

                <div className="mt-12 p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] bg-white border border-slate-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                        <Clock className="w-40 h-40" />
                    </div>

                    <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-950 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center text-white shadow-2xl flex-shrink-0">
                            <Clock className="w-8 h-8 sm:w-10 sm:h-10" />
                        </div>
                        <div>
                            <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                                <Text en="Opening Hours" th="เวลาทำการ" />
                            </h4>
                            <p className="text-base sm:text-lg text-slate-400 font-medium">
                                <Text
                                    en="Mon-Sat: 08:30 - 17:30"
                                    th="จันทร์-เสาร์: 08:30 - 17:30 น."
                                />
                            </p>
                        </div>
                    </div>

                    <div className="text-center md:text-right relative z-10 w-full md:w-auto">
                        <p className="text-[10px] sm:text-sm text-slate-400 font-medium mb-2 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full inline-block">
                            <Text
                                en="*Dao Khanong closed on Saturdays"
                                th="*สาขาดาวคะนอง หยุดวันเสาร์"
                            />
                        </p>
                        <p className="text-base sm:text-lg text-red-500 font-black uppercase tracking-tight block">
                            <Text
                                en="Closed on Sundays & Holidays"
                                th="หยุดวันอาทิตย์ และวันหยุดนักขัตฤกษ์"
                            />
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
