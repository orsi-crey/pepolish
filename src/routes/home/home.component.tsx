import { Button } from "@react-md/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

const Home = () => {
  const navigate = useNavigate();

  const { isLoggedIn, username } = useContext(UserContext);

  function handleLoginClick() {
    navigate("/auth");
  }
  function handleProfileClick() {
    navigate("/profile");
  }

  return (
    <>
      {isLoggedIn ?
        <>
          <div>Hi {username}!</div>
          <Button theme="primary" onClick={handleProfileClick}>
            Click to edit profile!
          </Button>
        </>
        :
        <>
          <div>Hi!</div>
          <Button theme="primary" themeType="contained" onClick={handleLoginClick}>
            Click to log in
          </Button>
        </>
      }
    </>

  )
}

export default Home