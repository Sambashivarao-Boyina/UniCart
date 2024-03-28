import { Carousel } from "@material-tailwind/react";

export default function ImagesContainer({images}){
    return (
        <Carousel loop={true} autoplay={true} className="rounded-xl sm:w-3/4 w-[97%] my-4 h-96 ">
            {
                images.map((image,idx)=><img
                    key={idx}
                    src={image}
                    alt="image 1"
                    className="h-full m-auto object-cover object-center"
                />)
            }
        </Carousel>
    )
}