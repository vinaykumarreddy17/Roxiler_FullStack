const express = require('express');
const router = express.Router();
const { Store, Rating, User } = require('../models');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/dashboard', async (req, res) => {
  const ownerId = req.user.id;

  try {
    const store = await Store.findOne({
      where: { ownerId },
      include: [{ model: Rating, include: [User] }]
    });

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const ratings = store.Ratings.map(r => r.rating);
    const avgRating = ratings.length
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
      : 0;

    res.json({
      storeName: store.name,
      averageRating: avgRating,
      ratedByUsers: store.Ratings.map(r => ({
        name: r.User.name,
        rating: r.rating
      }))
    });
  } catch (error) {
    console.error('Error fetching store dashboard:', error);
    res.status(500).json({ error: 'An error occurred while fetching the store dashboard.' });
  }
});

module.exports = router;