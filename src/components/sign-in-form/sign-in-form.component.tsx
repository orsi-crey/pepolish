import { TextField, Password } from '@react-md/form';
import { Button } from '@react-md/button';
import { useState, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RemoveRedEyeSVGIcon } from '@react-md/material-icons';

import { signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { UserContext, authState } from '../../contexts/user.context';

import { StyledSignInForm } from './sign-in-form.styles';


const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setOwnUserId, setIsLoggedIn } = useContext(UserContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredential = await signInAuthUserWithEmailAndPassword(email, password);

      if (userCredential) {
        setOwnUserId(userCredential.user.uid);
        setIsLoggedIn(authState.SignedIn);
        navigate('/');
      }
    } catch (error) {
      alert('error signing in');
      console.log(error);
    }
  };

  return (
    <StyledSignInForm onSubmit={handleSubmit}>
      <h1>Sign in</h1>
      <TextField
        id="email"
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        required
      />
      <Password
        id="password"
        label="Password"
        name="email"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        required
        visibilityIcon={<RemoveRedEyeSVGIcon />}
      />
      <div>
        <Button id="submit" type="submit" themeType="outline">
          Sign in
        </Button>
      </div>
    </StyledSignInForm>
  );
};

export default SignInForm;