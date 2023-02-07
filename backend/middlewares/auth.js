const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "user id non valide";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error("requête non authentifiée") });
  }
};
