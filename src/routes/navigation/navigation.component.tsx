import { useContext } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { NavigationContainer } from "./navigation.styles";

const Navigation = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(UserContext);

  return (
    <div>
      <NavigationContainer>
        <h2>🐸 pepolish 💅</h2>
        {isLoggedIn ?
          <div>Log out</div>
          :
          <div>
            <Link to='/auth'>Sign in</Link>
          </div>}
      </NavigationContainer>
      <Outlet />
    </div>
  )
}

export default Navigation
