
import React from 'react';
import { router } from '@inertiajs/react';
import { Layout } from '@/components/Layout';
import { ClayCard } from '@/components/ClayCard';
import { ShrimpMascot } from '@/components/ShrimpMascot';
import { Shield } from 'react-feather';
import type { User } from '@/types/shrimp';

const StatCard: React.FC<{ value: string; label: string; className?: string }> = ({ value, label, className }) => (
    <ClayCard className={`text-center ${className}`}>
        <p className="text-3xl font-extrabold text-rose-500">{value}</p>
        <p className="text-sm text-gray-500 font-bold">{label}</p>
    </ClayCard>
);

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { user, globalShrimpHelped } = useContext(AppContext);
    
    return (
        <Layout>
            <div className="text-center space-y-8">
                <div className="relative w-48 h-48 mx-auto -mt-8">
                    <div className="absolute inset-0 bg-rose-200/50 rounded-full blur-2xl"></div>
                    <ShrimpMascot className="w-full h-full" />
                </div>
                
                <h1 className="text-4xl font-extrabold text-gray-700 tracking-tight">
                    Welcome, <span className="text-rose-500">{user?.name || 'Hero'}!</span>
                </h1>
                
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                    Ready to make a difference? Every flipped package counts. Let's help some shrimp!
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <StatCard 
                        value={globalShrimpHelped.toLocaleString()} 
                        label="Shrimp Helped Globally"
                    />
                    <StatCard 
                        value={user?.totalShrimpHelped.toLocaleString() || '0'}
                        label="Your Contribution"
                    />
                </div>

                <button
                    onClick={() => navigate('/report')}
                    className="w-full text-center py-6 px-8 bg-gradient-to-br from-rose-500 to-orange-400 text-white font-bold text-2xl rounded-3xl
                               shadow-[8px_8px_16px_rgba(255,154,138,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)]
                               hover:shadow-[4px_4px_8px_rgba(255,154,138,0.4),-4px_-4px_8px_rgba(255,255,255,0.9)]
                               transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-3"
                >
                    <Shield size={32} />
                    <span>Report an Action</span>
                </button>
            </div>
        </Layout>
    );
};

export default HomePage;
