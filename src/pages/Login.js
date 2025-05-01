import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "../style/Login.css"

class Login extends Component {
  state = {
    email: "",
    password: "",
    redirectToDashboard: false,
    error: null,
    isLoading: false,
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true, error: null });

    const auth = getAuth();

    try {
      const { email, password } = this.state;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          await createUserWithEmailAndPassword(auth, email, password);
        } else {
          throw error;
        }
      }

      if (this.props.handleLogin) {
        this.props.handleLogin();
      }
      this.setState({ redirectToDashboard: true });
    } catch (error) {
      let errorMessage = "Terjadi kesalahan saat login.";

      switch (error.code) {
        case "auth/wrong-password":
          errorMessage = "Password salah.";
          break;
        case "auth/invalid-email":
          errorMessage = "Format email tidak valid.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Terlalu banyak percobaan login. Silakan coba lagi nanti.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "Email sudah terdaftar.";
          break;
        case "auth/weak-password":
          errorMessage = "Password terlalu lemah. Minimal 6 karakter.";
          break;
        default:
          console.error("Kesalahan login:", error);
      }

      this.setState({ error: errorMessage });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    if (this.state.redirectToDashboard) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className="login-wrapper">
        <div className="left-section">
          <div className="decorative-shape shape-1"></div>
          <div className="decorative-shape shape-2"></div>
          <div className="left-content">
            <h1 className="brand-name">Airmadidi Coffee</h1>
            <p className="brand-tagline">Experience the perfect blend of tradition and modernity</p>
          </div>
        </div>
        
        <div className="right-section bg-dark">
          <div className="login-container">
            <div className="login-header">
              <h2 className="login-title text-light">Welcome Back</h2>
              <p className="login-subtitle text-light">Please login to your account</p>
            </div>
            
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="form-label text-light">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  disabled={this.state.isLoading}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label text-light">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  disabled={this.state.isLoading}
                />
              </div>

              {this.state.error && (
                <div className="alert alert-danger text-center py-2 mb-3">
                  {this.state.error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-login"
                disabled={this.state.isLoading}
              >
                {this.state.isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <p className="footer-text">
              © 2024 Airmadidi Coffee Shop. All rights reserved.
              <br />
              Designed by WSixteen
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;