import React from 'react'
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
import {useSelector} from "react-redux"
import axios from "axios";

export default function PlaceOrderDialog({orderDialog,handleOrderDialog,totalCostOfItems}) {

    const {currUser}=useSelector(state=>state.user);
    const {cart}=useSelector(state=>state.userCart);

    const onSubmit=async (values,actions)=>{
        const orderDetails={
            user:currUser,
            cart,
            address:values
        }

        const token=localStorage.getItem("access_token");
            
        const res=await axios.post("http://localhost:8080/order",{
            orderDetails
        }, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        const data= await res.data;
        console.log(data);
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
                
                <Button disabled={isSubmitting} onClick={handleSubmit} variant="gradient" color="green" >
                    <span>Confirm</span>
                </Button>  
        
            </DialogFooter>
        </Dialog>
  )
}
