import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"
import { useRouter } from "next/router";
import { message } from "antd";
import HomeIcon from "@material-ui/icons/Home";
import { PencilAltIcon } from "@heroicons/react/solid";
import { TicketIcon } from "@heroicons/react/solid";
import { ChartBarIcon } from "@heroicons/react/solid";
import { ChatAlt2Icon } from "@heroicons/react/solid";
import { UsersIcon } from "@heroicons/react/solid";
import { CogIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/solid";
import { UserCircleIcon } from "@heroicons/react/solid";
import blogServices from "../services/blogServices";
import authService from "../services/authServices";
import { useDispatch } from 'react-redux';
import { STATUS_CODE, BACKEND_DOMAIN } from "../utils/systemSettings";
import { setAuthDataAction } from "../redux/actions/authActions";
import { useSelector } from "react-redux";


const Sidebar = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [user, setUser] = useState({})

  const logout = async () => {
    try {
      const res = await authService.logout({});
      if (res?.status === STATUS_CODE.LOGGED_OUT) {
        message.success("Logged out successfully", 3);
        dispatch(setAuthDataAction(false));
        router.push("/");
      }
    } catch (err) {
      message.success("Error, please try again", 3);
    }
  };

  useEffect(() => {

    let isDone = false

    const getData = async() => {
      try{
        const getInfo = await blogServices.getUserInfo({});
        if (getInfo?.status === STATUS_CODE.SUCCESS){
          setUser(getInfo?.data.data.user);
        }
      }catch(err){
        const refresh = await authService.refreshToken({})
        const getInfo = await blogServices.getUserInfo({});
        if (getInfo?.status === STATUS_CODE.SUCCESS){
          setUser(getInfo?.data.data.user);
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
  

  return (
      <>
        <div className="md:w-3/12 w-6/12 shadow-2xl bg-primary left-sidebar">
          <div className="py-3 ml-4 mt-1">
            <p className="md:text-3xl text-md uppercase font-bold text-white">
              HOTLARVA
            </p>
          </div>
          <div className="flex ml-3">
          {user.profile_img ? 
          <Image src={`${BACKEND_DOMAIN}${user.profile_img}`} width="70" height="70"/>
          :
          <UserCircleIcon className="text-secondary h-14 w-12" />
          }
          <div className="ml-2">
              <h3 className="md:text-md text-sm hidden md:block text-white font-bold mt-1">
              {user.username}
              </h3>
              <p className="md:text-sm hidden md:block text-white">Admin User</p>
            </div>
          </div>
          <div className="p-4 space-y-14">
            <div className="space-y-4">
              <div className="">
                <Link href="/dashboard">
                  <div
                    className={`flex p-3 text-white space-x-4 0 ${
                      router.pathname === "/dashboard" ? "bg-secondary" : ""
                    } hover:bg-secondary hover:text-blue-600  cursor-pointer  `}
                  >
                    <HomeIcon className=" text-white" />
                    <p className=" text-white hidden md:block uppercase">
                      Home
                    </p>
                  </div>
                </Link>
            </div>
            <div className="">
              <Link href="/dashboard/posts">
                <div
                  className={`flex p-3 text-white space-x-4 0 ${
                    router.pathname === "/dashboard/posts" ? "bg-secondary" : ""
                  } hover:bg-secondary hover:text-blue-600  cursor-pointer  `}
                >
                  <PencilAltIcon className="text-white font-medium h-6 w-6" />
                  <p className="text-white hidden md:block  uppercase">
                    Post
                  </p>
                </div>
              </Link>
            </div>
            <div className="">
              <Link href="/dashboard/ticket-board">
                <div
                  className={`flex p-3 text-white space-x-4 ${
                    router.pathname === "/dashboard/ticket-board"
                      ? "bg-secondary"
                      : ""
                  } 0 hover:bg-secondary hover:text-blue-600  cursor-pointer  `}
                >
                  <TicketIcon className="text-white h-6 w-6" />
                  <p className="text-white hidden md:block uppercase">
                    Ticket posts
                  </p>
                </div>
              </Link>
            </div>
            <div className="">
              <Link href="/dashboard/stats-board">
                <div
                  className={`flex p-3 text-white ${
                    router.pathname === "/dashboard/stats-board"
                      ? "bg-secondary"
                      : ""
                  } space-x-4 0 hover:bg-secondary hover:text-blue-600  cursor-pointer  `}
                >
                  <ChartBarIcon className="text-white h-6 w-6" />
                  <p className="text-white hidden md:block uppercase">
                    Stats
                  </p>
                </div>
              </Link>
            </div>
            <div className="">
              <Link href="/dashboard/comments-board">
                <div
                  className={`flex p-3 text-white  space-x-4 ${
                    router.pathname === "/dashboard/comments-board"
                      ? "bg-secondary"
                      : ""
                  } 0 hover:bg-secondary hover:text-blue-600  cursor-pointer  `}
                >
                  <ChatAlt2Icon className="text-white h-6 w-6" />
                  <p className="text-white hidden md:block uppercase">
                    Comments
                  </p>
                </div>
              </Link>
            </div>
            <div className="">
              <Link href="/dashboard/users-board">
                <div
                  className={`flex p-3 text-white  space-x-4 ${
                    router.pathname === "/dashboard/users-board"
                      ? "bg-secondary"
                      : ""
                  } 0 hover:bg-secondary hover:text-blue-600  cursor-pointer  `}
                >
                  <UsersIcon className="text-white h-6 w-6" />
                  <p className="text-white hidden md:block uppercase">
                    Users
                  </p>
                </div>
              </Link>
            </div>
            <div className="">
              <Link href="/dashboard/settings-board">
                <div
                  className={`flex p-3 text-white  space-x-4 ${
                    router.pathname === "/dashboard/settings-board"
                      ? "bg-secondary"
                      : ""
                  } 0 hover:bg-secondary hover:text-blue-600  cursor-pointer  `}
                >
                  <CogIcon className="text-white h-6 w-6" />
                  <p className="text-white hidden md:block uppercase">
                    Settings
                  </p>
                </div>
              </Link>
            </div>
            <div className="">
              <div
                className={`flex p-3 text-white  space-x-4 0 hover:bg-secondary hover:text-blue-600  cursor-pointer  `}
                onClick={logout}
              >
                <LogoutIcon className="text-white h-6 w-6" />
                <p className="text-white hidden md:block uppercase">Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Sidebar;
