
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ClayCard } from '../components/ClayCard';
import { ExpandableListItem } from '../components/ExpandableListItem';
import { guideSteps, faqs } from '../data/mockData';

const GuidePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-700">Action Guide</h1>
                    <p className="mt-2 text-gray-600">Your step-by-step guide to helping shrimp!</p>
                </div>

                <ClayCard>
                    <h2 className="text-2xl font-bold text-rose-500 mb-4">How to Take Action</h2>
                    <div className="space-y-2">
                        {guideSteps.map((step) => (
                             step.details ? (
                                <ExpandableListItem key={step.id} title={`${step.id}. ${step.title}`}>
                                    <p>{step.details}</p>
                                    {step.imageUrl && <img src={step.imageUrl} alt={step.title} className="mt-4 rounded-xl" />}
                                </ExpandableListItem>
                             ) : (
                                <div key={step.id} className="bg-white/50 rounded-2xl shadow-sm mb-3">
                                <button
                                    onClick={() => navigate('/report')}
                                    className="w-full text-left p-4 font-bold text-rose-600 bg-rose-100"
                                >
                                   <span>{`${step.id}. ${step.title}`}</span>
                                </button>
                                </div>
                             )
                        ))}
                    </div>
                </ClayCard>

                <ClayCard>
                    <h2 className="text-2xl font-bold text-rose-500 mb-4">Frequently Asked Questions</h2>
                     <div className="space-y-2">
                        {faqs.map((faq, index) => (
                             <ExpandableListItem key={index} title={faq.question}>
                                <p className="font-semibold">{faq.answer}</p>
                                {faq.details && <p className="mt-2 text-sm">{faq.details}</p>}
                            </ExpandableListItem>
                        ))}
                    </div>
                </ClayCard>
            </div>
        </Layout>
    );
};

export default GuidePage;
