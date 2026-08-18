const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },


        startupName: {
            type: String,
            required: true
        },
        idea: {
            type: String,
            required: true
        },
        industry: {
            type: String,
            required: true
        },
        analysis: {
            type: Object,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Idea", ideaSchema);