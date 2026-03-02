const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

            // DB connection
mongoose.connect("mongodb://127.0.0.1:27017/elearning")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

        // Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

            // Routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/subjects"));
app.use("/", require("./routes/quiz"));
app.use("/", require("./routes/certificate"));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});