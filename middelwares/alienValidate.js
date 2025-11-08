const joi = require('joi');

const schema = joi.object({
    name: joi.string().min(2).max(60).required(),
    race: joi.string().min(2).max(60).required(),
    planet: joi.string().min(2).max(60).required(),
    abilities: joi.array().items(joi.string()).min(2).max(50).required(),
    dateOfDiscovery: joi.date().default(() => new Date()),
    alienImage: joi.binary().min(100).max(5*1024*1024).optional(),
});

exports.validateAlien = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
    next();
}

//5*1024*1024 er 5MB
//base64