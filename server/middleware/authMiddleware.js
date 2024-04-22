const jwt = require("jsonwebtoken");
const userModal = require('../modals/user') 

const authMiddleware = async(req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token)
    if (token) {
      const response = await jwt.verify(token, process.env.JWT_SECRET, {});
      req.user = userModal.findById(response.id).select('-password')
      next()
    } else {
      return res.status(400).json({
        status: "failure",
        msg: "token not found",
      });
    }
  } catch (error) {
    console.log(error)
  }
};

module.exports = authMiddleware