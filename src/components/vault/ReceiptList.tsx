import { useState, useEffect } from 'react';
import { FileText, Download, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Receipt {
    id: string;
    receipt_filename: string;
    date: string;
    receipt_url: string;
}

export default function ReceiptList() {
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchReceipts();
    }, []);

    const fetchReceipts = async () => {
        try {
            const { data, error } = await supabase
                .from('ledger_entries')
                .select('*')
                .not('receipt_url', 'is', null)
                .order('date', { ascending: false });

            if (error) throw error;
            setReceipts(data || []);
        } catch (error) {
            console.error('Error fetching receipts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (receipts.length === 0) {
        return (
            <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No receipts found</h3>
                <p className="mt-1 text-sm text-gray-500">Upload a receipt in the Ledger to see it here.</p>
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {receipts.map((receipt) => (
                <li
                    key={receipt.id}
                    className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:shadow-md transition-shadow"
                >
                    <div className="flex flex-1 flex-col p-8">
                        <div className="mx-auto flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 overflow-hidden">
                            {/\.(jpg|jpeg|png|gif|webp)$/i.test(receipt.receipt_filename || '') ? (
                                <img
                                    src={receipt.receipt_url}
                                    alt={receipt.receipt_filename}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <FileText className="h-16 w-16 text-gray-400" />
                            )}
                        </div>
                        <h3 className="mt-6 text-sm font-medium text-gray-900 break-words">{receipt.receipt_filename}</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between">
                            <dt className="sr-only">Date</dt>
                            <dd className="text-sm text-gray-500">{receipt.date}</dd>
                        </dl>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                                <a
                                    href={receipt.receipt_url}
                                    download
                                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:text-gray-700"
                                >
                                    <Download className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Download
                                </a>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                                <a
                                    href={receipt.receipt_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:text-gray-700"
                                >
                                    <ExternalLink className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    View
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
