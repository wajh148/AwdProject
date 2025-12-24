const express = require("express");
const router = express.Router();

const userAuthentication = require("../../middleware/userAuthenticate");
const reviewAuthcontroller = require("../../controllers/reviews/reviewControllers");

// review auth
router.post(
    "/create/:recipeid",
    userAuthentication,
    reviewAuthcontroller.addReview
);

router.get(
    "/getreview/:recipeid",
    reviewAuthcontroller.getRecipeReview
);

router.delete(
    "/deletereview/:reviewid",
    userAuthentication,
    reviewAuthcontroller.deleteReview
);

module.exports = router;
