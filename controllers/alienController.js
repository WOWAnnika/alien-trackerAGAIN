const Alien = require("../models/alien");

exports.create = async (req, res) => {
    const alien = new Alien(req.body);
    await alien.save();
    res.status(201).json(alien);
};

exports.getAll = async (req, res) => {
    const aliens = await Alien.find();
    res.json(aliens);
};

exports.getById = async (req, res) => {
    const alien = await Alien.findById(req.params.id);
    if (!alien) return res.status(404).json({error: "No alien with this name"});
    res.json(alien);
};

exports.update = async (req, res) => {
    const alien = await Alien.findByIdAndUpdate(req.params.id, req.body, {new : true});
    if (!alien) return res.status(404).json({error: "Alien to update not found"});
    res.json(alien);
};

exports.delete = async (req, res) => {
    const alien = await Alien.findByIdAndDelete(req.params.id);
    if (!alien) return res.status(404).json({error: "Alien to delete not found"})
    res.json({message: "Alien deleted"});
};

exports.getByName = async (req, res) => {
    const alien = await Alien.findOne({name: new RegExp('^' + req.params.name + '$', 'i')});
    if (!alien) return res.status(404).json({error: "Alien not found"});
    res.json(alien);
};
