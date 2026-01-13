import { Edit2, Trash2, FileText } from 'lucide-react';

export interface LedgerEntry {
    id: string;
    date: string;
    category: string;
    item: string;
    vendor: string;
    cost: number;
    receipt_url?: string;
    receipt_filename?: string;
}

interface LedgerTableProps {
    entries: LedgerEntry[];
    onEdit: (entry: LedgerEntry) => void;
    onDelete: (id: string) => void;
}

export default function LedgerTable({ entries, onEdit, onDelete }: LedgerTableProps) {
    const totalCost = entries.reduce((acc, curr) => acc + curr.cost, 0);

    return (
        <div className="bg-white shadow ring-1 ring-black/5 sm:rounded-lg">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item / Service</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {entries.map((entry) => (
                                        <tr key={entry.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    {entry.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.item}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.vendor}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${entry.cost.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                                                {entry.receipt_url ? (
                                                    <a href={entry.receipt_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                        <FileText className="h-4 w-4 mr-1" />
                                                        View
                                                    </a>
                                                ) : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => onEdit(entry)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(entry.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-50 font-bold">
                                        <td colSpan={4} className="px-6 py-4 text-right text-sm text-gray-900">Total</td>
                                        <td className="px-6 py-4 text-right text-sm text-gray-900">${totalCost.toFixed(2)}</td>
                                        <td colSpan={2}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

