import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Spin } from 'antd';
import Image from "next/image";
import { Upload, message } from 'antd';
import Head from "next/head";
import Avatar from "../assets/images/avatar.jpg";
import styles from "../styles/auth.module.css";
import { UserCircleIcon } from "@heroicons/react/solid";
import { LoadingOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import authService from "../services/authServices";
import blogServices from "../services/blogServices";
import { STATUS_CODE, BACKEND_DOMAIN } from "../utils/systemSettings";
import { setUserDataAction } from "../redux/actions/userInfoAction";


function Profile() {

  const [state, setState] = useState({loading: false});

  const [showUpload, setShowUpload] = useState(false);
  
  const [isWeb, setIsWeb] = useState(false)
  
  const [userDetails, setUserDetails] = useState({});

  const dispatch = useDispatch()
  
  useEffect(() => {
    let isDone = false;

    const getData = async() => {
      try {
        const getInfo = await blogServices.getUserInfo({});
        if (getInfo?.status === STATUS_CODE.SUCCESS){
          setUserDetails(getInfo?.data?.data?.user);
        }
      }catch(err){
        const refresh = await authService.refreshToken({})
        const getInfo = await blogServices.getUserInfo({});
        if (getInfo?.status === STATUS_CODE.SUCCESS){
          setUserDetails(getInfo?.data.data.user);
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

  const handleInputChange = (e) => {
    const value = e.target.value
    setUserDetails({
      ...userDetails,
      [e.target.name]: value
    })
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setUserDetails({
        ...userDetails,
        profile_img: info.file.originFileObj
      });
      setIsWeb(true)
    }
  };

  const { loading, imageUrl } = state;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const save = async() => {
    const formData = new FormData();
    for(const pair of Object.entries(userDetails)){
      formData.append(pair[0], pair[1])
    }

    try{
      const res = await authService.updateInfo(formData)
      if (res?.status === STATUS_CODE.SUCCESS){
        message.success("Updated successfully", 3)
        setShowUpload(false)
      }
    }catch(err){
      const refresh = await authService.refreshToken({})
      const res = await authService.updateInfo(formData)
      if (res?.status === STATUS_CODE.SUCCESS){
        message.success("Updated successfully", 3)
        setShowUpload(false)
      }
    }
  }

  return (
    <div className=" bg-white w-full h-full">

      <div className="flex py-1 mt-6 gap-80 md:ml-14 ml-4 w-5/6">
        <p className="md:text-3xl text-xl transform-translate-y-2 w-fit">
          Settings
        </p>
      </div>
      <div className="shadow-2xl md:w-7/12 w-full md:ml-60 ml:50 mt-2 bg-white rounded-md">
        <div className="flex p-2 space-x-16 justify-center py-1 w-full">
          <div className="px-20 py-20 bg-white max-w-6xl md:px-40 hover:shadow">
            <div className="w-full text-center">
              {showUpload 
              ? (
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {userDetails.profile_img ? <img src={isWeb ? URL.createObjectURL(userDetails.profile_img) : `${BACKEND_DOMAIN}${userDetails.profile_img}`} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
              )
              :
              (userDetails.profile_img ? 
                <Image
                src={userDetails.profile_img ? `${BACKEND_DOMAIN}${userDetails.profile_img}` : Avatar}
                width="120"
                height="120"
                alt="profile-pic"
                className="rounded-full"
              />
                : <UserCircleIcon className="md:h-40 md:w-40 h-20 w-20  text-secondary" />
              )}

              <button onClick={() => setShowUpload(true)} className="md:text-sm text-xs text-gray-500 italic" style={{textDecoration: "underline"}}>
                Change your profile picture
              </button>
            </div>
            <div className="mt-3">
              <div className="md:my-4 my-3">
                <h3 className="md:text-md text-sm  text-purple-800 uppercase font-medium">
                  Username
                </h3>
                <input
                  type="text"
                  value={userDetails.username}
                  onChange={handleInputChange}
                  placeholder="Admin User Name"
                  name="username"
                  disabled
                  className="p-2 border-primary-light text-purple-800 w-full"
                />
              </div>
              <div className="md:my-4 my-3">
                <h3 className="md:text-md text-purple-800 text-sm uppercase font-medium">
                  Email
                </h3>
                <input
                  type="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  name="email"
                  placeholder="adminusername@email.com"
                  className="text-input p-2 border-primary-light text-purple-800 w-full"
                />
              </div>
              <span className="justify-left mt-6">
                <hr className="w-full" />
              </span>
            </div>
            <h3 className="mt-5 text-purple-800 md:text-base text-sm font-medium">
              Reset Password
            </h3>
            <div className="flex items-center mt-4 justify-between md:gap-2 gap-6">
              {" "}
              <h3 className="w-full text-gray-400 md:text-sm text-xs">
                Change your password by getting a reset link in your email.
              </h3>{" "}
              <button className="w-full h-10 bg-gray-400 border-purple-800 text-white md:text-sm text-xs md:uppercase">
                Reset Password
              </button>{" "}
            </div>
            <div className="md:flex items-center md:mt-5 mt-6 justify-between md:gap-2 gap-6">
              {" "}
              <h3 className="w-full text-gray-400 text-sm"></h3>{" "}
              <button onClick={save} className="w-full h-10 bg-purple-800 border-purple-800 text-white md:text-sm text-xs md:uppercase">
                Save
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
