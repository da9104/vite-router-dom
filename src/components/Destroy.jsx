import { redirect, useNavigate } from "react-router-dom";
import { deleteContact } from "./Contact";

export async function action({ params }) {
  const navigate = useNavigate();
  const result = await deleteContact(params.contactId);
  if (result) {
    return navigate("/");
  } else {
    // Handle the case where the contact wasn't found
    throw new Response("Contact not found", { status: 404 });
  }
}