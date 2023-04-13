/* Packages */
import React, { useContext } from "react";
import {NavLink} from "react-router-dom";
/* CSS */
import "./home.css";
import { AuthContext } from "../../shared/context/auth-context";

/* Components */


const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      <div className="home-content-wrap">
        <div className="second-box">
          <div className="button-box">
            <div>
              {auth.isLoggedIn ? "Hello, "+auth.userName+" Secret Unlocked" : "Please login before moving on" }
            </div>
            {auth.isLoggedIn ? <NavLink to="/secret" className="button-box-res">Secrets</NavLink> : 
            <NavLink to="" className="button-box-res">Secret</NavLink> }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
