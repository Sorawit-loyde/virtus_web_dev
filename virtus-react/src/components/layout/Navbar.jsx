import { Link } from 'react-router-dom';
import { Globe, Menu, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Text } from '../common/Text';

export const Navbar = () => {
    const { toggleLanguage, lang } = useLanguage();

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                            <img src="/assets/images/Logo-virtus.png" alt="VIRTUS" className="h-12 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-brand-700 font-bold transition-colors">
                            <Text en="Home" th="หน้าแรก" />
                        </Link>
                        <Link to="/products" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">
                            <Text en="Product" th="สินค้า" />
                        </Link>
                        <Link to="/about" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">
                            <Text en="About Us" th="เกี่ยวกับเรา" />
                        </Link>
                        <Link to="/join" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">
                            <Text en="Join Us" th="ร่วมงานกับเรา" />
                        </Link>
                        <Link to="/contact" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">
                            <Text en="Contact Us" th="ติดต่อเรา" />
                        </Link>

                        {/* Language Toggle */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-1 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm transition-colors cursor-pointer"
                            >
                                <Globe className="w-4 h-4" />
                                <span>{lang === 'en' ? 'TH' : 'EN'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm transition-colors cursor-pointer"
                        >
                            <span>{lang === 'en' ? 'TH' : 'EN'}</span>
                        </button>
                        <button className="text-slate-600 hover:text-brand-600 p-2 cursor-pointer">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
