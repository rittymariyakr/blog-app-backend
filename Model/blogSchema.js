//import mongoose
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    category:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    blogImage:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    createdAt: {
        type: String,
        default: () => {
            const today = new Date();
            const timestamp = new Intl.DateTimeFormat("en-GB",{year:'numeric',month:'2-digit',day:'2-digit'}).format(today)
            return timestamp;
        }
    }
    

})

const blogs = mongoose.model("blogs",blogSchema)


module.exports = blogs


