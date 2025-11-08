const Alien = require("../models/alien");

exports.getAlienById = async (id) => {
    const alien = await Alien.findById(id)
    if (!alien) {
        throw new Error ("Alien not found");
    }
    return alien;
};

exports.createAlien = async (data) => {
    const alien = new Alien(data);
    await alien.save();
    return alien;
};
