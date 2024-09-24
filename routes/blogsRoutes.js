const express = require("express");
const blogController = require("../controlllers/blogController");

const router = express.Router();

router.get("", blogController.index);

router.get("/create", blogController.blogCreateShow);
router.get("/:id", blogController.blogDetail);
router.post("/:id/delete", blogController.deleteBlog);
router.post("/", blogController.blogCreate);

module.exports = router;
