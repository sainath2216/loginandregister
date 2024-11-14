
import Cookies from "js-cookie";

import { withRouter } from "react-router-dom";

import "./index.css"

const Navbar = (props) => {
  const onClickLogout = () => {
    const { history } = props;
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  return (
    <div>
      <div className="logout-button">
            <button onClick={onClickLogout} className="logout">Logout</button>
          </div>
    </div>
  );
};

export default withRouter(Navbar)
