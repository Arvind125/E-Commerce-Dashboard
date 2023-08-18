import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <img
        className="logo"
        alt="logo"
        src="https://png.pngtree.com/template/20210222/ourmid/pngtree-e-commerce-business-owners-better-understand-the-financial-side-of-their-image_487869.png"
      />

      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          {/* <li>
            <Link to="/update">Update Product</Link>
          </li> */}
          <li>
            <Link to="/profile">Profile</Link>
          </li>

          <li>
            <Link to="/login" onClick={logoutHandler}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-right">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
