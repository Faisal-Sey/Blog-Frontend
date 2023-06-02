import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { message } from "antd";
import Link from "next/link";
import styles from "../../styles/auth.module.css";
import Image from "next/image";
import authService from "../../services/authServices";
import blogServices from "../../services/blogServices";
import { STATUS_CODE } from "../../utils/systemSettings";
import { setSocialStatus } from "../../redux/actions/setSocialStatusAction";
import { setAuthDataAction } from "../../redux/actions/authActions";
import { setUserDataAction } from "../../redux/actions/userInfoAction";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import TwitterLogin from "react-twitter-auth";
import GoogleLogin from "react-google-login";
import { signIn } from 'next-auth/react'


export default function LoginForm({ signup ,isLogin, theme}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email_or_username: "",
    password: "",
  });

  const [registerState, setRegisterState] = useState({
    username: "",
    email: "",
    password: "",
  });

  // const [data, setData] = useState({});
  // const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    // console.log(response);
    // setData(response);
    // setPicture(response.picture.data.url);
  };

  const responseSuccessGoogle = async(response) => {
    if (response.accessToken){
      try {
        const res = await authService.googleConnect({
          access_token: response.accessToken
        })

        if (res?.status === STATUS_CODE.SUCCESS){
          console.log("success")
        }

      }catch(err){}

    }else{console.log("Error occured")}
  }

  const responseGoogle = (response) => {
    console.log(response);
  };

  const responseFailureGoogle = (response) => {
    console.log(response);
  }

  const logIn = async () => {
    try {
      const res = await authService.login({
        username_or_email: state.email_or_username,
        password: state.password,
      });

      if (res?.status === STATUS_CODE.SUCCESS) {
        message.success("Logged in successfully", 3);
        dispatch(setAuthDataAction(true));
        router.push("/");
      }
      return null;
    } catch (err) {
      if (err?.response?.status === STATUS_CODE.BAD_REQUEST) {
        // message.error("Email or Username or Password Incorrect", 5);
        message.error("Something went wrong, please try again with correct credentials")
        router.push("/login");
      } else if (err?.response?.status === STATUS_CODE.SERVER_ERROR) {
        message.error("Server Error, please try again shortly", 5);
        router.push("/login");
      } else {
          const refresh = await authService.refreshToken({})
          const res = await authService.login({
            username_or_email: state.email_or_username,
            password: state.password,
          });
    
          if (res?.status === STATUS_CODE.SUCCESS) {
            message.success("Logged in successfully", 3);
            dispatch(setAuthDataAction(true));
            router.push("/");
          }
          return null;
      }
    }
  };

  const handleInputs = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const signUp = async () => {
    try {
      const res = await authService.register({
        username: registerState.username,
        email: registerState.email,
        password: registerState.password,
      });

      if (res?.status === STATUS_CODE.SUCCESS) {
        message.success("Profile created successfully", 3);
        dispatch(setAuthDataAction(true));
        router.push("/");
      }
      return null;
    } catch (err) {
      if (err?.response?.status === STATUS_CODE.BAD_REQUEST) {
        message.error(err?.response?.data?.error, 5);
        router.push("/signup");
      } else if (err?.response?.status === STATUS_CODE.SERVER_ERROR) {
        message.error("Server Error, please try again shortly", 5);
        router.push("/signup");
      } else {
        const refresh = await authService.refreshToken({})
        const res = await authService.register({
          username: registerState.username,
          email: registerState.email,
          password: registerState.password,
        });
  
        if (res?.status === STATUS_CODE.SUCCESS) {
          message.success("Profile created successfully", 3);
          dispatch(setAuthDataAction(true));
          router.push("/");
        }
        return null;
      }
    }
  };

  const handleRegisterInputs = (evt) => {
    const value = evt.target.value;
    setRegisterState({
      ...registerState,
      [evt.target.name]: value,
    });
  };

  return (
    <form className={`form dark:bg-black primary`}>
      <div className="my-4 flex">
        <Link href="/login">
          <button
            className={`py-2 border-primary-light text-${isLogin ? "white" : "primary"} bg-${isLogin ? "primary" : "white"} mx-2 w-1/2`}
          >
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button
            className={`py-2  text-${signup ? "white" : "primary"} bg-${signup ? "primary" : "null"
              }-secondary w-1/2  border-primary-light mx-2`}
          >
            Signup
          </button>
        </Link>
      </div>
      {isLogin && (
        <>
          <div className="my-4 ">
            <input
              type="text"
              placeholder="Email/Username"
              className={`p-2  border-primary-light text-primary w-full`}
              name="email_or_username"
              onChange={handleInputs}
            />
          </div>
          <div className="my-4 ">
            <input
              type="password"
              placeholder="Password"
              className={`text-input p-2  border-primary-light text-primary w-full`}
              name="password"
              onChange={handleInputs}
            />
          </div>
          <div
            className={` text-white capitalise py-2 bg-primary-secondary text-center`}
            style={{ cursor: "pointer" }}
            onClick={logIn}
          >
            Login
          </div>
          <div className={`text-primary`}>Forgot password ?</div>
          <div className={`my-4 text-primary text-center`}>-or with-</div>
          <div className="social-auth ">
            <div className="flex my-4">
              <FacebookLogin
                appId="662402625028092"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                render={(renderProps) => (
                  <div
                    className={` btn mx-2 p-4 basis-1/2  bg-primary-secondary text-white   border-primary-light   btn-primary flex cursor-pointer items-center`}
                  >
                    <Image
                      width="25"
                      height="25"
                      src={"/svgs/facebook.svg"}
                      alt="facebook"
                    />{" "}
                    <span className="ml-2" onClick={renderProps.onClick}>
                      facebook
                    </span>
                  </div>
                )}
              />
              <GoogleLogin
                clientId="1002790857629-2s4vgqueb9jh9o8sfc0rmduh0d2v0fl2.apps.googleusercontent.com"
                render={(renderProps) => (
                  <>
                    <div
                      className={`btn mx-2 p-4  bg-primary-secondary  text-white border-primary-light basis-1/2 flex items-center cursor-pointer btn-primary`}
                    >
                      <Image
                        width="25"
                        height="25"
                        src={"/svgs/google.svg"}
                        className="mr-2"
                        alt="Google"
                      />
                      <span className="ml-2" onClick={renderProps.onClick}>
                        Google
                      </span>
                    </div>
                  </>
                )}
                buttonText="Login"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="flex my-4">
            <div
                onClick={() => {signIn("twitter",{callbackUrl:"https://hotlarva.com/"}), dispatch(setSocialStatus(false))}}
                className={`btn  mx-2 flex bg-primary-secondary p-4 text-white  items-center cursor-pointer basis-1/2 border-primary-light btn-primary`}
              >
                <Image
                  width="25"
                  height="25"
                  src={"/svgs/twitter.svg"}
                  className="mr-2"
                  alt="twitter"
                />{" "}
                <span className="ml-2">Twitter</span>
              </div>
              <div
                onClick={() => {signIn("linkedin",{callbackUrl:"https://hotlarva.com/"}), dispatch(setSocialStatus(false))}}
                className={`btn  mx-2 flex bg-primary-secondary p-4 text-white  items-center cursor-pointer basis-1/2 border-primary-light btn-primary`}
              >
                <Image
                  width="25"
                  height="25"
                  src={"/svgs/linkedin.svg"}
                  className="mr-2"
                  alt="LinkedIn"
                />{" "}
                <span className="ml-2">LinkedIn</span>
              </div>
            </div>
          </div>
        </>
      )}

      {signup && (
        <>
          <div className="my-4 ">
            <input
              type="text"
              placeholder="Username"
              className={`p-2  border-primary-light text-primary w-full`}
              name="username"
              onChange={handleRegisterInputs}
            />
          </div>
          <div className="my-4 ">
            <input
              type="text"
              placeholder="Email"
              className={`p-2  border-primary-light text-primary w-full`}
              name="email"
              onChange={handleRegisterInputs}
            />
          </div>
          <div className="my-4">
            <input
              type="password"
              placeholder="Password"
              className={`text-input p-2  border-primary-light text-primary w-full`}
              name="password"
              onChange={handleRegisterInputs}
            />
          </div>
          <div
            className={` text-white capitalise py-2 bg-primary-secondary text-center`}
            style={{ cursor: "pointer" }}
            onClick={signUp}
          >
            SIGN UP
          </div>

          <div className={`my-4 text-primary text-center`}>
            -or signup with-
          </div>

          <div className="social-auth ">
            <div className="flex my-4">
              <FacebookLogin
                appId="662402625028092"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                render={(renderProps) => (
                  <div
                    className={` btn mx-2 p-4 basis-1/2  bg-primary-secondary text-white   border-primary-light   btn-primary flex cursor-pointer items-center`}
                  >
                    <Image
                      width="25"
                      height="25"
                      src={"/svgs/facebook.svg"}
                      alt="facebook"
                    />{" "}
                    <span className="ml-2" onClick={renderProps.onClick}>
                      facebook
                    </span>
                  </div>
                )}
              />
              <GoogleLogin
                clientId="1002790857629-2s4vgqueb9jh9o8sfc0rmduh0d2v0fl2.apps.googleusercontent.com"
                render={(renderProps) => (
                  <>
                    <div
                      className={`btn mx-2 p-4  bg-primary-secondary  text-white border-primary-light basis-1/2 flex items-center cursor-pointer btn-primary`}
                    >
                      <Image
                        width="25"
                        height="25"
                        src={"/svgs/google.svg"}
                        className="mr-2"
                        alt="Google"
                      />
                      <span className="ml-2" onClick={renderProps.onClick}>
                        Google
                      </span>
                    </div>
                  </>
                )}
                buttonText="Login"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="flex my-4">
              <div
                onClick={() => {signIn("twitter",{callbackUrl:"https://hotlarva.com/"}), dispatch(setSocialStatus(false))}}
                className={`btn  mx-2 flex bg-primary-secondary p-4 text-white  items-center cursor-pointer basis-1/2 border-primary-light btn-primary`}
              >
                <Image
                  width="25"
                  height="25"
                  src={"/svgs/twitter.svg"}
                  className="mr-2"
                  alt="twitter"
                />{" "}
                <span className="ml-2">Twitter</span>
              </div>
              <div
                onClick={() => {signIn("linkedin",{callbackUrl:"https://hotlarva.com/"}), dispatch(setSocialStatus(false))}}

                className={`btn  mx-2 flex bg-primary-secondary p-4 text-white  items-center cursor-pointer basis-1/2 border-primary-light btn-primary`}
              >
                <Image
                  width="25"
                  height="25"
                  src={"/svgs/linkedin.svg"}
                  className="mr-2"
                  alt="LinkedIn"
                />{" "}
                <span className="ml-2">LinkedIn</span>
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  );
}
