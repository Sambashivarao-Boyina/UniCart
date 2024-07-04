import { Link } from "react-router-dom";
import WishListIcon from "../UserPages/WishList/WishListIcon";
import {Rating} from "@mui/material"



export default function Product({product}){
    return (
        <div className="w-80 sm:w-96 bg-white flex flex-col border p-2 border-gray-400 bg-red  m-4  rounded-lg hover:scale-110 duration-300">
            <div className="ml-auto"><WishListIcon productId={product._id}/></div>
            <Link to={`/singleProduct/${product._id}`}>
                <div className=" h-48 flex flex-row items-center justify-center">
                    <img src={product.thumbnail} className="object-cover object-cente h-full overflow-hidden  pb-2 rounded-t-lg " alt={product.title} /> 
                </div>
            </Link>
            <p className="text-xl font-bold">{product.title}</p>
            <div className="flex flex-row w-full">
                <div>
                    <p><span className="text-3xl font-bold">${(product.actualPrice).toFixed(2)}</span><span className="line-through text-gray-600 text-lg ml-1">${product.price}</span></p>
                    <p className="font-medium text-green-800  text-md">{product.discountPercentage}% off</p>
                </div>
                <div className="self-end ml-auto">
                    {
                        product.reviews && product.reviews.length>0 && <p className="flex items-end "><Rating  value={product.averageRating} precision={0.5}  readOnly /> </p>
                    }
                </div>
           </div>
        </div>
    )
}