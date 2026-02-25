import { Link } from 'react-router-dom';
import { Text } from '../components/common/Text';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
    return (
        <main className="flex-grow pt-20 bg-slate-50 min-h-screen flex items-center justify-center pb-32">
            <div className="max-w-2xl mx-auto px-4 text-center">
                <div className="mb-8">
                    <span className="text-[10rem] md:text-[14rem] font-black text-slate-100 leading-none select-none block">
                        404
                    </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase -mt-16 relative z-10">
                    <Text en="Page Not Found" th="ไม่พบหน้าที่ค้นหา" />
                </h1>
                <p className="text-slate-500 text-lg mb-12 font-medium max-w-md mx-auto leading-relaxed">
                    <Text
                        en="The page you're looking for doesn't exist or has been moved."
                        th="หน้าที่คุณค้นหาไม่มีอยู่หรือถูกย้ายไปแล้ว"
                    />
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-brand-600 transition-all shadow-xl hover:shadow-brand-500/20 group"
                    >
                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <Text en="Back to Home" th="กลับหน้าหลัก" />
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-3 bg-white text-slate-700 px-8 py-4 rounded-2xl font-bold border border-slate-200 hover:border-brand-300 hover:text-brand-600 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <Text en="Go Back" th="ย้อนกลับ" />
                    </button>
                </div>
            </div>
        </main>
    );
};
