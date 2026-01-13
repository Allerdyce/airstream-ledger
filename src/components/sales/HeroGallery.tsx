import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Grid } from 'lucide-react';

// Images
import img1 from '../../assets/featured/1.png';
import img2 from '../../assets/featured/2.png';
import img3 from '../../assets/featured/3.png';
import img4 from '../../assets/featured/4.png';
import img5 from '../../assets/featured/5.png';
import img6 from '../../assets/featured/6.png';
import img7 from '../../assets/featured/7.png';

const images = [img1, img2, img3, img4, img5, img6, img7];

export default function HeroGallery() {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const openLightbox = (i: number) => {
        setIndex(i);
        setOpen(true);
    };

    return (
        <div className="mb-12 relative rounded-xl overflow-hidden shadow-sm">
            {/* Desktop Grid (Bento Style) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[500px]">
                {/* Main Hero Image */}
                <div
                    className="md:col-span-2 md:row-span-2 relative cursor-pointer group"
                    onClick={() => openLightbox(0)}
                >
                    <img
                        src={images[0]}
                        alt="Featured 1"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Secondary Images */}
                <div className="hidden md:contents">
                    {images.slice(1, 5).map((img, i) => (
                        <div
                            key={i}
                            className="relative cursor-pointer group overflow-hidden"
                            onClick={() => openLightbox(i + 1)}
                        >
                            <img
                                src={img}
                                alt={`Featured ${i + 2}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Button to Show All (visible on top of images) */}
            <button
                onClick={() => openLightbox(0)}
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-900 border border-black/10 px-4 py-2 rounded-lg text-sm font-medium shadow-sm flex items-center gap-2 backdrop-blur-sm transition-colors"
            >
                <Grid className="w-4 h-4" />
                Show all photos
            </button>

            {/* Lightbox */}
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={images.map(src => ({ src }))}
            />
        </div>
    );
}
