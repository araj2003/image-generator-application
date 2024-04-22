const userModal = require("../modals/user");
const { hashPassword, comparePassword } = require("../utils/bcryptFunc");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failure",
        msg: "Please enter all fields",
      });
    }

    const user = await userModal.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        status: "failure",
        msg: "user Not found",
      });
    }
    if (!comparePassword(password, user.password)) {
      return res.status(400).json({
        status: "failure",
        msg: "Invalid credentials",
      });
    }
    user.password = undefined
    if (user != null) {
      jwt.sign(
        {
          name: user.userName,
          email: user.email,
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) {
            throw err;
          }
          return res.cookie("token", token, {
            httpOnly: false,
            sameSite: "none",
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          }).json(
            {
                status: "success",
                user,
                msg: "sign in successful",
              }
          );
        }
      );
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

const register = async (req, res) => {
  try {
    const { email, userName, password } = req.body;

    if (!email || !password || !userName) {
      return res.status(400).json({
        status: "failure",
        msg: "Please enter all fields",
      });
    }

    let user = await userModal.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        status: "failure",
        msg: "user already exist",
      });
    }

    const newPassword = await hashPassword(password);

    user = await userModal.create({
      userName,
      email,
      password: newPassword,
    });
    user.password = undefined;
    if (user != null) {
      jwt.sign(
        {
          name: user.userName,
          email: user.email,
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) {
            throw err;
          }
          return res.cookie("token", token, {
            httpOnly: false,
            sameSite: "none",
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          }).json({
            status: "success",
            user,
            msg: "sign up successful",
          })
        }
      );
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};



const forgetPass = (req, res) => {
  res.json("forgetPass");
};

const resetPass = (req, res) => {
  res.json("resetPass");
};

const profile = async(req, res) => {
    const { token } = req.cookies || {};
    console.log(req.cookies);
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) {
                throw err;
            }
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

const logout = (req, res) => {
  res.json("logout");
};

module.exports = { login, register, forgetPass, resetPass, profile, logout };
