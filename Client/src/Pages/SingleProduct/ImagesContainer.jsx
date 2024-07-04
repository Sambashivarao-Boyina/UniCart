import { Carousel } from "@material-tailwind/react";

export default function ImagesContainer({images}){
    return (
        <Carousel color="black" loop={true} autoplay={true} className="rounded-xl  flex-1 my-4 h-96  ">
            {
                images.map((image,idx)=><img
                    key={idx}
                    src={image}
                    alt="image 1"
                    className="h-full  m-auto object-contain object-center"
                />)
            }
        </Carousel>
    )
}