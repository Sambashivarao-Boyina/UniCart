import React from 'react'
import { useSelector } from 'react-redux'

export default function SellerProfilePage() {
    const {currUser} = useSelector((state)=>state.user);

    return (
        <div className='flex flex-col'> 
            <p>{currUser.sellerName}</p>
            
            
        </div>
    )
}
