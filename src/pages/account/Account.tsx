import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Heart,
    ShoppingBag,
    LogOut,
    Package,
    ChevronLeft,
    Edit3,
} from "lucide-react";

import { Link } from "react-router-dom";
import Container from "../../components/container/Container";

interface UserInfo {
    name: string;
    email: string;
    phone: string;
}

const defaultUser: UserInfo = {
    name: "کاربر نورا",
    email: "example@gmail.com",
    phone: "09123456789",
};

function Account() {

    const [user, setUser] = useState<UserInfo>(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : defaultUser;
    });

    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState<UserInfo>(user);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {

        setUser(form);

        localStorage.setItem(
            "user",
            JSON.stringify(form)
        );

        setEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");

        setUser(defaultUser);
        setForm(defaultUser);
    };

    return (
        <div dir="rtl" className="min-h-screen bg-gray-50 py-8 sm:py-12">

            <Container>

                {/* ================= Header ================= */}

                <div className="mb-8">

                    <p className="text-sm text-gray-500">
                        حساب کاربری
                    </p>

                    <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
                        حساب من
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        اطلاعات حساب و سفارش‌های خود را مدیریت کنید.
                    </p>

                </div>




                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">


                    {/* ================= Sidebar ================= */}

                    <aside className="lg:col-span-3">

                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

                            {/* User */}

                            <div className="flex items-center gap-3 border-b border-gray-100 pb-5">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100">

                                    <User
                                        size={22}
                                        className="text-gray-600"/>

                                </div>

                                <div className="min-w-0">

                                    <p className="truncate font-semibold">
                                        {user.name}
                                    </p>

                                    <p
                                        dir="ltr"
                                        className="truncate text-xs text-gray-500"
                                    >
                                        {user.email}
                                    </p>

                                </div>

                            </div>


                            {/* Menu */}

                            <nav className="mt-4 space-y-1">

                                <a
                                    href="#profile"
                                    className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-3 text-sm font-medium"
                                >
                                    <User size={18} />
                                    اطلاعات حساب
                                </a>

                                <a
                                    href="#orders"
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-600 transition hover:bg-gray-100"
                                >
                                    <Package size={18} />
                                    سفارش‌های من
                                </a>

                                <Link
                                    to="/wishlist"
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-600 transition hover:bg-gray-100"
                                >
                                    <Heart size={18} />
                                    علاقه‌مندی‌ها
                                </Link>

                                <a
                                    href="#address"
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-600 transition hover:bg-gray-100"
                                >
                                    <MapPin size={18} />
                                    آدرس‌ها
                                </a>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-500 transition hover:bg-red-50"
                                >
                                    <LogOut size={18} />
                                    خروج از حساب
                                </button>

                            </nav>

                        </div>

                    </aside>


                    {/* ================= Main ================= */}

                    <main className="space-y-6 lg:col-span-9">


                        {/* ================= Profile ================= */}

                        <section
                            id="profile"
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
                        >

                            <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">

                                <div>

                                    <h2 className="text-lg font-bold">
                                        اطلاعات شخصی
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">
                                        اطلاعات حساب خود را مدیریت کنید.
                                    </p>

                                </div>


                                {!editing && (
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm transition hover:bg-gray-50"
                                    >
                                        <Edit3 size={16} />
                                        ویرایش اطلاعات
                                    </button>
                                )}

                            </div>


                            {!editing ? (

                                <div className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-2">

                                    <InfoItem
                                        icon={<User size={18} />}
                                        title="نام و نام خانوادگی"
                                        value={user.name}
                                    />

                                    <InfoItem
                                        icon={<Mail size={18} />}
                                        title="ایمیل"
                                        value={user.email}
                                    />

                                    <InfoItem
                                        icon={<Phone size={18} />}
                                        title="شماره تماس"
                                        value={user.phone}
                                    />

                                </div>

                            ) : (

                                <div className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-2">

                                    <Input
                                        label="نام و نام خانوادگی"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                    />

                                    <Input
                                        label="ایمیل"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />

                                    <Input
                                        label="شماره تماس"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />

                                    <div className="flex items-end gap-2">

                                        <button
                                            onClick={handleSave}
                                            className="h-11 rounded-lg bg-black px-6 text-sm text-white transition hover:bg-gray-800"
                                        >
                                            ذخیره تغییرات
                                        </button>

                                        <button
                                            onClick={() => setEditing(false)}
                                            className="h-11 rounded-lg border border-gray-200 px-6 text-sm transition hover:bg-gray-50"
                                        >
                                            انصراف
                                        </button>

                                    </div>

                                </div>

                            )}

                        </section>


                        {/* ================= Orders ================= */}

                        <section
                            id="orders"
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
                        >

                            <div className="flex items-center justify-between border-b border-gray-100 pb-5">

                                <div>

                                    <h2 className="text-lg font-bold">
                                        سفارش‌های اخیر
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">
                                        وضعیت آخرین سفارش‌های شما
                                    </p>

                                </div>

                                <Package
                                    size={22}
                                    className="text-gray-400"
                                />

                            </div>


                            {/* Order */}

                            <div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 p-4">

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                    <div>

                                        <p className="text-sm font-semibold">
                                            هنوز سفارشی ثبت نشده است
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            محصولات مورد علاقه خود را به سبد خرید اضافه کنید.
                                        </p>

                                    </div>

                                    <Link
                                        to="/store"
                                        className="flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm text-white transition hover:bg-gray-800"
                                    >
                                        مشاهده فروشگاه
                                        <ChevronLeft size={16} />
                                    </Link>

                                </div>

                            </div>

                        </section>


                        {/* ================= Address ================= */}

                        <section
                            id="address"
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
                        >

                            <div className="flex items-center justify-between border-b border-gray-100 pb-5">

                                <div>

                                    <h2 className="text-lg font-bold">
                                        آدرس ارسال
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">
                                        آدرس پیش‌فرض برای ارسال سفارش
                                    </p>

                                </div>

                                <MapPin
                                    size={22}
                                    className="text-gray-400"
                                />

                            </div>


                            <div className="mt-5 flex items-start gap-4 rounded-lg border border-gray-100 p-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">

                                    <MapPin size={18} />

                                </div>

                                <div>

                                    <p className="font-medium">
                                        آدرس پیش‌فرض
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                        هنوز آدرسی برای ارسال سفارش ثبت نکرده‌اید.
                                    </p>

                                    <button
                                        className="mt-3 text-sm font-medium underline underline-offset-4"
                                    >
                                        افزودن آدرس
                                    </button>

                                </div>

                            </div>

                        </section>


                        {/* ================= Quick Links ================= */}

                        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <Link
                                to="/wishlist"
                                className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >

                                <div className="flex items-center gap-4">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-500">

                                        <Heart size={20} />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold">
                                            علاقه‌مندی‌ها
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-500">
                                            محصولات ذخیره‌شده
                                        </p>

                                    </div>

                                </div>

                                <ChevronLeft
                                    size={18}
                                    className="text-gray-400 transition group-hover:-translate-x-1"
                                />

                            </Link>


                            <Link
                                to="/carts"
                                className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >

                                <div className="flex items-center gap-4">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">

                                        <ShoppingBag size={20} />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold">
                                            سبد خرید
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-500">
                                            مشاهده محصولات سبد خرید
                                        </p>

                                    </div>

                                </div>

                                <ChevronLeft
                                    size={18}
                                    className="text-gray-400 transition group-hover:-translate-x-1"
                                />

                            </Link>

                        </section>

                    </main>

                </div>

            </Container>

        </div>
    );
}


/* ================= Info Item ================= */

interface InfoItemProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}

function InfoItem({
    icon,
    title,
    value,
}: InfoItemProps) {

    return (
        <div className="flex items-center gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                {icon}
            </div>

            <div className="min-w-0">

                <p className="text-xs text-gray-400">
                    {title}
                </p>

                <p className="mt-1 truncate text-sm font-medium">
                    {value}
                </p>

            </div>

        </div>
    );
}


/* ================= Input ================= */

interface InputProps {
    label: string;
    name: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    type?: string;
}

function Input({
    label,
    name,
    value,
    onChange,
    type = "text",
}: InputProps) {

    return (
        <div>

            <label className="mb-2 block text-sm font-medium">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-black focus:bg-white"
            />

        </div>
    );
}

export default Account;