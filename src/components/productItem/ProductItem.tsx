
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import type { productTyps } from "../../types/server";
import { useShopContext } from "../../context/ShopContext";

import {
    isInWishlist,
    toggleWishlist,
} from "../utils/wishlist";

function ProductItem(item: productTyps) {

    const [favorite, setFavorite] = useState(() =>
        isInWishlist(item.id)
    );

    const [added, setAdded] = useState(false);

    const {
        IncreaseQty,
        ProductQty,
    } = useShopContext();

    // تعداد محصول در سبد
    const quantity = ProductQty(Number(item.id));



    // دسته‌بندی فارسی
    const categoryNames: Record<string, string> = {
        Furniture: "مبلمان",
        Ceramics: "سرامیک",
        Lighting: "روشنایی",
        Textiles: "منسوجات",
    };

    const categoryName =
        categoryNames[item.category] || item.category;

    // افزودن به سبد
    const addToCart = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {

        e.preventDefault();
        e.stopPropagation();

        IncreaseQty(Number(item.id));

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1500);
    };

    // علاقه‌مندی
    const handleWishlist = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {

        e.preventDefault();
        e.stopPropagation();

        const newFavorite = !favorite;

        setFavorite(newFavorite);

        toggleWishlist(item);
    };

    // بررسی تغییر Wishlist
    useEffect(() => {

        const updateWishlist = () => {
            setFavorite(isInWishlist(item.id));
        };

        window.addEventListener(
            "wishlistChanged",
            updateWishlist
        );

        return () => {
            window.removeEventListener(
                "wishlistChanged",
                updateWishlist
            );
        };

    }, [item.id]);

    return (
        <article
            className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            dir="rtl"
        >

            {/* تصویر */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">

                <Link
                    to={`/product/${item.id}`}
                    className="block h-full"
                >

                    <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                </Link>

                {/* دسته‌بندی */}
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs text-gray-700 shadow-sm backdrop-blur-sm">
                    {categoryName}
                </span>

                {/* Wishlist */}
                <button
                    type="button"
                    onClick={handleWishlist}
                    aria-label={
                        favorite
                            ? "حذف از علاقه‌مندی‌ها"
                            : "افزودن به علاقه‌مندی‌ها"
                    }
                    className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition hover:scale-110">

                    <Heart
                        size={18}
                        className={favorite ? "fill-red-500 text-red-500" : "text-gray-700"}/>

                </button>

                {/* افزودن به سبد */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full p-3 transition-all duration-500 ease-out group-hover:translate-y-0">

                    <button
                        type="button"
                        onClick={addToCart}
                        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-white shadow-lg transition ${added
                            ? "bg-green-600"
                            : "bg-black/90 hover:bg-black"
                            }`}
                    >

                        <ShoppingBag size={17} />

                        {added
                            ? "به سبد اضافه شد"
                            : "افزودن به سبد خرید"}

                    </button>

                </div>

            </div>

            {/* اطلاعات محصول */}
            <div className="p-4">

                <div className="flex min-h-[48px] items-start justify-between gap-3">

                    <Link
                        to={`/product/${item.id}`}
                        className="font-medium leading-6 transition hover:text-gray-500"
                    >
                        {item.title}
                    </Link>

                    <span className="shrink-0 text-sm font-semibold">
                        ${item.price}
                    </span>

                </div>

                <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-5 text-gray-500">
                    {item.description}
                </p>

                {/* تعداد در سبد */}
                {quantity > 0 && (
                    <p className="mt-2 text-xs text-green-600">
                        {quantity} عدد در سبد خرید
                    </p>
                )}

            </div>

        </article>
    );
}

export default ProductItem;

