import { dashboard, leaderboard } from '@/routes';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { BookOpen, LayoutGrid, Trophy, Info } from 'lucide-react';

export function BottomNav() {
    const { url } = usePage();

    const navItems = [
        {
            title: 'Dashboard',
            href: dashboard().url,
            icon: LayoutGrid,
        },
        {
            title: 'Leaderboard',
            href: leaderboard().url,
            icon: Trophy,
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
        if (href === leaderboard().url && url === '/leaderboard') return true;
        if (href !== dashboard().url && href !== leaderboard().url && url.startsWith(href)) return true;
        return false;
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 py-3 z-50 md:hidden">
            {/* Center action button - absolutely positioned */}
            <Link
                href="/actions/create"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-6 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 to-pink-200 dark:from-orange-400 dark:to-pink-400 hover:from-orange-300 hover:to-pink-300 dark:hover:from-orange-500 dark:hover:to-pink-500 active:from-orange-400 active:to-pink-400 dark:active:from-orange-600 dark:active:to-pink-600 active:scale-95 shadow-xl transition-transform hover:scale-110 active:shadow-md z-10"
            >
                <span className="text-4xl drop-shadow">🦐</span>
            </Link>

            <div className="grid grid-cols-5 items-center w-full">
                {navItems.map((item, index) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-900 ${index === 2 ? 'col-start-4' : ''}`}
                    >
                        <item.icon className={`w-5 h-5 transition-colors ${isActive(item.href) ? 'text-primary dark:text-orange-400' : 'text-slate-600 dark:text-slate-400'}`} />
                        <span className="text-[0.625rem] font-medium">{item.title}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
