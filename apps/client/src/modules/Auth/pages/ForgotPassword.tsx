import { Helmet } from "react-helmet-async";
import ForgotPasswordView from "../views/ForgotPassword";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>

      <ForgotPasswordView />
    </>
  )
}

export default LoginPage;
