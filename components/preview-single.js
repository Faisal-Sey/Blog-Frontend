import React, { useState, useEffect} from "react";
import Image from "next/image";
import { BACKEND_DOMAIN, STATUS_CODE } from "../utils/systemSettings";
import blogServices from "../services/blogServices";
import authService from "../services/authServices";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

export default function Singleblog() {

    const [data, setData] = useState({});

    const [image, setImage] = useState(null)

    const allData = []

    useEffect(() => {
  
      let isDone = false;
  
      const getData = async() => {
          try {
              const getInfo = await blogServices.getPreview({});
              if (getInfo?.status === STATUS_CODE.SUCCESS){
                for (const value of Object.entries(getInfo?.data?.data)){
                    allData.push(value[1])
                }
                setData(allData[0]);

                setImage(
                <Image
                    src={`${BACKEND_DOMAIN}${allData[0]?.image}`}
                    width="1250"
                    height="500"
                    alt="hero-image"
                    className="max-w-max"
                />
                )
              }
          }catch(err){
              const refresh = await authService.refreshToken({})
              const getInfo = await blogServices.getPreview({});
              if (getInfo?.status === STATUS_CODE.SUCCESS){
                for (const value of Object.entries(getInfo?.data?.data)){
                    allData.push(value[1])
                }
                setData(allData[0]);
                setImage(
                    <Image
                        src={`${BACKEND_DOMAIN}${allData[0]?.image}`}
                        width="1250"
                        height="500"
                        alt="hero-image"
                        className="max-w-max"
                    />
                )
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
    <div className="mx-auto mt-14 mb-5">
        <div key={data?.id}>
            <div className="w-full text-center">
                {image}
                <h3 className="w-full md:text-5xl text-2xl text-left dark:text-white md:ml-11 ml-5 md:mt-8 mt-5 md:font-bold font-semibold">
                {data?.title}<br/>
                {" "}
                </h3>
                <h3 className="w-full md:text-3xl text-base text-left md:ml-11 ml-5 md:mt-8 mt-5 text-primary md:tracking-normal">
                {data?.user?.username}
                </h3>
            </div>
            <div className="w-full md:text-center">
                <h3 className="w-full md:text-2xl text-xs dark:text-white md:text-left md:ml-11 ml-5 md:mt-6 mt-1 font-medium md:tracking-normal">
                    {data?.time_created}
                </h3>
            </div>
                
            <div className="single-blog-wrapper">
                <ReactQuill 
                  theme={"bubble"}
                  readOnly={true}
                  value={data?.blog}
                />
            </div>
            <div className="create-space"></div>
        </div>
    </div>
  );
}
