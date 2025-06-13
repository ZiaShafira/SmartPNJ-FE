import React from 'react';
import logo from "../assets/logopnj.png";

const Navbar = () => {
  return (
      <>
        <nav className="navbar navbar-expand-lg bg-white border-bottom px-4 py-2">
          <div className="container-fluid d-flex justify-content-between align-items-center">
  
            {/* Kiri: Logo + Judul */}
            <div className="d-flex align-items-center gap-2">
              <img
                src={logo}
                alt="Logo"
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}
              />
              <a href="/" className="text-decoration-none text-dark">Smart PNJ</a>
            </div>
  
            {/* Kanan: Link + Username + Logout */}
            <div className="d-flex align-items-center gap-4">
              <a href="/" className="nav-link text-black">Home</a>
            </div>
          </div>
        </nav>
      </>
    );
};

export default Navbar;
