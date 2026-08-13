import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useShopContext } from "../../context/ShopContext";
import { getSingleProduct } from "../../sevices/Api";
import type { productTyps } from "../../types/server";

interface ICartItem {
    id: number;
    qty: number;
}

function CartItem({ ...item }: ICartItem) {
    const {
        IncreaseQty,
        DcreaseQty,
        ProductQty,
        DeleteItem,
    } = useShopContext();

    const [prod, setProd] = useState<productTyps>();

    useEffect(() => {
        getSingleProduct(item.id).then((item) => {
            setProd(item);
        });
    });

    return (
        <div className="border-b border-gray-200 py-5 last:border-b-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {/* تصویر */}
                <Link
                    to={`/product/${item.id}`}
                    className="block shrink-0 overflow-hidden rounded-lg bg-gray-100"
                >
                    <img
                        className="h-36 w-full object-cover transition duration-300 hover:scale-105 sm:h-40 sm:w-40"
                        src={prod?.image}
                        alt={prod?.title}
                    />
                </Link>

                {/* اطلاعات */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="mb-1 text-xs tracking-widest text-gray-500">
                                {prod?.category}
                            </p>

                            <Link
                                to={`/product/${item.id}`}
                                className="text-base font-medium text-gray-900 transition hover:text-gray-500 sm:text-lg"
                            >
                                {prod?.title}
                            </Link>
                        </div>

                        <span className="shrink-0 text-base font-semibold text-gray-900">
                            {prod?.price.toLocaleString()} $
                        </span>
                    </div>

                    {/* کنترل تعداد و حذف */}
                    <div className="mt-6 flex items-center justify-between gap-3">
                        <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                            <button
                                type="button"
                                onClick={() => {
                                    IncreaseQty(item.id);
                                }}
                                className="flex h-10 w-10 items-center justify-center text-gray-700 transition hover:bg-gray-100"
                                aria-label="افزایش تعداد"
                            >
                                <Plus size={16} />
                            </button>

                            <span className="flex h-10 min-w-10 items-center justify-center border-x border-gray-200 text-sm">
                                {ProductQty(item.id)}
                            </span>

                            <button
                                type="button"
                                onClick={() => {
                                    DcreaseQty(item.id);
                                }}
                                className="flex h-10 w-10 items-center justify-center text-gray-700 transition hover:bg-gray-100"
                                aria-label="کاهش تعداد"
                            >
                                <Minus size={16} />
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                DeleteItem(item.id);
                            }}
                            className="flex items-center gap-2 text-sm text-gray-500 transition hover:text-red-500"
                        >
                            <Trash2 size={16} />
                            حذف
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;