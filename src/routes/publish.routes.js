const express = require("express");
const { publishBlogController, unpublishBlogsController } = require("../controllers/publish.controllers");
const authentication = require("../middlewares/authentication");

const publishRouter = express();

publishRouter.route("/publish/blog").post(authentication, publishBlogController);

publishRouter.route("/unpublish/blog").post(authentication, unpublishBlogsController);

module.exports = publishRouter

