import React from "react";
import "./../App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/userSlice";
import OAuth from "../components/OAuth";
function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, setSignup] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const handelSignupChanges = (e) => {
    setSignup((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handelSignupSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInFailure(false));
    dispatch(signInStart());
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(signup),
      });
      const data = await response.json();

      if (data.success === true) {
        dispatch(signInSuccess(data.user));
        navigate("/");
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-full  manage flex items-center justify-center ">
        <div className="w-[450px] shadow-2xl rounded-lg flex gap-5 flex-col px-[40px] py-[30px] border-2 border-black">
          <h1 className="font-semibold text-3xl">Sign-In</h1>
          <form onSubmit={handelSignupSubmit} className="flex flex-col gap-5">
            <input
              type="email"
              onChange={handelSignupChanges}
              id="email"
              className="w-[100%] text-xl px-3 rounded-lg placeholder:text-black bg-slate-200 py-2"
              placeholder="Email"
            />
            <input
              type="password"
              onChange={handelSignupChanges}
              id="password"
              className="w-[100%] text-xl px-3 rounded-lg placeholder:text-black bg-slate-200 py-2"
              placeholder="Password"
            />

            <button
              disabled={loading}
              type="submit"
              className="w-full text-white rounded-md text-2xl py-2 bg-gray-600"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            <OAuth/>

            <p>
              Dont have an account?{" "}
              <Link className="text-blue-600" to={"/sigup"}>
                Sign-up
              </Link>
            </p>

            {error && (
              <p className="text-red-700">
                {error ? error || "Something Went Wrong!" : ""}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
