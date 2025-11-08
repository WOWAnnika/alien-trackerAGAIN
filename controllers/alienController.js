const Alien = require("../models/alien");
const alienService = require("../service/alienService");



exports.create = async (req, res) => {
    try{
        const alien = await alienService.createAlien(req.body);
        res.status(201).json(alien);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.getAll = async (req, res) => {
    try {
        const aliens = await Alien.find();
        res.status(200).json(aliens);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.getById = async (req, res) => {
    try {
        const alien = await alienService.getAlienById(req.params.id);
        res.status(200).json(alien);
    } catch (error) {
        if (error.message === "alien not found") {
            return res.status(404).json({error: "sadasdawsdw"});
        }
        res.status(500).json({error: error.message});
    }
};

exports.update = async (req, res) => {
    try {
        const alien = await Alien.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!alien) {
            return res.status(404).json({error: "No alien with this name"});
        }
        res.status(200).json(alien);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.delete = async (req, res) => {
    try {
        const alien = await Alien.findByIdAndDelete(req.params.id);
        if (!alien) {
            return res.status(404).json({error: "Alien to delete not found"});
        }
        res.status(200).json({message: "Alien deleted" });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.getByName = async (req, res) => {
    try {
        const alien = await Alien.findOne({name: new RegExp('^' + req.params.name + '$', 'i')});
        res.status(200).json(alien);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
