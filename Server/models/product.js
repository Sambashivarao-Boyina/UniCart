const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const productSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    discountPercentage:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true, 
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        enum:[
            'smartphones',    'laptops',
            'fragrances',     'skincare',
            'groceries',      'home-decoration',
            'furniture',      'tops',
            'womens-dresses', 'womens-shoes',
            'mens-shirts',    'mens-shoes',
            'mens-watches',   'womens-watches',
            'womens-bags',    'womens-jewellery',
            'sunglasses',     'automotive',
            'motorcycle',     'lighting',
            'others'
          ]
    },
    thumbnail:{
        type:String,
        required:true,
    },
    images:[
        {
            type:String,
        }
    ],
    seller:{
        type:Schema.Types.ObjectId,
        ref:"Seller",
        required:true,
    }    
},{
    timestamps:true
})

productSchema.virtual("actualPrice").get(function(){
    return this.price-this.price*(this.discountPercentage/100);
})

productSchema.set('toJSON', { virtuals: true });

const Product=mongoose.model("Product",productSchema);

module.exports=Product;
