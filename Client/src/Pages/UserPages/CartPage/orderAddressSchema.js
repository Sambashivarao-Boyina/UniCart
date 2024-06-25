import * as yup from "yup"

const addressSchema=yup.object({
    name:yup.string().required("enter username"),
    email:yup.string("Enter valid Email").required("Enter Email").matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$","Enter valid email"),
    phone1:yup.string().required("Enter PhoneNumber").matches(/^\d{10}$/,"Enter valid number"),
    phone2:yup.string().required("Enter Phone Number").matches(/^\d{10}$/,"Enter valid number"),
    city:yup.string().required("Enter City"),
    street:yup.string().required("Enter Steet"),
    houseNo:yup.string().required("Enter House No"),
    pinCode:yup.number().required("Enter PinCode"),
    landMark:yup.string().required("Enter LandMark")
})


export default addressSchema;