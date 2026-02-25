import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Text } from '../common/Text';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { toggleLanguage, lang } = useLanguage();
    const location = useLocation();

    // Close mobile menu on navigation
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', en: 'Home', th: 'หน้าแรก' },
        { path: '/products', en: 'Product', th: 'สินค้า' },
        { path: '/catalogues', en: 'Catalogue', th: 'แคตตาล็อก' },
        { path: '/about', en: 'About Us', th: 'เกี่ยวกับเรา' },
        { path: '/join', en: 'Join Us', th: 'ร่วมงานกับเรา' },
        { path: '/contact', en: 'Contact Us', th: 'ติดต่อเรา' },
    ];

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <img src="/assets/images/Logo-virtus.png" alt="VIRTUS" className="h-14 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-[13px] uppercase tracking-[0.15em] transition-all duration-300 ${isActive(link.path)
                                    ? 'text-brand-600 font-black'
                                    : 'text-slate-500 hover:text-brand-500 font-bold'
                                    }`}
                            >
                                <Text en={link.en} th={link.th} />
                            </Link>
                        ))}

                        {/* Language Toggle */}
                        <div className="pl-6 border-l border-slate-100">
                            <button
                                onClick={toggleLanguage}
                                className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-brand-600 transition-all cursor-pointer shadow-lg shadow-slate-200"
                            >
                                <Globe className={`w-4 h-4 transition-transform duration-500 ${lang === 'en' ? 'rotate-180' : 'rotate-0'}`} />
                                <span className="text-xs font-black tracking-widest">{lang === 'en' ? 'TH' : 'EN'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-6">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-black text-xs transition-all cursor-pointer shadow-md"
                        >
                            <span>{lang === 'en' ? 'TH' : 'EN'}</span>
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-900 p-2 cursor-pointer"
                        >
                            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0 pb-0'}`}>
                    <div className="space-y-2 pt-4 border-t border-slate-50">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block px-5 py-4 rounded-2xl transition-all duration-300 ${isActive(link.path)
                                    ? 'text-brand-700 font-black bg-brand-50 translate-x-2'
                                    : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50 font-bold'
                                    }`}
                            >
                                <Text en={link.en} th={link.th} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};
