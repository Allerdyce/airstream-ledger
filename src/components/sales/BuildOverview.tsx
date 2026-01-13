export default function BuildOverview() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-12 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Model</h3>
                    <p className="mt-1 text-xl font-bold text-gray-900">1970s Airstream Sovereign</p>
                </div>
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Build Period</h3>
                    <p className="mt-1 text-xl font-bold text-gray-900">Jan 2026 – May 2027</p>
                </div>
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Restoration Type</h3>
                    <p className="mt-1 text-xl font-bold text-gray-900">Frame-up Rebuild</p>
                </div>
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                        Build Complete
                    </span>
                </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed">
                    A comprehensive restoration transforming a vintage icon into a modern masterpiece.
                    Every rivet checked, every system modernized, while preserving the soul of the original design.
                </p>
            </div>
        </div>
    );
}
