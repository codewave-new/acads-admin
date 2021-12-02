import React from "react";
import { useHistory } from "react-router";
import { Images } from "../../Assets/0a-exporter";
import { loginAPI } from "../../Services/getAPI";
import "./login-page.style.scss";
export default function LoginPage() {
  const history = useHistory();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
    role_type: "admin",
  });
  const handleLogin = async () => {
    try {
      setLoading(true);
      let res = await loginAPI(credentials);
      if (res.data.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.data.email);
        history.push("/dashboard");
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  return (
    <div className="login-page-main">
      <div className="login-page-left">
        <img src={Images.bgImage} />
      </div>
      <aside className="login-page-right">
        <div className="lpm-title">
          <h4>
            Welcome to <img src={Images.mainLogo} />
          </h4>
          <p className="title">
            Please sign-in to your account and start the adventure
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={`input-wrapper ${error ? "error-input" : ""}`}>
            <p>Email</p>
            <div className="">
              <input
                required
                // autoComplete="new-password"
                type="email"
                placeholder="john@example.com"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className={`input-wrapper ${error ? "error-input" : ""}`}>
            <p>Password</p>
            <div className="">
              <input
                required
                // autoComplete="new-password"
                placeholder="**********"
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" />
            <span>Remember Me</span>
          </div>
          <button onClick={() => handleLogin()}>
            {loading ? "Signing in...." : "Sign in"}
          </button>
          {/* <div className="lpm-message">
            <p>
              New on our platform?. <span>Create an account</span>
            </p>
          </div> */}
        </form>
      </aside>
    </div>
  );
}
