import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction } from './Root.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Contact, { loader as contactLoader } from './components/Contact.jsx'
import EditContact, { action as editAction } from './components/Edit.jsx'
import { action as destroyAction } from './components/Destroy.jsx'
import './index.css'
import App from './App'

const router = createBrowserRouter([
  {
    path: "/vite-router-dom",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <App /> },
      {
        path: "vite-router-dom/contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "vite-router-dom/contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "vite-router-dom/contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
