import Slider from "../../components/slider/Slider";



function Home() {

    const images = [
        "https://picsum.photos/id/1018/1200/600",
        "https://picsum.photos/id/1015/1200/600",
        "https://picsum.photos/id/1019/1200/600",
    ];

    return (
        <>
            <h1>Home</h1>
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