import { Link } from "react-router-dom";

const categories = [
    {
        name: "مبلمان",
        slug: "furniture",
        image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "ظروف سرامیکی",
        slug: "ceramics",
        image:
            "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "روشنایی",
        slug: "lighting",
        image:
            "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "منسوجات",
        slug: "textiles",
        image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    },
];

export default function Categories() {
    return (
        <section
            dir="rtl"
            className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

            <div className="mb-10 text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    دسته‌بندی‌ها
                </p>

                <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
                    خرید بر اساس دسته‌بندی
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        to="/store"
                        className="group relative aspect-[4/5] overflow-hidden bg-gray-100 rounded">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>

                        <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/25" />

                        <h3 className="absolute bottom-5 right-5 font-serif text-xl text-white">
                            {category.name}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}