import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AuthStyle.css";
import Logo from "../../Resources/Images/logo.png";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { login, signUp } from "../../Actions/AuthActions";

const initialState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userData);
    if (isSignUp) {
      userData.password === userData.confirmPassword
        ? dispatch(signUp(userData, navigate))
        : setConfirmPassword(false);
    } else {
      dispatch(login(userData, navigate));
    }
  };
  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    setUserData(initialState);
    setConfirmPassword(true);
  };
    useEffect(() => {
      setUserData(initialState);
    }, [])

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Social Circle</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <div className="a-right">
        <form
          autoComplete="off"
          className="infoForm authForm"
          onSubmit={handleSubmit}
        >
          <div className="login-and-icon">
          {isSignUp ? <HowToRegIcon /> : <LockOpenIcon />}
          
          <h2> {isSignUp ? "Register" : "Login"}</h2>

          </div>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            {isSignUp && (
              <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
            />
            )}
            <input
              required
              type="text"
              placeholder="Email"
              className="infoInput"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPassword ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>

          <div>
            <span className="signLogin"
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prevState) => !prevState);
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              // disabled={loading}
            >
              {isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
