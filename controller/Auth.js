//* here user or (req.user) comes from the user created on signup
//* if Not understand Check PassPortjs Login and signup Auth Code where user is created
require("dotenv").config();
//   Authentication API ? !
const Users = require("../model/Users");

// Crypto Package is inbuilt encrypition package of node js
const crypto = require("crypto");
const { authInfo, SendMail } = require("../services/common");
const jwt = require("jsonwebtoken");

// Create User Api ( SignUp Api )
exports.createUser = async (req, resp) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        //  Here Password Is Save In DB in Encrypted Form
        const user = new Users({ ...req.body, password: hashedPassword, salt });
        const data = await user.save();

        // To Call Serilaization User After SighUp Also
        req.login(authInfo(data), (err) => {
          if (err) {
            resp.status(400).json(err);
          } else {
            //  return only userId and role ENCRYPTED  and used by selectLoggedInUser
            const token = jwt.sign(authInfo(data), process.env.JWT_SECRET_KEY);
            // TO Pass And Save Token into Frontend
            resp
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000), //1hr
                httpOnly: true,
              })
              .status(201)
              .json({ id: data.id, role: data.role });
          }
        });
      }
    );
  } catch (err) {
    resp.status(400).json(err);
  }
};

//   Login API
exports.loginUser = async (req, resp) => {
  // It is Created By Passport Implmemnted In Index Page
  // TO Pass And Save Token into Frontend
  const user = req.user;
  resp
    .cookie("jwt", user.token, {
      expires: new Date(Date.now() + 3600000), //1hr
      httpOnly: true,
    })
    .status(201)
    .json({ id: user.id, role: user.role });
};

//  CheckUser API get Detils of User After deSerilaization
exports.CheckUser = async (req, resp) => {
  //  It is Created By Passport Implmemnted In Index Page
  if (req.user) {
    resp.json(req.user);
  } else {
    resp.sendStatus(401);
  }
};

// logout API

exports.logout = async (req, resp) => {
  try {
   
    resp.clearCookie("jwt", {
      path: "/",
      expires: new Date(0),
      httpOnly: true,
    });
    resp.clearCookie('connect.sid', { path: '/' });
    resp.sendStatus(200);
  } catch (error) {
    console.error("Error during logout:", error);
    resp.sendStatus(500).json({ error: "Internal Server Error" });
  }
};

// Mail Send Api
exports.resetPasswordRequest = async (req, resp) => {
  const email = req.body.email;
  // Here we find if User exist with given Email id or not
  const user = await Users.findOne({ email: email });
  if (user) {
    // if User Found Then We Also send a Token in Email so that we can verify that it is real user not anyone who have link of reset password can change password
    const token = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save();
    const resetPage =
      "https://shopnow-nkp0.onrender.com/reset-password?token=" + token + "&email=" + email;
    const subject = "reset password for your ShopNow account";
    const html = `<p>Click <a href='${resetPage}'>here</a>to Reset Password </p>`;
    if (email) {
      const response = await SendMail({ to: email, subject, html });
      resp.json(response);
    } else {
      resp.sendStatus(400);
    }
  } else {
    resp.sendStatus(400);
  }
};

// Reset Password
exports.resetPassword = async (req, resp) => {
  const { email, token, password } = req.body;
  // Here we find User With Email
  // And Match Token stored in resetPasswordToken
  const user = await Users.findOne({ email: email, resetPasswordToken: token });
  if (user) {
    // New Password Hashing
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        //  Here Password Is Save In DB in Encrypted Form
        user.password = hashedPassword;
        user.salt = salt;
        await user.save();
        //  Email For successful Password Change
        const subject = " Password successfully reset for your ShopNow account";
        const html = `<p>Password reset SUCCESSFULLY </p>`;
        if (email) {
          const response = await SendMail({ to: email, subject, html });
          resp.json(response);
        } else {
          resp.sendStatus(400);
        }
      }
    );
  } else {
    resp.sendStatus(400);
  }
};
