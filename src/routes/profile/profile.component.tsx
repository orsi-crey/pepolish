import { Button } from "@react-md/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

const Profile = () => {
  const navigate = useNavigate();

  const { isLoggedIn, username, userdata, setUserdata } = useContext(UserContext);

  function handleClick() {
    navigate("/auth");
  }

  return (
    <>
      {isLoggedIn ?
        <>
          <div>
            Hi {username}!
          </div>
          <p>Name: {userdata.name}</p>
          <p>City: {userdata.city}</p>
          <p>Phone: {userdata.phone}</p>
        </>
        :
        <>
          <div>Hi! You're not logged in!</div>
          <Button theme="primary" themeType="contained" onClick={handleClick}>
            Click to log in
          </Button>
        </>
      }
    </>

  )
}

export default Profile