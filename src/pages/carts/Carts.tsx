import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import CartItem from "../../components/cartItem/CartItem";
import Container from "../../components/container/Container";
import { useShopContext } from "../../context/ShopContext";
import { getSingleProduct } from "../../sevices/Api";
import type { productTyps } from "../../types/server";
import { Link } from "react-router-dom";

function Carts() {
    const { cartItems } = useShopContext();

    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        const calculatePrice = async () => {
            let total = 0;

            for (const item of cartItems) {
                const prod: productTyps = await getSingleProduct(item.id);
                total += prod.price * item.qty;
            }

            setFinalPrice(total);
        };

        calculatePrice();
    }, [cartItems]);

    return (
        <div
            className="min-h-screen bg-[#faf8f4] py-8 sm:py-10 lg:py-12"
            dir="rtl"
        >
            <Container>
                {/* عنوان */}
                <div className="mb-8">
                    <h1 className="font-serif text-3xl text-gray-900 sm:text-4xl">
                        سبد خرید
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {cartItems.length} محصول در سبد خرید شما
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    /* سبد خالی */
                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-center">
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
                            🛒
                        </div>

                        <h2 className="text-xl font-semibold text-gray-900">
                            سبد خرید شما خالی است
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            هنوز محصولی به سبد خرید اضافه نکرده‌اید.
                        </p>

                        <a
                            href="/shop"
                            className="mt-6 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            مشاهده محصولات
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
                        {/* محصولات */}
                        <div className="rounded-xl bg-white px-4 py-5 shadow-sm sm:px-6">
                            <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    محصولات سبد خرید
                                </h2>

                                <span className="text-sm text-gray-500">
                                    {cartItems.length} محصول
                                </span>
                            </div>

                            <div>
                                {cartItems.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        {...item}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* خلاصه سفارش */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
                            <h2 className="mb-6 text-xl font-semibold text-gray-900">
                                خلاصه سفارش
                            </h2>

                            {/* قیمت */}
                            <div className="space-y-4 text-sm">
                                <div className="flex items-center justify-between text-gray-600">
                                    <span>قیمت محصولات</span>

                                    <span>
                                        {finalPrice.toLocaleString()} $
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-gray-600">
                                    <span>تخفیف</span>

                                    <span>0 $</span>
                                </div>

                                <div className="flex items-center justify-between text-gray-600">
                                    <span>هزینه ارسال</span>

                                    <span className="text-xs">
                                        محاسبه هنگام ثبت سفارش
                                    </span>
                                </div>
                            </div>

                            {/* جداکننده */}
                            <div className="my-5 border-t border-gray-200" />

                            {/* قیمت نهایی */}
                            <div className="flex items-center justify-between">
                                <span className="text-base font-semibold text-gray-900">
                                    مبلغ نهایی
                                </span>

                                <span className="text-xl font-bold text-gray-900">
                                    {finalPrice.toLocaleString()} $
                                </span>
                            </div>

                            {/* دکمه */}
                            <Button
                                varient="success"
                                className="mt-6! w-full! py-3!">
                                ثبت سفارش
                            </Button>

                            {/* ادامه خرید */}
                            <Link
                                to="/store"
                                className="mt-4 block text-center text-sm text-gray-500 transition hover:text-gray-900">
                                ادامه خرید
                            </Link>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Carts;