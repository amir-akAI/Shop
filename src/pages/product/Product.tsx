import { ChevronDown, Heart, RotateCcw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import { useShopContext } from "../../context/ShopContext";
import { getSingleProduct } from "../../sevices/Api";
import type { productTyps } from "../../types/server";

function Product() {
    const params = useParams<{ id: string }>();

    const { IncreaseQty, DcreaseQty, ProductQty, DeleteItem } = useShopContext();

    const [singlePro, setSinglePro] = useState<productTyps>();

    const [favorite, setFavorite] = useState(false);

    const [openSection, setOpenSection] = useState<string | null>("details");

    const productId = parseInt(params.id as string);


    useEffect(() => {
        getSingleProduct(params.id as string).then((result) => {
            setSinglePro(result);
        });
    }, [params.id]);

    /* بررسی Wishlist */
    useEffect(() => {
        const wishlist = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
        );

        const exists = wishlist.some(
            (item: productTyps) =>
                String(item.id) === String(params.id)
        );

        setFavorite(exists);
    }, [params.id]);

    /* اضافه / حذف از Wishlist */
    const toggleFavorite = () => {
        if (!singlePro) return;

        const wishlist: productTyps[] = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
        );

        const exists = wishlist.some(
            (item) =>
                String(item.id) === String(singlePro.id)
        );

        let newWishlist: productTyps[];

        if (exists) {
            newWishlist = wishlist.filter(
                (item) =>
                    String(item.id) !== String(singlePro.id)
            );

            setFavorite(false);
        } else {
            newWishlist = [...wishlist, singlePro];

            setFavorite(true);
        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(newWishlist)
        );

        window.dispatchEvent(
            new Event("wishlistChanged")
        );
    };

    /* دسته‌بندی فارسی */
    const categoryNames: Record<string, string> = {
        Furniture: "مبلمان",
        Ceramics: "سرامیک",
        Lighting: "روشنایی",
        Textiles: "منسوجات",
    };

    const categoryName =
        categoryNames[singlePro?.category || ""] ||
        singlePro?.category;

    const quantity = ProductQty(productId);

    /* بخش‌های توضیحات */
    const toggleSection = (section: string) => {
        setOpenSection(
            openSection === section ? null : section
        );
    };



    if (!singlePro) {

        return (
            <div className="min-h-screen bg-[#faf8f4]" dir="rtl">

                <Container>
                    <div className="flex min-h-[500px] items-center justify-center">
                        <p className="text-gray-500">
                            در حال بارگذاری محصول...
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#faf8f4] px-6 sm:px-10 py-6 sm:py-10" dir="rtl">

            <Container>

                {/* مسیر صفحه */}
                <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/store" className="transition hover:text-gray-900">
                        فروشگاه
                    </Link>

                    <span>/</span>

                    <span className="text-gray-900">
                        {singlePro.title}
                    </span>
                </div>


                {/* محصول */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

                    <div>
                        <div className="group relative aspect-square overflow-hidden rounded-xl bg-[#f2dfc8]">

                            <img src={singlePro.image} alt={singlePro.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]" />

                            {/* برچسب */}
                            <span className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs text-gray-700 shadow-sm backdrop-blur">
                                {categoryName}
                            </span>

                            {/* قلب */}
                            <button type="button" onClick={toggleFavorite} aria-label="افزودن به علاقه‌مندی‌ها" className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105">

                                <Heart size={21} className={ favorite ? "fill-red-500 text-red-500" : "text-gray-700"} />

                            </button>
                        </div>

                        {/* تصاویر کوچک */}
                        <div className="mt-3 grid grid-cols-4 gap-3">

                            {[1, 2, 3, 4].map(
                                (number, index) => (
                                    <button
                                        key={number}
                                        type="button"
                                        className={`aspect-square overflow-hidden rounded-lg bg-[#f2dfc8] ${index === 0
                                                ? "ring-2 ring-gray-900 ring-offset-2"
                                                : ""
                                            }`}>
                                        <img
                                            src={singlePro.image}
                                            alt={singlePro.title}
                                            className="h-full w-full object-cover"/>
                                    </button>
                                )
                            )}

                        </div>
                    </div>

                    {/* ================= اطلاعات ================= */}
                    <div className="flex flex-col">

                        {/* دسته بندی */}
                        <p className="text-xs tracking-[0.2em] text-gray-500">
                            {categoryName}
                        </p>

                        {/* عنوان */}
                        <h1 className="mt-2 font-serif text-3xl leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            {singlePro.title}
                        </h1>

                        {/* امتیاز */}
                        <div className="mt-4 flex items-center gap-3">

                            <div className="flex text-yellow-500">
                                ★★★★★
                            </div>

                            <span className="text-sm text-gray-500">
                                4.8 از 5
                            </span>

                            <span className="text-sm text-gray-400">
                                (124 نظر)
                            </span>

                        </div>

                        {/* قیمت */}
                        <div className="mt-6 flex items-center gap-3">

                            <span className="text-3xl font-semibold text-gray-900">
                                {singlePro.price.toLocaleString()} $
                            </span>

                        </div>

                        {/* موجودی */}
                        <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                            <span className="h-2 w-2 rounded-full bg-green-500" />

                            <span>
                                موجود است، آماده ارسال
                            </span>
                        </div>

                        {/* توضیحات */}
                        <p className="mt-6 text-sm leading-7 text-gray-600">
                            {singlePro.description}
                        </p>

                        {/* خط */}
                        <div className="my-6 border-t border-gray-200" />

                        {/* خرید */}
                        <div className="flex flex-col gap-3 sm:flex-row">

                            {/* تعداد */}
                            <div className="flex h-12 items-center justify-center overflow-hidden rounded-lg border border-gray-300 sm:w-36">

                                <button
                                    type="button"
                                    onClick={() =>
                                        IncreaseQty(productId)
                                    }
                                    className="flex h-full w-12 items-center justify-center text-gray-700 transition hover:bg-gray-100"
                                >
                                    +
                                </button>

                                <span className="flex h-full flex-1 items-center justify-center border-x border-gray-300 text-sm">
                                    {quantity || 1}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        DcreaseQty(productId)
                                    }
                                    disabled={quantity === 0}
                                    className="flex h-full w-12 items-center justify-center text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    −
                                </button>

                            </div>

                            {/* افزودن */}
                            <Button
                                varient="primary"
                                className="h-12! flex-1! "
                                onClick={() =>
                                    IncreaseQty(productId)
                                }
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <ShoppingBag size={18} />

                                    {quantity > 0
                                        ? `افزودن یک عدد دیگر`
                                        : "افزودن به سبد خرید"}
                                </span>
                            </Button>

                            {/* علاقه مندی */}
                            <button
                                type="button"
                                onClick={toggleFavorite}
                                className="flex h-12 w-full items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-100 sm:w-12"
                            >
                                <Heart
                                    size={19}
                                    className={
                                        favorite
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-700"
                                    }
                                />
                            </button>

                        </div>

                        {/* حذف از سبد */}
                        {quantity > 0 && (
                            <button
                                type="button"
                                onClick={() =>
                                    DeleteItem(productId)
                                }
                                className="mt-3 text-center text-sm text-red-500 transition hover:text-red-700"
                            >
                                حذف محصول از سبد خرید
                            </button>
                        )}

                        {/* مزایا */}
                        <div className="mt-7 grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-3">

                            <div className="flex items-center gap-3">
                                <Truck
                                    size={20}
                                    className="shrink-0 text-orange-500"
                                />

                                <div>
                                    <p className="text-xs font-medium">
                                        ارسال رایگان
                                    </p>

                                    <p className="mt-1 text-[11px] text-gray-500">
                                        سفارش‌های بالای ۱۵۰ دلار
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <RotateCcw
                                    size={20}
                                    className="shrink-0 text-orange-500"
                                />

                                <div>
                                    <p className="text-xs font-medium">
                                        مرجوعی آسان
                                    </p>

                                    <p className="mt-1 text-[11px] text-gray-500">
                                        تا ۳۰ روز
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <ShieldCheck
                                    size={20}
                                    className="shrink-0 text-orange-500"
                                />

                                <div>
                                    <p className="text-xs font-medium">
                                        ضمانت محصول
                                    </p>

                                    <p className="mt-1 text-[11px] text-gray-500">
                                        ضمانت کیفیت
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* ================= اطلاعات بیشتر ================= */}
                        <div className="mt-7 border-t border-gray-200">

                            {/* جزئیات */}
                            <button
                                type="button"
                                onClick={() =>
                                    toggleSection("details")
                                }
                                className="flex w-full items-center justify-between border-b border-gray-200 py-5 text-right"
                            >
                                <span className="text-sm font-medium">
                                    جزئیات و مشخصات
                                </span>

                                <ChevronDown
                                    size={18}
                                    className={`transition-transform ${openSection ===
                                            "details"
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                />
                            </button>

                            {openSection === "details" && (
                                <div className="border-b border-gray-200 pb-5 pt-4 text-sm leading-7 text-gray-500">
                                    <div className="grid grid-cols-2 gap-3">
                                        <span>
                                            دسته‌بندی
                                        </span>

                                        <span className="text-left text-gray-900">
                                            {categoryName}
                                        </span>

                                        <span>
                                            شناسه محصول
                                        </span>

                                        <span className="text-left text-gray-900">
                                            #{singlePro.id}
                                        </span>

                                        <span>
                                            وضعیت
                                        </span>

                                        <span className="text-left text-green-600">
                                            موجود
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* ارسال */}
                            <button
                                type="button"
                                onClick={() =>
                                    toggleSection("shipping")
                                }
                                className="flex w-full items-center justify-between border-b border-gray-200 py-5 text-right"
                            >
                                <span className="text-sm font-medium">
                                    ارسال و مرجوعی
                                </span>

                                <ChevronDown
                                    size={18}
                                    className={`transition-transform ${openSection ===
                                            "shipping"
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                />
                            </button>

                            {openSection === "shipping" && (
                                <div className="border-b border-gray-200 pb-5 pt-4 text-sm leading-7 text-gray-500">
                                    ارسال سفارش پس از ثبت خرید
                                    انجام می‌شود. در صورت
                                    وجود مشکل در محصول، امکان
                                    مرجوع کردن آن تا ۳۰ روز
                                    وجود دارد.
                                </div>
                            )}

                            {/* نگهداری */}
                            <button
                                type="button"
                                onClick={() =>
                                    toggleSection("care")
                                }
                                className="flex w-full items-center justify-between border-b border-gray-200 py-5 text-right"
                            >
                                <span className="text-sm font-medium">
                                    نحوه نگهداری
                                </span>

                                <ChevronDown
                                    size={18}
                                    className={`transition-transform ${openSection === "care"
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                />
                            </button>

                            {openSection === "care" && (
                                <div className="border-b border-gray-200 pb-5 pt-4 text-sm leading-7 text-gray-500">
                                    برای حفظ کیفیت محصول،
                                    آن را در محیط خشک و
                                    دور از رطوبت مستقیم
                                    نگهداری کنید.
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Product;