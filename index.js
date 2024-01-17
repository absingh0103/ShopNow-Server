require("dotenv").config();
const express = require("express");

const productsRouter = require("./routes/Products");
const brandsRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Categories");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Orders");
const connection = require("./db/connection");
const path=require("path")
//  For Authentication Using Passport MiddleWare
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const Users = require("./model/Users");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const { isAuth, authInfo, cookieExtractor } = require("./services/common");
// Using Jwt Token to Create Cookie
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const { env } = require('process');

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

const server = express();
const cors = require("cors");

//   Middleware
server.use(express.json()); // to parse req.body
//  for Passing user Defined Headers we need to pass it here aslo
server.use(cors({ exposedHeaders: ["X-Total-Count"] }));
server.use(cookieParser());


// !PassPort Authentication
server.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false, //   don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

// ! LOGIN API WITH PASSPORT AUTHENTICATION
server.use(passport.authenticate("session"));

//   Passport Local Sterategy
//   here it Checks
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await Users.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Invalid Credentials" });
      }
      // Now Password Matching During Login
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          // check password with stored password
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Invalid Credentials" });
          }
          // here User Info Id and role Encrypted into Token
          const token = jwt.sign(authInfo(user), process.env.JWT_SECRET_KEY);
          
          done(null, { id: user.id, role: user.role, token }); //this call serialzation
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

// Jwt Passport
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await Users.findById(jwt_payload.id);
      if (user) {
        // Call serializeUser
        return done(null, authInfo(user));
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// serialization and Desearilization
// this creates session variable req.user when called from callback
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    
    return cb(null, { id: user.id, role: user.role });
  });
});
// this changes session variable req.user when called from authorised request
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    
    return cb(null, user);
  });
});
// ! Authentication Ends Here

// ! stripe payment Integration
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_KEY);

server.post("/create-payment-intent", async (req, res) => {
  const { totalAmount, order_id } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100,
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      order_id,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// ! Stripe Payment Integration End

// WebHook For Stripe
// Webhook is used to tell server that the payment of particular order is completed or not in case of any system failure
// webhook directly communicate to server not to froentend

// TODO:Here We will Capture Actual Order And then find whether payment succeed or not

// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = process.env.WEBHOOK_ENDPOINT_SECRET;

// server.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   (request, response) => {
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//     } catch (err) {
//       response.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }
//     // Handle the event
//     switch (event.type) {
//       case "payment_intent.succeeded":
//         const paymentIntentSucceeded = event.data.object;
//         // Then define and call a function to handle the event payment_intent.succeeded
//         break;
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }
//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   }
// );


// Routes Middleware




server.use("/products", productsRouter);
server.use("/brands", brandsRouter);
server.use("/categories", categoriesRouter);
server.use("/users", isAuth(), userRouter);
server.use("/auth", authRouter);
server.use("/cart", isAuth(), cartRouter);
server.use("/orders", isAuth(), orderRouter);


// Deployment 
server.use(express.static(path.join(__dirname,"./client/build")));
server.get("*",function(_,resp){
  resp.sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
    resp.status(500).send(err);
  })
})



server.listen(process.env.PORT || 8080 , () => {
  console.log("server started");
});
