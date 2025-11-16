import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Loader2, MapPin, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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

interface StoreComboboxProps {
    value: string;
    onChange: (value: string) => void;
    userLocation?: { latitude: number; longitude: number } | null;
    error?: string;
}

export function StoreCombobox({
    value,
    onChange,
    userLocation,
    error,
}: StoreComboboxProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const searchTimeout = useRef<NodeJS.Timeout>();
    const comboboxRef = useRef<HTMLDivElement>(null);

    // Fetch stores based on search query
    const fetchStores = async (searchQuery: string) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                search: searchQuery,
            });

            if (userLocation) {
                params.append('latitude', userLocation.latitude.toString());
                params.append('longitude', userLocation.longitude.toString());
            }

            const response = await fetch(`/api/stores/search?${params}`);
            const data = await response.json();
            setStores(data);
        } catch (error) {
            console.error('Failed to fetch stores:', error);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search
    useEffect(() => {
        if (open) {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }

            searchTimeout.current = setTimeout(() => {
                fetchStores(search);
            }, 300);
        }

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, [search, open, userLocation]);

    // Load initial stores when opened
    useEffect(() => {
        if (open && stores.length === 0) {
            fetchStores('');
        }
    }, [open]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                comboboxRef.current &&
                !comboboxRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (store: Store) => {
        setSelectedStore(store);
        onChange(store.id.toString());
        setOpen(false);
        setSearch('');
    };

    const handleClear = () => {
        setSelectedStore(null);
        onChange('');
        setSearch('');
    };

    return (
        <div className="grid gap-2">
            <Label htmlFor="store_id">Store (optional)</Label>

            <div className="relative" ref={comboboxRef}>
                {selectedStore ? (
                    <div className="flex items-center gap-2">
                        <div className="flex flex-1 items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                                <div className="font-medium">
                                    {selectedStore.address}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {selectedStore.name}
                                    {(selectedStore.city ||
                                        selectedStore.country) &&
                                        ` • ${[selectedStore.city, selectedStore.country].filter(Boolean).join(', ')}`}
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleClear}
                                className="h-auto p-1"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            onClick={() => setOpen(!open)}
                            className="w-full justify-between"
                        >
                            <span className="text-muted-foreground">
                                Select a store...
                            </span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>

                        {open && (
                            <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
                                <div className="p-2">
                                    <Input
                                        placeholder="Search stores..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="h-9"
                                        autoFocus
                                    />
                                </div>

                                <div className="max-h-[300px] overflow-y-auto">
                                    {loading ? (
                                        <div className="flex items-center justify-center p-4">
                                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                        </div>
                                    ) : stores.length === 0 ? (
                                        <div className="p-4 text-center text-sm text-muted-foreground">
                                            No stores found
                                        </div>
                                    ) : (
                                        <div className="p-1">
                                            {stores.map((store) => (
                                                <button
                                                    key={store.id}
                                                    type="button"
                                                    onClick={() =>
                                                        handleSelect(store)
                                                    }
                                                    className={cn(
                                                        'flex w-full items-start gap-2 rounded-sm px-2 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                                                        value ===
                                                            store.id.toString() &&
                                                            'bg-accent'
                                                    )}
                                                >
                                                    <Check
                                                        className={cn(
                                                            'mt-0.5 h-4 w-4 shrink-0',
                                                            value ===
                                                                store.id.toString()
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">
                                                                {store.address}
                                                            </span>
                                                            {store.distance !==
                                                                undefined && (
                                                                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                                    {store.distance <
                                                                    1
                                                                        ? `${(store.distance * 1000).toFixed(0)}m`
                                                                        : `${store.distance.toFixed(1)}km`}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {store.name}
                                                            {(store.city ||
                                                                store.country) &&
                                                                ` • ${[store.city, store.country].filter(Boolean).join(', ')}`}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
