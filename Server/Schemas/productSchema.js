const Joi=require("joi");

module.exports.productSchema=Joi.object({
    product:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().trim().min(30).max(300).required(),
        price:Joi.number().min(1).required(),
        discountPercentage:Joi.number().min(0).max(90).required(),
        stock:Joi.number().min(1).required(),
        brand:Joi.string().trim().required(),
        category:Joi.string().trim().required(),
        warrantyInformation:Joi.string().trim().required(),
        returnPolicy:Joi.string().trim().required(),
        thumbnail:Joi.string().trim().required(),
        images:Joi.array().min(3).max(6).required()
    })
})