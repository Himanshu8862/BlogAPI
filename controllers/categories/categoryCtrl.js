const createCategoryCtrl = async(req,res)=>{
    try {
        res.json({
            status:"Success",
            data:"category created"
        });
    } catch (error) {
        res.json(error.message);
    }
};

const categoryDetailsCtrl = async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"category route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

const deleteCategoryCtrl = async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Delete category route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

const updateCategoryCtrl = async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Update category route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

module.exports = {
    categoryDetailsCtrl,
    createCategoryCtrl,
    deleteCategoryCtrl,
    updateCategoryCtrl,
    // fetchCategoriesCtrl,
  };