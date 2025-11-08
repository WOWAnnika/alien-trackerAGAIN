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
        const aliens = await alienService.getAllAliens();
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
        if (error.message === "Alien not found") {
            return res.status(404).json({error: "Alien not found"});
        }
        res.status(500).json({error: error.message});
    }
};

exports.update = async (req, res) => {
    try {
        const alien = await alienService.updateAlien(req.params.id, req.body);
        res.status(200).json(alien);
    } catch (error) {
        if (error.message === "Alien not found") {
            return res.status(404).json({error: "Alien not found"});
        }
        res.status(500).json({error: error.message});
    }
};

exports.delete = async (req, res) => {
    try {
        const alien = await alienService.deleteAlien(req.params.id);
        res.status(200).json({message: "Alien deleted" });
    } catch (error) {
        if (error.message === "Alien not found") {
            return res.status(404).json({error: "Alien not found"});
        }
        res.status(500).json({error: error.message});
    }
};

exports.getByName = async (req, res) => {
    try {
        const alien = await alienService.getAlienByName(req.params.name);
        res.status(200).json(alien);
    } catch (error) {
        if (error.message === "Alien not found") {
            return res.status(404).json({error: "Alien not found"});
        }
        res.status(500).json({error: error.message});
    }
};
