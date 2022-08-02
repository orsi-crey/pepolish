import { Button } from "@react-md/button";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <>
      <div>This will be the login page!</div>
      <Button theme="primary" themeType="outline" onClick={handleClick}>
        Go back home
      </Button>
    </>
  )
}

export default Auth