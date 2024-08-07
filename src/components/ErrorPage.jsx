import {useRouteError} from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
  
    return (
      <div id="error-page">
        Sorry, an unexpected error has occurred. Try again.
        <i>{error.statusText || error.message}</i>
      </div>
    )
  }
