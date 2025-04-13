const express = require("express");
const { Rating, Store } = require("../models");
const { authenticateUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/rate/:storeId", authenticateUser, async (req, res) => {
  const { storeId } = req.params;
  const { rating } = req.body;
  const userId = req.user.id;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  }

  try {
    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({ error: "Store not found." });
    }

    const existingRating = await Rating.findOne({ where: { userId, storeId } });
    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      await Rating.create({ userId, storeId, rating });
    }

    const storeRatings = await Rating.findAll({ where: { storeId } });
    const averageRating = storeRatings.reduce((sum, rate) => sum + rate.rating, 0) / storeRatings.length;
    store.averageRating = averageRating;
    await store.save();

    res.status(200).json({ message: "Rating submitted successfully", averageRating });
  } catch (error) {
    console.error("Error submitting rating:", error);
    res.status(500).json({ error: "An error occurred while submitting the rating." });
  }
});

module.exports = router;