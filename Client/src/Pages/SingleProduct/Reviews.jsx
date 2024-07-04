import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Review from "./Review";

export default function Reviews({reviews,setReviews}) {

    return (
        <div className='w-full flex flex-row flex-wrap items-center gap-2 justify-center md:justify-start  p-2 '>
            {
               reviews && reviews.length>0 ?
                reviews.map((item)=><div className='' key={item._id}><Review review={item} setReviews={setReviews}/></div>)
                :<p className='text-lg font-bold'>There are no Reviews</p>
            }
        </div>
       
    )
}
