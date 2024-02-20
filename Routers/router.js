// setup path to resolve request

//1) import express module
const express = require('express')

//import user controller
const userController = require('../controllers/userController')

//import blogController
const blogController= require('../controllers/blogController')

//import categoryController
const categoryController = require('../controllers/categoryController')

//import jwt middleware
const jwtMiddleware = require('../Middleware/jwtMiddleware')

//import multer
const multerConfig = require('../Middleware/multerMiddleware')

//2) create an object for router class inside express module
const router = new express.Router()

//3)
//a)register
router.post('/user/register',userController.register)

//b) login
router.post('/user/login', userController.login)

//c)add blog
router.post('/blogs/add',jwtMiddleware,multerConfig.single('blogImage'), blogController.addBlog)

//d) home blog
router.get('/blogs/home-blog', blogController.getHomeBlog)

//e) all blog
router.get('/blogs/all-blog',jwtMiddleware, blogController.getAllBlog)

//f) user blog
router.get('/blogs/user-blog',jwtMiddleware, blogController.getUserBlog)

//g)edit blog
router.put('/blog/edit/:id',jwtMiddleware,multerConfig.single('blogImage'),blogController.editUserBlog)

//delete blog
router.delete('/blog/remove/:id',jwtMiddleware,multerConfig.single('blogImage'),blogController.deleteBlog)

//add cateogry
router.post('/admin/category',jwtMiddleware,categoryController.addCategory)

//e) get all category at admin
router.get('/admin/all-category',jwtMiddleware, categoryController.gettAllCategory)

//delete category
router.delete('/admin/removeCategory/:id',jwtMiddleware,categoryController.deleteCategory)


//g)edit category
router.put('/admin/editCategory/:id',jwtMiddleware,categoryController.editCategory)

//get category at user
router.get('/user/all-category', categoryController.getUserCategory )

// get user details
router.get('/user/userDetails',jwtMiddleware, userController.getUserDetails)

//edit profile
router.put('/user/editProfile',jwtMiddleware,multerConfig.single('profile'),userController.editUserProfile)

//
router.get('/blogs/all-blogs/:id',jwtMiddleware, blogController.blogPoster)

//4) export router
module.exports = router     