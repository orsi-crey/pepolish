import { Link } from "react-router-dom";

import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import { SignInContainer } from "./sign-in.styles";


const SignIn = () => {
  return (
    <SignInContainer>
      <SignInForm />
      <div><Link to='/sign-up'>No profile yet? Sign up here!</Link></div>
      <div><Link to='/'>Go back home</Link></div>
    </SignInContainer>
  )
}

export default SignIn
