import { redirect } from "@remix-run/node";
import  prisma  from "../db.server";

export const action = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const id = formData.get('id');
  const active = formData.get('active');
  if(active == '1'){
    await prisma.section.update({
      where: { id },
      data: { active: '0' },
    });
  }else{
    await prisma.section.update({
      where: { id },
      data: { active: '1' },
    });
  }

  return redirect('/notes/allsections');
};
