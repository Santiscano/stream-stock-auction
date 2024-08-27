import { Helmet } from "react-helmet-async";
import LoginView from '../views/Login';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <LoginView />
    </>
  )
}

export default LoginPage;
