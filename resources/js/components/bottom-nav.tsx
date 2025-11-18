import { dashboard } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Info, LayoutGrid, List } from 'lucide-react';

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
        <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950">
            <div className="flex w-full items-center justify-between gap-2">
                {/* Left items */}
                <div className="flex flex-1 gap-2">
                    {navItems.slice(0, 2).map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-1 flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                            <item.icon
                                className={`h-5 w-5 transition-colors ${isActive(item.href) ? 'text-primary dark:text-orange-400' : 'text-slate-600 dark:text-slate-400'}`}
                            />
                            <span className="text-[0.625rem] font-medium">
                                {item.title}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Center action button */}
                <Link
                    href="/actions/create"
                    className="flex h-16 w-16 flex-shrink-0 -translate-y-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 to-pink-200 shadow-xl transition-transform hover:scale-110 hover:from-orange-300 hover:to-pink-300 active:scale-95 active:from-orange-400 active:to-pink-400 active:shadow-md dark:from-orange-400 dark:to-pink-400 dark:hover:from-orange-500 dark:hover:to-pink-500 dark:active:from-orange-600 dark:active:to-pink-600"
                >
                    <span className="text-4xl drop-shadow">🦐</span>
                </Link>

                {/* Right items */}
                <div className="flex flex-1 gap-2">
                    {navItems.slice(2).map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-1 flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                            <item.icon
                                className={`h-5 w-5 transition-colors ${isActive(item.href) ? 'text-primary dark:text-orange-400' : 'text-slate-600 dark:text-slate-400'}`}
                            />
                            <span className="text-[0.625rem] font-medium">
                                {item.title}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
