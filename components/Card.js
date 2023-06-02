import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EyeIcon } from "@heroicons/react/solid";
import { ChatAlt2Icon } from "@heroicons/react/solid";
import { Spin } from 'antd'
import blogServices from "../services/blogServices";
import { STATUS_CODE } from "../utils/systemSettings";
import { BACKEND_DOMAIN } from "../utils/systemSettings";
import authService from "../services/authServices";

const Card = () => {
  
  const [mapPosts, setMapPosts] = useState(null);


  const posts = []

  useEffect(() => {

    let isDone = false

    const getData = async() => {

      try {
          const res = await blogServices.getPosts({})
          if (res?.status === STATUS_CODE.SUCCESS){
            for (const values of Object.entries(res?.data.data)) {
                posts.push(values[1])
            }
            
            if (posts.length > 2){
              setMapPosts(posts.slice(0, 2).map((post) => 
                <div
                    className={`transform hover:scale-110 cursor-pointer transition delay-100 w-80 p-2 py-4 shadow-xl rounded-xl bg-gradient-to-r card-style`}
                    key={post.id}
                  >
                    <div className="w-full flex space-x-6">
                      <div className="w-1/2 mt-3">
                        <Image
                          src={`${BACKEND_DOMAIN}${post.image}`}
                          width="140"
                          height="110"
                          className="rounded-md"
                        />
                      </div>

                      <div className="mt-3 w-9/12 md:space-y-1 space-y-2">
                        <div className="w-full">
                          <h3 className="md:text-sm text-xs">{post.title}</h3>
                          <p className="md:text-sm text-xs">{post.user.username}</p>
                          <p className="md:text-sm text-xs">{post.time_created}</p>
                          <div className="flex space-x-6 mt-2">
                            <div className="flex space-x-2">
                              <EyeIcon className="text-black h-4 w-4" />
                              <p className="text-xs">{post.view}</p>
                            </div>
                            <div className="flex space-x-2">
                              <ChatAlt2Icon className="text-black h-4 w-4" />
                              <p className="text-xs">{post.clicks}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>

              ))
            } else {
              setMapPosts(posts.map((post) => 
                <div
                  className={`transform hover:scale-110 cursor-pointer transition delay-100 w-80 p-2 py-4 shadow-xl rounded-xl bg-gradient-to-r`}
                  key={post.id}
                >
                  <div className="w-full flex space-x-6">
                    <div className="w-1/2 mt-3">
                      <Image
                        src={`${BACKEND_DOMAIN}${post.image}`}
                        width="140"
                        height="110"
                        className="rounded-md"
                      />
                    </div>

                    <div className="mt-3 w-9/12 md:space-y-1 space-y-2">
                      <div className="w-full">
                        <h3 className="md:text-sm text-xs">{post.title}</h3>
                        <p className="md:text-sm text-xs">{post.user.username}</p>
                        <p className="md:text-sm text-xs">{post.time_created}</p>
                        <div className="flex space-x-6 mt-2">
                          <div className="flex space-x-2">
                            <EyeIcon className="text-black h-4 w-4" />
                            <p className="text-xs">{post.view}</p>
                          </div>
                          <div className="flex space-x-2">
                            <ChatAlt2Icon className="text-black h-4 w-4" />
                            <p className="text-xs">{post.clicks}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              ))
            }
        }
      }catch(err){
        const refresh = await authService.refreshToken({})
        const res = await blogServices.getPosts({})
        if (res?.status === STATUS_CODE.SUCCESS){
            for (const values of Object.entries(res?.data.data)) {
                posts.push(values[1])
            }
            
            if (posts.length > 2){
              setMapPosts(posts.slice(0, 2).map((post) => 
                <div
                    className={`transform hover:scale-110 cursor-pointer transition delay-100 w-80 p-2 py-4 shadow-xl rounded-xl bg-gradient-to-r card-style`}
                    key={post.id}
                  >
                    <div className="w-full flex space-x-6">
                      <div className="w-1/2 mt-3">
                        <Image
                          src={`${BACKEND_DOMAIN}${post.image}`}
                          width="140"
                          height="110"
                          className="rounded-md"
                        />
                      </div>

                      <div className="mt-3 w-9/12 md:space-y-1 space-y-2">
                        <div className="w-full">
                          <h3 className="md:text-sm text-xs">{post.title}</h3>
                          <p className="md:text-sm text-xs">{post.user.username}</p>
                          <p className="md:text-sm text-xs">{post.time_created}</p>
                          <div className="flex space-x-6 mt-2">
                            <div className="flex space-x-2">
                              <EyeIcon className="text-black h-4 w-4" />
                              <p className="text-xs">{post.view}</p>
                            </div>
                            <div className="flex space-x-2">
                              <ChatAlt2Icon className="text-black h-4 w-4" />
                              <p className="text-xs">{post.clicks}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              ))
            } else {
              setMapPosts(posts.map((post) => 
                  <div
                    className={`transform hover:scale-110 cursor-pointer transition delay-100 w-80 p-2 py-4 shadow-xl rounded-xl bg-gradient-to-r`}
                    key={post.id}
                  >
                    <div className="w-full flex space-x-6">
                      <div className="w-1/2 mt-3">
                        <Image
                          src={`${BACKEND_DOMAIN}${post.image}`}
                          width="140"
                          height="110"
                          className="rounded-md"
                        />
                      </div>

                      <div className="mt-3 w-9/12 md:space-y-1 space-y-2">
                        <div className="w-full">
                          <h3 className="md:text-sm text-xs">{post.title}</h3>
                          <p className="md:text-sm text-xs">{post.user.username}</p>
                          <p className="md:text-sm text-xs">{post.time_created}</p>
                          <div className="flex space-x-6 mt-2">
                            <div className="flex space-x-2">
                              <EyeIcon className="text-black h-4 w-4" />
                              <p className="text-xs">{post.view}</p>
                            </div>
                            <div className="flex space-x-2">
                              <ChatAlt2Icon className="text-black h-4 w-4" />
                              <p className="text-xs">{post.clicks}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ))
            }
        }
      }
    }

    if (!(isDone)) {
      getData();
    }

    return () => {
      isDone = true
    }

  }, [])

  return (
    <>{mapPosts}</>
  );
};

export default Card;
