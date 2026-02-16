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
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                            <img src="/assets/images/Logo-virtus.png" alt="VIRTUS" className="h-12 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-medium transition-colors ${isActive(link.path)
                                    ? 'text-brand-700 font-bold'
                                    : 'text-slate-600 hover:text-brand-600'
                                    }`}
                            >
                                <Text en={link.en} th={link.th} />
                            </Link>
                        ))}

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
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-brand-600 p-2 cursor-pointer"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block px-4 py-2 rounded transition-colors ${isActive(link.path)
                                    ? 'text-brand-700 font-bold bg-brand-50'
                                    : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                                    }`}
                            >
                                <Text en={link.en} th={link.th} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};
