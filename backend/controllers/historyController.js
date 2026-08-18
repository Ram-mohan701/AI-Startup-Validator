const Idea = require('../models/Idea');

const getHistory = async (req, res) => {
    try {
        const ideas = await Idea.find({ user: req.user.userId })
            .sort({ createdAt: -1 });
        res.json({
            success: true,
            count: ideas.length,
            ideas
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch history"
        });
    };
};

const getIdeaById = async (req, res) => {
    try {
        const idea = await Idea.findOne({
            _id: req.params.id,
            user: req.user.userId
        });
        if (!idea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found"
            });
        }

        res.status(200).json({
            success: true,
            idea
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch idea"
        });
    }
}

const deleteIdea = async (req, res) => {
    try {
        const deletedIdea = await Idea.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });
        if (!deletedIdea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Idea deleted successfully",
            data: deletedIdea

        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete idea"
        });
    }
}

module.exports = {
    getHistory,
    getIdeaById,
    deleteIdea
};
