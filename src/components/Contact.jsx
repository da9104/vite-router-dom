import { useParams, Form, useLoaderData, useNavigate, useFetcher, } from 'react-router-dom'
import { contents } from '../dummydata'
import { getContact, updateContact } from '../Root'

  export async function loader({ params }) {
    const contact = getContact(params.contactId);
    if (!contact) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return { contact };
  }

  export async function action({ request, params }) {
    try {
      const formData = await request.formData();
      console.log(formData, "Contact action:")
      const updates = {
        favorite: formData.get("favorite") === "true",
      };
      console.log("Updating contact:", updates);
      const updatedContact = updateContact(params.contactId, updates);
      console.log("Updated contact:", updatedContact);
      
      return updatedContact;
    } catch (error) {
    console.error("Error in action:", error);
    throw error;
    }
  }

  export async function createContact() {
    const newContact = {
      id: contents.length + 1,
      first: "New",
      last: "Contact",
      avatar: "https://robohash.org/new.png?size=200x200",
      notes: "New contact notes",
      favorite: false,
    };
    contents.push(newContact);
    return newContact;
  }

  export async function deleteContact(id) {
    const index = contents.findIndex(contact => contact.id === parseInt(id));
    if (index !== -1) {
      contents.splice(index, 1);
      return true; // Indicates successful deletion
    }
    return false; // Indicates contact not found
  }

export function Favorite({ contact }) {
  const fetcher = useFetcher();
  const isFavorite =
  fetcher.formData ? fetcher.formData.get("favorite") === "true" : contact.favorite;

    return (
      <fetcher.Form method="post">
        <button
          name="favorite"
          value={isFavorite ? "false" : "true"}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </fetcher.Form>
    );
  }
  
export default function Contact() {
    const { contact } = useLoaderData()
    const { contactId } = useParams();

    //  let params = useParams()
    //  let contactId = params.contactId

    // let selected_topic = {
    //   first: "Your",
    //   last: "Name",
    //   avatar: "https://robohash.org/you.png?size=200x200",
    //   notes: "Some notes",
    //   favorite: true,
    // }
  
    // for(let i =0; i < contact.length; i++) {
    //   if(contact[i].id === Number(contactId)) {
    //     selected_topic = contact[i]
    //     break
    //   }
    // }

    if (!contact) {
        return <div>Contact not found</div>; // Handle case where contact is not found
    }
  
    return (
      <>
       <div id="contact">
        <div>
          <img
            key={contact?.avatar}
            src={
              contact?.avatar ||
              `https://robohash.org/${contact.id}.png?size=200x200`
            }
          />
        </div>
  
        <div>
          <h1>
            {contact.first ? (
              <>
                {contact.first}  {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}{" "}
            {contact && <Favorite contact={contact} />}
          </h1>
  
          {contact.notes && <p>{contact.notes}</p>}
  
          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event) => {
                if (
                  !confirm(
                    "Please confirm you want to delete this record."
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
      </div>
      </>
    )
  }

