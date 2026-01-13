import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const navItems = [
    { path: '/', label: 'Restoration' },
    { path: '/ledger', label: 'Build Ledger' },
    { path: '/vault', label: 'Receipts Vault' },
];

export default function Navigation() {
    const location = useLocation();

    return (
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="font-bold text-xl text-gray-900 tracking-tight">1977 Airstream Sovereign</span>
                        </div>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={clsx(
                                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200',
                                        location.pathname === item.path
                                            ? 'border-indigo-600 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
