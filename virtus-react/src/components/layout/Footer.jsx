import { Link } from 'react-router-dom';
import { Facebook } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">

                    {/* Column 1: Brand & Copyright */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-black text-2xl text-white tracking-tighter">VIRTUS</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Copyright © 2018 VIRTUS<br />
                            All rights reserved.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-4">
                        <ul className="space-y-1.5">
                            <li>
                                <Link to="/" className="flex items-center gap-2 hover:text-brand-400 transition-all group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500/40 group-hover:bg-brand-500 transition-all"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="flex items-center gap-2 hover:text-brand-400 transition-all group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500/40 group-hover:bg-brand-500 transition-all"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="flex items-center gap-2 hover:text-brand-400 transition-all group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500/40 group-hover:bg-brand-500 transition-all"></span>
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/join" className="flex items-center gap-2 hover:text-brand-400 transition-all group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500/40 group-hover:bg-brand-500 transition-all"></span>
                                    Join Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="flex items-center gap-2 hover:text-brand-400 transition-all group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500/40 group-hover:bg-brand-500 transition-all"></span>
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact & Branches */}
                    <div className="flex flex-col gap-4 text-sm">
                        <h4 className="text-white font-bold text-lg mb-2">Our Branches</h4>
                        <div className="space-y-2">
                            <div>
                                <p className="text-slate-200 font-bold mb-0.5">Dao Khanong Office</p>
                                <p>Tel: 0 2876 2727</p>
                            </div>
                            <div>
                                <p className="text-slate-200 font-bold mb-0.5">Khlong Thom Branch</p>
                                <p>Tel: 0 2621 2790-3</p>
                            </div>
                            <div>
                                <p className="text-slate-200 font-bold mb-0.5">Phet Kasem Branch</p>
                                <p>Tel: 0 2420 3494-5</p>
                            </div>
                            <div>
                                <p className="text-slate-200 font-bold mb-0.5">Chonburi Branch</p>
                                <p>Tel: 0 3814 8037-9</p>
                            </div>
                            <div className="pt-4 border-t border-slate-800 text-sm leading-relaxed text-slate-400">
                                <p className="mb-1">
                                    <span className="text-brand-500 font-bold">Open: </span>
                                    Monday - Saturday
                                </p>
                                <p className="pl-9 mb-3">8:30 AM - 5:30 PM</p>
                                <p className="text-amber-500/80 italic">*Dao Khanong Office is closed on Saturdays</p>
                                <p className="text-red-400/80 italic">*Closed on Sundays and Public Holidays</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Facebook Feed */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            <Facebook className="w-5 h-5 text-[#1877F2]" />
                            Follow Us
                        </h4>
                        <div className="rounded-xl overflow-hidden bg-white p-1 h-[400px] shadow-xl border border-white/10 transition-all">
                            {/* Facebook Page Plugin Iframe */}
                            <iframe
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FVirtusThailand&tabs=timeline&width=300&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                                width="100%"
                                height="100%"
                                style={{ border: 'none', overflow: 'hidden' }}
                                scrolling="no"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                title="Facebook Feed"
                            />
                        </div>
                    </div>
                </div>


            </div>
        </footer>
    );
};
