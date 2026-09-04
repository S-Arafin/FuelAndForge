import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="#how-it-works">How it Works</a>
            </li>
            <li>
              <a href="#about">About us</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold text-primary">
          Fuel&Forge
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
              <a href="#how-it-works">How it Works</a>
            </li>
            <li>
              <a href="#about">About us</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/auth/login" className="btn btn-accent font-semibold">Login</Link>
      </div>
    </div>
  );
};

export default Header;
