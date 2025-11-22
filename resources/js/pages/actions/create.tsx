import ActionController from '@/actions/App/Http/Controllers/ActionController';
import InputError from '@/components/input-error';
import { StoreCombobox } from '@/components/store-combobox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { create } from '@/routes/actions';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Report Action',
        href: create().url,
    },
];

interface CreateActionProps {
    userLocation?: { latitude: number; longitude: number } | null;
}

export default function CreateAction({ userLocation: initialUserLocation }: CreateActionProps) {
    const [isLoadingLocation, setIsLoadingLocation] = useState(() => !initialUserLocation && 'geolocation' in navigator);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(initialUserLocation || null);
    const [photos, setPhotos] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [photoError, setPhotoError] = useState<string | null>(null);
    const [showPhotoSection, setShowPhotoSection] = useState(false);
    const [showNotesSection, setShowNotesSection] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        store_id: '',
        packages_flipped: '',
        notes: '',
        photos: [] as File[],
    });

    // Request user location on mount if not already provided
    useEffect(() => {
        if (userLocation || !('geolocation' in navigator)) {
            return;
        }

        let cancelled = false;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (cancelled) return;
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
                setIsLoadingLocation(false);
            },
            (error) => {
                if (cancelled) return;
                setIsLoadingLocation(false);
                console.error('Location error:', error);
                setLocationError('Unable to get your location. Showing all stores.');
            }
        );

        return () => {
            cancelled = true;
        };
    }, [userLocation]);

    // Handle photo upload
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setPhotoError(null);

        // Check if adding these photos would exceed the limit
        if (photos.length + files.length > 5) {
            setPhotoError('You can upload a maximum of 5 photos.');
            return;
        }

        const validFiles: File[] = [];
        const newPreviews: string[] = [];

        Array.from(files).forEach((file) => {
            // Check file size (max 5MB per photo)
            if (file.size > 5 * 1024 * 1024) {
                setPhotoError('Each photo must be less than 5MB.');
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                setPhotoError('Only image files are allowed.');
                return;
            }

            validFiles.push(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result as string);
                if (newPreviews.length === validFiles.length) {
                    setPhotoPreviews((prev) => [...prev, ...newPreviews]);
                }
            };
            reader.readAsDataURL(file);
        });

        const updatedPhotos = [...photos, ...validFiles];
        setPhotos(updatedPhotos);
        setData('photos', updatedPhotos);

        // Reset input
        e.target.value = '';
    };

    // Remove photo
    const removePhoto = (index: number) => {
        const updatedPhotos = photos.filter((_, i) => i !== index);
        const updatedPreviews = photoPreviews.filter((_, i) => i !== index);
        setPhotos(updatedPhotos);
        setPhotoPreviews(updatedPreviews);
        setData('photos', updatedPhotos);
        setPhotoError(null);
    };

    // Handle increment/decrement
    const incrementPackages = () => {
        const current = parseInt(data.packages_flipped) || 0;
        setData('packages_flipped', String(current + 1));
    };

    const decrementPackages = () => {
        const current = parseInt(data.packages_flipped) || 0;
        if (current > 1) {
            setData('packages_flipped', String(current - 1));
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(ActionController.store.url(), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setPhotos([]);
                setPhotoPreviews([]);
                setShowPhotoSection(false);
                setShowNotesSection(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Report Action" />

            <div className="mx-auto w-full max-w-2xl space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-purple-600 dark:text-purple-400">
                        🦐 Log your flip
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Time to celebrate your awesome activism!
                    </p>
                </div>

                {/* Location status */}
                {isLoadingLocation && (
                    <div className="rounded-lg border bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                        📍 Getting your location to show nearest stores...
                    </div>
                )}

                {locationError && (
                    <div className="rounded-lg border bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                        {locationError}
                    </div>
                )}

                {userLocation && (
                    <div className="rounded-lg border bg-green-50 p-4 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
                        ✓ Showing stores nearest to your location
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* GIANT Number Input Section */}
                    <div className="text-center space-y-4">
                        <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
                            I just flipped...
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 sm:gap-4">
                            {/* Decrement Button */}
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={decrementPackages}
                                className="h-12 w-12 sm:h-16 sm:w-16 rounded-full text-2xl font-bold hover:bg-purple-50 dark:hover:bg-purple-950 shrink-0"
                                disabled={!data.packages_flipped || parseInt(data.packages_flipped) <= 1}
                            >
                                ➖
                            </Button>

                            {/* GIANT Number Input */}
                            <div className="relative flex-shrink-0">
                                <input
                                    id="packages_flipped"
                                    name="packages_flipped"
                                    type="number"
                                    min="1"
                                    className="text-center text-6xl font-black bg-transparent border-0 outline-none w-24 sm:w-32 md:w-48 md:text-8xl text-purple-600 dark:text-purple-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="0"
                                    value={data.packages_flipped}
                                    onChange={(e) => setData('packages_flipped', e.target.value)}
                                    required
                                />
                                {errors.packages_flipped && (
                                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                        <p className="text-sm text-red-600 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
                                            {errors.packages_flipped}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Increment Button */}
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={incrementPackages}
                                className="h-12 w-12 sm:h-16 sm:w-16 rounded-full text-2xl font-bold hover:bg-purple-50 dark:hover:bg-purple-950 shrink-0"
                            >
                                ➕
                            </Button>
                        </div>

                        <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
                            shrimp packages!
                        </div>
                    </div>

                    {/* Store Selection - Always Visible */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border w-full">
                        <StoreCombobox
                            value={data.store_id}
                            onChange={(value) => setData('store_id', value)}
                            userLocation={userLocation}
                            error={errors.store_id}
                        />
                    </div>

                    {/* Optional Actions Row */}
                    <div className="flex justify-center gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setShowPhotoSection(!showPhotoSection)}
                            className="text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            📸 Add Photo (optional)
                        </Button>
                        
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setShowNotesSection(!showNotesSection)}
                            className="text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            📝 Add a note
                        </Button>
                    </div>

                    {/* Photo Upload Section - Expandable */}
                    <Transition
                        show={showPhotoSection}
                        enter="transition-all duration-300 ease-in-out"
                        enterFrom="opacity-0 max-h-0"
                        enterTo="opacity-100 max-h-96"
                        leave="transition-all duration-300 ease-in-out"
                        leaveFrom="opacity-100 max-h-96"
                        leaveTo="opacity-0 max-h-0"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border overflow-hidden">
                            <div className="grid gap-4">
                                <p className="text-sm text-muted-foreground">
                                    Upload photos of the flipped packages (max 5 photos, 5MB each)
                                </p>

                                {/* Photo Preview Grid */}
                                {photoPreviews.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                        {photoPreviews.map((preview, index) => (
                                            <div
                                                key={index}
                                                className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                                            >
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removePhoto(index)}
                                                    className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100 text-lg"
                                                >
                                                    ❌
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Upload Button */}
                                {photos.length < 5 && (
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById('photo-upload')?.click()}
                                            className="w-full"
                                        >
                                            {photos.length === 0 ? '📤 Upload Photos' : `📤 Add More (${photos.length}/5)`}
                                        </Button>
                                        <input
                                            id="photo-upload"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handlePhotoUpload}
                                            className="hidden"
                                        />
                                    </div>
                                )}

                                {photoError && (
                                    <p className="text-sm text-destructive">{photoError}</p>
                                )}
                                <InputError message={errors.photos} />
                            </div>
                        </div>
                    </Transition>

                    {/* Notes Section - Expandable */}
                    <Transition
                        show={showNotesSection}
                        enter="transition-all duration-300 ease-in-out"
                        enterFrom="opacity-0 max-h-0"
                        enterTo="opacity-100 max-h-48"
                        leave="transition-all duration-300 ease-in-out"
                        leaveFrom="opacity-100 max-h-48"
                        leaveTo="opacity-0 max-h-0"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border overflow-hidden">
                            <div className="grid gap-2">
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    className="border-0 bg-transparent resize-none focus:ring-0 focus:border-0 px-4 py-3 text-base"
                                    placeholder="Add any additional details about this action..."
                                    rows={4}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                />
                                <InputError message={errors.notes} />
                            </div>
                        </div>
                    </Transition>

                    {/* Submit Button - Always Visible */}
                    <div className="flex items-center justify-center">
                        <Button
                            type="submit"
                            disabled={processing}
                            size="lg"
                            className="px-12 py-4 text-xl font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                        >
                            {processing ? 'Submitting...' : 'Report Action'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
