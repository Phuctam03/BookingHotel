import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Logout() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    window.location.reload();
    navigate("/", { state: { message: "you have been logged out!" } });
  };

  const isLoggedIn = auth.user !== null;

  return (
    <>
      {isLoggedIn ? (
        <div>
          <li>
            <Link to={"/profile"} className="dropdown-item">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown -divider" />
          </li>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : null}
    </>
  );
}
