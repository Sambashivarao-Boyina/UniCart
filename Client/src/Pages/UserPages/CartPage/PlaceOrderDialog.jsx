import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea
} from "@material-tailwind/react";
import {ErrorMessage, useFormik} from "formik"
import addressSchema from "./orderAddressSchema";
import {useSelector,useDispatch} from "react-redux"
import axios from "axios";


import {setCart} from "../../../store/userCart/userCartSlice"

export default function PlaceOrderDialog({orderDialog,handleOrderDialog,totalCostOfItems,setPlacingOrder}) {

    const {currUser}=useSelector(state=>state.user);
    const {cart}=useSelector(state=>state.userCart);
    const [loading,setLoading]=useState(false);

    const [orderSuccessDialog, setOrderSuccessDialog] = React.useState(false);
    const handleOrderSuccessDialog = () => setOrderSuccessDialog(!orderSuccessDialog);


    const dispatch=useDispatch();

    const onSubmit=async (values,actions)=>{
        const orderDetails={
            user:currUser,
            cart,
            address:values
        }

       try{ 
            setPlacingOrder(true);
            const token=localStorage.getItem("access_token");
                
            const res=await axios.post("http://localhost:8080/order",{
                orderDetails
            }, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            const data= await res.data;
            
            setPlacingOrder(false);
            dispatch(setCart(data.cart));

            
            handleOrderDialog();
            handleOrderSuccessDialog();
            resetForm();
            
        }catch(error){
            setPlacingOrder(false);
        }
    }

    const {values,errors,touched,isSubmitting,resetForm,handleChange,handleBlur,handleSubmit} = useFormik({
        initialValues:{
            name:"",
            email:"",
            phone1:"",
            phone2:"",
            city:"",
            street:"",
            pinCode:"",
            houseNo:"",
            landMark:""
        },
        validationSchema:addressSchema,
        onSubmit
    })

    

    return (
        <>
            <Dialog open={orderDialog} size="xl" >
                <DialogHeader>
                    Confirm Your Order
                </DialogHeader>
                <DialogBody className="h-[30rem] overflow-scroll">
                    <p>Are you sure you want to place this order?</p>
                    <p><span>Total :</span><span className='font-bold'>${totalCostOfItems}</span></p>
                    <br />
                    <hr className="border-gray-500 "/>
                    <br/>
                    <form >
                        <div className='flex flex-col gap-2'>
                            <div>
                                <Input type="text" label="Name" name="name" onChange={handleChange} value={values.name}/>
                                {errors.name && touched.name  && <div className="mb-2 text-red-500 text-sm">{errors.name}</div>}
                            </div>
                            <div>
                                <Input type="email" label="Email" name="email" onChange={handleChange} value={values.email}/>
                                {errors.email && touched.email  && <div className="mb-2 text-red-500 text-sm">{errors.email}</div>}
                            </div>
                        <div className='flex flex-col gap-2  sm:flex-row sm:gap-6'>
                                <div className="w-full">
                                    <Input type="text" label="Phone Number 1" name="phone1" onChange={handleChange} value={values.phone1}/>
                                    {errors.phone1 && touched.phone1  && <div className="mb-2 text-red-500 text-sm">{errors.phone1}</div>}
                                </div>
                                <div className="w-full">
                                    <Input type="text" label="Phone Number 2" name="phone2" onChange={handleChange} value={values.phone2}/>
                                    {errors.phone2 && touched.phone2  && <div className="mb-2 text-red-500 text-sm">{errors.phone2}</div>}
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 sm:flex-row sm:gap-6'>
                                <div className="w-full">
                                    <Input type="text" label="City" name="city" onChange={handleChange} value={values.city}/>
                                    {errors.city && touched.city  && <div className="mb-2 text-red-500 text-sm">{errors.city}</div>}
                                </div>
                                <div className="w-full">
                                    <Input type="text" label="Street" name="street" onChange={handleChange} value={values.street}/>
                                    {errors.street && touched.street  && <div className="mb-2 text-red-500 text-sm">{errors.street}</div>}
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 sm:flex-row sm:gap-6'>
                                <div className="w-full">
                                    <Input type="text" label="House-No" name="houseNo" onChange={handleChange} value={values.houseNo}/>
                                    {errors.houseNo && touched.houseNo  && <div className="mb-2 text-red-500 text-sm">{errors.houseNo}</div>}  
                                </div>
                            <div className="w-full">
                                    <Input type="number" label="Pin-Code" name="pinCode" onChange={handleChange} value={values.pinCode}/>
                                    {errors.pinCode && touched.pinCode  && <div className="mb-2 text-red-500 text-sm">{errors.pinCode}</div>}
                            </div>
                            </div>
                            <div>
                                <Textarea label='Land-Mark' name="landMark" onChange={handleChange} value={values.landMark}></Textarea>
                                {errors.landMark && touched.landMark  && <div className="mb-2 text-red-500 text-sm">{errors.landMark}</div>}
                            </div>
                        </div>
                </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOrderDialog}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    
                    <Button  onClick={handleSubmit} variant="gradient" color="green" >
                        Confirm
                    </Button>  
            
                </DialogFooter>
            </Dialog>
            <Dialog open={orderSuccessDialog}>
                <DialogHeader>
                    Order Confirmed!
                </DialogHeader>
                <DialogBody>
                    We've received your order and it's now being processed. We'll keep you updated on its progress!
                    <div className='flex items-center justify-center'>
                        <svg className='mx-auto mt-2 w-20 h-20 animate-pulse text-green-700 rounded-full' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button  onClick={handleOrderSuccessDialog}  color="green" >
                        <span>Close</span>
                    </Button> 
                </DialogFooter>
            </Dialog>
        </>
  )
}
