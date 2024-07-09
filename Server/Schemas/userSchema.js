const Joi=require("joi");

module.exports.userSchema=Joi.object({
    user:Joi.object({
        username:Joi.string().trim().min(6).required(),
        email:Joi.string().trim().required(),
        password:Joi.string().trim().min(6).required(),
    })
})