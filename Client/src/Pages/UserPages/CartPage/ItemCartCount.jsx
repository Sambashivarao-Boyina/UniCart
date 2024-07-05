import { Button, Input } from '@material-tailwind/react'
import React from 'react'

export default function ItemCartCount({cartCount,setCartCount,maxCount}) {

    const handleCartCountChange = (event)=>{
        if(event.target.value>=0 && event.target.value<=10 && event.target.value<=maxCount){
            setCartCount(event.target.value);
        }
    }

    const handleCartIncrease = (event)=>{
        setCartCount((curr)=>{
            if(curr<10 && event.target.value<=maxCount){
                return curr+1;
            }else{
                return curr;
            }
        })
    }

    const handleCartDecrease = (event)=>{
        setCartCount((curr)=>{
            if(curr>1){
                return curr-1;
            }else{
                return curr;
            }

        })
    }

    return (
        <div className='flex align-center justify-items-center gap-1'>
            <button disabled={cartCount==0} className="bg-primary text-4xl text-white h-10 w-10 rounded-xl  bolder" onClick={handleCartDecrease}>-</button>
            <input className="no-spinner w-14 border-2 border-black rounded-xl px-2" type="number" name="count" value={cartCount} onChange={handleCartCountChange}/>
            <button className="bg-primary text-2xl text-white h-10 w-10 rounded-xl  bolder" onClick={handleCartIncrease}>+</button>
        </div>
    )
}
