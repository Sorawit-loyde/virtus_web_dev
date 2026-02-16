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


        </main>
    );
};
