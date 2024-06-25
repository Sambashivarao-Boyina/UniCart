import { Button, Input } from '@material-tailwind/react'
import React from 'react'

export default function ItemCartCount({cartCount,setCartCount}) {

    const handleCartCountChange = (event)=>{
        if(event.target.value>=0){
            setCartCount(event.target.value);
        }
    }

    const handleCartIncrease = (event)=>{
        setCartCount((curr)=>{
            return curr+1;
        })
    }

    const handleCartDecrease = (event)=>{
        setCartCount((curr)=>{
            return curr-1;
        })
    }

    return (
        <div className='flex align-center justify-items-center gap-1'>
            <button disabled={cartCount==0} className="bg-blue-400 text-4xl text-white h-10 w-10 rounded-xl  bolder" onClick={handleCartDecrease}>-</button>
            <input className="no-spinner w-14 border-2 border-black rounded-xl px-2" type="number" name="count" value={cartCount} onChange={handleCartCountChange}/>
            <button className="bg-blue-400 text-2xl text-white h-10 w-10 rounded-xl  bolder" onClick={handleCartIncrease}>+</button>
        </div>
    )
}
