
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ClayCard } from '../components/ClayCard';
import { AppContext } from '../App';
import type { ActionReport } from '../types';
import { useGeolocation } from '../hooks/useGeolocation';
import { Plus, Minus, Edit3, Camera, MapPin, Loader } from 'react-feather';

const ReportPage: React.FC = () => {
    const [count, setCount] = useState(15);
    const [showNote, setShowNote] = useState(false);
    const [note, setNote] = useState('');
    const [photo, setPhoto] = useState<string | undefined>();
    const [location, setLocation] = useState('An Aldi Store');
    const { addReport } = useContext(AppContext);
    const navigate = useNavigate();
    const { data: geoData, loading: geoLoading, error: geoError, getLocation } = useGeolocation();

    const SHRIMP_PER_PACKAGE = 50;

    useEffect(() => {
        if (geoData) {
            setLocation(`Aldi near lat: ${geoData.latitude.toFixed(2)}, lon: ${geoData.longitude.toFixed(2)}`);
        } else if (geoError) {
            setLocation('Could not find location');
        }
    }, [geoData, geoError]);

    const handleCountChange = (amount: number) => {
        setCount(prev => Math.max(1, prev + amount));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhoto(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        const report: ActionReport = {
            id: new Date().toISOString(),
            productsFlipped: count,
            shrimpHelped: count * SHRIMP_PER_PACKAGE,
            location,
            note: note || undefined,
            photo,
            timestamp: Date.now(),
        };
        addReport(report);
        navigate('/profile');
    };

    return (
        <Layout>
            <div className="space-y-6 text-center">
                <h1 className="text-3xl font-extrabold text-gray-700">Report Your Action</h1>
                <p className="text-gray-600">How many packages did you flip for the shrimp?</p>

                <ClayCard className="py-8">
                    <div className="flex items-center justify-center space-x-6">
                        <button onClick={() => handleCountChange(-1)} className="p-4 bg-white rounded-full shadow-md active:scale-90 transition-transform"><Minus className="text-rose-500" /></button>
                        <span className="text-8xl font-extrabold text-rose-500 w-40 text-center">{count}</span>
                        <button onClick={() => handleCountChange(1)} className="p-4 bg-white rounded-full shadow-md active:scale-90 transition-transform"><Plus className="text-rose-500" /></button>
                    </div>
                    <p className="mt-4 font-bold text-lg text-gray-600">
                        That's an estimated <span className="text-orange-500">{ (count * SHRIMP_PER_PACKAGE).toLocaleString() }</span> shrimp helped!
                    </p>
                </ClayCard>

                <ClayCard>
                    <button onClick={getLocation} className="w-full flex items-center justify-center space-x-2 text-gray-600 font-bold p-2">
                        {geoLoading ? <Loader className="animate-spin" size={20}/> : <MapPin size={20}/>}
                        <span>{location}</span>
                    </button>
                </ClayCard>
                
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setShowNote(!showNote)} className={`p-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-colors ${showNote ? 'bg-rose-200 text-rose-700' : 'bg-white/80 text-gray-600'}`}>
                        <Edit3 size={20} /><span>{showNote ? 'Hide Note' : 'Add Note'}</span>
                    </button>
                    <label htmlFor="photo-upload" className="p-4 rounded-2xl font-bold flex items-center justify-center space-x-2 bg-white/80 text-gray-600 cursor-pointer">
                        <Camera size={20} /><span>{photo ? "Change Photo" : "Add Photo"}</span>
                        <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                </div>
                
                {showNote && (
                    <ClayCard>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Add any details here..."
                            className="w-full h-24 p-3 bg-transparent border-2 border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                        />
                    </ClayCard>
                )}
                {photo && (
                     <ClayCard>
                        <img src={photo} alt="Upload preview" className="rounded-xl max-h-48 mx-auto" />
                    </ClayCard>
                )}

                <button
                    onClick={handleSubmit}
                    className="w-full text-center py-5 px-8 bg-gradient-to-br from-rose-500 to-orange-400 text-white font-bold text-xl rounded-2xl shadow-lg shadow-rose-200 hover:scale-105 transition-transform"
                >
                    Confirm & Submit Action
                </button>
            </div>
        </Layout>
    );
};

export default ReportPage;
