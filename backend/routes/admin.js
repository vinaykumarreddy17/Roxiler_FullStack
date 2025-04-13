const express = require("express");
const { Op } = require("sequelize");
const { Store } = require("../models");
const { authenticateAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/add-store", authenticateAdmin, async (req, res) => {
  const { name, email, address } = req.body;

  if (!name || name.length < 20 || name.length > 60) {
    return res.status(400).json({ error: "Name must be between 20 and 60 characters." });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }
  if (!address || address.length > 400) {
    return res.status(400).json({ error: "Address must not exceed 400 characters." });
  }

  try {
    const newStore = await Store.create({ name, email, address });
    res.status(201).json({ message: "Store added successfully", store: newStore });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/stores", authenticateAdmin, async (req, res) => {
  const { name, email, address, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const stores = await Store.findAndCountAll({
      where: {
        name: name ? { [Op.like]: `%${name}%` } : undefined,
        email: email ? { [Op.like]: `%${email}%` } : undefined,
        address: address ? { [Op.like]: `%${address}%` } : undefined,
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json({
      total: stores.count,
      pages: Math.ceil(stores.count / limit),
      currentPage: parseInt(page),
      stores: stores.rows,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;