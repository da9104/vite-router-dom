import { useParams, Form, useLoaderData } from 'react-router-dom'
import { contents } from '../dummydata'
import { getContact } from '../Root'

  export async function loader({ params }) {
    console.log("Loader params:", params);
    const contact = getContact(params.contactId);
    console.log("Fetched contact:", contact);
    if (!contact) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return { contact };
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

export function Favorite({ contact }) {
    const favorite = contact.favorite;
    return (
      <Form method="post">
        <button
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {favorite ? "★" : "☆"}
        </button>
      </Form>
    );
  }
  
export default function Contact() {
    const { contact } = useLoaderData()
    const { contactId } = useParams();
    console.log(contact)

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
            <Favorite contact={contact} />
          </h1>
  
          {contact.notes && <p>{contact.notes}</p>}
  
          <div>
            <Form action={`/contacts/${contactId}/edit`}>
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              action={`/contacts/${contactId}/destroy`}
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

