const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = mongoose.connection;
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//mongoose
// login connection into mongodb
mongoose.connect(
  "mongodb+srv://admin:admin@cluster2.6wtsh.mongodb.net/Callygraphy?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// notified connection mongodb!
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  
});


const Cat = mongoose.model("Cat", { name: String });
console.log("Connection!");







////////////////////////////////
app.get("/demo/mongooes", (req,res) => {
  const kitty = new Cat({ name: req.query.name });
  kitty.save().then(() => console.log(kitty.name));
  res.send("create success!");
});

//admin-create
app.get('/admin/product/form/create', (req, res) => {
  res.render('admin/product/form.ejs');
  
})
//create
app.post("/admin/product/form/create", (req, res) => {
  res.send(req.body);
});
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