import { Link } from "react-router-dom";
import WishListIcon from "../UserPages/WishList/WishListIcon";

export default function Product({product}){
    return (
        <div className="w-70 sm:w-96 flex flex-col border p-2 border-gray-400 bg-red  m-4  rounded-lg">
            <div className="ml-auto"><WishListIcon productId={product._id}/></div>
            <Link to={`/singleProduct/${product._id}`}>
                <div className=" h-48 flex flex-row items-center justify-center">
                    <img src={product.thumbnail} className="object-cover object-cente h-full   pb-2 rounded-t-lg" alt={product.title} /> 
                </div>
            </Link>
            
            <p className="text-xl font-bold">{product.title}</p>
            <p className="text-2xl font-extrabold">${product.price}</p>
        </div>
    )
}