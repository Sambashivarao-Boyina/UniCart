import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Review from "./Review";

export default function Reviews({reviews,setReviews}) {

    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  p-4 '>
            {
            reviews && reviews.length>0 ?
                reviews.map((item)=><div className=' ' key={item._id}><Review review={item} setReviews={setReviews}/></div>)
                :<p className='text-lg font-bold'>There are no Reviews</p>
            }
        </div>
       
    )
}
