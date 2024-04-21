import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import axios from "axios"
import {signOut} from "../../store/user/userSlice"
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar } from "@material-tailwind/react";

export default function (){
    const {currUser}=useSelector((state)=>state.user);
    const dispatch=useDispatch();

    
    const handleSignOut=async ()=>{
       
        try{
            
            localStorage.removeItem("access_token");
            dispatch(signOut());
            toast.success("Logged-Out successfully", {
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
            
        }catch(error){
            dispatch(signInFaliure(error.response.data.message));
        }
    }

    return (
        <nav className="sticky top-0 left-0 w-full  bg-black flex flex-row items-center justify-start px-4 py-2 z-10">
            <p  className="text-white text-2xl font-black">EcomNest</p>
            <div className="ml-auto flex gap-2">
                <Link to={"/products"} className="text-white">Products</Link>
                {
                    currUser && <Link to={"/addproduct"} className="text-white">Add Product</Link>
                }
                {
                    currUser ?
                        <p onClick={handleSignOut} className="text-white cursor-pointer ">Sign-Out</p>
                        : <Link to={"/sign-in"} className="text-white">SignIn</Link>

                }
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
        </nav>
    )
}