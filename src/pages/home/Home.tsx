import { Footer } from "../../components/footer/Footer";
import Slider from "../../components/slider/Slider";



function Home() {

    const images = [
        "https://id-preview--1a5938b7-f1d6-4103-9eb8-b127ec29deb4.lovable.app/shop?category=ceramics",
        "https://id-preview--1a5938b7-f1d6-4103-9eb8-b127ec29deb4.lovable.app/shop?category=ceramics",
        "https://id-preview--1a5938b7-f1d6-4103-9eb8-b127ec29deb4.lovable.app/shop?category=ceramics",
    ];

    return (
        <>
            
            <div className="min-h-screen flex items-center justify-center p-4">
                <Slider
                    images={images}
                    autoPlay={true}
                    interval={4000}
                />
            </div>
            <Footer/>
        </>

    )
}


export default Home