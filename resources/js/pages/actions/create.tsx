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
import { Form, Head } from '@inertiajs/react';
import { create } from '@/routes/actions';
import { useEffect, useState } from 'react';

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

export default function CreateAction({ stores, userLocation }: CreateActionProps) {
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    // Request user location on mount if not already provided
    useEffect(() => {
        if (!userLocation && 'geolocation' in navigator) {
            setIsLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Reload page with location parameters
                    window.location.href = `${create().url}?latitude=${latitude}&longitude=${longitude}`;
                },
                (error) => {
                    setIsLoadingLocation(false);
                    console.error('Location error:', error);
                    setLocationError('Unable to get your location. Showing all stores.');
                }
            );
        }
    }, [userLocation]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Report Action" />

            <div className="mx-auto max-w-2xl space-y-6">
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

                {userLocation && (
                    <div className="rounded-lg border bg-green-50 p-4 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
                        ✓ Showing stores nearest to your location
                    </div>
                )}

                <Form
                    {...ActionController.store.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    resetOnSuccess
                    className="space-y-6"
                >
                    {({ errors, processing, recentlySuccessful }) => (
                        <>
                            {/* Store Selection */}
                            <div className="grid gap-2">
                                <Label htmlFor="store_id">
                                    Store (optional)
                                </Label>

                                <Select name="store_id">
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
                                    defaultValue={
                                        new Date()
                                            .toISOString()
                                            .slice(0, 16)
                                    }
                                    required
                                />

                                <InputError message={errors.performed_at} />
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
                                />

                                <InputError message={errors.notes} />
                            </div>

                            {/* Submit Button */}
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
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
