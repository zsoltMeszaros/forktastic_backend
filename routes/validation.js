const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().min(6).required(),
    });

    const {error} = schema.validate(data);

    return error;
}


const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });

    const {error} = schema.validate(data);

    return error;
}



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;