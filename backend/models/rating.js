const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Rating = sequelize.define("Rating", {
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
      notNull: { msg: "Score is required" },
    },
  },
}, {
  timestamps: true,
});

module.exports = Rating;
