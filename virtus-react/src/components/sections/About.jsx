import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Text } from '../common/Text';

export const About = () => {
    return (
        <section id="about" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-block bg-brand-50 text-brand-700 px-4 py-2 rounded-full font-bold text-sm mb-6">
                            <Text en="Since 1997" th="ก่อตั้งเมื่อ 1997" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                            <Text
                                en="Deep Technical Understanding & Professional Service"
                                th="ความรู้ทางเทคนิคเชิงลึกและบริการระดับมืออาชีพ"
                            />
                        </h2>
                        <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                            <Text
                                en="Operating with a professional team with deep technical knowledge."
                                th="ดำเนินธุรกิจด้วยทีมงานมืออาชีพที่ศึกษาและมีความรู้ความเข้าใจทางเทคนิคอย่างลึกซึ้ง"
                            />
                        </p>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                            <Text
                                en="VIRTUS has established itself as a reliable partner for industrial sectors across Thailand and Southeast Asia. We don't just sell parts; we understand the engineering behind them."
                                th="VIRTUS ได้สร้างชื่อเสียงในฐานะพันธมิตรที่เชื่อถือได้สำหรับภาคอุตสาหกรรมทั่วไทยและเอเชียตะวันออกเฉียงใต้ เราไม่ได้แค่ขายชิ้นส่วน แต่เราเข้าใจวิศวกรรมเบื้องหลัง"
                            />
                        </p>

                        <ul className="space-y-4">
                            {[
                                { en: 'Genuine Parts Guarantee', th: 'รับประกันอะไหล่แท้' },
                                { en: 'Large Inventory in Bangkok', th: 'คลังสินค้าขนาดใหญ่ในกรุงเทพฯ' },
                                { en: 'Expert Technical Support', th: 'การสนับสนุนทางเทคนิคจากผู้เชี่ยวชาญ' },
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-brand-600" />
                                    <span className="text-slate-700 font-medium">
                                        <Text en={item.en} th={item.th} />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-brand-100 rounded-2xl transform rotate-3" />
                        <img
                            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000"
                            alt="Engineers meeting"
                            className="relative rounded-2xl shadow-2xl w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
