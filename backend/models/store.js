const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Store = sequelize.define(
  "Store",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [20, 60],
        notNull: { msg: "Store name is required" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Must be a valid email address" },
        notNull: { msg: "Email is required" },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 400],
        notNull: { msg: "Address is required" },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Store;
