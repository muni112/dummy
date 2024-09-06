import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import  prisma  from "../db.server";

export const loader = async () => {
  try {
    const sections = await prisma.session.findMany({
        select: {
            id: true,
            shop: true,
            isOnline: true,
          },
  });
    return json(sections);
  } catch (error) {
    console.error("Error fetching sections:", error);
    return json({ error: "Failed to fetch sections" }, { status: 500 });
  }
};



export default function AllSectionPage() {
  const sections = useLoaderData();
  return (
    <>
    <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">No</th>
              <th scope="col" className="px-6 py-3">Store name</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section, index) => (
              <tr key={section.id} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{section.shop}</td>
                <td className="px-6 py-4">{section.isOnline == false ? 'Develpment' :'Live'}</td>
                
                <td className="px-6 py-4 flex gap-4">
                <Link to={`/notes/viewstore/${section.id}`}>
                  <button
                    type="button"
                    className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                 
                    View Detail
                  </button>
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
