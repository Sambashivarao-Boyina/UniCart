import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Option,
    Select,
    Textarea
} from "@material-tailwind/react"
import {ErrorMessage, useFormik} from "formik";
import updateProductSchema from "./updateProductSchema"
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Rating} from "@mui/material";
import { Spinner } from "@material-tailwind/react";


export default function SellerProduct({product,setProducts}) {


    const [open,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);

    const handleOpen=()=>{
        setOpen(!open)
        resetForm();
    };

    const onSubmit = async (values,actions)=>{
        
        try{ 
            setLoading(true);
            const token=localStorage.getItem("access_token");
            const res=await axios.put(`http://localhost:8080/product/${product._id}`,
                {
                    product:values
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )

            const data=await res.data;
            if(data.isSuccess){
                setProducts((prev)=>{
                    return prev.map((item)=>{
                        if(item._id ===product._id){
                            return data.product;
                        }else{
                            return item;
                        }
                    })
                });

                toast.success(data.message, {
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
            }else{
                console.log(data);
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
            resetForm();
            setLoading(false);
            
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
            setLoading(false);
        }
        handleOpen();
    }

    const {values,errors,touched,isSubmitting,handleChange,handleSubmit,resetForm}=useFormik({
        initialValues:{
            title:product.title,
            description:product.description,
            price:product.price,
            discountPercentage:product.discountPercentage,
            stock:product.stock,
            rating:product.rating,
            brand:product.brand,
            category:product.category,
            warrantyInformation:product.warrantyInformation,
            returnPolicy:product.returnPolicy          
            
        },
        validationSchema:updateProductSchema,
        onSubmit,
    })

    if(loading){
        return (
            <div className="w-80 sm:w-96 h-80 flex items-center justify-center">
                <Spinner className="h-12 w-12" />
            </div>
        )
    }

    return (
        <div>
            <div className="w-80 sm:w-96 bg-white flex flex-col border p-2 border-gray-100 bg-red  m-4  rounded-lg hover:scale-110 duration-300 shadow-md hover:shadow-xl">
                <svg onClick={handleOpen} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-800 ml-auto cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

                <Link to={`/singleProduct/${product._id}`}>
                    <div className=" h-48 flex flex-row items-center justify-center">
                        <img src={product.thumbnail} className="object-cover object-cente h-full overflow-hidden  pb-2 rounded-t-lg " alt={product.title} /> 
                    </div>
                </Link>
                <p className="text-xl font-bold">{product.title}</p>
                <div className="flex flex-row w-full">
                    <div>
                        <p><span className="text-3xl font-bold">${(product.actualPrice).toFixed(2)}</span><span className="line-through text-gray-600 text-lg ml-1">${product.price}</span></p>
                        <p className="font-medium text-green-800  text-md">{product.discountPercentage}% off</p>
                    </div>
                </div>
            </div>
            <Dialog open={open} handle={handleOpen} size="xl">
                <DialogHeader>
                    Edit the Product
                </DialogHeader>
                <DialogBody className='h-[60vh] overflow-scroll'>
                    <form className='flex flex-col gap-2'>
                        <div>
                            <Input type='text' name="title"  label='title' value={values.title} onChange={handleChange}/>
                            {errors.title && touched.title && <div className="mb-2 text-red-500 text-sm" >{errors.title}</div>}
                        </div>
                        <div>
                            <Input type='number' name="price"  label='price' value={values.price} onChange={handleChange}/>
                            {errors.price && touched.price && <div className="mb-2 text-red-500 text-sm" >{errors.price}</div>}
                        </div>
                        <div>
                            <Input type='number' name="discountPercentage"  label='discountPercentage' value={values.discountPercentage} onChange={handleChange}/>
                            {errors.discountPercentage && touched.discountPercentage && <div className="mb-2 text-red-500 text-sm" >{errors.discountPercentage}</div>}
                        </div>
                        <div>
                            <Input type='number' name="stock"  label='stock' value={values.stock} onChange={handleChange}/>
                            {errors.stock && touched.stock && <div className="mb-2 text-red-500 text-sm" >{errors.stock}</div>}
                        </div>
                        <div>
                            <Input type='text' name="brand"  label='brand' value={values.brand} onChange={handleChange}/>
                            {errors.brand && touched.brand && <div className="mb-2 text-red-500 text-sm" >{errors.brand}</div>}
                        </div>
                        <Select label="category" name="category" value={values.category} onChange={handleChange}>
                            <Option value="beauty">beauty</Option>
                            <Option value="fragrances">fragrances</Option>
                            <Option value="furniture">furniture</Option>
                            <Option value="groceries">groceries</Option>
                            <Option value="home-decoration">home-decoration</Option>
                            <Option value="kitchen-accessories">kitchen-accessories</Option>
                            <Option value="laptops">laptops</Option>
                            <Option value="mens-shirts">mens-shirts</Option>
                            <Option value="mens-shoes">mens-shoes</Option>
                            <Option value="mens-watches">mens-watches</Option>
                            <Option value="mobile-accessories">mobile-accessories</Option>
                            <Option value="motorcycle">motorcycle</Option>
                            <Option value="skin-care">skin-care</Option>
                            <Option value="smartphones">smartphones</Option>
                            <Option value="sports-accessories">sports-accessories</Option>
                            <Option value="sunglasses">sunglasses</Option>
                            <Option value="tablets">tablets</Option>
                            <Option value="tops">tops</Option>
                            <Option value="vehicle">vehicle</Option>
                            <Option value="womens-bags">womens-bags</Option>
                            <Option value="womens-dresses">womens-dresses</Option>
                            <Option value="womens-jewellery">womens-jewellery</Option>
                            <Option value="womens-shoes">womens-shoes</Option>
                            <Option value="womens-watches">womens-watches</Option>
                            <Option value="other">other</Option>

                        </Select>
                        {errors.category && touched.category && <div className="mb-2 text-red-500 text-sm" >{errors.category}</div>}

                        <div>
                            <Input type='text' name="warrantyInformation"  label='warrantyInformation' value={values.warrantyInformation} onChange={handleChange}/>
                            {errors.warrantyInformation && touched.warrantyInformation && <div className="mb-2 text-red-500 text-sm" >{errors.warrantyInformation}</div>}
                        </div>
                        <div>
                            <Input type='text' name="returnPolicy"  label='returnPolicy' value={values.returnPolicy} onChange={handleChange}/>
                            {errors.returnPolicy && touched.returnPolicy && <div className="mb-2 text-red-500 text-sm" >{errors.returnPolicy}</div>}
                        </div>
                        <div>
                            <Textarea  name="description"  label='description' value={values.description} onChange={handleChange}></Textarea>
                            {errors.description && touched.description && <div className="mb-2 text-red-500 text-sm" >{errors.description}</div>}
                        </div>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button className="mr-4 flex items-center" color='red' onClick={handleOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span>Cancel</span>
                    </Button>
                    <Button disabled={isSubmitting} onClick={handleSubmit} className='flex items-center' color='green' variant='gradient' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <span >Edit</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            
        </div>
    )
}
