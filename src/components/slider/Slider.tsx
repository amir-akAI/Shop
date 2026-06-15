import { useEffect, useState } from "react";

interface SliderProps {
    images: string[];
    autoPlay?: boolean;
    interval?: number;
}

const Slider = ({
    images,
    autoPlay = true,
    interval = 3000,
}: SliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(nextSlide, interval);

        return () => clearInterval(timer);
    }, [currentIndex, autoPlay, interval]);

    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-lg">
            {/* Slides */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`slide-${index}`}
                        className="w-full h-62.5 sm:h-87.5 md:h-112.5 object-cover shrink-0"
                    />
                ))}
            </div>

            {/* Previous Button */}
            <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition"
            >
                ❮
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition"
            >
                ❯
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition ${currentIndex === index
                                ? "bg-white"
                                : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;