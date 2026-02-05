import { Text } from '../components/common/Text';

export const ContentPage = ({ titleEn, titleTh }) => {
    return (
        <main className="flex-grow pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-bold text-brand-900 mb-4">
                    <Text en={titleEn} th={titleTh} />
                </h1>
                <p className="text-slate-500">
                    <Text en="This page is currently under construction." th="หน้านี้กำลังอยู่ระหว่างการปรับปรุง" />
                </p>
            </div>
        </main>
    );
};
