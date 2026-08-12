import type { productTyps } from "../../types/server";


const WISHLIST_KEY = "wishlist";

export function getWishlist(): productTyps[] {
    try {
        const wishlist = localStorage.getItem(WISHLIST_KEY);

        return wishlist ? JSON.parse(wishlist) : [];
    } catch {
        return [];
    }
}

export function isInWishlist(id: string | number): boolean {
    return getWishlist().some(
        (product) => String(product.id) === String(id)
    );
}

export function addToWishlist(product: productTyps) {
    const wishlist = getWishlist();

    const exists = wishlist.some(
        (item) => String(item.id) === String(product.id)
    );

    if (!exists) {
        const newWishlist = [...wishlist, product];

        localStorage.setItem(
            WISHLIST_KEY,
            JSON.stringify(newWishlist)
        );

        window.dispatchEvent(new Event("wishlistChanged"));
    }
}

export function removeFromWishlist(id: string | number) {
    const wishlist = getWishlist();

    const newWishlist = wishlist.filter(
        (product) =>
            String(product.id) !== String(id)
    );

    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(newWishlist)
    );

    window.dispatchEvent(new Event("wishlistChanged"));
}

export function toggleWishlist(product: productTyps) {
    if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
    } else {
        addToWishlist(product);
    }
}

export function clearWishlist() {
    localStorage.removeItem(WISHLIST_KEY);

    window.dispatchEvent(new Event("wishlistChanged"));
}

