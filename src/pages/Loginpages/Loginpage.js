import React, { useState } from "react";
import "./Login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../redux/slice/userAuthSlice/userAuthSlice";

function Loginpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputvalue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = inputvalue;

    if (email === "") {
      toast.error("Email is required");
    } else if (!email.includes("@")) {
      toast.error("Enter valid email");
    } else if (password === "") {
      toast.error("Password is required");
    } else {
      dispatch(UserLogin(inputvalue))
        .then((res) => {
          if (res.payload) {
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section className="login">
      <div className="form_data">
        <div className="form_heading">
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="form_input">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>

            <div className="form_input">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>

            <button className="btn" type="submit">
              Login
            </button>

            <p>
              Don’t have an account? <NavLink to="/Registeru">Signup</NavLink>
            </p>
            <p>
              Forgot password?{" "}
              <NavLink to="/Forgotpasswordu">Click here</NavLink>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Loginpage;
