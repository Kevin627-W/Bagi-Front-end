import React, { Component } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./Home";
import Menu from "./Menu";
import Pembayaran from "./Pembayaran";
import TakeAway from "./TakeAway";
import Review from "./Review";
import "../style/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import user from "../assets/user (2).png";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faHome,
  faUtensils,
  faCreditCard,
  faBagShopping,
  faSignOutAlt,
  faCoffee,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

class Dashboard extends Component {
  render() {
    const menuItems = [
      { icon: faHome, text: "Home", path: "/dashboard/home" },
      { icon: faUtensils, text: "Menu", path: "/dashboard/menu" },
      { icon: faCreditCard, text: "Pembayaran", path: "/dashboard/Pembayaran" },
      { icon: faBagShopping, text: "Takeaway", path: "/dashboard/takeaway" },
      { icon: faCheckCircle, text: "Review", path: "/dashboard/review" },
    ];

    return (
      <>
        {/* Header Section */}
        <header className="dashboard-header bg-dark">
          <div className="header-content">
            
            <h1 className="header-title text-center text-light p-3">
              Welcome to Airmadidi Coffee Shop 
              {'\u00A0'}{'\u00A0'}
            <FontAwesomeIcon
              icon={faCoffee}
              className="text-light"
            />
            </h1>
          </div>
        </header>

        {/* Main Layout */}
        <div className="dashboard">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-header">
              <div className="profile-section">
                <img src={user} alt="Profile" className="profile-image" />
                <div className="profile-info">
                  <h2 className="profile-name">John Doe</h2>
                </div>
              </div>
            </div>

            <nav className="sidebar-nav">
              {menuItems.map((item, index) => (
                <Link key={index} to={item.path} className="nav-item">
                  <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                  <span className="nav-text">{item.text}</span>
                </Link>
              ))}

              <button
                onClick={this.props.handleLogout}
                className="logout-button"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
                <span className="nav-text">Logout</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="content">
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="review" element={<Review />} />
              <Route path="Pembayaran" element={<Pembayaran />} />
              <Route path="takeaway" element={<TakeAway />} />
              <Route path="*" element={<Navigate to="home" />} />
             
            </Routes>
          </main>
        </div>

        {/* Footer Section */}
        <footer className="footer-non-sticky bg-dark text-white py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4">
                <h5 className="mb-3">About Us</h5>
                <p>
                  Welcome to Airmadidi Coffee Shop, where we serve premium
                  coffee in a cozy atmosphere. Our commitment to quality and
                  service makes us the perfect spot for coffee lovers.
                </p>
              </div>

              <div className="col-md-4 mb-4">
                <h5 className="mb-3">Contact Us</h5>
                <div className="mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                  <span>Jl. Raya Airmadidi No. 123</span>
                </div>
                <div className="mb-2">
                  <FontAwesomeIcon icon={faPhone} className="me-2" />
                  <span>+62 821-xxxx-xxxx</span>
                </div>
                <div className="mb-2">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  <span>info@airmadicicoffee.com</span>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <h5 className="mb-3">Opening Hours</h5>
                <div className="mb-2">Monday - Friday: 8:00 AM - 10:00 PM</div>
                <div className="mb-2">Saturday: 9:00 AM - 11:00 PM</div>
                <div>Sunday: 10:00 AM - 9:00 PM</div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12 text-center">
                <hr className="bg-light" />
                <p className="mb-0">
                  © 2024 Airmadidi Coffee Shop. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Dashboard;
