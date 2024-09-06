
import fs from "fs";
import path from "path";
import { Form, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import  prisma  from "../db.server";
import { json, redirect } from "@remix-run/node";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const oldImagePath = formData.get("oldimage");
  const sectionId = formData.get("id");

  if (formData.has("file")) {
    const file = formData.get("file");
    
    if (file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const newFileName = `${Date.now()}_${file.name}`;
      const newFilePath = path.join("public/uploads", newFileName);
      const newFilePath2 = "/uploads/" + newFileName;
      if (oldImagePath) {
        const oldFilePath = path.join("public", oldImagePath);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // Save the new file
      fs.writeFileSync(newFilePath, buffer);

      await prisma.section.update({
        where: { id: sectionId },
        data: { image: newFilePath2 }
      });
    } else {
      console.log("File is empty");
    }
  } else {
    console.log("No file field in the form data");
  }

  // Update other data in the database
  await prisma.section.update({
    where: { id: sectionId },
    data: {
      title: data.title,
      price: data.price,
      descreption: data.dis,
      contant: data.contant
    }
  });

  return redirect(`/notes/allsections`);
};



export const loader = async ({ params }) => {
  const sectionId = params.id || params.Id; 
  if (!sectionId) {
    throw new Response("ID not provided", { status: 400 });
  }
  const section = await prisma.section.findUnique({
    where: {
      id: sectionId, 
    },
  });
  if (!section) {
    throw new Response("Section not found", { status: 404 });
  }
  return json(section);
};



export default function NewNotePage() {
  const section = useLoaderData();
  useEffect(() => {
      // CKEDITOR.replace( 'dis' );
  }, []);

  return (
    <>
    <Form method="POST"  encType="multipart/form-data"  style={{display: "flex", flexDirection: "column",gap: 8,width: "100%",}}>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Name: </span>
          <input type="hidden" name="id" defaultValue={section.id}/>
          <input type="hidden" name="oldimage" defaultValue={section.image}/>
          <input
            required
            defaultValue={section.title} 
            name="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Price: </span>
          <input
            type="number"
            defaultValue={section.price} 
            name="price"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Description: </span>
          <textarea
            name="dis"
            id="dis"
            required
            rows={8}
            defaultValue={section.descreption} 
            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
          />
        </label>
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Content: </span>
          <textarea
            name="contant"
            rows={8}
            required
            defaultValue={section.contant} 
            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
          />
        </label>
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Image: </span>
          <input
            type="file"
            name="file"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      <div className="text-right">
        <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400">
          Update
        </button>
      </div>
    </Form>
  </>
  );
}
