import { Helmet } from 'react-helmet-async';
import SignUpView from '../views/SignUp';


const SignUpPage = () => {
  return (
    <>
      <Helmet>
        <title> Sign Up </title>
      </Helmet>

      <SignUpView/>
    </>
  )
}

export default SignUpPage
