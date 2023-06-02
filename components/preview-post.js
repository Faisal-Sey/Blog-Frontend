import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import BlogContent from './blog-content';
import { BACKEND_DOMAIN } from "../utils/systemSettings";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/router";


export default function Singleblog() {

  const post = useSelector((store) => store.previewBlog);


  const getImg = (img) => {
    if (img.slice(0,4) === "blob"){
        return `${URL.createObjectURL(img)}`
    }

    else {
        return `${BACKEND_DOMAIN}${img}` 
    }
  }

  return (
    <div className="mx-auto mt-14 mb-5">
        <div key={post.id}>
            <div className="w-full text-center">
                <Image
                    src={getImg(post.image)}
                    width="1250"
                    height="500"
                    alt="hero-image"
                    className="max-w-max"
                />
                <h3 className="w-full md:text-5xl text-2xl text-left dark:text-white md:ml-11 ml-5 md:mt-8 mt-5 md:font-bold font-semibold">
                {post?.title}<br/>
                {" "}
                </h3>
                <h3 className="w-full md:text-3xl text-base text-left md:ml-11 ml-5 md:mt-8 mt-5 text-primary md:tracking-normal">
                {post?.user?.username}
                </h3>
            </div>
            <div className="w-full md:text-center">
                <h3 className="w-full md:text-2xl text-xs dark:text-white md:text-left md:ml-11 ml-5 md:mt-6 mt-1 font-medium md:tracking-normal">
                    {post?.time_created}
                </h3>
            </div>
                
            <div className="single-blog-wrapper">
                <ReactQuill 
                  theme={"bubble"}
                  readOnly={true}
                  value={post?.blog}
                />
            </div>
            <div className="create-space"></div>
        </div>
    </div>
  );
}
