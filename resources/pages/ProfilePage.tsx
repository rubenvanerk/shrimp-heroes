
import React, { useContext } from 'react';
import { Layout } from '../components/Layout';
import { ClayCard } from '../components/ClayCard';
import { AppContext } from '../App';
import { achievements } from '../data/mockData';
import { Edit, Share2 } from 'react-feather';

const ProfilePage: React.FC = () => {
    const { user } = useContext(AppContext);

    if (!user) {
        return <Layout><p>Loading user profile...</p></Layout>;
    }
    
    const unlockedAchievements = achievements.filter(a => user.totalShrimpHelped >= a.shrimpRequired);
    const nextAchievement = achievements.find(a => user.totalShrimpHelped < a.shrimpRequired);
    const progressPercentage = nextAchievement ? (user.totalShrimpHelped / nextAchievement.shrimpRequired) * 100 : 100;

    return (
        <Layout>
            <div className="space-y-8">
                <ClayCard className="flex flex-col items-center text-center p-8">
                    <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white shadow-lg -mt-20 mb-4" />
                    <h1 className="text-3xl font-extrabold text-gray-700">{user.name}</h1>
                    <p className="text-gray-500">{user.country}</p>
                    <button className="mt-2 text-xs font-bold text-rose-500 flex items-center space-x-1">
                        <Edit size={12} />
                        <span>Edit Profile</span>
                    </button>
                </ClayCard>

                <div className="grid grid-cols-2 gap-4">
                    <ClayCard className="text-center">
                        <p className="text-3xl font-extrabold text-rose-500">{user.totalShrimpHelped.toLocaleString()}</p>
                        <p className="text-sm font-bold text-gray-500">Total Shrimp Helped</p>
                    </ClayCard>
                    <ClayCard className="text-center">
                        <p className="text-3xl font-extrabold text-rose-500">{user.actions.length}</p>
                        <p className="text-sm font-bold text-gray-500">Actions Taken</p>
                    </ClayCard>
                </div>

                <ClayCard>
                    <h2 className="text-2xl font-bold text-rose-500 mb-4">Achievements</h2>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        {achievements.map(ach => (
                            <div key={ach.id}>
                                {ach.icon(user.totalShrimpHelped >= ach.shrimpRequired)}
                                <p className={`mt-2 text-xs font-bold ${user.totalShrimpHelped >= ach.shrimpRequired ? 'text-gray-700' : 'text-gray-400'}`}>{ach.name}</p>
                            </div>
                        ))}
                    </div>
                     {nextAchievement && (
                        <div className="mt-6">
                            <p className="text-sm font-bold text-center text-gray-600 mb-2">
                                Next: {nextAchievement.name} ({user.totalShrimpHelped.toLocaleString()} / {nextAchievement.shrimpRequired.toLocaleString()})
                            </p>
                            <div className="w-full bg-rose-100 rounded-full h-4">
                                <div className="bg-gradient-to-r from-pink-400 to-rose-500 h-4 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                        </div>
                    )}
                </ClayCard>

                <button
                    onClick={() => alert('Sharing functionality to be implemented!')}
                    className="w-full text-center py-4 px-8 bg-white/80 text-rose-500 font-bold text-lg rounded-2xl shadow-md hover:scale-105 transition-transform flex items-center justify-center space-x-2"
                >
                    <Share2 size={20} />
                    <span>Share My Impact</span>
                </button>
            </div>
        </Layout>
    );
};

export default ProfilePage;
