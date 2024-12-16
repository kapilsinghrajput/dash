// import { NextResponse } from "next/server";
// import { PostModel } from "@/lib/models";
// import { connectToDb } from "@/lib/utils";
// import { promises as fs } from "fs";
// import path from "path";

// export async function DELETE(request, { params }) {
//   const { id } = await params;

//   try {
//     // Connect to the database
//     await connectToDb();

//     // Find the post to delete
//     const post = await PostModel.findById(id);

//     if (!post) {
//       return NextResponse.json({ message: "Post not found" }, { status: 404 });
//     }

//     // Delete the associated image file
//     if (post.imageUrl) {
//       const imagePath = path.join(process.cwd(), "public", post.imageUrl);
//       await fs.unlink(imagePath).catch((error) => {
//         console.warn("Failed to delete image file:", error.message);
//       });
//     }

//     // Delete the post from the database
//     await PostModel.findByIdAndDelete(id);

//     return NextResponse.json({ message: "Post deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     return NextResponse.json(
//       { message: "Failed to delete post", error },
//       { status: 500 }
//     );
//   }
// }

// // EDIT API
// export async function PATCH(request, { params }) {
//   const { id } = await params;

//   try {
//     const formData = await request.formData();
//     const title = formData.get("title");
//     const description = formData.get("description");
//     const image = formData.get("image"); // Optional image file

//     // Connect to the database
//     await connectToDb();

//     // Fetch the existing post
//     const post = await PostModel.findById(id);
//     if (!post) {
//       return NextResponse.json({ message: "Post not found" }, { status: 404 });
//     }

//     // Update the fields
//     post.title = title || post.title;
//     post.description = description || post.description;

//     if (image) {
//       // Ensure the upload directory exists
//       const uploadDir = path.join(process.cwd(), "public/uploads");
//       await fs.mkdir(uploadDir, { recursive: true });

//       // Generate a unique filename for the new image
//       const imageName = `${Date.now()}-${image.name}`;
//       const imagePath = path.join(uploadDir, imageName);

//       // Save the new image to the server's file system
//       const imageBuffer = await image.arrayBuffer();
//       await fs.writeFile(imagePath, Buffer.from(imageBuffer));

//       // Remove the old image file if it exists
//       if (post.imageUrl) {
//         const oldImagePath = path.join(process.cwd(), "public", post.imageUrl);
//         await fs.unlink(oldImagePath).catch(() => null); // Ignore errors if the file doesn't exist
//       }

//       // Update the `imageUrl` field
//       post.imageUrl = `/uploads/${imageName}`;
//     }

//     // Save the updated post
//     const updatedPost = await post.save();

//     return NextResponse.json(
//       { message: "Post updated successfully", post: updatedPost },
//       { status: 200, success: true }
//     );
//   } catch (error) {
//     console.error("Error updating post:", error);
//     return NextResponse.json(
//       { message: "Error updating post", error },
//       { status: 500 }
//     );
//   }
// }

// export const GET = async (request, { params }) => {
//   try {
//     await connectToDb();

//     const { id } = await params;
//     const post = await PostModel.findById(id);

//     if (!post) {
//       return NextResponse.json({ error: "Post not found" }, { status: 404 });
//     }

//     return NextResponse.json({
//       message: "post fetched successfully",
//       data: post,
//       status: 200,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error fetching post by ID:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// };



// cloudinary setped code /////////


import { NextResponse } from "next/server";
import { PostModel } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH(request, { params }) {
  const { id } = params;

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image"); // Optional new image file

    // Connect to the database
    await connectToDb();

    // Fetch the existing post
    const post = await PostModel.findById(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Update title and description if provided
    post.title = title || post.title;
    post.description = description || post.description;

    if (image) {
      // Convert image file to a buffer
      const imageBuffer = await image.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString("base64");

      // Upload the new image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(
        `data:${image.type};base64,${base64Image}`,
        { folder: "posts" } // Optional: Specify folder in Cloudinary
      );

      // Remove the old image from Cloudinary if it exists
      if (post.imageUrl) {
        const oldImagePublicId = post.imageUrl
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0]; // Extract public ID from URL
        await cloudinary.uploader.destroy(oldImagePublicId).catch(() => null); // Ignore errors
      }

      // Update imageUrl field
      post.imageUrl = uploadResponse.secure_url;
    }

    // Save the updated post
    const updatedPost = await post.save();

    return NextResponse.json(
      { message: "Post updated successfully", data: updatedPost, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Error updating post", error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
