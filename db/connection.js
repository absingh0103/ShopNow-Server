const mongoose = require("mongoose");
const url = process.env.DATABASE_URL;
const connection = mongoose.connect(url).then(() => console.log("connected to database"));
module.exports = connection;