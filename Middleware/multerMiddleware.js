
//import multer 
const multer = require('multer')

//diskstorage- used to create the storage space
const storage = multer.diskStorage({
    //destination : whrere location in which the file is stored
    destination:(req,file,callback)=>{
        callback(null,'./uploads')

    },

    //filename: the name in which the file is stored
    filename:(req,file,callback)=>{
        //Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC).
         const filename = `image-${Date.now()}-${file.originalname}`
         callback(null,filename)
    }

})
//fileFilter : which types of files can be allowed to upload
const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' ||file.mimetype==='image/jpeg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('Only png, jpg, jpeg files are allowed'))
    }
}

//create multer configurattion
const multerConfig = multer({
    storage,  
    fileFilter
})

//export multer
module.exports = multerConfig
