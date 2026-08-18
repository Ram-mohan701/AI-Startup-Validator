
const express = require("express");
const router = express.Router();

const {analyzeIdea} = require('../controllers/analyzeController')
const authMiddleware = require("../middleware/authMiddleware")

router.post("/",authMiddleware, analyzeIdea)

module.exports = router;