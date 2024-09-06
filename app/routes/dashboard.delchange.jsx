import { json, redirect } from "@remix-run/node";
import  prisma  from "../db.server";
import fs from "fs";
import path from "path";

export const action = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const id = formData.get('id');
  const image = formData.get('image');


  const filePath = path.join(process.cwd(), "public/", image);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File ${image} deleted successfully.`);
    } else {
      console.log(`File ${image} does not exist.`);
    }

    await prisma.section.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Error deleting record or file:", error);
    return json({ error: "An error occurred while deleting the record or file." }, { status: 500 });
  }

  return redirect('/notes/allsections');
};
