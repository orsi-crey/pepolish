import { Button } from "@react-md/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { HomeContainer } from "./home.styles";

const Home = () => {
  const navigate = useNavigate();

  const { isLoggedIn, username } = useContext(UserContext);

  function handleLoginClick() {
    navigate("/sign-in");
  }
  function handleProfileClick() {
    navigate("/profile");
  }

  return (
    <HomeContainer>
      {isLoggedIn ?
        <>
          <div>Hi {username}!</div>
          <div>
            <Button theme="primary" onClick={handleProfileClick}>
              Click to edit profile!
            </Button>
          </div>
        </>
        :
        <>
          <div>Hi!</div>
          <div>
            <Button theme="primary" themeType="contained" onClick={handleLoginClick}>
              Click to log in
            </Button>
          </div>
        </>
      }
    </HomeContainer>

  )
}

export default Home