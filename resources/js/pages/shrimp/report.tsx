import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Report() {
    const { data, setData, post, processing, errors } = useForm({
        action_type: '',
        shrimp_helped: '',
        location: '',
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/shrimp/report');
    };

    return (
        <>
            <Head title="Report Action" />

            <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                        <Link href="/shrimp" className="text-2xl">
                            ←
                        </Link>
                        <h1 className="text-2xl font-bold text-rose-600">
                            Report Action
                        </h1>
                        <div className="w-8"></div>
                    </div>
                </div>

                {/* Form */}
                <div className="mx-auto max-w-2xl px-4 py-8">
                    <form
                        onSubmit={submit}
                        className="space-y-6 rounded-lg bg-white p-6 shadow-md"
                    >
                        {/* Action Type */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                Action Type *
                            </label>
                            <select
                                value={data.action_type}
                                onChange={(e) =>
                                    setData('action_type', e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2"
                                required
                            >
                                <option value="">Select an action</option>
                                <option value="rescue">
                                    🚑 Rescue Operation
                                </option>
                                <option value="habitat">
                                    🏡 Habitat Protection
                                </option>
                                <option value="cleanup">
                                    🧹 Beach Cleanup
                                </option>
                                <option value="education">📚 Education</option>
                            </select>
                            {errors.action_type && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.action_type}
                                </p>
                            )}
                        </div>

                        {/* Shrimp Helped */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                Shrimp Helped (Estimated) *
                            </label>
                            <input
                                type="number"
                                value={data.shrimp_helped}
                                onChange={(e) =>
                                    setData('shrimp_helped', e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2"
                                placeholder="100"
                                min="1"
                                required
                            />
                            {errors.shrimp_helped && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.shrimp_helped}
                                </p>
                            )}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                Location
                            </label>
                            <input
                                type="text"
                                value={data.location}
                                onChange={(e) =>
                                    setData('location', e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2"
                                placeholder="Beach, City, Country"
                            />
                            {errors.location && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.location}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2"
                                rows={4}
                                placeholder="Tell us about your shrimp-saving action..."
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-rose-500 px-6 py-3 font-bold text-white shadow-md transition hover:bg-rose-600 disabled:opacity-50"
                        >
                            {processing ? 'Submitting...' : '🦐 Submit Report'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
