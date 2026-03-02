const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch {
    return res.redirect("/login");
  }
};