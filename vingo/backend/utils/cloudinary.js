
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (file) => {
    try {
        if (!file) {
            throw new Error("File path is missing");
        }

        console.log("Uploading file:", file);

        const result = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        });

        console.log("Cloudinary upload successful:");
        console.log(result.secure_url);

        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }

        return result.secure_url;

    } catch (error) {

        console.log("Cloudinary error:", error);

        if (file && fs.existsSync(file)) {
            fs.unlinkSync(file);
        }

        throw error;
    }
};

export default uploadOnCloudinary;
