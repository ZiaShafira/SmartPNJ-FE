import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logopnj.png"; // Ubah sesuai lokasi logo kamu

const NavbarUser = () => {


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom px-4 py-2 fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">

          {/* Kiri: Logo + Judul */}
          <div className="d-flex align-items-center gap-2">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            />
            <a href="/" className="text-decoration-none text-dark fw-bold">Smart PNJ</a>
          </div>

          {/* Kanan: Link + Username + Logout */}
          <div className="d-flex align-items-center gap-4">
            <a href="#home" className="nav-link text-black">Home</a>
            <a href="#about" className="nav-link text-black">About</a>
            <a href="#faq" className="nav-link text-black">FAQ</a>
            <a href="https://penerimaan.pnj.ac.id/" className="nav-link text-black">WEB PNJ</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarUser;
