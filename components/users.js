import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/solid";
import authService from '../services/authServices'
import blogServices from "../services/blogServices";
import { BACKEND_DOMAIN, STATUS_CODE } from "../utils/systemSettings";
import Image from 'next/image'


const Stats = () => {

  const [menus, setMenus] = useState({
    admin: true,
    author: false,
    users: false,
  })

  const isSuperUser = []

  const isStaff = []

  const [isSuperUserContainer, setIsSuperUserContainer] = useState(null)

  const [isStaffContainer, setIsStaffContainer] = useState(null);
  
  useEffect(() => {
    let isDone = false;

    const getData = async() => {
      try {
        const res = await blogServices.getAllUsers({})
        if (res?.status === STATUS_CODE.SUCCESS) {
          for(const value of Object.entries(res?.data.data)){
            if (value[1]["is_superuser"]){
              isSuperUser.push(value[1])
            }

            else (
              isStaff.push(value[1])
            )
          }

          setIsSuperUserContainer(isSuperUser.map((user) =>
            <div 
              className="flex mb-60 w-full shadow-md cursor-pointer border-2 rounded-md admin-cards"
              key={user.id}
            >
              {user.profile_img ? <Image src={`${BACKEND_DOMAIN}${user.profile_img}`} width={50} height={50}/>
                : <UserCircleIcon className="md:w-14 md:h-14 w-10 h-10 text-primary ml-6" />
              }   
              <div className="flex flex-col mt-1 ml-3">
                <h3 className="md:text-base text-sm font-medium">
                  {user.username}
                </h3>
                <p className="md:text-sm text-xs">{user.email}</p>
              </div>
            </div>
          ));

          setIsStaffContainer(isStaff.map((user) =>
            <div 
              className="flex mb-60 w-full shadow-md cursor-pointer border-2 rounded-md admin-cards"
              key={user.id}
            >
              {user.profile_img ? <Image src={`${BACKEND_DOMAIN}${user.profile_img}`} width={50} height={50}/>
                : <UserCircleIcon className="md:w-14 md:h-14 w-10 h-10 text-primary ml-6" />
              }              
              <div className="flex flex-col mt-1 ml-3">
                <h3 className="md:text-base text-sm font-medium">
                  {user.username}
                </h3>
                <p className="md:text-sm text-xs">{user.email}</p>
              </div>
            </div>
          ));
          
        }
      }catch(err){
        const refresh = await authService.refreshToken({})
        const res = await blogServices.getAllUsers({})
        if (res?.status === STATUS_CODE.SUCCESS) {
          for(const value of Object.entries(res?.data.data)){
            if (value[1]["is_superuser"]){
              isSuperUser.push(value[1])
            }

            else (
              isStaff.push(value[1])
            )
          }

          setIsSuperUserContainer(isSuperUser.map((user) =>
            <div 
              className="flex mb-60 w-full shadow-md cursor-pointer border-2 rounded-md admin-cards"
              key={user.id}
            >
              {user.profile_img ? <Image src={`${BACKEND_DOMAIN}${user.profile_img}`} width={50} height={50}/>
                : <UserCircleIcon className="md:w-14 md:h-14 w-10 h-10 text-primary ml-6" />
              }   
              <div className="flex flex-col mt-1 ml-3">
                <h3 className="md:text-base text-sm font-medium">
                  {user.username}
                </h3>
                <p className="md:text-sm text-xs">{user.email}</p>
              </div>
            </div>
          ));

          setIsStaffContainer(isStaff.map((user) =>
            <div 
              className="flex mb-60 w-full shadow-md cursor-pointer border-2 rounded-md admin-cards"
              key={user.id}
            >
              {user.profile_img ? <Image src={`${BACKEND_DOMAIN}${user.profile_img}`} width={50} height={50}/>
                : <UserCircleIcon className="md:w-14 md:h-14 w-10 h-10 text-primary ml-6" />
              }              
              <div className="flex flex-col mt-1 ml-3">
                <h3 className="md:text-base text-sm font-medium">
                  {user.username}
                </h3>
                <p className="md:text-sm text-xs">{user.email}</p>
              </div>
            </div>
          ));
          
        }
      }
    }

    if (!(isDone)){
      getData();
    }

    return () => {
      isDone = true;
    }
  }, [])
  

  return (
    <div className="bg-white w-full h-full">
      <div className="flex py-1 mt-6 gap-80 md:ml-14 ml-6 w-5/6">
        <p className="md:text-3xl text-xl transform-translate-y-2 w-fit">
          Users
        </p>

        <div className="border-2 border-gray-400 rounded overflow-hidden hidden md:flex ml-80 space-x-10">
          <button className="flex items-center justify-center px-4 border-l">
            <SearchIcon className="h-5 w-5 text-purple-400" />
            <input type="text" className="py-2 ml-3" placeholder="Search" />
          </button>
        </div>
      </div>

      <div 
        className="shadow-2xl w-5/6 md:ml-14 ml-6 mt-1 bg-white rounded-md"
        style={{paddingBottom: 40}}
      >
        <div className="md:ml-14">
          <div className="flex p-4 space-x-16">
            <div className="flex w-full shadow-md cursor-pointer border-2 rounded-md">
              <div className="flex md:ml-6 mt-3 mb-3 md:space-x-6 space-x-2 md:mr-1 p-2 md:w-full w-fit">
                <button 
                  className={menus.admin ? "bg-primary text-white p-1 px-4 md:text-base text-sm rounded hover:bg-secondary"
                  : "shadow-md shadow-gray-400 p-1 px-4 md:text-base text-sm rounded"}
                  onClick={() => setMenus({...menus, admin: true, author: false, users: false})}
                >
                  Admins
                </button>

                <button 
                  className={menus.author ? "bg-primary text-white p-1 px-4 md:text-base text-sm rounded hover:bg-secondary"
                    : "shadow-md shadow-gray-400 p-1 px-4 md:text-base text-sm rounded"}
                  onClick={() => setMenus({...menus, admin: false, author: true, users: false})}
                >
                  Authors
                </button>

                <button 
                  class={menus.users ? "bg-primary text-white p-1 px-4 md:text-base text-sm rounded hover:bg-secondary"
                  : "shadow-md shadow-gray-400 p-1 px-4 md:text-base text-sm rounded"}
                  onClick={() => setMenus({...menus, admin: false, author: false, users: true})}
                >
                  Users
                </button>
              </div>
            </div>
          </div>

          <div className="flex p-2 shadow-md border-2 rounded-md w-11/12 md:ml-7 ml-3 space-x-16 admin-card-container">

            <div style={{display: menus.admin ? "block" : "none", marginLeft: 0, width:"100%"}}>
              {/* Users card */}
              {isSuperUserContainer}
            </div>

            <div style={{display: menus.users ? "block" : "none", marginLeft: 0, width:"100%"}}>
              {/* Users card */}
              {isStaffContainer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
