import { Button } from "@react-md/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/auth");
  }

  return (
    <>
      <div>Hi!</div>
      <Button theme="primary" themeType="contained" onClick={handleClick}>
        Click to log in
      </Button>
    </>
  )
}

export default Home