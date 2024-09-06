import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import  prisma  from "../db.server";

export const loader = async () => {
  try {
    const buysection = await prisma.buysection.findMany();
    return json(buysection);
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
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Section</th>
              <th scope="col" className="px-6 py-3">User</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section, index) => (
              <tr key={section.id} className="bg-white border-b">
                <th scope="row" className="w-1/6 px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{section.price == '' ? 'Free' : section.price}</td>
 
                <td className="px-6 py-4 w-1/4">
                <Link to={`/notes/section/${section.sectionid}`}>
                  <button
                    type="button"
                    className="inline-block rounded bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    >View Section
                  </button>
                </Link>
                </td>
                <td className="px-6 py-4 w-1/4">
                <Link to={`/notes/viewstore/${section.sessionid}`}>
                  <button
                    type="button"
                    className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                    View User
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
