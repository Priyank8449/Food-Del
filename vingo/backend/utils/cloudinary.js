import { v2 as cloudinary } from 'cloudinary'
import fs from'fs'
const uploadOnCloudinary = async () => {
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUDNAME,
        api_key:process.env.CLOUDINARY_APIKEY,
        api_secret:process.env.CLOUDINARY.API.KEY
    });
    try {
       const result= await cloudinary.uploader.upload(file)

       fs.unlinkSync(file)
       return result.secure_url
       
    }
    catch (error) {
        fs.unlinkSync(file)
        console.log(error)

    }
}


export default uploadOnCloudinary