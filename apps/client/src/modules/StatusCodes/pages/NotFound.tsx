import { Helmet } from 'react-helmet-async';

import NotFoundView from '../views/NotFound';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found </title>
      </Helmet>

      <NotFoundView/>
    </>
  )
}

export default NotFoundPage
