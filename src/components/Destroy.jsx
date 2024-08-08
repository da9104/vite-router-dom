import { redirect } from "react-router-dom";
import { deleteContact } from "./Contact";

export async function action({ params }) {
  const result = await deleteContact(params.contactId);
  if (result) {
    return redirect("/");
  } else {
    // Handle the case where the contact wasn't found
    throw new Response("Contact not found", { status: 404 });
  }
}