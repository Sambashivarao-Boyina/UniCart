import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {useSelector,useDispatch} from "react-redux"
import { signInFaliure ,signInStart,signSuccess } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserGoogelAuth from "../UserGoogleAuth/UserGoogelAuth";

export function SignIn() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
    const dispatch=useDispatch();
    const {currUser,loading,error}=useSelector((state)=>state.user);
    const navigate=useNavigate();

    const [user,setUser]=useState({
        email:"",
        password:""
    })

    const handleChange= (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const handleSubmit=async ()=>{
        try{
            dispatch(signInStart());
            const res=await axios.post("http://localhost:8080/auth/user-signin",{email:user.email,password:user.password});
            const data=await res.data;
            localStorage.setItem("access_token",data.token);
            dispatch(signSuccess(data.user));
            
            navigate("/");
        }catch(error){
            toast.error(error.response.data.message, {
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
            dispatch(signInFaliure(error.response.data.message));
        }
    }

    return (
        <section className="grid text-center h-screen items-center p-8">
        <div>
            <Typography variant="h3" color="blue-gray" className="mb-2">
            Sign In
            </Typography>
        
            <form className="mx-auto max-w-[30rem] text-left">
                <div className="mb-6">
                    <label htmlFor="email">
                    <Typography
                        variant="small"
                        className="mb-2 block font-medium text-gray-900"
                    >
                        Your Email
                    </Typography>
                    </label>
                    <Input
                        id="email"
                        color="gray"
                        size="lg"
                        type="email"
                        name="email"
                        placeholder="name@mail.com"
                        required
                        className="w-full text-xl  placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
                        labelProps={{
                            className: "hidden",
                        }}
                        onChange={handleChange}
                        value={user.email}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password">
                        <Typography
                            variant="small"
                            className="mb-2 block font-medium text-gray-900"
                        >
                            Password
                        </Typography>
                    </label>
                    <Input
                        size="lg"
                        placeholder="********"
                        labelProps={{
                            className: "hidden",
                        }}
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={user.passsword}
                        className="w-full text-xl placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
                        type={passwordShown ? "text" : "password"}
                        icon={
                            <i onClick={togglePasswordVisiblity}>
                            {passwordShown ? (
                                <EyeIcon className="h-5 w-5" />
                            ) : (
                                <EyeSlashIcon className="h-5 w-5" />
                            )}
                            </i>
                        }
                        required
                    />
                </div>
                <Button onClick={handleSubmit} color="gray" size="lg" className="mt-6" fullWidth>
                    sign in
                </Button>
                
                <UserGoogelAuth/>
                <Typography
                    variant="small"
                    color="gray"
                    className="mt-4 text-center font-normal"
                >
                    Not registered?{" "}
                    <NavLink to={"/sign-up"} className="font-medium inline cursor-pointer text-gray-900">
                        Create account
                        
                    </NavLink>
                    
                </Typography>
            </form>
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
        </div>
        </section>
    );
}

export default SignIn;