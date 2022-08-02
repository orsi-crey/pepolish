import { Button } from "@react-md/button";
import { useNavigate } from "react-router-dom";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const Auth = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <>
      <h1>Sign up</h1>
      <SignUpForm />
      <Button theme="primary" themeType="outline" onClick={handleClick}>
        Go back home
      </Button>
    </>
  )
}

export default Auth