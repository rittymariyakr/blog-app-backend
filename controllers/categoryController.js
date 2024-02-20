const categories = require('../Model/categorySchema')

exports.addCategory = async(req, res)=>{

    console.log('inside category add controller');
    const userId = req.payload
    console.log(userId);

    const {categoryName} = req.body
    console.log(`${categoryName}`);

    try {

        const ExistingCategory = await categories.findOne({categoryName})

        if(ExistingCategory){
            res.status(406).json('Category Already Exist')
        }
        else{
            const newCategory = new categories({
                categoryName,
                userId
            })
            await newCategory.save()
            res.status(200).json(newCategory)
        }
        
    } catch (error) {
        res.status(401).json('add category request recieved',error)
    }

}

//get all category at admin
exports.gettAllCategory = async(req,res)=>{
    try {
        const allCategory = await categories.find()
        res.status(200).json(allCategory)

    } catch (error) {
        res.status(401).json(error)
        
    }
}


//delete category
exports.deleteCategory = async(req,res)=>{
    const {id} = req.params
    console.log(id);

    try {
        const removeCategory = await categories.findByIdAndDelete({_id:id})
        res.status(200).json(removeCategory)

    } catch (error) {
        res.status(401).json(error)
    }
}

//edit ctaegory
exports.editCategory = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {categoryName} = req.body

    try {
        const updateBlogCategory = await categories.findByIdAndUpdate({_id:id},{categoryName, userId},{new:true})

        await updateBlogCategory.save()
        res.status(200).json(updateBlogCategory)
    } catch (error) {
        res.status(401).json(error)
    }
}

//get all category at user
exports.getUserCategory = async(req,res)=>{
    try {
        const userCategory = await categories.find()
        res.status(200).json(userCategory)

    } catch (error) {
        res.status(401).json(error)
        
    }
}