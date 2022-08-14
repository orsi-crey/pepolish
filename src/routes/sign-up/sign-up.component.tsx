import { Link } from "react-router-dom";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import { SignUpContainer } from "./sign-up.styles";


const SignUp = () => {
  return (
    <SignUpContainer>
      <SignUpForm />
      <div><Link to='/sign-in'>Sign in instead</Link></div>
      <div><Link to='/'>Go back home</Link></div>
    </SignUpContainer>
  )
}

export default SignUp
