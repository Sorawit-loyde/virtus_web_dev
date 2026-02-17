import { Link } from 'react-router-dom';
import { Facebook } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 pt-12 pb-8 border-t border-slate-800 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 via-blue-600 to-brand-400" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    {/* Column 1: Brand & Copyright */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <img src="/assets/images/Logo-virtus.png" alt="VIRTUS" className="h-12 w-auto object-contain brightness-0 invert" />
                        </div>
                        <p className="text-sm leading-relaxed text-slate-500 font-medium">
                            Premium manufacturer and distributor of mechanical engineering parts and industrial machinery spares since 2018.
                        </p>
                        <div className="pt-8 mt-auto text-xs text-slate-600 font-bold uppercase tracking-widest border-t border-slate-800">
                            &copy; 2024 VIRTUS CO., LTD.<br />
                            ALL RIGHTS RESERVED
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4">Explore</h4>
                        <ul className="grid grid-cols-1 gap-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Products', path: '/products' },
                                { name: 'Catalogue', path: '/catalogues' },
                                { name: 'Join Us', path: '/join' },
                                { name: 'Contact Us', path: '/contact' }
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-slate-500 hover:text-white transition-all duration-300 font-black text-xs uppercase tracking-widest flex items-center gap-3 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-brand-500 group-hover:scale-125 transition-all"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact & Branches */}
                    <div className="flex flex-col gap-6 text-sm">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4 text-center sm:text-left">Our Network</h4>
                        <div className="space-y-6">
                            {[
                                { name: 'Dao Khanong Office', tel: '0 2876 2727' },
                                { name: 'Khlong Thom Branch', tel: '0 2621 2790-3' },
                                { name: 'Phet Kasem Branch', tel: '0 2420 3494-5' },
                                { name: 'Chonburi Branch', tel: '0 3814 8037-9' }
                            ].map((branch) => (
                                <div key={branch.name} className="flex flex-col gap-1 border-l-2 border-slate-800 pl-4 hover:border-brand-600 transition-colors">
                                    <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest">{branch.name}</p>
                                    <p className="text-slate-500 font-bold font-mono text-xs">{branch.tel}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: Facebook Feed */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4 flex items-center justify-center sm:justify-start gap-3">
                            <Facebook className="w-4 h-4 text-brand-500" />
                            Live Updates
                        </h4>
                        <div className="rounded-[1rem] bg-white shadow-2xl border border-slate-100 overflow-hidden h-[320px] w-full max-w-[340px] mx-auto sm:mx-0">
                            <iframe
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FVirtusThailand&tabs=timeline&width=340&height=320&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                                width="100%"
                                height="100%"
                                style={{ border: 'none', overflow: 'hidden' }}
                                scrolling="no"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                title="Facebook Feed"
                                className="block"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-800/50">
                    <div className="flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-brand-500 rounded-full" />
                            <span>Integrity</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-brand-500 rounded-full" />
                            <span>Excellence</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-brand-500 rounded-full" />
                            <span>Innovation</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <a href="https://facebook.com/VirtusThailand" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-all text-slate-500 shadow-lg">
                            <Facebook className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
