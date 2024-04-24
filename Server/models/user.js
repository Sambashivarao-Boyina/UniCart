const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
    },
    cart:[
        {
            product:{
                type:Schema.Types.ObjectId,
                ref:"Product"
            },
            count:{
                type:Number,
                default:1,
            }

        }
    ],
    type:{
        type:String,
        default:"User",
    }

},{
    timestamps:true,
})

const User=mongoose.model("User",userSchema);
module.exports=User;
