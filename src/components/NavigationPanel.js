import { useNavigate, NavLink } from "react-router-dom";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useAuth } from "../contexts/auth";
import Logo from "./Logo";
import { navigationOptions } from "../constants/navigationOptions";
import signOutImage from "../assets/logout-btn.png";
import "../styles/navigationPanel.css";

const NavigationPanel = (props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/", { replace: true }); 
  };

  return (
    <div className="navigation-panel">
      <Logo />
      <div className="options-container">
        <ul>
          {navigationOptions.map((option) => {
            return (
              <li className="">
                <NavLink
                  to={option.path}
                  className={({ isActive }) =>
                    isActive
                      ? "link-active center-container"
                      : "link center-container"
                  }
                  children={({ isActive }) => {
                    if (isActive) {
                      return (
                        <>
                          <div className="active-mark active"></div>
                          <span>{option.name}</span>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div className="active-mark inactive"></div>
                          <span>{option.name}</span>
                        </>
                      );
                    }
                  }}
                ></NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sign-out-container">
        {/* <RiLogoutBoxRFill className="icon" /> */}
        <img
          src={signOutImage}
          alt=""
          style={{ width: "19px", height: "24px" }}
        ></img>
        <button className="sign-out" onClick={signOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default NavigationPanel;
