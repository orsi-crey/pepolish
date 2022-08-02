import { Form, TextField, Password } from "@react-md/form";
import { Button } from "@react-md/button";
import { useState, FormEvent } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";

const SignUpForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("signup")

    try {
      const userCredential = await createAuthUserWithEmailAndPassword(email, password);

      if (userCredential) {
        await createUserDocFromAuth(userCredential.user, { displayName });
      }
    } catch (error: any) {
      console.log(error)
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <TextField
          id="displayName"
          label="DisplayName"
          name="displayName"
          value={displayName}
          onChange={(event) => setDisplayName(event.currentTarget.value)}
          required
        />
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
          Sign up
        </Button>
      </Form>
    </div>
  )
}

export default SignUpForm