import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const signUpHandler = async () => {
    let response = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Signup failed:", response);
      return;
    }
    response = await response.json();
    // setName("");
    // setEmail("");
    // setPassword("");
    navigate("/"); // redirect to product page(home page)
    // set data in local storage
    localStorage.setItem("user", JSON.stringify(response));
  };

  return (
    <div className="register">
      <h1>Registrer</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        onChange={nameChangeHandler}
        value={name}
      />
      <input
        className="inputBox"
        type="email"
        placeholder="Enter Email"
        onChange={emailChangeHandler}
        value={email}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        onChange={passwordChangeHandler}
        value={password}
      />
      <button className="myButton" onClick={signUpHandler} type="button">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
