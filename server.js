var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var ExpressValidator = require("express-validator");
var people = {
  name: "Jeff",
  age: 30
};
// var logger= (req,res,next)=>{
//     console.log("logging...")
//     next()
// }
// app.use(logger)
// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// body parser middlewear
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

var user = [
  {
    id: 1,
    f_name: "umar",
    l_name: "baig",
    Email: "umar@gmial.com"
  },
  {
    id: 2,
    f_name: "hamza",
    l_name: "maqsood",
    Email: "hamza@gmial.com"
  },
  {
    id: 3,
    f_name: "hasan",
    l_name: "qadri",
    Email: "hasan@gmial.com"
  }
];
app.get("/", (req, res) => {});

app.use(express.static(path.join(__dirname, "public")));
// globle vars 
app.use((req, res, next)=>{
    res.locals.errors =null
    next()
})
//  express valdator MIDDLEWEAR
app.use(
  ExpressValidator({
    errorFormatter: function(params, msg, value) {
      var namespace = params.split("."),
        root = namespace.shift(),
        formParam = root;
      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        params: formParam,
        msg: msg,
        value: value
      };
    }
  })
);
app.get("/", (req, res) => {
  res.send(people);
});
app.post("/users/add", (req, res) => {
  req.checkBody("First_name", "first Name is Req..").notEmpty();
  req.checkBody("Last_name", "Last Name is Req..").notEmpty();
  req.checkBody("Email", "Eamil Name is Req..").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.render("index", {
      tittle: "Customers",
      users: user,
      errors : errors
    });
  } else {
    var newuser = {
      f_name: req.body.First_name,
      l_name: req.body.Last_name,
      Email: req.body.Email
    };
    console.log("Success");
  }
});

app.listen(3000, () => {
  console.log("server start on port 3000");
});
