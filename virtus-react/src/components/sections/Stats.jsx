import { Text } from '../common/Text';

export const Stats = () => {
    const stats = [
        { value: '25+', en: 'Years Experience', th: 'ปีแห่งประสบการณ์' },
        { value: '4', en: 'Major Branches', th: 'สาขาหลัก' },
        { value: '10k+', en: 'Products Sourced', th: 'รายการสินค้า' },
        { value: '100%', en: 'Genuine Parts', th: 'ของแท้ 100%' },
    ];

    return (
        <div className="bg-brand-900 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, idx) => (
                        <div key={idx}>
                            <div className="text-4xl lg:text-5xl font-extrabold mb-2 text-brand-400">{stat.value}</div>
                            <div className="text-brand-100">
                                <Text en={stat.en} th={stat.th} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
