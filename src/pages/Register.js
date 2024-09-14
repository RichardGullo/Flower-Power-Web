import { Link } from "react-router-dom";
import Api from "../constants/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigate();

  async function doRegister(event) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Error: Password fields are different");
      return;
    }

    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);

    const response = await fetch(`${Api.path}/register.php`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.error.length > 0) setError(result.error);
    else {
      console.log(result.data);
      navigation("/home");
    }
  }

  return (
    <div class="columns-container">
      <div class="column-section">
        <div class="top-background-container"></div>
        <div class="column-content">
          <h1 style={{ textAlign: "center" }}>
            Welcome to <br /> Flower Power!
          </h1>
          <h2>
            Sign in below or create an account to <br /> get started tracking
            your graden today!
          </h2>
          {error.length > 0 && (
            <p style={{ color: "red", paddingBottom: "5px" }}>{error}</p>
          )}
          <form>
            <input
              class="textInput"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
            <br />
            <input
              class="textInput"
              type="text"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <br />
            <input
              class="textInput"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <br />
            <input
              class="textInput"
              type="password"
              placeholder="Confirm Pasword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button class="action-button" onClick={doRegister}>
              SIGN UP
            </button>
          </form>
          <div>
            <p>
              Already have an account?{" "}
              <Link class="hyperlink" to="/">
                Log in here.
              </Link>
            </p>
          </div>
          <div>
            <p>
              By continuing, you're accepting our <br />{" "}
              <Link to="/terms" class="hyperlink">
                Terms of service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" class="hyperlink">
                Privacy policy
              </Link>
            </p>
          </div>
        </div>
        <div class="bottom-background-container"></div>
      </div>
    </div>
  );
}

export default Register;
