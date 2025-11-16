
import React from 'react';
import { Layout } from '../components/Layout';
import { ClayCard } from '../components/ClayCard';
import { leaderboardData } from '../data/mockData';
// FIX: The 'Crown' icon does not exist in react-feather. Replaced with 'Award' for the top rank icon.
import { Award } from 'react-feather';

const LeaderboardPage: React.FC = () => {
    const getRankColor = (rank: number) => {
        if (rank === 1) return 'bg-yellow-300 text-yellow-800';
        if (rank === 2) return 'bg-gray-300 text-gray-800';
        if (rank === 3) return 'bg-orange-300 text-orange-800';
        return 'bg-rose-100 text-rose-800';
    };

    return (
        <Layout>
            <div className="space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-700">Top Shrimp Heroes</h1>
                    <p className="mt-2 text-gray-600">See who's making the biggest splash!</p>
                </div>

                <ClayCard>
                    <ul className="space-y-4">
                        {leaderboardData.map((user, index) => (
                            <li key={user.id} className="flex items-center space-x-4 p-4 bg-white/50 rounded-2xl shadow-sm">
                                <span className={`w-10 h-10 flex items-center justify-center font-extrabold text-lg rounded-full ${getRankColor(user.rank)}`}>
                                    {user.rank}
                                </span>
                                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-rose-200" />
                                <div className="flex-grow">
                                    {/* FIX: Replaced non-existent 'Crown' icon with 'Award' icon. */}
                                    <p className="font-bold text-gray-700">{user.name} {user.rank === 1 && <Award size={16} className="inline-block ml-1 text-yellow-500" />}</p>
                                    <p className="text-sm text-rose-500 font-bold">{user.totalShrimpHelped.toLocaleString()} Shrimp Helped</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </ClayCard>
            </div>
        </Layout>
    );
};

export default LeaderboardPage;
