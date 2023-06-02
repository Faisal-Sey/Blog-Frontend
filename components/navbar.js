import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_DOMAIN, STATUS_CODE } from "../utils/systemSettings";
import { darkModeAction } from "../redux/actions/darkModeAction";
import { Dropdown, Menu, message } from "antd";
import { setAuthDataAction } from "../redux/actions/authActions";
import blogServices from "../services/blogServices";
import authService from "../services/authServices";

function Navbar({ showCategories }) {

  const status = useSelector((store) => store.authStatus);

  const [user, setUser] = useState({})

  const darkMode = useSelector((store) => store.darkMode);

  const router = useRouter();

  const dispatch = useDispatch();

  const getImage = (img) => {
    return `${BACKEND_DOMAIN}/${img}`;
  };

  const logout = async () => {
    try {
      const res = await authService.logout({});
      if (res?.status === STATUS_CODE.LOGGED_OUT) {
        message.success("Logged out successfully", 3);
        dispatch(setAuthDataAction(false));
        router.push("/");
      }
    } catch (err) {
      message.error("Error, please try again", 3);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link href="/profile-page" className="w-8 lg:w-12" passHref>
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const menuNotAuth = (
    <Menu>
      <Menu.Item key="1">
        <Link href="/signup" className="w-8 lg:w-12">
          Signup
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href="/login" className="w-8 lg:w-12">
          Login
        </Link>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {

    let isDone = false;
    
    const getData = async() => {
      try {
        const res = await blogServices.getUserInfo({})
        if (res?.status === STATUS_CODE.SUCCESS){
          setUser(res?.data?.data?.user)
        }
      }catch(err) {
        const refresh = authService.refreshToken({})
        const res = await blogServices.getUserInfo({})
        if (res?.status === STATUS_CODE.SUCCESS){
          setUser(res?.data?.data?.user)
        }
      }
    }

    if (!(isDone)){
      getData();
    }
    
    return () => {
      isDone = true
    }

  }, [])


  useEffect(() => {
    const html = document.querySelector("html");
    if (darkMode.dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <nav className="sticky top-0 z-50 px-4 lg:px-8 py-2 lg:py-4 bg-primary-secondary text-white">
        <div className=" flex justify-between lg:items-center ">
          <h1 className=" hidden lg:block text-white text-center lg:text-left text-2xl lg:text-5xl  font-extrabold">
            HOTLARVA
          </h1>
          <button className="mx-4 lg:hidden w-8 lg:w-12 ">
            <Image
              src={"/svgs/menu.svg"}
              layout="responsive"
              width="50"
              height="50"
              alt="moon"
            />
          </button>
          <div className="">
            <button className="mx-4 w-8 lg:w-12 ">
              <Image
                src={darkMode.dark ? "/svgs/search-dark.svg": "/svgs/search.svg"}
                layout="responsive"
                width="50"
                height="50"
                alt="search"
              />
            </button>
            <button
              className="mx-4 w-8 lg:w-12  text-white"
              onClick={() => dispatch(darkModeAction())}
            >
              {darkMode.dark ? (
                <Image
                  src={"/svgs/sun.svg"}
                  layout="responsive"
                  className="text-blue-500"
                  width="50"
                  height="50"
                  alt="moon"
                />
              ) : (
                <Image
                  src={"/svgs/moon.svg"}
                  layout="responsive"
                  className="text-blue-500"
                  width="50"
                  height="50"
                  alt="sun"
                />
              )}
            </button>
            {status.status === true ?
              (user ? (
              user?.is_superuser ?
                <button className='mx-4 w-8 lg:w-12'>
                  <Link href="/dashboard">
                    <Image src={user?.profile_img ? getImage(user?.profile_img) : "/svgs/user.svg"} layout="responsive" width="50" height="50" alt="user" />
                  </Link>
                </button>
                :
                <Dropdown overlay={menu}>
                  <button className='mx-4 w-8 lg:w-12'>
                    <Image src={user?.profile_img ? getImage(user?.profile_img) : "/svgs/user.svg"} layout="responsive" width="50" height="50" alt="user" />
                  </button>
                </Dropdown>
              )
                :
                <Dropdown overlay={menuNotAuth}>
                  <button className='mx-4 w-8 lg:w-12'>
                    <Image src={"/svgs/user.svg"} layout="responsive" width="50" height="50" alt="user" />
                  </button>
                </Dropdown>
              )
              : 
              <Dropdown overlay={menuNotAuth}>
                <button className='mx-4 w-8 lg:w-12'>
                  <Image src={"/svgs/user.svg"} layout="responsive" width="50" height="50" alt="user" />
                </button>
              </Dropdown>
              }
          </div>
        </div>
        <div className="lg:hidden dark:text-black text-center text-3xl font-extrabold">
          BrandName
        </div>
        {showCategories ? (
          <div className="text-sm hidden  lg:text-base lg:flex justify-between">
            <div className="dark:text-black text-white font-bold">
              Category 1
            </div>
            <div className="dark:text-black text-white font-bold">
              Category 2
            </div>
            <div className="dark:text-black text-white font-bold">
              Category 3
            </div>
            <div className="dark:text-black text-white font-bold">
              Category 4
            </div>
            <div className="dark:text-black text-white font-bold">
              Category 5
            </div>
            <div className="dark:text-black text-white font-bold">
              Category 6
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>
    </>
  );
}

export default Navbar;

