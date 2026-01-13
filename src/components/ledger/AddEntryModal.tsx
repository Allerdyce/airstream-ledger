import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AddEntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (entry: any) => void;
}

export default function AddEntryModal({ isOpen, onClose, onAdd }: AddEntryModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        category: 'General',
        item: '',
        vendor: '',
        cost: '',
        receipt: ''
    });
    const [file, setFile] = useState<File | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let receiptUrl = null;
            let receiptFilename = null;

            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('receipts')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('receipts')
                    .getPublicUrl(filePath);

                receiptUrl = publicUrl;
                receiptFilename = file.name;
            }

            const newEntry = {
                date: formData.date,
                category: formData.category,
                item: formData.item,
                vendor: formData.vendor,
                cost: parseFloat(formData.cost) || 0,
                receipt_url: receiptUrl,
                receipt_filename: receiptFilename,
            };

            const { data, error } = await supabase
                .from('ledger_entries')
                .insert([newEntry])
                .select()
                .single();

            if (error) throw error;

            onAdd(data);
            setFormData({ date: '', category: 'General', item: '', vendor: '', cost: '', receipt: '' });
            setFile(null);
            onClose();

        } catch (error) {
            console.error('Error adding entry:', error);
            alert('Error adding entry. Please check console.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-gray-500/75 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                        <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            <span className="sr-only">Close</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Add New Ledger Item
                            </h3>
                            <div className="mt-2">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                        <select
                                            id="category"
                                            name="category"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            disabled={isSubmitting}
                                        >
                                            <option>General</option>
                                            <option>Plumbing</option>
                                            <option>Electrical</option>
                                            <option>Structural</option>
                                            <option>Interior</option>
                                            <option>Tools</option>
                                            <option>Labor</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="item" className="block text-sm font-medium text-gray-700">Item / Service</label>
                                        <input
                                            type="text"
                                            name="item"
                                            id="item"
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={formData.item}
                                            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">Vendor</label>
                                        <input
                                            type="text"
                                            name="vendor"
                                            id="vendor"
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={formData.vendor}
                                            onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost ($)</label>
                                        <input
                                            type="number"
                                            name="cost"
                                            id="cost"
                                            required
                                            min="0"
                                            step="0.01"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={formData.cost}
                                            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="receipt" className="block text-sm font-medium text-gray-700">Receipt</label>
                                        <input
                                            type="file"
                                            name="receipt"
                                            id="receipt"
                                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setFile(file);
                                                }
                                            }}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                                    Saving...
                                                </>
                                            ) : (
                                                'Add Item'
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={onClose}
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
