import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

import { googleAuth } from "../utils/api";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const googleResponse = async (authResult) => {
    try {
      console.log(authResult["code"]);
      if (authResult["code"]) {
        const response = await googleAuth(authResult["code"]);
        const token = response.data.token;

        const { email, name, image, _id } = response.data.user;
        const obj = { email, name, image, token, id: _id };

        localStorage.setItem("user-info", JSON.stringify(obj));
        navigate("/home");
      }
    } catch (error) {
      console.log("Error while requesting google code: ", error);
    }
  };
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: () => googleResponse,
    flow: "auth-code",
  });
  return (
    <main className="gallery-background">
      <br />
      <br />
      <div className="text-light">
        <h1 className="text-center">Pixel Cloud</h1>
        <div className="login-container my-5">
          <div className="login-box p-3">
            <h2 className="my-3">Sign up or login with Google</h2>
            <button className="login-button" onClick={handleGoogleLogin}>
              <FcGoogle size={20} /> | <span>Login With Google </span>
            </button>
          </div>
        </div>
       
      </div>
    </main>
  );
}

export default Login;
