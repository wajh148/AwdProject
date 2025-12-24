const reviewDB = require("../../models/reviews/reviewmodel");

// ADD REVIEW
exports.addReview = async (req, res) => {
    const { recipeid } = req.params;
    const { username, rating, description } = req.body;

    if (!username || !rating || !description) {
        return res.status(400).json({ error: "all field required" });
    }

    try {
        const addReview = new reviewDB({
            recipeid,
            username,
            rating,
            description
        });

        await addReview.save();
        res.status(200).json({
            message: "Review successfully added",
            addReview
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error });
    }
};

// GET RECIPE REVIEW
exports.getRecipeReview = async (req, res) => {
    const { recipeid } = req.params;

    try {
        const getReview = await reviewDB.find({ recipeid });
        res.status(200).json(getReview);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error });
    }
};

// DELETE REVIEW
exports.deleteReview = async (req, res) => {
    const { reviewid } = req.params;

    try {
        const deleteReview = await reviewDB.findByIdAndDelete(reviewid);
        res.status(200).json({
            message: "review delete",
            deleteReview
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error });
    }
};
