import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import  prisma  from "../db.server";

export const loader = async () => {
  const section = await prisma.section.findMany();
  return json(section);
};



export default function AllSectionPage() {
    const section = useLoaderData();
  
    const handleStatusChange = async (id, currentStatus) => {
  
      await fetch('/dashboard/statuschange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ id, active: currentStatus}),
      });
  
      window.location.reload(); 
    };
    const handleDelChange = async (id, image) => {
  
      await fetch('/dashboard/delchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ id, image: image}),
      });
  
      window.location.reload(); 
    };
    
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">No</th>
              <th scope="col" className="px-6 py-3">Section name</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Active</th>
              <th scope="col" className="px-6 py-3 w-3/12">Action</th>
            </tr>
          </thead>
          <tbody>
            {section.map((section, index) => (
              <tr key={section.id} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{section.title}</td>
                <td className="px-6 py-4">{section.price || 'Free'}</td>
                <td className="px-6 py-4 text-blue-400 cursor-pointer" onClick={() => handleStatusChange(section.id, section.active)}>
                  {section.active === '1' ? 'Active' : 'Draft'}
                </td>
                <td className="px-6 py-4 flex gap-4">
                <Link to={`/notes/section/${section.id}`}>
                  <button
                    type="button"
                    className="inline-block rounded bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  >
                    Edit
                  </button>
                </Link>
                

                <button
                  type="button"  onClick={() => handleDelChange(section.id, section.image)}
                  className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                  Delete
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
