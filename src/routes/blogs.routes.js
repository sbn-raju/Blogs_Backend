const express = require("express");
const { createBlogsController, putBlogsController, deleteBlogsController, getSingleBlogController, getAllBlogsController, getAllReviewBlogsController } = require("../controllers/blogs.controllers");
const authentication = require("../middlewares/authentication");
const upload = require("../helpers/multer.js");



const blogRouter = express();


blogRouter.route("/create/blog").post(authentication, upload.array('images', 2), createBlogsController);

blogRouter.route("/update/blog").put(authentication, upload.array('images', 2), putBlogsController);

blogRouter.route("/delete/blog").delete(authentication, deleteBlogsController);

blogRouter.route("/read/blogs").get(getSingleBlogController);

blogRouter.route("/read-all/blogs").get(getAllBlogsController);

blogRouter.route("/read-all/review/blogs").get(getAllReviewBlogsController);

module.exports = blogRouter