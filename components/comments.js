import React, { useState, useEffect } from "react";
import { Spin } from 'antd'
import { UserCircleIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";
import authService from "../services/authServices";
import blogServices from "../services/blogServices";
import { STATUS_CODE } from "../utils/systemSettings";
import GetComment from "./get-comment";

const Comments = () => {

  const posts = []

  useEffect(() => {
    let isDone = false
    const getData = async() => {
      try {
        const res = await blogServices.getAllPosts({})
        if (res?.status === STATUS_CODE.SUCCESS) {
          for(const value of Object.entries(res?.data.data)){
            posts.push(value[1])
          }
        }
      }catch(err){}
    }

    if (!(isDone)){
      getData();
    }

    return () => {
      isDone = true
    }
  }, [])

  return (
    <div className=" bg-white w-full h-full">
      <div className="flex py-1 mt-6 gap-80 md:ml-14 ml-4 w-5/6">
        <p className="md:text-3xl text-xl transform-translate-y-2 w-fit">
          Comments
        </p>

        <div className="border-2 border-gray-400 rounded hidden md:block overflow-hidden ml-80 space-x-10">
          <button className="flex items-center justify-center px-4 border-l">
            <SearchIcon className="h-5 w-5 text-primary" />
            <input type="text" className="py-2 ml-3" placeholder="Search" />
          </button>
        </div>
      </div>
      <div className="shadow-2xl w-5/6 md:ml-14 ml-4 mt-1 bg-white rounded-md comment-container">
        <div className="md:ml-14">
          <h3 className="md:text-xl text-md text-gray-600 font-medium ml-2 mt-4">
            All Comments
          </h3>
          {posts.map((post, index) => 
            <div className="md:flex p-4 space-x-16" key={index}>
              {/* Commments card */}
              <div className="flex w-full shadow-md cursor-pointer border-2 rounded-md">
                <div className="flex flex-col mt-1">
                  <UserCircleIcon className="md:h-12 md:w-12 h-6 w-6 ml-3 text-gray-400" />
                  <div className="ml-3 space-y-3 mt-3">
                    <h3 className="md:text-sm text-xs font-medium">
                      Post Title:{" "}
                    </h3>
                    <h3 className="md:text-sm text-xs font-medium">Comments: </h3>
                  </div>
                </div>

                <div className="flex flex-col mt-2 w-full">
                  <div className="space-y-1 ml-3">
                    <h3 className="md:text-md text-sm font-semibold">
                      {post?.user?.username}
                    </h3>
                    <p className="text-xs text-gray-600">{post?.time_created}</p>
                  </div>
                  <div className="ml-3 space-y-3 w-3/4 mt-3 mb-8 comment-wrapper">
                    <h3 className="md:text-sm text-xs">
                      {post?.title}
                    </h3>
                    <GetComment postId={post?.id} />
                    {" "}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
