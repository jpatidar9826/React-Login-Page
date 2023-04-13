import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";

import "./Secret.css";

const Secret = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="secret-wrap">
      <div className="button-box">
        <p>{"Hello " + auth.userName}</p>
        <h4>{"Your Secret is " + auth.userEmail}</h4>
      </div>
    </div>
  );
};

export default Secret;
