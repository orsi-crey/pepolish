import { Button } from "@react-md/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

const Home = () => {
  const navigate = useNavigate();

  const { username } = useContext(UserContext);

  function handleClick() {
    navigate("/auth");
  }

  return (
    <>
      {username ? <div>Hi {username}!</div>
        :
        <>
          <div>Hi!</div>
          <Button theme="primary" themeType="contained" onClick={handleClick}>
            Click to log in
          </Button>
        </>
      }
    </>

  )
}

export default Home