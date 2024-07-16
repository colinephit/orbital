"use client";

import React, { useState } from "react";
import SignInwithGoogle from "./signinwithgoogle";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ForgotPassword from "./ForgotPassword";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
        router.push("/");
      } else {
        alert("No user found");
      }
    });
  };

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <form
        style={{
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center">Login</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className="forgot-password text-right">
          <ForgotPassword />
        </p>

        <div className="d-grid">
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </div>
        <br></br>
        <p className="forgot-password text-right">
          New user? <a href="/register">Register Here</a>
        </p>

        <div className="flex flex-row text-center w-full">
          <div className="border-b-2 mb-2.5 mr-2 w-full"></div>
          <div className="text-sm font-bold w-fit">OR</div>
          <div className="border-b-2 mb-2.5 ml-2 w-full"></div>
        </div>
        <div style={{ margin: "20px" }}>
          <SignInwithGoogle />
        </div>
      </form>
    </div>
  );
}

export default Login;
