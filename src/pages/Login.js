import { Link } from "react-router-dom";
import Api from "../constants/api";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies([]);

  const navigation = useNavigate();
  const location = useLocation();

  // Function used to do login
  async function doLogin(event) {
    event.preventDefault();
    setError("");

    // Gets values from form fields(username, password, etc)
    const data = {
      email: email,
      password:password,
    };

    let response = await fetch(`${Api.path}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the request headers
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string
    });

    let result = await response.json();
    console.log(result);

    let token = result.token;

    response = await fetch(`${Api.path}/api/v1/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set the request headers
      },
    });

    let user = await response.json();

    console.log(user);

    if (!result.success) setError(result.error);
    else {
      console.log(result.data);
      setCookie("token", token, { path: "/" });
      setCookie("user", user.data, { path: "/" });
      props.toggleNav();
      navigation("/home");
    }
  }

  useEffect(() => {
    props.toggleNav(location.pathname);
  }, []);

  return (
    <div className="columns-container">
      <div className="column-section">
        <div className="top-background-container"></div>
        <div className="column-content">
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
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <br />
            <input
              class="textInput"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button class="action-button" onClick={doLogin}>
              LOG IN
            </button>
          </form>
          <div style={{ textAlign: "center" }}>
            <p>
              Don't have an account?{" "}
              <Link class="hyperlink" to="/register">
                Sign up here.
              </Link>
            </p>
            <Link
              class="hyperlink"
              style={{ fontSize: "24px", textAlign: "center" }}
              to="/forgotpassword"
            >
              Forgot your password?
            </Link>
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

export default Login;
