const Joi=require("joi");

module.exports.sellerSchema=Joi.object({
    seller:Joi.object({
        sellerName:Joi.string().trim().min(6).required(),
        email:Joi.string().required(),
        password:Joi.string().trim().min(6).required(),
    })
})