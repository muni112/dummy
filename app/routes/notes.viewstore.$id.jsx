import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import  prisma  from "../db.server";

export const loader = async ({ params }) => {
  try {
    const sections = await prisma.session.findUnique({
        where: {
            id: params.id,
          },
        select: {
           id: true,
           shop: true,
           state: true,
           isOnline: true,
           scope: true,
           expires: true,
           accessToken: true,
           firstName: true,
           lastName: true,
           email: true,
           accountOwner: true,
           locale: true,
           collaborator: true,
           emailVerified: true
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
  const fields = [
    { no: '1', label: 'Shop', value: sections.shop },
    { no: '2', label: 'State', value: sections.state },
    { no: '3', label: 'Online Status', value: sections.isOnline ? 'Live' : 'Development' },
    { no: '4', label: 'Scope', value: sections.scope },
    { no: '5', label: 'Expires', value: sections.expires || 'N/A' },
    { no: '6', label: 'Access Token', value: sections.accessToken },
    { no: '7', label: 'First Name', value: sections.firstName },
    { no: '8', label: 'Last Name', value: sections.lastName },
    { no: '9', label: 'Email', value: sections.email },
    { no: '10', label: 'Account Owner', value: sections.accountOwner ? 'Yes' : 'No' },
    { no: '11', label: 'Locale', value: sections.locale },
    { no: '12', label: 'Collaborator', value: sections.collaborator ? 'Yes' : 'No' },
    { no: '13', label: 'Email Verified', value: sections.emailVerified ? 'Yes' : 'No' }
  ];
  return (
    <>
    <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
            <th scope="col" className="px-6 py-3 w-1/12">No</th>
            <th scope="col" className="px-6 py-3">Field</th>
            <th scope="col" className="px-6 py-3">Value</th>
            </tr>
        </thead>
        <tbody>
            {fields.map((field, index) => (
            <tr key={index} className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{field.no}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{field.label}</td>
                <td className="px-6 py-4">{field.value}</td>
            </tr>
            ))}
        </tbody>
    </table>
      </div>
    </>
  );
}
