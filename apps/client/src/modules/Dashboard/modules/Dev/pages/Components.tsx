import { Helmet } from 'react-helmet-async';
import ComponentsView from '../views/Components';

const ComponentsPage = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Components personal</title>
      </Helmet>

      <ComponentsView />
    </>
  )
}

export default ComponentsPage
