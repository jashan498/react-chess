import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <a href=".">
            <h2 style={{ color: "white" }}>React Chess</h2>
          </a>
        </div>
        <a href="https://github.com/jashan498/react-chess" className="mr-auto">
          {" "}
          <button
            className="btn btn-sm btn-outline-secondary pull-left mr-auto navButton"
            type="button"
          >
            Code
          </button>
        </a>
        <a href="https://github.com/jashan498">
          <p className="navText nav ml-auto">jashan498</p>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
