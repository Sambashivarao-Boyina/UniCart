import React, { useState ,useEffect} from 'react'
import {Textarea, Button, IconButton} from "@material-tailwind/react";
import axios from 'axios';
import RatingBox from "./Rating"
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reviews from "./Reviews";
import {useSelector} from "react-redux";

export default function CommentSection({productId}) {
    const [rating, setRating] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const [comment,setComment]=useState("");

    const {currUser}=useSelector((state)=>state.user);

    const [reviews,setReviews]=useState([]);
    const [loading,setLoading]=useState(false);
    const getReviews=async ()=>{
        setLoading(true);
        try{
            const res=await axios.get(`http://localhost:8080/review/${productId}`);
            const data=await res.data;
            setReviews(data.reviews);
            setLoading(false);
           
        }catch(error){
            setLoading(false);
        }
    }

    useEffect(()=>{
        getReviews();
    },[])

    
    const sendReview = async (req,res)=>{
        try{
            const token=localStorage.getItem("access_token");
            const res=await axios.post("http://localhost:8080/review",{
                rating,
                comment,
                productID:productId,
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
            
            const data=await res.data;
            setReviews(data.reviews);
            setRating(0);
            setHover(0);
            setComment("");     
            
        }catch(error){
            toast.error(error?.response?.data?.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
        }
    }


    return (
        <div className='w-screen lg:px-40 lg:mt-10 p-1 sm:p-4 '>
            <p className='lg:text-4xl font-bold mb-2 px-2'>Customer reviews:</p>

            {   
                currUser && currUser.type==="User" ?
                <>
                    <div className='p-2'>
                        <RatingBox rating={rating} setRating={setRating} hover={hover} setHover={setHover}/>
                        <div className=" relative  sm:w-[30rem] lg:w-[40rem] mt-1">
                            <Textarea  label="Your Comment" rows={4} value={comment} onChange={(event)=>setComment(event.target.value)} maxLength={200}/>
                            <div className="flex w-full justify-between py-1.5">
                                <IconButton variant="text" color="blue-gray" size="sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                                    />
                                </svg>
                                </IconButton>
                                <div className="flex gap-2">
                                <Button onClick={()=>{setComment("") 
                                                        setRating(0) 
                                                        setHover(0)}} size="sm" color="red" variant="text" className="rounded-md">
                                    Cancel
                                </Button>
                                <Button size="sm" className="rounded-md" onClick={sendReview}>
                                    Post Comment
                                </Button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </>

                :null
            }
            <Reviews reviews={reviews} setReviews={setReviews}/>
        </div>
    )
}
