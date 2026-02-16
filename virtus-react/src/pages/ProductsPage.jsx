import { Products } from '../components/sections/Products';
import { Text } from '../components/common/Text';

export const ProductsPage = () => {
    return (
        <main className="flex-grow pt-20">
            <section className="bg-brand-900 py-20 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">
                        <Text en="Our Products" th="สินค้าของเรา" />
                    </h1>
                    <p className="text-brand-100 text-lg max-w-2xl">
                        <Text
                            en="Comprehensive range of industrial components and machinery spare parts from world-leading manufacturers."
                            th="ชิ้นส่วนวิศวกรรมเครื่องกลและอะไหล่เครื่องจักรที่ครบวงจรจากผู้ผลิตชั้นนำระดับโลก"
                        />
                    </p>
                </div>
            </section>

            <Products />

            {/* Optional: Add a call to action or technical support section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-900 mb-4">
                    <h2 className="text-3xl font-bold mb-8">
                        <Text en="Looking for specific parts?" th="กำลังมองหาชิ้นส่วนเฉพาะทางอยู่ใช่ไหม?" />
                    </h2>
                    <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                        <Text
                            en="We stock thousands of items. If you can't find what you're looking for, our technical team is ready to assist you."
                            th="เรามีสินค้าสำรองนับพันรายการ หากคุณไม่พบสิ่งที่ต้องการ ทีมงานเทคนิคของเราพร้อมให้การช่วยเหลือ"
                        />
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-brand-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-700 transition-colors"
                    >
                        <Text en="Contact Our Experts" th="ติดต่อผู้เชี่ยวชาญของเรา" />
                    </a>
                </div>
            </section>
        </main>
    );
};
