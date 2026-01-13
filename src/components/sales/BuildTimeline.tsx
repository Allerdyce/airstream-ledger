import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Images
import imgShell from '../../assets/1-shell-removal.jpg';
import imgFrame1 from '../../assets/2-frame-sandblast-1.jpg';
import imgFrame2 from '../../assets/2-frame-sandblast-2.jpg';
import imgInsulation from '../../assets/3-insulation.jpg';

interface Stage {
    id: string;
    title: string;
    date: string;
    category: string;
    description: string;
    images: string[];
}

const stages: Stage[] = [
    {
        id: '01',
        title: 'Shell Lift & Frame Access',
        date: 'March 2026',
        category: 'Structural',
        description: 'Shell lifted from chassis to expose frame for sandblasting, inspection, and reinforcement.',
        images: [imgShell]
    },
    {
        id: '02',
        title: 'Frame Restoration & Coating',
        date: 'April 2026',
        category: 'Structural',
        description: 'Frame sandblasted, treated, reinforced, and coated for long-term corrosion resistance.',
        images: [imgFrame1, imgFrame2]
    },
    {
        id: '03',
        title: 'Insulation & Interior Prep',
        date: 'July 2026',
        category: 'Mechanical',
        description: 'Installation of high-efficiency insulation to ensure thermal comfort and noise reduction.',
        images: [imgInsulation]
    }
];

export default function BuildTimeline() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentStageImages, setCurrentStageImages] = useState<string[]>([]);
    const [photoIndex, setPhotoIndex] = useState(0);

    const openLightbox = (images: string[], index: number) => {
        setCurrentStageImages(images);
        setPhotoIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Build Timeline</h2>
            <div className="relative border-l-2 border-gray-200 ml-3 space-y-12 pb-12">
                {stages.map((stage) => (
                    <div key={stage.id} className="relative pl-8">
                        <span className="absolute -left-[9px] top-1 h-5 w-5 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center">
                            <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        </span>
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {stage.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                            {stage.category}
                                        </span>
                                        <span className="text-sm text-gray-500">• {stage.date}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{stage.description}</p>

                            {/* Image Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {stage.images.map((imgSrc, index) => (
                                    <button
                                        key={index}
                                        onClick={() => openLightbox(stage.images, index)}
                                        className="aspect-square relative group overflow-hidden rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <img
                                            src={imgSrc}
                                            alt={`${stage.title} ${index + 1}`}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={photoIndex}
                slides={currentStageImages.map(src => ({ src }))}
            />
        </div>
    );
}
