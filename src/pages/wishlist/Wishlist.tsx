
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import type { productTyps } from "../../types/server";
import { useShopContext } from "../../context/ShopContext";

import {
    getWishlist,
    removeFromWishlist,
    clearWishlist,
} from "../../components/utils/wishlist";

function Wishlist() {

    const [wishlist, setWishlist] = useState<productTyps[]>([]);

    const { IncreaseQty } = useShopContext();

    // دریافت Wishlist
    useEffect(() => {

        const loadWishlist = () => {
            setWishlist(getWishlist());
        };

        loadWishlist();

        window.addEventListener(
            "wishlistChanged",
            loadWishlist
        );

        return () => {
            window.removeEventListener(
                "wishlistChanged",
                loadWishlist
            );
        };

    }, []);

    // حذف محصول
    const handleRemove = (
        id: string | number
    ) => {

        removeFromWishlist(id);

        setWishlist((current) =>
            current.filter(
                (product) =>
                    String(product.id) !== String(id)
            )
        );
    };

    // حذف همه
    const handleClear = () => {

        clearWishlist();

        setWishlist([]);
    };

    // دسته‌بندی فارسی
    const categoryNames: Record<string, string> = {
        Furniture: "مبلمان",
        Ceramics: "سرامیک",
        Lighting: "روشنایی",
        Textiles: "منسوجات",
    };

    return (
        <main
            className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 mt-22"
            dir="rtl"
        >

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        <div className="mb-2 flex items-center gap-2">

                            <Heart
                                size={24}
                                className="fill-red-500 text-red-500"
                            />

                            <span className="text-sm text-gray-500">
                                علاقه‌مندی‌های شما
                            </span>

                        </div>

                        <h1 className="text-2xl font-bold sm:text-3xl">
                            لیست علاقه‌مندی‌ها
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            {wishlist.length} محصول در لیست شما قرار دارد
                        </p>

                    </div>

                    {wishlist.length > 0 && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="flex w-fit items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
                        >
                            <Trash2 size={16} />
                            حذف همه
                        </button>
                    )}

                </div>


                {/* Empty */}
                {wishlist.length === 0 ? (

                    <div className="flex min-h-[450px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 text-center">

                        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">

                            <Heart
                                size={38}
                                className="text-red-400"
                            />

                        </div>

                        <h2 className="text-xl font-semibold">
                            لیست علاقه‌مندی‌های شما خالی است
                        </h2>

                        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                            محصولاتی که دوست دارید را با زدن علامت قلب
                            به این لیست اضافه کنید تا همیشه به آن‌ها دسترسی داشته باشید.
                        </p>

                        <Link
                            to="/store"
                            className="mt-6 rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            مشاهده محصولات
                        </Link>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {wishlist.map((product) => {

                            const category =
                                categoryNames[product.category] ||
                                product.category;

                            return (
                                <article
                                    key={product.id}
                                    className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                >

                                    {/* Image */}
                                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">

                                        <Link
                                            to={`/product/${product.id}`}
                                            className="block h-full"
                                        >

                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />

                                        </Link>

                                        {/* Category */}
                                        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs text-gray-700 shadow-sm">
                                            {category}
                                        </span>

                                        {/* Remove */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemove(product.id)
                                            }
                                            aria-label="حذف از علاقه‌مندی‌ها"
                                            className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm transition hover:scale-110 hover:bg-red-50"
                                        >
                                            <Heart
                                                size={18}
                                                className="fill-red-500"
                                            />
                                        </button>

                                    </div>


                                    {/* Content */}
                                    <div className="p-4">

                                        <div className="flex items-start justify-between gap-3">

                                            <Link
                                                to={`/product/${product.id}`}
                                                className="font-medium leading-6 transition hover:text-gray-500"
                                            >
                                                {product.title}
                                            </Link>

                                            <span className="shrink-0 font-semibold">
                                                ${product.price}
                                            </span>

                                        </div>

                                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                                            {product.description}
                                        </p>


                                        {/* Actions */}
                                        <div className="mt-4 flex gap-2">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    IncreaseQty(
                                                        Number(product.id)
                                                    )
                                                }
                                                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-black px-3 py-2.5 text-xs font-medium text-white transition hover:bg-gray-800"
                                            >
                                                <ShoppingBag size={16} />
                                                افزودن به سبد
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemove(product.id)
                                                }
                                                className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                                                aria-label="حذف محصول"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                        </div>

                                    </div>

                                </article>
                            );
                        })}

                    </div>

                )}

            </div>

        </main>
    );
}

export default Wishlist;

