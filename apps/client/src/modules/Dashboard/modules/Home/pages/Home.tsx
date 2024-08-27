import { Helmet } from 'react-helmet-async';

import HomeView from '../views/index';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Home</title>
      </Helmet>

      <HomeView/>
    </>
  )
}

export default HomePage
