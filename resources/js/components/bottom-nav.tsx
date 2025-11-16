import { dashboard } from '@/routes';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { BookOpen, LayoutGrid, List, Info } from 'lucide-react';

export function BottomNav() {
    const { url } = usePage();

    const navItems = [
        {
            title: 'Dashboard',
            href: dashboard().url,
            icon: LayoutGrid,
        },
        {
            title: 'Actions',
            href: '/actions',
            icon: List,
        },
        {
            title: 'Guide',
            href: '/guide',
            icon: BookOpen,
        },
        {
            title: 'About',
            href: '/about',
            icon: Info,
        },
    ];

    const isActive = (href: string) => {
        if (href === dashboard().url && url === '/dashboard') return true;
        if (href !== dashboard().url && url.startsWith(href)) return true;
        return false;
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 py-3 z-50 md:hidden">
            <div className="flex items-center justify-between w-full gap-2">
                {/* Left items */}
                <div className="flex gap-2 flex-1">
                    {navItems.slice(0, 2).map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors flex-1 hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                            <item.icon className={`w-5 h-5 transition-colors ${isActive(item.href) ? 'text-primary dark:text-orange-400' : 'text-slate-600 dark:text-slate-400'}`} />
                            <span className="text-[0.625rem] font-medium">{item.title}</span>
                        </Link>
                    ))}
                </div>

                {/* Center action button */}
                <Link
                    href="/actions/create"
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-950/40 dark:to-pink-950/40 hover:from-orange-200 hover:to-pink-200 dark:hover:from-orange-900/50 dark:hover:to-pink-900/50 active:from-orange-300 active:to-pink-300 active:scale-95 shadow-xl -translate-y-6 transition-transform hover:scale-110 active:shadow-md flex-shrink-0 border border-orange-200 dark:border-orange-900/50"
                >
                    <span className="text-4xl drop-shadow">🦐</span>
                </Link>

                {/* Right items */}
                <div className="flex gap-2 flex-1">
                    {navItems.slice(2).map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors flex-1 hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                            <item.icon className={`w-5 h-5 transition-colors ${isActive(item.href) ? 'text-primary dark:text-orange-400' : 'text-slate-600 dark:text-slate-400'}`} />
                            <span className="text-[0.625rem] font-medium">{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
