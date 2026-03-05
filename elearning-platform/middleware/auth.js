const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {

 const token = req.cookies.token;

 if (!token) {
  return res.redirect("/login");
 }

 try {

  const decoded = jwt.verify(token, "mysecretkey");

  req.user = decoded;

  next();

 } catch (error) {

  return res.redirect("/login");

 }

};

module.exports = { checkAuth };