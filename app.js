const express = require("express");
const app = express();
const port = 1000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const sessionStore = new session.MemoryStore;
const { flash } = require('express-flash-message');
const db = mongoose.connection;
const categoryRoute = require('./routes/category_route');
const galleryRoute = require('./routes/gallery-router');
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

//flash message
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
      },
    })
);
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use ((req, res, next) => {
    res.locals.url = req.originalUrl;
    res.locals.host = req.get('host');
    res.locals.protocol = req.protocol;
    next();
});

app.use('/admin/categories', categoryRoute);
app.use('/admin/gallery', galleryRoute);

//mongoose
// login connection into mongodb
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.znxdx.mongodb.net/TH2012E_Project_Sem1_Final?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// notified connection mongodb!
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
})
const Cat = mongoose.model("Cat", { name: String });
console.log("Connection!");

//home
app.get('/user/page/home',(req, res) => {
  res.render('user/page/home.ejs');
})
//contact
app.get("/user/page/contact", (req, res) => {
  res.render("user/page/contact.ejs");
});
//gallery
app.get("/user/page/gallery", (req, res) => {
  res.render("user/page/gallery.ejs");
});
// about
app.get("/user/page/about", (req, res) => {
  res.render("user/page/about_us.ejs");
});
//blog_detail
app.get("/user/page/blog_detail", (req, res) => {
  res.render("user/page/blog_detail.ejs");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
