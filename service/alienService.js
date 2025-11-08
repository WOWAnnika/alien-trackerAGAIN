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

exports.getAllAliens = async () => {
    const aliens = await Alien.find();
    return aliens;
};

exports.updateAlien = async (id, data) => {
    const alien = await Alien.findByIdAndUpdate(id, data, {new: true});
    if (!alien) {
        throw new Error("Alien not found");
    }
    return alien;
};

exports.deleteAlien = async (id) => {
    const alien = await Alien.findByIdAndDelete(id);
    if (!alien) {
        throw new Error("Alien not found");
    }
    return alien;
};

exports.getAlienByName = async (name) => {
    const alien = await Alien.findOne({name: new RegExp('^' + name + '$', 'i')});
    if (!alien) {
        throw new Error("Alien not found");
    }
    return alien;
};
