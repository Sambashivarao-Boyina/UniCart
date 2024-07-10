import React ,{useState}from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {IconButton, Dialog, DialogBody, DialogFooter, DialogHeader,Button} from "@material-tailwind/react"
import {useSelector} from "react-redux"
import axios from 'axios';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RatingBox from "./Rating"
import {Textarea} from "@material-tailwind/react";

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};


export default function Review({review,setReviews}) {

    const {currUser}=useSelector((state)=>state.user);

    const [rating, setRating] = React.useState(review.rating);
    const [hover, setHover] = React.useState(-1);
    const [comment,setComment]=useState(review.comment);

    const [deleteDialog,setDeleteDialog]=useState(false);
    const handleDeleteDialog=()=>setDeleteDialog(!deleteDialog);

    const [updateDialog,setUpdateDialog]=useState(false);
    const handleUpdateDialog=()=>setUpdateDialog(!updateDialog);

    const deleteReviewRequest=async ()=>{
        try{ 
            const token=localStorage.getItem("access_token");  
            const res=await axios.delete(`/api/review/${review._id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const data=await res.data;
            
            if(data.isSuccess){
                setReviews(data.reviews);
            }else{
                toast.error(data?.message, {
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
        handleDeleteDialog();
    }

    const updateReviewRequest=async ()=>{
        try{ 
            const token=localStorage.getItem("access_token");  
            const res=await axios.put(`/api/review/${review._id}`,{
                rating,
                comment
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const data=await res.data;
            
            if(data.isSuccess){
                setReviews(data.reviews);
            }else{
                toast.error(data?.message, {
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
        handleUpdateDialog();
    }

    return (
        <div className="p-2 flex flex-col w-full h-40 overflow-clip border rounded-md border-gray-200 shadow-lg ">
            <div className='flex flex-row items-center gap-2 mb-2'>
                <p className='truncate'>{review.user.username}</p>
            </div>
            <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Rating
                    name="text-feedback"
                    value={review.rating}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <Box sx={{ ml: 2 }}>{labels[review.rating]}</Box>
            </Box>
            <p className='truncate'>{review.comment}</p>
            {
                currUser && currUser._id==review.user._id ?

                <div className='self-end mt-auto '>
                    <button onClick={handleUpdateDialog} className="mr-2">
                        <svg color='green' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                    <button onClick={handleDeleteDialog}>
                        <svg color="red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>  
                    </button>
                </div>
                :null
            }
            
            <Dialog open={deleteDialog} handle={handleDeleteDialog}>
                <DialogHeader>
                    Delete Review
                </DialogHeader>
                <DialogBody>
                    Are you sure you want to delete this Review
                </DialogBody>
                <DialogFooter >
                    <Button onClick={handleDeleteDialog} color="green" variant="outlined" className="mr-3">Cancel</Button>
                    <Button onClick={deleteReviewRequest} color="red" variant="gradient">Delete</Button>
                </DialogFooter>
            </Dialog>

            <Dialog open={updateDialog} handler={handleUpdateDialog}>
                <DialogHeader>
                    Edit your Review
                </DialogHeader>
                <DialogBody>
                    <div className="mb-4 -mt-3">
                    <RatingBox rating={rating} setRating={setRating} hover={hover} setHover={setHover}/>
                    </div>
                    <Textarea  label="Your Comment" rows={4} value={comment} onChange={(event)=>setComment(event.target.value)} maxLength={200}/>

                </DialogBody>
                <DialogFooter>
                    <Button className='mr-4' onClick={handleUpdateDialog} variant="outlined">Cancel</Button>
                    <Button color="green" variant="gradient" onClick={updateReviewRequest}>Update</Button>
                </DialogFooter>
            </Dialog>
            
        </div>
    )
}
