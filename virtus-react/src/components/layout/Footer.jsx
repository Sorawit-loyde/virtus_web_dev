import { Text } from '../common/Text';

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white">
                        <span className="font-bold">V</span>
                    </div>
                    <span className="font-bold text-xl text-white">VIRTUS</span>
                </div>
                <div className="text-sm">
                    &copy; {new Date().getFullYear()} VIRTUS Company Limited. All rights reserved.
                </div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">
                        <Text en="Privacy Policy" th="นโยบายความเป็นส่วนตัว" />
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        <Text en="Terms of Service" th="เงื่อนไขการให้บริการ" />
                    </a>
                </div>
            </div>
        </footer>
    );
};
