import multer from  'multer'
import uploadOnCloudinary from '../utils/cloudinary'
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"/public")

    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})


export const upload= multer({storage})