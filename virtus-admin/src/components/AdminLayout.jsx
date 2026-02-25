import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, MessageSquare, ChevronRight, Settings } from 'lucide-react';

export default function AdminLayout({ children }) {
    const location = useLocation();

    const menuItems = [
        { path: '/', label: 'Categories', icon: LayoutDashboard },
        { path: '/catalogues', label: 'Catalogues', icon: BookOpen },
    ];

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-slate-900 text-white shrink-0 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-8 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Settings className="w-6 h-6 animate-pulse-slow" />
                        </div>
                        <div>
                            <h1 className="font-black text-xl tracking-tight leading-none uppercase">Virtus</h1>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Admin Panel</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-grow p-6 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${isActive(item.path)
                                ? 'bg-brand-600 text-white shadow-xl shadow-brand-500/20'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <item.icon className={`w-5 h-5 transition-transform duration-500 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span className={`text-sm font-black uppercase tracking-widest ${isActive(item.path) ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                    {item.label}
                                </span>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive(item.path) ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                        </Link>
                    ))}
                </nav>

                <div className="p-8 border-t border-slate-800">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        v1.2.0 • Build Ready
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Nav */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-2 z-50 flex justify-around items-center rounded-t-[2rem]">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`p-4 rounded-2xl transition-all flex flex-col items-center gap-1 ${isActive(item.path)
                            ? 'text-brand-400'
                            : 'text-slate-500'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
                    </Link>
                ))}
            </div>

            {/* Main Content */}
            <main className="flex-grow pb-24 lg:pb-0 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
