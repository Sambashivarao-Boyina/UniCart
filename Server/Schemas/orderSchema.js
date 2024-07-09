const Joi=require("joi");

module.exports.orderSchema=Joi.object({
    orderDetails:Joi.object({
        user:Joi.object().required(),
        cart:Joi.array().required().min(1),
        address:Joi.object({
            name:Joi.string().trim().required(),
            email:Joi.string().trim().required(),
            phone1:Joi.string().trim().min(10).max(10).required(),
            phone2:Joi.string().trim().min(10).max(10).required(),
            city:Joi.string().trim().required(),
            street:Joi.string().trim().required(),
            houseNo:Joi.string().trim().required(),
            pinCode:Joi.number().required(),
            landMark:Joi.string().required()
        })

    })
})