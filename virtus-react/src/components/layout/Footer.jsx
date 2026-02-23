import { Link } from 'react-router-dom';
import { Facebook } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 pt-12 pb-8 border-t border-slate-800 relative overflow-hidden font-sans" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 via-blue-600 to-brand-400" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.5fr] gap-8 mb-12">

                    {/* Column 1: Brand & Copyright */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <img src="/assets/images/Logo-virtus.png" alt="VIRTUS" className="h-12 w-auto object-contain brightness-0 invert" />
                        </div>
                        <p className="text-sm leading-6 text-slate-500 font-medium h-12" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
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
                                <div key={branch.name} className="flex flex-col gap-1 border-l-2 border-slate-800 pl-4 hover:border-brand-600 transition-colors h-[42px] justify-center">
                                    <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest leading-tight" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>{branch.name}</p>
                                    <p className="text-slate-500 font-bold font-mono text-xs leading-tight" style={{ fontFamily: '"Courier New", Courier, monospace' }}>{branch.tel}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: Facebook Feed */}
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="w-full max-w-[360px] flex flex-col gap-4">
                            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3">
                                <Facebook className="w-4 h-4 text-brand-500" />
                                <span className="pt-0.5">Live Updates</span>
                            </h4>
                            <div className="rounded-[1.5rem] bg-white shadow-xl border border-slate-100 overflow-hidden h-[450px] w-full">
                                <iframe
                                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FVirtusThailand&tabs=timeline&width=360&height=450&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=false&appId"
                                    width="360"
                                    height="450"
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
                        <a href="https://facebook.com/VirtusThailand" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all text-slate-500 shadow-lg" title="Facebook">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="https://th.shp.ee/AALXzuh" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-[#EE4D2D] hover:border-[#EE4D2D] hover:text-white transition-all text-slate-500 shadow-lg" title="Shopee">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <mask id="shopee-mask-v2">
                                    <rect x="0" y="0" width="24" height="24" fill="white" />
                                    <path d="M11.5 17.5c-1.3 0-2.2-.7-2.5-1.5l1.1-.4c.2.4.6.8 1.3.8.7 0 1.1-.3 1.1-.9 0-.4-.4-.7-1.3-.9-1.2-.3-2.1-.8-2.1-1.9 0-1.2 1-2.1 2.3-2.1 1.2 0 2 .5 2.4 1.2l-1.1.5c-.2-.4-.6-.7-1.2-.7-.6 0-1 .3-1 .8s.3.6 1.3.9c1.2.3 2.1.8 2.1 1.9.1 1.3-.9 2.3-2.4 2.3z" fill="black" />
                                </mask>
                                <path d="M12 2C8.1 2 5 5.1 5 9V10H3.5C2.7 10 2 10.7 2 11.5L3.5 21C3.6 21.6 4.1 22 4.7 22H19.3C19.9 22 20.4 21.6 20.5 21L22 11.5C22 10.7 21.3 10 20.5 10H19V9C19 5.1 15.9 2 12 2ZM17 10H7V9C7 6.2 9.2 4 12 4C14.8 4 17 6.2 17 9V10Z" mask="url(#shopee-mask-v2)" />
                            </svg>
                        </a>
                        <a href="https://s.lazada.co.th/s.Z2omiC" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-[#0F146D] hover:border-[#0F146D] hover:text-white transition-all text-slate-500 shadow-lg" title="Lazada">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M12 19L3 11l4.5-5.5L12 9.5l4.5-4 4.5 5.5z" />
                                <text x="12" y="14" textAnchor="middle" fontSize="7" fontWeight="900" style={{ fontFamily: 'Arial, sans-serif' }}>L</text>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
