import * as yup from "yup";

const updateProductSchema=yup.object({
    title:yup.string().trim().required("Title Required").max(20,"Yout title is too long"),
    description:yup.string().trim().required("Description Required").min(30,"Description should contain atleast 30 characters").max(300,"Description is too long"),
    price:yup.number("Enter Valid number").required("Price Required").min(1).positive(),
    discountPercentage:yup.number("Enter Valid number").required("Discount Required").min(0).max(90).positive(),
    stock:yup.number("Enter Valid number").required("Stock Required"),
    brand:yup.string(),
    category:yup.string().trim().required("Catrgory required"),
    warrantyInformation:yup.string().trim().required("Warrenty Requried"),
    returnPolicy:yup.string().trim().required("return policy required")
})

export default updateProductSchema;