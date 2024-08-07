
import { useState } from 'react'
import Contact, { createContact } from './components/Contact'
import { contents } from './dummydata'
import { Link, Outlet, Form, useLoaderData } from 'react-router-dom'
import './App.css'

export async function loader() {
   return { contacts: contents };
 }
 
 export async function action() {
  const contact = await createContact();
  return { contact };
}

export function getContact(id) {
  console.log("Fetching contact with ID:", id);
  console.log("Contents array:", contents);
  return contents.find(contact => contact.id === parseInt(id));
}

export function Contacts({ showMenu }) {
  var list = []
  for (var i =0; i <contents.length; i++) {
    list.push(
      <li key={contents[i].id}>
        <Link 
        className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
        to={'/contacts/'+contents[i].id}>
          {contents[i].first}
        </Link>
      </li>
    )
  }

  return (
      <>
      { showMenu && <ul className="transition ease-out duration-200 py-2 space-y-2">
         {list}
      </ul> }
    </>
  )
}

function Root() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleShow = () => setShowMenu(!showMenu);
  const { contacts } = useLoaderData()
  

  return (
    <>
    <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div id="sidebar" className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
       <ul className="space-y-2 font-medium">
        
       <li style={{ display: 'flex'}}>
         <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button style={{ padding: '1px' }} type="submit">New</button>
          </Form>
         </li>
        
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <Link to='/' className="ms-3">Dashboard </Link>
            </a>
         </li>
        
         <li>
            <button 
            onClick={toggleShow}
            type="button" 
            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" >
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                     <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                  </svg>
                  <span onClick={toggleShow} className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Contact</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>
            <Contacts showMenu={showMenu} />
         </li>
       </ul>
        <div>

       </div>
       </div>

    </aside>

    <div class="p-4 sm:ml-64">
      <div class="p-4 border-none">

      <div id="detail">
          <Outlet />
      </div>  
    
      </div>
   </div>
    </>
  )
}
export default Root
