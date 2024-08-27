import { Helmet } from 'react-helmet-async';
import TestView from '../views';

const TestPage = () => {
  return (
    <>
    <Helmet>
      <title>Test Page</title>
    </Helmet>

    <TestView/>
    </>
  )
}

export default TestPage
