
import { Link, NavLink, Outlet } from "@remix-run/react";
export default function NotesPage() {

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Find Elements</Link>
        </h1>

      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Section
          </Link>

          <hr />
          <ol>
              <li>
                <NavLink className={({ isActive }) =>
                    `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                  }
                  to={"/notes/allsections"}>
                    All Section
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) =>
                    `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                  }
                  to={"/notes/allstore"}>
                    All Stores
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) =>
                    `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                  }
                  to={"/notes/newsletter"}>
                    News Letter
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) =>
                    `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                  }
                  to={"/notes/used"}>
                    Used Sections
                </NavLink>
              </li>
            </ol>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
