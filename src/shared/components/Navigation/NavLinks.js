import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <React.Fragment>
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default NavLinks;
