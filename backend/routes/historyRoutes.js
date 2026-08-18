const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {getHistory, getIdeaById, deleteIdea} = require("../controllers/historyController");

router.get("/",authMiddleware,getHistory);
router.get("/:id",authMiddleware,getIdeaById)
router.delete("/:id",authMiddleware,deleteIdea)
module.exports = router;