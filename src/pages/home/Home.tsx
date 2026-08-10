import { Footer } from "../../components/footer/Footer";
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
            <div className="w-[80%] gap-x-2 m-auto mt-32">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 ">
                    <ProductCard/>
                </div>
                <p>more -</p>
            </div>

            <div className="min-h-screen flex items-center justify-center p-4">

                <Slider
                    images={images}
                    autoPlay={true}
                    interval={4000}
                />
            </div>
            <Footer />
        </>

    )
}


export default Home