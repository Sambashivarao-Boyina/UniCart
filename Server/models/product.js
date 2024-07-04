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
    stock:{
        type:Number,
        required:true, 
    },
    brand:{
        type:String,
    },
    category:{
        type:String,
        required:true,
        enum:[
            'beauty',             'fragrances',
            'furniture',          'groceries',
            'home-decoration',    'kitchen-accessories',
            'laptops',            'mens-shirts',
            'mens-shoes',         'mens-watches',
            'mobile-accessories', 'motorcycle',
            'skin-care',          'smartphones',
            'sports-accessories', 'sunglasses',
            'tablets',            'tops',
            'vehicle',            'womens-bags',
            'womens-dresses',     'womens-jewellery',
            'womens-shoes',       'womens-watches',
            "other"
          ],
        default:"other"
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
    },
    warrantyInformation:{
        type:String,
        requried:true,
    },
    returnPolicy:{
        type:String,
        required:true,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ]
},{
    timestamps:true
})

productSchema.virtual("actualPrice").get(function(){
    return this.price-this.price*(this.discountPercentage/100);
})

productSchema.virtual("averageRating").get(function(){
    if(this.reviews){
        let totalRatings=0;
        for(let i=0;i<this.reviews.length;i++){
            totalRatings+=this.reviews[i].rating;
        }
        return totalRatings/this.reviews.length;
    }
    return 0;
})

productSchema.set('toJSON', { virtuals: true });

const Product=mongoose.model("Product",productSchema);

module.exports=Product;
