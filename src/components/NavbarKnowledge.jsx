import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/smart-pnj.png"; // Ubah sesuai lokasi logo kamu

const NavbarKnowledge = () => {

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
            <a href="/dashboard" className="fw-bold text-decoration-none text-black">Smart PNJ Dashboard</a>
          </div>

          {/* Kanan: Link + Username + Logout */}
          <div className="d-flex align-items-center gap-4">
            <Link to="/dashboard" className="text-decoration-none text-dark">
              Home
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarKnowledge;
