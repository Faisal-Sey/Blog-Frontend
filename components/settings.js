import React, { useEffect, useState } from "react";
import Image from "next/image";
import Avatar from "../assets/images/avatar.jpg";
import { useSelector } from 'react-redux'
import { STATUS_CODE, BACKEND_DOMAIN } from '../utils/systemSettings';
import authService from '../services/authServices'
import blogServices from '../services/blogServices';
import { useDispatch } from 'react-redux';
import { setUserDataAction } from '../redux/actions/userInfoAction';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UserCircleIcon } from "@heroicons/react/solid";

function Profile({ theme }) {
  
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
          setUserDetails(getInfo?.data?.data?.user);
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
        dispatch(setUserDataAction(userDetails))
        message.success("Updated successfully", 3)
        showUpload(false)
      }
    }catch(err){}
  }

  
  
  return (
    <div className={`main ${theme}-bg`}>
      <div className="flex justify-center py-6 w-full">
        <div className="px-20 py-20 dark:bg-black bg-white max-w-6xl md:px-40 hover:shadow">
          <h3 className="text-3xl text-secondary font-medium mb-5 text-center">
            Profile Settings
          </h3>
          <div className="w-full text-center settings-upload">
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
                src={`${BACKEND_DOMAIN}${userDetails.profile_img}`}
                width="120"
                height="120"
                alt="profile-pic"
                className="rounded-full"
              />
                : <UserCircleIcon className="md:h-40 md:w-40 h-20 w-20 md:ml-16 ml-8 text-secondary" />
              )}
            <button onClick={() => setShowUpload(true)} className="text-sm text-gray-500 italic" style={{textDecoration: "underline"}}>
              Change your profile picture
            </button>
          </div>
          <div className="mt-3">
            <div className="my-4">
              <h3 className="text-md text-secondary text-sm uppercase font-medium">
                Username
              </h3>
              <input
                type="text"
                value={userDetails.username}
                onChange={handleInputChange}
                placeholder="Admin User Name"
                className="p-2 border-primary-light text-secondary w-full"
              />
            </div>
            <div className="my-4 ">
              <h3 className="text-md text-secondary text-sm uppercase font-medium">
                Email
              </h3>
              <input
                type="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="adminusername@email.com"
                className="text-input p-2 border-primary-light text-secondary w-full"
              />
            </div>
            <span className="justify-left mt-6">
              <hr className="w-full" />
            </span>
          </div>
          <h3 className="mt-8 text-secondary font-medium">Reset Password</h3>
          <div className="flex items-center mt-4 justify-between gap-2">
            {" "}
            <h3 className="w-full text-gray-400 text-sm">
              Change your password by getting a reset link in your email.
            </h3>{" "}
            <button className="w-full h-10 bg-gray-500 border-secondary text-white text-sm uppercase">
              Reset password
            </button>{" "}
          </div>
          <div className="flex items-center mt-10 justify-between gap-2">
            {" "}
            <h3 className="w-full text-gray-400 text-sm"></h3>{" "}
            <button onClick={save} className="w-full h-10 bg-secondary border-secondary text-white text-sm uppercase">
              save
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
