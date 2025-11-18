import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md border border-orange-200 bg-gradient-to-br from-orange-100 to-pink-100 dark:border-orange-900/50 dark:from-orange-950/40 dark:to-pink-950/40">
                <AppLogoIcon className="size-5" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Shrimp Heroes
                </span>
            </div>
        </>
    );
}
