const { pool } = require("../database/db.connect.js");

const createBlogsController = async (req, res) => {
  //Getting all the detail form the request.
  const { title, description, body } = req.body;

  //Fetching the path of the files (Images)
  const micro_image_path = req.files[0]?.path;
  const minor_image_path = req.files[1]?.path;

  //Fetching the user id from the middleware.
  const user_id = req.user.id;
  // console.log(req.user.id)

  //Validation check
  if (
    !title ||
    !description ||
    !body ||
    !micro_image_path ||
    !minor_image_path ||
    !user_id
  ) {
    return res.status(400).json({
      success: false,
      message: "Please check all your fields",
    });
  }

  //Query to insert into the database.
  const createBlogsQuery =
    "INSERT INTO blogs (title, description, body, micro_image_path, display_image_path, written_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";
  const createBlogsValue = [
    title,
    description,
    body,
    micro_image_path,
    minor_image_path,
    user_id,
  ];
  try {
    const createBlogsResult = await pool.query(
      createBlogsQuery,
      createBlogsValue
    );
    if (createBlogsResult.rowCount != 0) {
      return res.status(201).json({
        success: true,
        message: `Blog is successfully created.`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error}`,
    });
  }
};

const deleteBlogsController = async (req, res) => {
  //Geetting the id of the blogs to delete.
  const { id } = req.query;

  //Get the id from the middleware.
  const user_id = req.user.id;

  //Validation check.
  if (!id || !user_id) {
    return res.status(400).josn({
      success: false,
      message: "This is not allowed",
    });
  }

  //Query to delete the blogs.
  const deleteblogsQuery = "DELETE FROM blogs WHERE id = $1 AND publish = $2";
  const deleteblogsValue = [id, false];

  //hit the database with the query to delete the blogs
  try {
    const deleteblogsResult = await pool.query(
      deleteblogsQuery,
      deleteblogsValue
    );
    if (deleteblogsResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        message: "Blogs is deleted successfully",
      });
    } else {
      return res.status(204).json({
        success: false,
        message: "Blog not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error}`,
    });
  }
};

const putBlogsController = async (req, res) => {
  //Getting all the detail form the request.
  const { title, description, body } = req.body;

  const { id } = req.query;

  //Fetching the path of the files (Images)
  // const micro_image_path = req.files[0]?.path;
  // const minor_image_path = req.files[1]?.path;

  //Fetching the user id from the middleware.
  const user_id = req.user.id;

  //Validation check
  if (
    !id||
    !title ||
    !description ||
    !body ||
    !user_id
  ) {
    return res.status(400).json({
      success: false,
      message: "Please check all your fields",
    });
  }

  //Query to insert into the database.
  const updateBlogsQuery =
    "UPDATE blogs SET title=$1, description=$2, body=$3, written_by=$4 WHERE id = $5 AND publish = $6";
  const updateBlogsValue = [
    title,
    description,
    body,
    user_id,
    id,
    false
  ];
  try {
    const updateBlogsResult = await pool.query(
        updateBlogsQuery,
        updateBlogsValue
    );
    if (updateBlogsResult.rowCount != 0) {
      return res.status(200).json({
        success: true,
        message: "Blogs Updated Successfully",
      });
    }
    else{
        return res.status(204).json({
            success: true,
            message: "Blogs Not Found",
          });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error}`,
    });
  }
};


const getAllBlogsController = async (req, res) => {
  
    //Getting the limit and the offset from the query.
    const {limit, offset} = req.query;

    //Validation check.
    if(!limit || !offset){
        return res.status(200).json({
            success: false,
            message: "No limit offset is provided"
        })
    }

    //Query to fetch the blogs according to the limit and offset.
    const getblogsQuery = "SELECT * FROM blogs WHERE publish = $1 LIMIT $2 OFFSET $3";
    const getblogsValue = [true, limit, offset];


    //Query to fetch the blogs.
    try {
        const getblogsResult = await pool.query(getblogsQuery, getblogsValue);
        if(getblogsResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: getblogsResult.rows
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "No More Blogs in the Review Tab"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}`,
          });
    }
};


const getSingleBlogController = async (req, res) => {
   
    //Getting the id from the frontend.
    const { id } = req.query;

    //Validation Check 
    if(!id){
        return res.status(200).json({
            success: false,
            message: "Id not found"
        })
    }


    //Query 
    const getBlogQuery = "SELECT * FROM blogs WHERE id = $1";
    const getBlogValue = [id];

    try {
        const getBlogResult = await pool.query(getBlogQuery, getBlogValue);

        if(getBlogResult.rowCount != 0){
            return res.status(200).json({
                success: true,
                data: getBlogResult.rows
            })
        }else{
            return res.status(204).json({
                success: true,
                message: "Blogs Not Found",
              });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal Server Error ${error}`,
          }); 
    }
};


const getAllReviewBlogsController = async(req, res)=>{
  //Getting the limit and the offset from the query.
  const {limit, offset} = req.query;

  //Validation check.
  if(!limit || !offset){
      return res.status(200).json({
          success: false,
          message: "No limit offset is provided"
      })
  }

  //Query to fetch the blogs according to the limit and offset.
  const getblogsQuery = "SELECT * FROM blogs WHERE publish = $1 LIMIT $2 OFFSET $3";
  const getblogsValue = [false, limit, offset];


  //Query to fetch the blogs.
  try {
      const getblogsResult = await pool.query(getblogsQuery, getblogsValue);
      if(getblogsResult.rowCount != 0){
          return res.status(200).json({
              success: true,
              data: getblogsResult.rows
          })
      }else{
          return res.status(400).json({
              success: false,
              message: "No More Blogs in the Review Tab"
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
  createBlogsController,
  deleteBlogsController,
  putBlogsController,
  getAllBlogsController,
  getSingleBlogController,
  getAllReviewBlogsController
};
