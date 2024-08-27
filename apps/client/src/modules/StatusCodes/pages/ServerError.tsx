import { Helmet } from 'react-helmet-async';

import ServerErrorView from '../views/ServerError';

const ServerErrorPage = () => {
  return (
    <>
      <Helmet>
        <title> 500 Server Error </title>
      </Helmet>

      <ServerErrorView/>
    </>
  )
}

export default ServerErrorPage
