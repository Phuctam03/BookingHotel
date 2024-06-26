import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "../auth/Logout";
import { AuthContext } from "../auth/AuthProvider";

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const { user } = useContext(AuthContext);

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  const isLoggedIn = user !== null;
  const userRole = localStorage.getItem("userRole");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 stick-top ">
      <div className="container">
        <Link to={"/"} className="navbar-brand ">
          <span className="hotel-color">lakeSide Hotel</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={"/browse-all-rooms"}
              >
                Danh sách tất cả phòng
              </NavLink>
            </li>
            {isLoggedIn && userRole === "ROLE_ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                  Quản trị viên
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="d-flex navbar-nav">
            <li className="navbar-item">
              <NavLink className="nav-link" to={"/find-booking"}>
                Tìm Kiếm Vé Đặt Phòng
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <NavLink
                className={`nav-link dropdown-toggle ${
                  showAccount ? "show" : ""
                }`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleAccountClick}
              >
                Tài Khoản
              </NavLink>

              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                {isLoggedIn ? (
                  <li>
                    <Logout />
                  </li>
                ) : (
                  <Link className="dropdown-item" to={"/login"}>
                    Đăng Nhập
                  </Link>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
