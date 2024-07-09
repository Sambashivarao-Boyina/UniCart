import React from 'react'
import {Link} from "react-router-dom";
export default function PageNotFound() {
    return (
        <div className='w-full h-screen  flex items-center justify-center'>
            <div className='flex flex-col items-center'>
                <p className='text-9xl font-bold text-[#4A00FF]'>404</p>
                <p className='font-bold text-[#4A00FF]'>Opps,You have lost in Shopping</p>
                <Link to={"/products"}><button className='btn btn-outline btn-primary'>Back To Shopping</button></Link>
            </div>

        </div>
    )
}
