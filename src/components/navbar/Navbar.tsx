import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useShopContext } from "../../context/ShopContext";
import { Link } from "react-router-dom";


const navItems = [
    { label: "فوشگاه", href: "/store" },
    { label: "مبلمان", href: "/#" },
    { label: "سفال و سرامیک", href: "/#" },
    { label: "منسوجات", href: "/#" },
    { label: "روشنایی", href: "/#" },
    { label: "پوشاک", href: "/#" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [search, setSearch] = useState("");

    const { totalQty } = useShopContext()


    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!search.trim()) return;
        window.location.href = `/shop?search=${encodeURIComponent(search)}`;
        setSearchOpen(false);
    };

    const closeMobile = () => setMobileOpen(false);

    return (
        <header>
            {/* Shipping bar */}
            <div className="fixed top-0 w-full border-b z-50 border-black/10 bg-black px-4 py-2 text-center text-xs! text-white sm:text-sm">
                ارسال رایگان برای سفارش‌های بالای ۱۵۰ $ · امکان مرجوعی تا ۳۰ روز
            </div>

            {/* Header */}
            <div className={`fixed w-full h-14 items-center top-8 mb-96 z-50 bg-white border-b border-black/10
                 ${scrolled ? "shadow-md" : ""}`}>
                <div className=" mx-auto flex h-14! max-w-7xl items-center gap-3 px-4 sm:px-6 md:h-20 lg:px-8">
                    {/* Mobile menu */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-black/5 lg:hidden">
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    {/* Logo */}
                    <Link to="/" className="font-serif text-2xl tracking-tight sm:text-3xl">
                        Norra
                    </Link>

                    {/* Desktop navigation */}
                    <nav className="ml-8 hidden items-center gap-6 text-sm text-gray-500 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className="transition hover:text-black">
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="ml-auto flex items-center gap-1">
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            aria-label="Search"
                            className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-black/5">
                            {searchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>

                        <Link
                            to="/wishlist"
                            aria-label="Wishlist"
                            className="hidden h-10 w-10 items-center justify-center rounded-md hover:bg-black/5 sm:flex">
                            <Heart size={20} />
                        </Link>

                        <Link
                            to="/account"
                            aria-label="Account"
                            className="hidden h-10 w-10 items-center justify-center rounded-md hover:bg-black/5 sm:flex">
                            <User size={20} />
                        </Link>



                        <Link to="/carts"
                            className="relative flex h-10 w-10 items-center justify-center rounded-md hover:bg-black/5">
                            <ShoppingBag size={20} />

                            <span className="absolute w-5 h-5 bg-red-600 flex justify-center items-center rounded-full text-white -top-1 -right-1.5 text-xs">{totalQty !== 0 ? totalQty : ""}</span>
                        </Link>

                    </div>
                </div>

                {/* Search */}
                {searchOpen && (
                    <div className="border-t border-black/10 bg-white">
                        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                            <form
                                onSubmit={handleSearch}
                                className="flex items-center gap-3 rounded-lg border border-black/10 px-4 py-3">
                                <Search size={18} className="shrink-0 text-gray-500" />

                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoFocus
                                    placeholder="Search for products, brands and more"
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                                />
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile navigation */}
            {mobileOpen && (
                <div className="fixed inset-0  top-[88px] z-50 bg-white  lg:hidden">
                    <nav className="mx-auto flex max-w-7xl flex-col px-4 py-6 sm:px-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                onClick={closeMobile}
                                className="border-b border-black/10 px-2 py-4 text-base hover:bg-black/5">
                                {item.label}
                            </Link>
                        ))}

                        <Link
                            to="/account"
                            onClick={closeMobile}
                            className="mt-4 rounded-md px-2 py-3 text-sm text-gray-500 hover:bg-black/5">
                            My account
                        </Link>

                        <Link
                            to="/wishlist"
                            onClick={closeMobile}
                            className="rounded-md px-2 py-3 text-sm text-gray-500 hover:bg-black/5">
                            Wishlist
                        </Link>

                        <Link
                            to="/cart"
                            onClick={closeMobile}
                            className="rounded-md px-2 py-3 text-sm text-gray-500 hover:bg-black/5">
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
