import { Link } from "react-router-dom";
import Categories from "../../components/home/Categories";
import Hero from "../../components/home/Hero";
import ProductCard from "../../components/home/ProductCard";
import Slider from "../../components/slider/Slider";



function Home() {

    const images = [
        "https://id-preview--1a5938b7-f1d6-4103-9eb8-b127ec29deb4.lovable.app/shop?category=ceramics",
        "https://id-preview--1a5938b7-f1d6-4103-9eb8-b127ec29deb4.lovable.app/shop?category=ceramics",
        "https://id-preview--1a5938b7-f1d6-4103-9eb8-b127ec29deb4.lovable.app/shop?category=ceramics",
    ];



    return (
        <>
            <Hero />
            <Categories />

            <div className="w-[80%] gap-x-2 m-auto mt-32" >
                <p dir="rtl"
                    className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    گلچین‌ شده
                </p>

                <div className="flex items-center justify-between">
                    <Link
                        to="/store"
                        className="hidden shrink-0 text-sm text-foreground sm:inline">
                        مشاهده همه  →
                    </Link>

                    <h2
                        dir="rtl"
                        className="mt-1 mb-8 text-2xl md:text-4xl">
                        ویژه این فصل
                    </h2>


                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 ">

                    <ProductCard />
                </div>
            </div>

            <div className="min-h-screen flex items-center justify-center p-4">

                <Slider
                    images={images}
                    autoPlay={true}
                    interval={4000}
                />
            </div>
        </>

    )
}


export default Home