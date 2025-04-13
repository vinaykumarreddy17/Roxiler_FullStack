const User = require("./User");
const Store = require("./Store");
const Rating = require("./Rating");

User.hasMany(Rating, { foreignKey: "userId", onDelete: "CASCADE" });

Store.hasMany(Rating, { foreignKey: "storeId", onDelete: "CASCADE" });

Rating.belongsTo(User, { foreignKey: "userId" });

Rating.belongsTo(Store, { foreignKey: "storeId" });

module.exports = { User, Store, Rating };
