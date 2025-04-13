const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "Admin") {
      return res.status(403).json({ error: "Access denied, not an admin" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = { authenticateAdmin };