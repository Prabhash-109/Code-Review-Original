const joi = require('joi');


// Signup validation
const signUpValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        console.log("Validation failed:", error.details[0].message); // 🔍
        return res.status(400).send(error.details[0].message);
    }
    next();
};


// Login validation
const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

module.exports = { signUpValidation, loginValidation };
