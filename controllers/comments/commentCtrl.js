// create
const createCommentCtrl = async(req,res)=>{
    try {
        res.json({
            status:"Success",
            data:"comment created"
        });
    } catch (error) {
        res.json(error.message);
    }
};

// update
const updateCommentCtrl = async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Update comment route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

const deleteCommentCtrl = async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Delete comment route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

const commentDetailsCtrl = async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"comment route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

module.exports = {
    createCommentCtrl,
    updateCommentCtrl,
    deleteCommentCtrl,
    commentDetailsCtrl
  };