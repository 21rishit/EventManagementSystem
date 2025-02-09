// /* eslint-disable no-empty */
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false); // New: Loading state
  const [error, setError] = useState(""); // New: Store error messages

  async function registerUser(ev) {
    ev.preventDefault();
    setError(""); // Reset error state
    setLoading(true); // Set loading to true during request

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format!");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("auth/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200) {
        alert("Registration Successful");
        setRedirect(true);
      }
    } catch (e) {
      setError(e.response?.data?.message || "Registration failed! Try again.");
    } finally {
      setLoading(false); // Reset loading state after request
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex w-full h-full lg:-ml-24 px-10 py-10 justify-between place-items-center mt-12">
      {/* Left Side Welcome Section */}
      <div className="hidden lg:flex flex-col right-box">
        <div className="flex flex-col gap-3">
          <div className="text-3xl font-black">Welcome to</div>
          <div>
            <img src={logo} alt="" className="w-48" />
          </div>
        </div>
        <div className="ml-48 w-80 mt-6">
          <img src="../src/assets/signuppic.svg" alt="" className="w-full" />
        </div>
      </div>

      {/* Right Side Registration Form */}
      <div className="bg-white w-full sm:w-full md:w-1/2 lg:w-1/3 px-7 py-7 rounded-xl justify-center align-middle">
        <form className="flex flex-col w-auto items-center" onSubmit={registerUser}>
          <h1 className="px-3 font-extrabold mb-5 text-primarydark text-2xl">Sign Up</h1>

          {/* Error Message Display */}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Name Input */}
          <div className="input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
            <input type="text" placeholder="Name" className="input-et" value={name} onChange={(ev) => setName(ev.target.value)} />
          </div>

          {/* Email Input */}
          <div className="input">
            <input type="email" placeholder="Email" className="input-et" value={email} onChange={(ev) => setEmail(ev.target.value)} />
          </div>

          {/* Password Input */}
          <div className="input">
            <input type="password" placeholder="Password" className="input-et" value={password} onChange={(ev) => setPassword(ev.target.value)} />
          </div>

          {/* Confirm Password Input */}
          <div className="input">
            <input
              type="password"
              placeholder="Confirm password"
              className="input-et"
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="w-full py-4">
            <button type="submit" className="primary w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          {/* Sign In / Sign Up Options */}
          <div className="container2">
            <div className="w-full h-full p-1">
              <Link to={"/login"}>
                <button type="button" className="text-black cursor-pointer rounded w-full h-full font-bold">
                  Sign In
                </button>
              </Link>
            </div>
            <div className="w-full h-full p-1">
              <Link to={"/register"}>
                <button type="button" className="text-white cursor-pointer rounded w-full h-full bg-primary font-bold">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <Link to={"/"}>
            <button className="secondary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
