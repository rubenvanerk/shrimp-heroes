
import React, { useState, useMemo, createContext } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import GuidePage from './pages/GuidePage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import type { ActionReport, User } from './types';

const mockUser: User = {
    id: 'currentUser',
    name: 'Shrimp Hero',
    avatar: 'https://i.pravatar.cc/150?u=currentUser',
    totalShrimpHelped: 1250,
    actions: [],
    country: 'United Kingdom'
};

export const AppContext = createContext<{
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    globalShrimpHelped: number;
    addReport: (report: ActionReport) => void;
}>({
    user: null,
    setUser: () => {},
    globalShrimpHelped: 1247850,
    addReport: () => {},
});

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(mockUser);
    const [globalShrimpHelped, setGlobalShrimpHelped] = useState(1247850);

    const addReport = (report: ActionReport) => {
        if (user) {
            const updatedUser = {
                ...user,
                actions: [report, ...user.actions],
                totalShrimpHelped: user.totalShrimpHelped + report.shrimpHelped,
            };
            setUser(updatedUser);
            setGlobalShrimpHelped(prev => prev + report.shrimpHelped);
        }
    };

    const contextValue = useMemo(() => ({
        user,
        setUser,
        globalShrimpHelped,
        addReport
    }), [user, globalShrimpHelped]);

    return (
        <AppContext.Provider value={contextValue}>
            <HashRouter>
                <div className="relative min-h-screen">
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/report" element={<ReportPage />} />
                            <Route path="/guide" element={<GuidePage />} />
                            <Route path="/leaderboard" element={<LeaderboardPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                        </Routes>
                    </main>
                    <BottomNav />
                </div>
            </HashRouter>
        </AppContext.Provider>
    );
};

export default App;
