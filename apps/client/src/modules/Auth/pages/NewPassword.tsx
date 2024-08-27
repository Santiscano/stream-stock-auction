import { Helmet } from "react-helmet-async";
import NewPasswordView from "../views/NewPassword";

const NewPasswordPage = () => {
  return (
    <>
      <Helmet>
        <title> New Password </title>
      </Helmet>

      <NewPasswordView/>
    </>
  )
}

export default NewPasswordPage
