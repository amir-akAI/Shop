import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section dir="rtl" className="relative min-h-[70vh] overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80"
                alt="فضای داخلی مدرن"
                className="absolute inset-0 h-full w-full object-cover blur-xs"
            />

            <div className="absolute inset-0 bg-black/25" />

            <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-end px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-xl text-white">
                    <p className="mb-4 text-xs uppercase tracking-[0.3em]">
                        مجموعه جدید
                    </p>

                    <h1 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                        انتخاب‌هایی زیبا برای زندگی روزمره
                    </h1>

                    <p className="mt-5 max-w-md text-sm leading-6 text-white/80">
                        مجموعه‌ای از مبلمان و لوازم دکوراسیون با طراحی ساده،
                        ماندگار و مناسب برای زندگی مدرن.
                    </p>

                    <Link
                        to="/store"
                        className="mt-7 rounded inline-flex bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-100">
                        مشاهده مجموعه
                    </Link>
                </div>
            </div>
        </section>
    );
}