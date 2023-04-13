import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import "./MainNavigation.css";
import { AuthContext } from "../../context/auth-context";

const MainNavigation = (props) => {
  const auth = useContext(AuthContext);

  function logoutHandler() {
    auth.logout();
  }

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <React.Fragment>
      {/*drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />*/}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
          {!auth.isLoggedIn ? (
            <Link to="/auth" style={{ textDecoration: "none" }}>
              <button className="logout-drawer-button">Login</button>
            </Link>
          ) : (
            <button className="logout-drawer-button" onClick={logoutHandler}>
              Logout
            </button>
          )}
        </nav>
      </SideDrawer>

      <MainHeader>
        <div className="navbar-container">
          <div className="main-navigation__title">
            <Link to="/">
              <h1>Sample</h1>
            </Link>
          </div>
          <nav className="main-navigation__header-nav">
            <NavLinks />
          </nav>
          <div className="button-container">
            {!auth.isLoggedIn ? (
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <button className="logout-button">Login</button>
              </Link>
            ) : (
              <button className="logout-button" onClick={logoutHandler}>
                Logout
              </button>
            )}
            <button
              className="main-navigation__menu-btn"
              onClick={openDrawerHandler}
            >
              {!drawerIsOpen ? (
                <FontAwesomeIcon
                  className="main-navigation__menu-btn-icon"
                  icon={faBars}
                ></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon
                  className="main-navigation__menu-btn-icon"
                  icon={faXmark}
                ></FontAwesomeIcon>
              )}
            </button>
          </div>
        </div>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
