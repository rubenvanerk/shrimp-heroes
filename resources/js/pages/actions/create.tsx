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
}

interface CreateActionProps {
    stores: Store[];
}

export default function CreateAction({ stores }: CreateActionProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Report Action" />

            <div className="mx-auto max-w-2xl space-y-6">
                <HeadingSmall
                    title="Report your action"
                    description="Log the packages you've flipped to help save shrimp"
                />

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
                      <span className="font-medium">{store.address}</span>
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
