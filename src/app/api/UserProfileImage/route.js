


// import { connectToDb } from "@/lib/utils";
// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { AdminModel } from "@/lib/models";

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const POST = async (request) => {

//   try {
//     // const {  userId0 } = await request.json();

//     const formData = await request.formData();
//     const image = formData.get("image");
//     const userId = formData.get("userId");
    
//     // console.log("userId0",userId0);
//     console.log("userId",userId);
//     console.log("image",image);
    
    

//     if (!image) {
//       throw new Error("Image is required");
//     }

//     // Convert image file to a buffer
//     const imageBuffer = await image.arrayBuffer();
//     const base64Image = Buffer.from(imageBuffer).toString("base64");


//     // Upload the image to Cloudinary
//     const uploadResponse = await cloudinary.uploader.upload(`data:${image.type};base64,${base64Image}`, {
//       folder: "posts", // Optional: Specify a folder in Cloudinary
//     });


//     // Save the post to MongoDB
//     await connectToDb();
    


// const isUserIdMatch = ""

//     const profileImage = new AdminModel({
//       ProfileimageUrl: uploadResponse.secure_url, // Cloudinary URL
//     });

//     const savedProfile = await profileImage.save();
//     console.log("Post created successfully:", savedPost);

//     return NextResponse.json({
//       message: "profile added successfully",
//       data: savedProfile,
//       status: 200,
//       success: true,
//     });
//   } catch (error) {
//     console.error("profile error:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// };

// export const GET = async (request) => {
//   try {
//     await connectToDb();
//     const profile = await AdminModel.find();

//     return NextResponse.json({
//       message: "Posts fetched successfully",
//       data: profile,
//       status: 200,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Fetch profile error:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// };
