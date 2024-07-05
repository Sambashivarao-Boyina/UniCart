import { useState } from "react";
import productSchema from "./AddProductvalidation";
import { Button, Input } from "@material-tailwind/react";
import {useFormik} from "formik";
import axios from "axios";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AddProduct.css"
import {app} from "../../Firebase/fireBase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";


export default function AddProduct(){

    const uploadFiles = async (files)=>{
        let imageUrls=[];
        
        for(let i=0;i<files.length;i++){
            let url=await handleFileUpload(files[i]);
            imageUrls.push(url);
        }
        return imageUrls;
    }

    const onSubmit= async (values,actions)=>{

        let {image1,image2,image3,image4,image5,image6,...product}=values;
        let imagesNeedToUplad=[];
        if(image1){
            imagesNeedToUplad.push(image1);
        }
        if(image2){
            imagesNeedToUplad.push(image2);
        }
        if(image3){
            imagesNeedToUplad.push(image3);
        }
        if(image4){
            imagesNeedToUplad.push(image4);
        }
        if(image5){
            imagesNeedToUplad.push(image5);
        }
        if(image6){
            imagesNeedToUplad.push(image6);
        }

        const uploadedImages=await uploadFiles(imagesNeedToUplad);

        product={...product,thumbnail:uploadedImages[0],images:uploadedImages};

        sendRequest(product);

    }

        
    

    const {values,errors,touched,isSubmitting,handleChange,handleBlur,handleSubmit,setFieldValue}=useFormik({
        initialValues:{
            title:"",
            description:"",
            price:'',
            discountPercentage:"",
            stock:"",
            brand:"",
            category:"",
            warrantyInformation:"",
            returnPolicy:"",
            image1:"",
            image2:"",
            image3:"",
            image4:"",
            image5:"",
            image6:"",
            
        },
        validationSchema:productSchema,
        onSubmit,
    })

    const sendRequest = async (product)=>{
        const token=localStorage.getItem("access_token");
        console.log("start requesting");
        try{
          
            const res=await axios.post("http://localhost:8080/product/",{product},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const data=await res.data;
            if(data.isSuccess){
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
                toast.error(data.message, {
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

    }

    const uploadFileAsync = async (uploadTask) => {
        console.log("fileuplaoding");
        try {
          const progressPromise = new Promise((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
              },
              (error) => {
                reject(error);
              },
              () => {
                resolve(uploadTask.snapshot.ref);
              }
            );
          });
      
          const uploadRef = await progressPromise;
          const downloadUrl = await getDownloadURL(uploadRef);
          return downloadUrl;
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Image is Large", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });

            return false;
        }
      };

    const handleFileChange = (event) => {
        const fieldName = event.target.name;
        const file = event.target.files[0];
        setFieldValue(fieldName, file);
    }

    const handleFileUpload= async (image)=>{
        const storage=getStorage(app);
        const fileName=new Date().getTime()+image.name;
        const storageRef=ref(storage,fileName);
        const uploadTask=uploadBytesResumable(storageRef,image);
        
        const downloadUrl = await uploadFileAsync(uploadTask);
        return downloadUrl;
    }

   
    return (
      <div className="flex flex-row items-center justify-center mb-10">
        <form className=" flex mt-4 flex-col gap-6 w-[90%] md:w-3/4 lg:w-1/2">
            <p className="font-bold text-2xl max-sm:text-xl">
                Create Your Product:
            </p>
            <div className="relative w-full min-w-[200px] h-10">
                <input
                    className="peer lg:text-lg w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                    placeholder=""
                    onChange={handleChange}
                    value={values.title}
                    name="title"
                    type="text"
                />
                {errors.title && touched.title && (
                <div className="mb-2 text-red-500 text-sm">{errors.title}</div>
                )}
                <label className="flex  w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                Enter Title
                </label>
            </div>
            <div className="relative w-full min-w-[200px]">
                <textarea
                className="peer lg:text-lg h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=""
                name="description"
                onChange={handleChange}
                value={values.description}
                />
                {errors.description && touched.description && (
                <div className="mb-2 text-red-500 text-sm">
                    {errors.description}
                </div>

                )}
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Enter Description
                </label>
            </div>
            <div className="relative w-full min-w-[200px] h-10">
                <input
                className="peer lg:text-lg w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                placeholder=""
                onChange={handleChange}
                value={values.price}
                name="price"
                type="number"
                />
                {errors.price && touched.price && (
                <div className="mb-2 text-red-500 text-sm">{errors.price}</div>
                )}
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                Enter Price(in $)
                </label>
            </div>
            <div className="relative w-full min-w-[200px] h-10">
                <input
                className="peer lg:text-lg w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                placeholder=""
                onChange={handleChange}
                value={values.discountPercentage}
                name="discountPercentage"
                type="number"
                />
                {errors.discountPercentage && touched.discountPercentage && (
                <div className="mb-1 text-red-500 text-sm">
                    {errors.discountPercentage}
                </div>
                )}
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                Enter Discont Percentage
                </label>
            </div>
            <div className="relative w-full min-w-[200px] h-10">
                <input
                className="peer lg:text-lg w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                placeholder=""
                onChange={handleChange}
                value={values.stock}
                name="stock"
                type="number"
                />
                {errors.stock && touched.stock && (
                <div className="mb-2 text-red-500 text-sm">{errors.stock}</div>
                )}
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                Enter Available Stock
                </label>
            </div>
          
            <div className="relative w-full min-w-[200px] h-10">
                <input
                className="peer lg:text-lg w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                placeholder=""
                onChange={handleChange}
                value={values.brand}
                name="brand"
                type="text"
                />
                {errors.brand && touched.brand && (
                <div className="mb-2 text-red-500 text-sm">{errors.brand}</div>
                )}
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                Enter Brand
                </label>
            </div>
            
            <div className="relative w-full min-w-[200px] h-10">
                <input
                className="peer lg:text-lg w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                placeholder=""
                onChange={handleChange}
                value={values.warrantyInformation}
                name="warrantyInformation"
                type="text"
                />
                {errors.warrantyInformation && touched.warrantyInformation && (
                <div className="mb-2 text-red-500 text-sm">{errors.warrantyInformation}</div>
                )}
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                Enter WarrantyInformation
                </label>
            </div>

            <div className="relative w-full min-w-[200px] h-10">
                <input
                className="peer lg:text-lg w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                placeholder=""
                onChange={handleChange}
                value={values.returnPolicy}
                name="returnPolicy"
                type="text"
                />
                {errors.returnPolicy && touched.returnPolicy && (
                <div className="mb-2 text-red-500 text-sm">{errors.returnPolicy}</div>
                )}
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                Enter ReturnPolicy
                </label>
            </div>

            <div className="relative h-10 w-full min-w-[200px]">
                <select
                name="category"
                onChange={handleChange}
                value={values.category}
                className="peer  h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-bule-500 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                >
                <option value="beauty">beauty</option>
                <option value="fragrances">fragrances</option>
                <option value="furniture">furniture</option>
                <option value="groceries">groceries</option>
                <option value="home-decoration">home-decoration</option>
                <option value="kitchen-accessories">kitchen-accessories</option>
                <option value="laptops">laptops</option>
                <option value="mens-shirts">mens-shirts</option>
                <option value="mens-shoes">mens-shoes</option>
                <option value="mens-watches">mens-watches</option>
                <option value="mobile-accessories">mobile-accessories</option>
                <option value="motorcycle">motorcycle</option>
                <option value="skin-care">skin-care</option>
                <option value="smartphones">smartphones</option>
                <option value="sports-accessories">sports-accessories</option>
                <option value="sunglasses">sunglasses</option>
                <option value="tablets">tablets</option>
                <option value="tops">tops</option>
                <option value="vehicle">vehicle</option>
                <option value="womens-bags">womens-bags</option>
                <option value="womens-dresses">womens-dresses</option>
                <option value="womens-jewellery">womens-jewellery</option>
                <option value="womens-shoes">womens-shoes</option>
                <option value="womens-watches">womens-watches</option>
                </select>
                {errors.category && touched.category && (
                <div className="mb-2 text-red-500 text-sm">{errors.category}</div>
                )}
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select a City
                </label>
            </div>
            
            <div className="relative w-full min-w-[200px] h-10 mb-2">
                <label htmlFor="image1" className="text-blue-gray-700">Thumbnail Image:</label>
                <input 
                    onChange={handleFileChange}
                    type="file" 
                    name="image1" 
                    id="image1" 
                    accept="image/*"  
                    className="image-upload border-solid border-blue-gray-200 border-[0.75px] w-full h-10 rounded-md text-blue-gray-700 text-sm "
                />
                {errors.image1 && touched.image1 && (
                <div className="mb-2 text-red-500 text-sm">{errors.image1}</div>
                )}
            </div>
            <div className="relative w-full min-w-[200px] h-10 my-2">
                <label htmlFor="image2" className="text-blue-gray-700">Image-2:</label>
                <input 
                    onChange={handleFileChange}
                    type="file" 
                    name="image2" 
                    id="image2" 
                    accept="image/*"  
                    className="image-upload border-solid border-blue-gray-200 border-[0.75px] w-full h-10 rounded-md text-blue-gray-700 text-sm "
                />   
                {errors.image2 && touched.image2 && (
                <div className="mb-2 text-red-500 text-sm">{errors.image2}</div>
                )}       
            </div>
            <div className="relative w-full min-w-[200px] h-10 my-2"> 
                <label htmlFor="image3" className="text-blue-gray-700">Image-3:</label>
                <input 
                    onChange={handleFileChange}
                    type="file" 
                    name="image3" 
                    id="image3" 
                    accept="image/*"  
                    className="image-upload border-solid border-blue-gray-200 border-[0.75px] w-full h-10 rounded-md text-blue-gray-700 text-sm "
                /> 
                {errors.image3 && touched.image3 && (
                <div className="mb-2 text-red-500 text-sm">{errors.image3}</div>
                )}  
            </div>
            <div className="relative w-full min-w-[200px] h-10 my-2"> 
                <label htmlFor="image4" className="text-blue-gray-700">Image-4(optional):</label>
                <input 
                    onChange={handleFileChange}
                    type="file" 
                    name="image4" 
                    id="image4" 
                    accept="image/*"  
                    className="image-upload border-solid border-blue-gray-200 border-[0.75px] w-full h-10 rounded-md text-blue-gray-700 text-sm "
                />  
                {errors.image4 && touched.image4 && (
                <div className="mb-2 text-red-500 text-sm">{errors.image4}</div>
                )} 
            </div>
            <div className="relative w-full min-w-[200px] h-10 my-2 ">
                <label htmlFor="image5" className="text-blue-gray-700">Image-5(optional):</label> 
                <input 
                    onChange={handleFileChange}
                    type="file" 
                    name="image5" 
                    id="image5" 
                    accept="image/*"  
                    className="image-upload border-solid border-blue-gray-200 border-[0.75px] w-full h-10 rounded-md text-blue-gray-700 text-sm "
                /> 
                {errors.image5 && touched.image5 && (
                <div className="mb-2 text-red-500 text-sm">{errors.image5}</div>
                )}   
            </div>
            <div className="relative w-full min-w-[200px] h-10 my-2"> 
                <label htmlFor="image6" className="text-blue-gray-700">Image-6(optional):</label>
                <input
                    onChange={handleFileChange}
                    type="file" 
                    name="image6" 
                    id="image6" 
                    accept="image/*"  
                    className="image-upload border-solid border-blue-gray-200 border-[0.75px] w-full h-10 rounded-md text-blue-gray-700 text-sm "
                />  
                {errors.image6 && touched.image6 && (
                <div className="mb-2 text-red-500 text-sm">{errors.image6}</div>
                )}  
                
            </div>
            <div>
                <Button
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    className="lg:text-lg bg-[#4A00FF]"
                    onClick={handleSubmit}
                    fullWidth
                >
                    Create Product
                </Button>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />
        </form>
      </div>
    );
}