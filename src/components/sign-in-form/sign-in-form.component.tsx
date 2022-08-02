import { Form, TextField, Password } from "@react-md/form";
import { Button } from "@react-md/button";
import { useState, FormEvent, useContext } from "react";

import { getUserDocFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredential = await signInAuthUserWithEmailAndPassword(email, password);

      if (userCredential) {
        const userData = await getUserDocFromAuth(userCredential.user);
        setCurrentUser(userData?.displayName);
        navigate("/");
      }
    } catch (error: any) {
      alert("error signing in");
      console.log(error)
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
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
        />
        <Button id="submit" type="submit" themeType="outline">
          Sign in
        </Button>
      </Form>
    </div>
  )
}

export default SignInForm