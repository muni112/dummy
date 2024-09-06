
import { redirect } from "@remix-run/node";
import fs from "fs";
import path from "path";
import { Form } from "@remix-run/react";
import { useEffect } from "react";
import  prisma  from "../db.server";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  let price = formData.get("price")?.toString();
  const contant = formData.get("contant")?.toString();
  const dis = formData.get("dis")?.toString();
  const file = formData.get("file");
  if(price == ''){
    let price = null;
  }
  let filePath = "";
  if (file && file.size > 0) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}_${file.name}`;
    filePath = path.join(uploadDir, fileName);

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, fileBuffer);
    
    filePath = `/uploads/${fileName}`;
  }

  const noteData = {
    title,
    price,
    dis,
    contant,
    filePath,
  };
  await prisma.section.create({
    data: {
      title: noteData.title,
      price: noteData.price,
      contant: noteData.contant,
      descreption: noteData.dis,
      image: noteData.filePath,
      active: "1",
    },
  });
  return redirect(`/notes/allsections`);
};

export default function NewNotePage() {
  useEffect(() => {
      // CKEDITOR.replace( 'dis' );
  }, []);

  return (
    <>
      <Form
        method="post"
        encType="multipart/form-data"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Name: </span>
            <input
              required
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
              className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
            />
          </label>
        </div>
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Image: </span>
            <input
              type="file"
              required
              name="file"
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            />
          </label>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Save
          </button>
        </div>
      </Form>
    </>
  );
}
