"use client";

// import { useState } from "react";
import { client } from "@/utils/amplify-client-utils";
// import { ImageUploader } from "./ImageUploader";
import { uploadData } from 'aws-amplify/storage';

export default function AddActivityForm() {
  
  const handleUploadData = async (file: File): Promise<void> => {
          
          const result = await uploadData({
            path: `picture-submissions/${file.name}`, 
            data: file
          });
          console.log("Uploaded data to S3:", result);
        }

  function handleSubmit(data: FormData) {
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const categories = data.get("categories") as string;
    const imageFile = data.get("image") as File;
    
    if (imageFile) {
      handleUploadData(imageFile);
    }

    const result = client.models.Activity.create({
      name: name,
      description: description,
      categories: [categories],
      image: imageFile ? `https://amplify-d1m5vuivkact3e-ma-robdayimagesbuckete97c22-lauafm4bkwjg.s3.us-east-1.amazonaws.com/picture-submissions/${imageFile.name}` : undefined,
    });
    console.log("New Activity created:", result);
  }

  return (
    <form action={handleSubmit}>
      <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" className="bg-accent" />
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" className="bg-accent" />
          <label htmlFor="categories">Categories</label>
          <input type="text" name="categories" id="categories" className="bg-accent" />
          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" className="bg-accent" />
          
          <button className="bg-sky-900 text-gray-200 rounded-2xl p-2 hover:cursor-pointer w-40 self-center justify-self-center" type="submit">Add Activity</button>
      </div>
  </form>
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={name}
    //     onChange={(event) => setName(event.target.value)}
    //     placeholder="Name"
    //   />
    //   <input
    //     type="text"
    //     value={description}
    //     onChange={(event) => setDescription(event.target.value)}
    //     placeholder="Description"
    //   />
    //   <button type="submit">Add Activity</button>
    // </form>
  );
}