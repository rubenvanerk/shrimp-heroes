import ActionController from '@/actions/App/Http/Controllers/ActionController';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { create } from '@/routes/actions';
import { useEffect, useState } from 'react';
import { X, Upload } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Report Action',
        href: create().url,
    },
];

interface Store {
  id: number;
  name: string;
  address: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
}

interface CreateActionProps {
    stores: Store[];
    userLocation?: { latitude: number; longitude: number } | null;
}

export default function CreateAction({ stores: initialStores, userLocation }: CreateActionProps) {
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [photos, setPhotos] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [photoError, setPhotoError] = useState<string | null>(null);

    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        store_id: '',
        packages_flipped: '',
        performed_at: new Date().toISOString().slice(0, 16),
        notes: '',
        photos: [] as File[],
    });

    // Request user location on mount if not already provided
    useEffect(() => {
        if (!userLocation && 'geolocation' in navigator) {
            setIsLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Sort stores by distance from user location
                    const storesWithDistance = initialStores
                        .filter(store => store.latitude !== undefined && store.longitude !== undefined)
                        .map(store => ({
                            ...store,
                            distance: calculateDistance(
                                latitude,
                                longitude,
                                store.latitude!,
                                store.longitude!
                            )
                        }))
                        .sort((a, b) => (a.distance || 0) - (b.distance || 0));

                    // Add stores without coordinates at the end
                    const storesWithoutCoords = initialStores
                        .filter(store => store.latitude === undefined || store.longitude === undefined);

                    setStores([...storesWithDistance, ...storesWithoutCoords]);
                    setHasLocation(true);
                    setIsLoadingLocation(false);
                },
                (error) => {
                    setIsLoadingLocation(false);
                    console.error('Location error:', error);
                    setLocationError('Unable to get your location. Showing all stores.');
                }
            );
        }
    }, [userLocation, initialStores]);

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

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(ActionController.store.url(), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setPhotos([]);
                setPhotoPreviews([]);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Report Action" />

            <div className="mx-auto max-w-2xl space-y-6 p-4">
                <HeadingSmall
                    title="Report your action"
                    description="Log the packages you've flipped to help save shrimp"
                />

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

                {hasLocation && (
                    <div className="rounded-lg border bg-green-50 p-4 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
                        ✓ Showing stores nearest to your location
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                        <>
                            {/* Store Selection */}
                            <div className="grid gap-2">
                                <Label htmlFor="store_id">
                                    Store (optional)
                                </Label>

                                <Select 
                                    name="store_id" 
                                    value={data.store_id} 
                                    onValueChange={(value) => setData('store_id', value)}
                                >
                                                  <SelectTrigger>
                <SelectValue placeholder="Select a store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store.id} value={store.id.toString()}>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{store.address}</span>
                        {store.distance !== undefined && (
                          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {store.distance < 1 
                              ? `${(store.distance * 1000).toFixed(0)}m`
                              : `${store.distance.toFixed(1)}km`
                            }
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {store.name}
                        {(store.city || store.country) && ` • ${[store.city, store.country].filter(Boolean).join(', ')}`}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
                                </Select>

                                <InputError message={errors.store_id} />
                            </div>

                            {/* Packages Flipped */}
                            <div className="grid gap-2">
                                <Label htmlFor="packages_flipped">
                                    Packages flipped *
                                </Label>

                                <Input
                                    id="packages_flipped"
                                    name="packages_flipped"
                                    type="number"
                                    min="1"
                                    className="mt-1 block w-full"
                                    placeholder="e.g. 50"
                                    value={data.packages_flipped}
                                    onChange={(e) => setData('packages_flipped', e.target.value)}
                                    required
                                />

                                <InputError message={errors.packages_flipped} />
                            </div>

                            {/* Performed At */}
                            <div className="grid gap-2">
                                <Label htmlFor="performed_at">
                                    When did you perform this action? *
                                </Label>

                                <Input
                                    id="performed_at"
                                    name="performed_at"
                                    type="datetime-local"
                                    className="mt-1 block w-full"
                                    value={data.performed_at}
                                    onChange={(e) => setData('performed_at', e.target.value)}
                                    required
                                />

                                <InputError message={errors.performed_at} />
                            </div>

                            {/* Photo Upload */}
                            <div className="grid gap-2">
                                <Label htmlFor="photos">
                                    Photos (optional)
                                </Label>
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
                                                    className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                                                >
                                                    <X className="h-4 w-4" />
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
                                            <Upload className="mr-2 h-4 w-4" />
                                            {photos.length === 0 ? 'Upload Photos' : `Add More (${photos.length}/5)`}
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

                            {/* Notes */}
                            <div className="grid gap-2">
                                <Label htmlFor="notes">
                                    Notes (optional)
                                </Label>

                                <Textarea
                                    id="notes"
                                    name="notes"
                                    className="mt-1 block w-full"
                                    placeholder="Add any additional details about this action..."
                                    rows={4}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                />

                                <InputError message={errors.notes} />
                            </div>                            {/* Submit Button */}
                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Submitting...' : 'Report Action'}
                                </Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-muted-foreground">
                                        Reported successfully!
                                    </p>
                                </Transition>
                            </div>
                        </>
                </form>
            </div>
        </AppLayout>
    );
}
