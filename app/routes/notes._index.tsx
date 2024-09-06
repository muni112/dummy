import { Link } from "@remix-run/react";

export default function NoteIndexPage() {
  return (
    <p>
      No Section selected. Select a Section on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new Section.
      </Link>
    </p>
  );
}
