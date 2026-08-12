import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Container from "../../components/container/Container";
import ProductItem from "../../components/productItem/ProductItem";
import { getProducts } from "../../sevices/Api";
import type { productTyps } from "../../types/server";

function Store() {
    const [products, setProducts] = useState<productTyps[]>([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sort, setSort] = useState("default");

    useEffect(() => {
        getProducts().then((result) => {
            setProducts(result);
        });
    }, []);

    // فیلتر و مرتب‌سازی محصولات
    const filteredProducts = useMemo(() => {
        const result = products.filter((product) => {

            const searchMatch = product.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const categoryMatch =
                category === "all" ||
                product.category === category;

            const priceMatch =
                product.price <= maxPrice;

            return (
                searchMatch &&
                categoryMatch &&
                priceMatch
            );
        });

        if (sort === "low") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sort === "high") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [
        products,
        search,
        category,
        maxPrice,
        sort,
    ]);

    // حذف همه فیلترها
    const clearFilters = () => {
        setSearch("");
        setCategory("all");
        setMaxPrice(1000);
        setSort("default");
    };

    return (
        <div dir="rtl">
            <Container>

                {/* عنوان صفحه */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h1 className="text-2xl font-semibold">
                            جدیدترین محصولات
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            {filteredProducts.length} محصول
                        </p>
                    </div>

                    {/* مرتب سازی */}
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm outline-none"
                    >
                        <option value="default">
                            مرتب‌سازی
                        </option>

                        <option value="low">
                            ارزان‌ترین
                        </option>

                        <option value="high">
                            گران‌ترین
                        </option>
                    </select>

                </div>


                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">


                    {/* ================= فیلتر ================= */}

                    <aside className="h-fit rounded-lg border border-gray-200 bg-white p-5">

                        <div className="mb-6 flex items-center justify-between">

                            <h2 className="font-semibold">
                                فیلتر محصولات
                            </h2>

                            <button
                                onClick={clearFilters}
                                className="text-xs text-gray-500 underline hover:text-black"
                            >
                                حذف فیلترها
                            </button>

                        </div>


                        {/* جستجو */}

                        <div className="mb-6 border-b border-gray-200 pb-6">

                            <h3 className="mb-3 text-sm font-medium">
                                جستجو
                            </h3>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="نام محصول..."
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                            />

                        </div>


                        {/* دسته بندی */}

                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="mb-4 text-sm font-medium">
                                دسته‌بندی
                            </h3>

                            <div className="space-y-3">

                                {/* همه */}
                                <label className="flex cursor-pointer items-center gap-3 text-sm">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={category === "all"}
                                        onChange={() => setCategory("all")}
                                        className="h-4 w-4"
                                    />

                                    همه محصولات
                                </label>


                                {/* مبلمان */}
                                <label className="flex cursor-pointer items-center gap-3 text-sm">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={category === "Furniture"}
                                        onChange={() => setCategory("Furniture")}
                                        className="h-4 w-4"
                                    />

                                    مبلمان
                                </label>


                                {/* سرامیک */}
                                <label className="flex cursor-pointer items-center gap-3 text-sm">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={category === "Ceramics"}
                                        onChange={() => setCategory("Ceramics")}
                                        className="h-4 w-4"
                                    />

                                    سرامیک
                                </label>


                                {/* روشنایی */}
                                <label className="flex cursor-pointer items-center gap-3 text-sm">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={category === "Lighting"}
                                        onChange={() => setCategory("Lighting")}
                                        className="h-4 w-4"
                                    />

                                    روشنایی
                                </label>


                                {/* منسوجات */}
                                <label className="flex cursor-pointer items-center gap-3 text-sm">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={category === "Textiles"}
                                        onChange={() => setCategory("Textiles")}
                                        className="h-4 w-4"
                                    />

                                    منسوجات
                                </label>

                            </div>
                        </div>

                        {/* قیمت */}

                        <div className="border-b border-gray-200 py-6">

                            <div className="mb-4 flex items-center justify-between">

                                <h3 className="text-sm font-medium">
                                    محدوده قیمت
                                </h3>

                                <span className="text-sm text-gray-500">
                                    تا ${maxPrice}
                                </span>

                            </div>


                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="10"
                                value={maxPrice}
                                onChange={(e) =>
                                    setMaxPrice(
                                        Number(e.target.value)
                                    )
                                }
                                className="w-full cursor-pointer"
                            />


                            <div className="mt-2 flex justify-between text-xs text-gray-400">

                                <span>$0</span>

                                <span>$1000</span>

                            </div>

                        </div>


                        {/* Checkbox ها */}

                        <div className="pt-6">

                            <h3 className="mb-4 text-sm font-medium">
                                گزینه‌های بیشتر
                            </h3>

                            <div className="space-y-4">

                                <label className="flex cursor-pointer items-center gap-3 text-sm">

                                    <input
                                        type="checkbox"
                                        className="h-4 w-4"
                                    />

                                    فقط محصولات محبوب

                                </label>


                                <label className="flex cursor-pointer items-center gap-3 text-sm">

                                    <input
                                        type="checkbox"
                                        className="h-4 w-4"
                                    />

                                    نمایش محصولات جدید

                                </label>


                                <label className="flex cursor-pointer items-center gap-3 text-sm">

                                    <input
                                        type="checkbox"
                                        className="h-4 w-4"
                                    />

                                    محصولات پیشنهادی

                                </label>

                            </div>

                        </div>

                    </aside>


                    {/* ================= محصولات ================= */}

                    <div>

                        {filteredProducts.length > 0 ? (

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                {filteredProducts.map((item) => (
                                    <ProductItem {...item} />
                                ))}

                            </div>

                        ) : (

                            <div className="flex min-h-[300px] items-center justify-center">

                                <p className="text-gray-500">
                                    محصولی پیدا نشد.
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </Container>
        </div>
    );
}

export default Store;