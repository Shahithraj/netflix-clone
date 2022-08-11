import React, { useContext, useState } from "react";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthAction";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {dispatch} = useContext(AuthContext)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" :"navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/" className="link">
          <span>Homepage</span>
          </Link>
          <Link to="/movies"  className="link">
          <span className="navbarmainLink">Movies</span>

          </Link>
          <Link to="/series"  className="link">
          <span className="navbarmainLink">Series</span>

          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <SearchIcon className="icon" />
          <span>KID</span>
          <NotificationsIcon className="icon" />
          <img
            src="https://images.hindustantimes.com/img/2021/10/19/1600x900/dhoni-csk-screengrab_1634307035461_1634619555355.jpg"
            alt=""
          />
          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="option">
              <span>Settings</span>
              <span className="logout" onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
