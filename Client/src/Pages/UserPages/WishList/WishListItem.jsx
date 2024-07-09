import React from 'react'
import {Link} from "react-router-dom"
import WishListIcon from './WishListIcon'

export default function WishListItem({wishlistItem}) {
    return (
        <div className="w-80 sm:w-96 bg-[#eceaf4] flex flex-col border p-2 border-gray-100 bg-red  m-4  rounded-lg shadow-md hover:shadow-xl duration-200 ">
            <div className="ml-auto"><WishListIcon productId={wishlistItem._id}/></div>
            <Link to={`/products/${wishlistItem._id}`}>
                <div className=" h-48 flex flex-row items-center justify-center">
                    <img src={wishlistItem.thumbnail} className="object-cover object-cente h-full   pb-2 rounded-t-lg" alt={wishlistItem.title} /> 
                </div>
            </Link>
            
            <p className="text-xl font-bold">{wishlistItem.title}</p>
            <p className="text-2xl font-extrabold">${wishlistItem.price}</p>
        </div>
    )
}
