//import model
const blogs = require('../Model/blogSchema')

const users = require('../Model/userSchema')

exports.addBlog = async (req, res) => {
    console.log('inside blog add controller');
    const userId = req.payload
    console.log(userId);

    const blogImage = req.file.filename
    console.log(blogImage);

    const { title, category, content} = req.body
    console.log(`${title}, ${category}, ${content}, ${blogImage}, ${userId}`);

    try {
        const ExistingBlog = await blogs.findOne({ title })

        if (ExistingBlog) {
            res.status(406).json('Blog Already Exist with same title.. Please upload new blog')
        }
        else {
            const newBlog = new blogs({
                title,
                category,
                content,
                blogImage,
                userId,
            

            })
         
            await newBlog.save()
            res.status(200).json(newBlog)

        }

    } catch (err) {
        res.status(401).json('add blog request recieved')
    }
}

//home blog
exports.getHomeBlog = async (req, res) => {
    // const homeBlog = await blogs.find()
    try {
        const homeBlog = await blogs.find().limit(6)
        res.status(200).json(homeBlog)

    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}


//all blogs
exports.getAllBlog = async (req, res) => {
    try {
        const allBlog = await blogs.find()
        res.status(200).json(allBlog)


    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)

    }
}


//user Blogs
exports.getUserBlog = async (req, res) => {
    const userId = req.payload
    try {
        const userBlog = await blogs.find({ userId })
        res.status(200).json(userBlog)

    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)

    }
}

//edit blog
exports.editUserBlog = async (req, res) => {
    const { id } = req.params
    const userId = req.payload
    const { title, category, content, blogImage } = req.body
    const uploadedBlogImage = req.file ? req.file.filename : blogImage

    try {
        const updateBlog = await blogs.findByIdAndUpdate({ _id: id }, { title, category, content, blogImage: uploadedBlogImage, userId }, { new: true })

        await updateBlog.save()
        res.status(200).json(updateBlog)

    } catch (err) {
        res.status(401).json(err)

    }
}

//delete blog
exports.deleteBlog = async (req, res) => {
    const { id } = req.params

    try {
        const removeBlog = await blogs.findByIdAndDelete({ _id: id })
        res.status(200).json(removeBlog)

    } catch (err) {
        res.status(401).json(err)

    }
}


// get combined users and blog
exports.blogPoster = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const userId =  req.payload
        console.log(userId);
        const blog = await blogs.find({ userId: id })
        const user = await users.find({ _id: id })
        res.status(200).json({ blog, user })
    }
    catch (err) {
        res.status(401).json(err)
    }
}
