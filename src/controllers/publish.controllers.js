const { pool } = require("../database/db.connect.js");

const publishBlogController = async(req, res)=>{
   
    //Getting the id
    const { id } = req.query;

    //Get the user id from the middleware
    const user_id = req.user.id

    //Validation check
    if(!id){
        return res.status(200).json({
            success: false,
            message: "No limit offset is provided"
        })
    }


    //Query to update the blog to publish
    const publishQuery = "UPDATE blogs SET review = $1, publish = $2 WHERE id = $3 AND written_by = $4";
    const publishValue = [false, true, id, user_id];

    try {
        const publishResult = await pool.query(publishQuery, publishValue);
        if(publishResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                message: "Blog is publish successfully."
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}`,
          });
    }
}

const unpublishBlogsController = async(req, res)=>{
    //Getting the id
    const { id } = req.query;

    //Get the user id from the middleware
    const user_id = req.user.id

    //Validation check
    if(!id){
        return res.status(200).json({
            success: false,
            message: "No id provided"
        })
    }


    //Query to update the blog to publish
    const unpublishQuery = "UPDATE blogs SET review = $1, publish = $2 WHERE id = $3 AND written_by = $4";
    const unpublishValue = [true, false, id, user_id];

    try {
        const unpublishResult = await pool.query(unpublishQuery, unpublishValue);
        if(unpublishResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                message: "Blog is unpublish successfully."
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}`,
          });
    }
}



module.exports = {
    publishBlogController,
    unpublishBlogsController
}