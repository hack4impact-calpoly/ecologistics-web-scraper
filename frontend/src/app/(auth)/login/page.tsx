"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "../auth.module.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
  };
  const navigateToSignUp = () => {
    router.push("/signup"); // Replace "/signup" with the actual path of your signup page
  };

  const handleLogin = () => {
    // CHANGE THIS TO NAVIGATE TO NEW PAGE
    console.log("Email", email)
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h3 className={`mb-5 ${styles.myHeading}`}>Log In</h3>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="typeEmailX-2">
                    Email
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <div>
                    <input
                      type={passwordShown ? "text" : "password"}
                      id="typePasswordX-2"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Password
                    </label>
                  </div>
                  <div>
                    <a
                      className={`${styles.forgotPassword}`}
                      role="button"
                      href="/your-destination-page"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="form-check d-flex justify-content-start mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={passwordShown}
                    onChange={togglePasswordShown}
                    id="form1Example3"
                  />
                  <label
                    className={`form-check-label ${styles.formCheckLabel}`}
                    htmlFor="form1Example3"
                  >
                    Show Password
                  </label>
                </div>

                <button
                  className={`${styles.signup}`}
                  type="submit"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <div>
                  <a
                    className={`${styles.newAccount}`}
                    role="button"
                    onClick={navigateToSignUp}
                  >
                    Create New Account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;