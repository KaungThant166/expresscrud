const Blog = require("../model/Blog");

const blogController = {
  index: async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("home", {
      blogs,
      title: "home",
    });
  },
  blogCreateShow: (req, res) => {
    res.render("blogs/create", {
      title: "blog-create",
    });
  },
  blogDetail: async (req, res, next) => {
    try {
      let id = req.params.id;
      const blog = await Blog.findById(id);
      res.render("blogs/blogdetail", {
        title: "blog-detail",
        blog,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  },
  deleteBlog: async (req, res, next) => {
    try {
      let id = req.params.id;
      await Blog.findByIdAndDelete(id);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      next();
    }
  },
  blogCreate: async (req, res) => {
    const { title, intro, body } = req.body;
    const blog = new Blog({
      title,
      intro,
      body,
    });
    await blog.save();
    res.redirect("/");
  },
};

module.exports = blogController;
