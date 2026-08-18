const express = require('express');
const cors = require('cors');

const analyzeRoutes = require("./routes/analyzeRoutes");
const historyRoutes = require("./routes/historyRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/analyze",analyzeRoutes);
app.use("/api/history",historyRoutes)
app.use("/api/auth",authRoutes);

app.get('/',(req,res)=>{
    res.send("AI Startup Validator Backend id Running..")
});

module.exports = app;