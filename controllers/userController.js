
//import model
const users = require('../Model/userSchema')

//import jwt
const jwt = require('jsonwebtoken')


//1) register request
exports.register =async(req, res) => {
    //extract data from request Body 
    const {username, email, password} = req.body  

   try{
    const existUser = await users.findOne({email})

   if(existUser){
    //if docyument already exist
    res.status(406).json('Account already exist... Please Login')
   }
   else{
    //need to register
    //create a object for the model
    const newUser = new users({
        username,
        email,
        password,
        profile:""
    })
    //add to mongodb use save method in mongoose
    await newUser.save()

    //response
    res.status(200).json(newUser)

   }
}catch(err){
    res.status(401).json(`Register request failed due to ${err}`)
}

}

//login request

exports.login = async(req,res)=>{
    
    try{
    const {email,password}=req.body

        const existingUser = await users.findOne({email,password})
    console.log(existingUser)

    if(existingUser){

        //jwt token
        //payload - information that is secretly transmittitted
        //secret or private key - key based on which the token is generated
        const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")

        res.status(200).json({
            existingUser,
            token
        })
    }
    else{
        res.status(404).json('Invalid Email ID or password!')
    }
}catch(err){
    res.status(401).json(`Login request Failed due to ${err}`)
}
}


//edit user profile
exports.editUserProfile = async (req,res)=>{
    const userId = req.payload
    const {username, email,profile} = req.body
    console.log(`${username},${email}`);
    const uploadImage = req.file?req.file.filename:profile

    try {
        const updateUser = await users.findByIdAndUpdate({_id:userId}, {username, email, profile:uploadImage}, {new:true})
        await updateUser.save()
        res.status(200).json(updateUser)   
    } catch (err) {
        res.status(401).json(err)
        
    }
}



//get user details
exports.getUserDetails = async(req,res)=>{
    try {
        const allUsers=await users.find()
        res.status(200).json(allUsers)

        
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)

    }
}