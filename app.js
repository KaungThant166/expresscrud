const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Blog = require("./model/Blog");
const expressLayouts = require("express-ejs-layouts");
const Blogsroute = require("./routes/blogsRoutes");
const app = express();

let mongoUrl =
  "mongodb+srv://kaungthantnaing:ktn123@cluster0.fllue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.set("views", "./views/");
app.set("view engine", "ejs");
app.set("layout", "layouts/default");
app.use(express.static("public"));

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("database connected");
    app.listen(3000, () => {
      console.log(`server listening on 3000`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.use(morgan("dev"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.redirect("/blogs");
});

app.get("/contact-us", (req, res) => {
  res.redirect("/contact");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "contact",
  });
});

app.use("/blogs", Blogsroute);
app.use((req, res) => {
  res.status(404);
  res.render("404", {
    title: "404 Not Found",
  });
});

// app.use((req, res, next) => {
//   console.log("first miiddle is running");
//   next();
// });
// app.use((req, res, next) => {
//   console.log("second miiddle is running");
//   next();
// });
// let Logging = (env) => {
//   return (req, res, next) => {
//     if (env === "dev") {
//       console.log(`${req.method} ${req.originalUrl}`);
//     }
//     next();
//   };
// };

// app.use(Logging("dev"));

// const blogs = [
//   { title: "blogs 1", intro: "hello blog one" },
//   { title: "blogs 2", intro: "hello blog two" },
//   { title: "blogs 3", intro: "hello blog three" },
// ];

// app.get("/add-blog", async (req, res) => {
//   const blog = new Blog({
//     title: "blog  3",
//     intro: "blog 3",
//     body: "blog  3",
//   });
//   await blog.save();
//   res.send("blog save");
// });
