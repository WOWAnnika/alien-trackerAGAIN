const express = require('express');
const router = express.Router();
const controller = require("../controllers/alienController");
const {validateAlien} = require("../middelwares/alienValidate");

router.post("/aliens", validateAlien, controller.create);
router.get("/aliens", controller.getAll);
router.get("/aliens/:id", controller.getById);
router.put("/aliens/:id", validateAlien, controller.update);
router.delete("/aliens/:id", controller.delete);
router.get("/aliens/name/:name", controller.getByName);

module.exports = router;
