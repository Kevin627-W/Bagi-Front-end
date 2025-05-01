import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";

class App extends Component {
  state = {
    isAuthenticated: false,
  };

  handleLogin = () => {
    this.setState({ isAuthenticated: true });
  };

  handleLogout = () => {
    this.setState({ isAuthenticated: false });
  };

  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login handleLogin={this.handleLogin} />}
          />
          
          {/* Authentication Check for /dashboard */}
          <Route
            path="/dashboard/*"
            element={
              this.state.isAuthenticated ? (
                <Dashboard handleLogout={this.handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
          </Route>


          {/* Optional: Define root route for redirect to login or a default page */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }
}

export default App;


