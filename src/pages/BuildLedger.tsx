import { useState, useEffect } from 'react';
import { Plus, Download, Loader2 } from 'lucide-react';
import LedgerTable, { type LedgerEntry } from '../components/ledger/LedgerTable';
import AddEntryModal from '../components/ledger/AddEntryModal';
import { supabase } from '../lib/supabase';

export default function BuildLedger() {
    const [entries, setEntries] = useState<LedgerEntry[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const { data, error } = await supabase
                .from('ledger_entries')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            setEntries(data || []);
        } catch (error) {
            console.error('Error fetching entries:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddEntry = (entry: LedgerEntry) => {
        setEntries([entry, ...entries]);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Build Ledger</h2>
                    <p className="mt-1 text-sm text-gray-500">Track all restoration costs, materials, and labor.</p>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Add Item
                    </button>
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Download className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Export CSV
                    </button>
                </div>
            </div>

            <LedgerTable entries={entries} />

            <AddEntryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddEntry}
            />
        </div>
    )
}
