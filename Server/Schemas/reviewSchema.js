const Joi=require("joi");

module.exports.reviewSchema=Joi.object({
    rating:Joi.number().required().min(0.5).max(5),
    comment:Joi.string().trim().min(1).required(),
    productID:Joi.string().trim().required()
})

module.exports.reviewUpdateSchema=Joi.object({
    rating:Joi.number().required().min(0.5).max(5),
    comment:Joi.string().trim().min(1).required()
})