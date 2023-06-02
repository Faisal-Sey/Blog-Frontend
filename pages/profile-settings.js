import React, { useState } from "react";
import Settings from "../components/settings";
import Navbar from "../components/navbar";
import authService from '../services/authServices';
import blogServices from '../services/blogServices';
import { STATUS_CODE } from '../utils/systemSettings';

export default function Profilepage() {

  const [userInfo, setUserInfo] = useState({});

  window.onload = async() => {
    try {
      const getInfo = await blogServices.getUserInfo({});
      if (getInfo?.status === STATUS_CODE.SUCCESS){
        setUserInfo(getInfo?.data.data.user);
      }
    }catch(err){
      const refresh = await authService.refreshToken({})
      const getInfo = await blogServices.getUserInfo({});
      if (getInfo?.status === STATUS_CODE.SUCCESS){
        setUserInfo(getInfo?.data.data.user);
      }
    }
  }

  return (
    <div>
       <Navbar user={userInfo}/>
        <Settings theme="secondary"/>
    </div>
  );
}