import { Helmet } from "react-helmet-async";
import ResetPassword from "../views/ResetPassword";

const ResetPasswordPage = () => {
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>

      <ResetPassword />
    </>
  )
}

export default ResetPasswordPage;
