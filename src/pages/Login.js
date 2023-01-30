import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { FaEnvelope } from "react-icons/fa";
import { GoEllipsis } from "react-icons/go";
import { IoIosEyeOff } from "react-icons/io";
import Headline from "../components/Headline";
import InputField from "../components/InputField";
import Logo from "../components/Logo";
import "../styles/login.css";
import { useGlobalState } from "../contexts/globalState";
import { db, auth, messaging } from "../firebase";
import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Login = (props) => {
  const { adminCredentials } = useGlobalState();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const loginUser = async (e) => {
    console.log(adminCredentials)

    if (
      adminCredentials &&
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      login("admin");
      localStorage.setItem("user", "admin");
      navigate("/", { replace: true });
      setErr(false);
    } else {
      setErr(true);
    }
  };

  return (
    <div className="login">
      <div>
        <Logo />
        <Headline text="Back" line="Login to continue using account" />

        <div className="container">
          <InputField
            icon={FaEnvelope}
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            changeHandler={updateEmail}
          />
          <InputField
            icon={GoEllipsis}
            icon2={IoIosEyeOff}
            name="password"
            type="password"
            placeholder="password"
            value={password}
            changeHandler={updatePassword}
            fieldStyle={{ width: "70%" }}
          />
          <span className="forgot-password">Forget Pasword?</span>
        </div>
        {err ? <p className="error">Invalid Credentials!</p> : ""}

        <div className="button-container">
          <button className="login-button" onClick={loginUser}>
            Login
          </button>
          <button className="create-account">Create Account</button>
        </div>
        <p className="caption">
          Don't have an account? <span>Create</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
