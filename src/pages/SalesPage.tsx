import HeroGallery from '../components/sales/HeroGallery';
import BuildOverview from '../components/sales/BuildOverview';
import BuildTimeline from '../components/sales/BuildTimeline';

export default function SalesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HeroGallery />
            <BuildOverview />
            <BuildTimeline />
        </div>
    )
}
