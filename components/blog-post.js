import React, { useState, useEffect } from "react";
import Image from "next/image";
import { message } from 'antd';
import authService from "../services/authServices"
import blogServices from "../services/blogServices";
import SingleBlogComment from "./single-blog-comment";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import { STATUS_CODE, BACKEND_DOMAIN } from "../utils/systemSettings";



export default function Singleblog({postId}) {

  const [postContainer, setPostContainer] = useState(null)

  const [user, setUser] = useState({});

  const [otherPostContainer, setOtherPostContainer] = useState(null);

  const darkMode = useSelector((store) => store.darkMode);
  
  const posts = []

  const otherPost = []

  const [updateComment, setUpdateComment] = useState(false)

  const [commentContainer, setCommentContainer] = useState({
    post_id: postId,
    comment: ''
  })

  const [singleCommentContainer, setSingleCommentContainer] = useState(null)

  const returnComments = (comment) => {

      const mapComments = Object.entries(comment).map((singleComment) => 
          <div className="flex space-x-4" key={singleComment.id}>
              <div className=" shrink-0" >
                  <Image src={(singleComment[1]).user.profile_img ? `${BACKEND_DOMAIN}${(singleComment[1]).user.profile_img}` : "/images/author.png"} width="50" height="50" alt="avatar" />
              </div>
              <div className="dark:text-white">
              <div className="flex justify-between">
                  <div className="font-bold">{(singleComment[1]).user.username}</div>
                  <div style={{width: 20}}></div>
                  <div className="text-gray-500">{(singleComment[1]).time_created}, {(singleComment[1]).date_created}</div>
              </div >
              {(singleComment[1]).comment}
              </div>
          </div>
      )
      
      return (
          <div className="comments">
              {mapComments}
          </div>
      )
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCommentContainer({
      ...commentContainer,
      [e.target.name]: value
    })
  }

  const createComment = async() => {
    try {
      const res = await createComment(commentContainer);
      if (res?.status === STATUS_CODE.SUCCESS) {
        message.success("comment added")
        setCommentContainer({
          ...commentContainer,
          comment: ''
        })
        setUpdateComment(true)
      }
    }catch(err){
      const refresh = await authService.refreshToken({})
      const res = await blogServices.createComment(commentContainer);
      if (res?.status === STATUS_CODE.SUCCESS) {
        message.success("comment added")
        setCommentContainer({
          ...commentContainer,
          comment: ''
        })
        setUpdateComment(true)
      }
    }
  }


  useEffect(() => {

    let isDone = false;

    const getData = async() => {
      try {
        const res = await blogServices.getPost({
          post_id: postId
        })
        if (res?.status === STATUS_CODE.SUCCESS) {
          for (const value of Object.entries(res?.data.data)){
            posts.push(value[1])
            setSingleCommentContainer(returnComments(value[1]["comments"]))
          }

          setPostContainer(posts.map((post) => 
            <div key={post.id}>
              <div className="w-full text-center">
                <Image
                  src={`${BACKEND_DOMAIN}${post.image}`}
                  width="1250"
                  height="500"
                  alt="hero-image"
                  className="max-w-max"
                />
                <h3 className="w-full md:text-5xl text-2xl text-left dark:text-white md:ml-11 ml-5 md:mt-8 mt-5 md:font-bold font-semibold">
                  {post.title}<br/>
                  {" "}
                </h3>
                <h3 className="w-full md:text-3xl text-base text-left md:ml-11 ml-5 md:mt-8 mt-5 text-primary md:tracking-normal">
                  {post.user.username}
                </h3>
              </div>
              <div className="w-full md:text-center">
                <h3 className="w-full md:text-2xl text-xs dark:text-white md:text-left md:ml-11 ml-5 md:mt-6 mt-1 font-medium md:tracking-normal">
                  {post.time_created}
                </h3>

              </div>
              
              <div className={`single-blog-wrapper${darkMode.dark ? "-dark" : ""}`}>
                <ReactQuill 
                  theme={"bubble"}
                  readOnly={true}
                  value={post.blog}
                />
              </div>

              <div className="w-full">
                {/* <h3 className="w-full text-2xl text-left ml-12 mt-8 text-secondary tracking-tight">Share</h3>
                */}
                <div className="md:text-2xl text-sm text-secondary md:mt-8 mt-4 mb-4 md:ml-11 ml-5 md:tracking-tight">
                  Share
                </div>
                <div className="md:ml-9 ml-3 mt-2 md:mt-0">
                  <span className="mx-2">
                    <Image
                      width="25"
                      height="25"
                      src={"/svgs/twitter-pink.svg"}
                      alt="twitter"
                    />
                  </span>
                  <span className="mx-2">
                    <Image
                      width="25"
                      height="25"
                      src={"/svgs/linkedin-pink.svg"}
                      alt="twitter"
                    />
                  </span>
                  <span className="mx-2">
                    <Image
                      width="25"
                      height="25"
                      src={"/svgs/facebook-pink.svg"}
                      alt="twitter"
                    />
                  </span>
                  {/* <span className="mx-2">
                    <Image
                      width="25"
                      height="25"
                      src={"/svgs/google.svg"}
                      alt="twitter"
                    />
                  </span> */}
                </div>
              </div>
            </div>
          ))
        }
      }catch(err) {
        const refresh = await authService.refreshToken({});
        const res = await blogServices.getPost({
          post_id: postId
        })
        if (res?.status === STATUS_CODE.SUCCESS) {
          for (const value of Object.entries(res?.data.data)){
            posts.push(value[1])
            setSingleCommentContainer(returnComments(value[1]["comments"]))
          }

          setPostContainer(posts.map((post) => 
            <div key={post.id}>
              <div className="w-full text-center">
                <Image
                  src={`${BACKEND_DOMAIN}${post.image}`}
                  width="1250"
                  height="500"
                  alt="hero-image"
                  className="max-w-max"
                />
                <h3 className="w-full md:text-5xl text-2xl text-left dark:text-white md:ml-11 ml-5 md:mt-8 mt-5 md:font-bold font-semibold">
                  {post.title}<br/>
                  {" "}
                </h3>
                <h3 className="w-full md:text-3xl text-base text-left md:ml-11 ml-5 md:mt-8 mt-5 text-primary md:tracking-normal">
                  {post.user.username}
                </h3>
              </div>
              <div className="w-full md:text-center">
                <h3 className="w-full md:text-2xl text-xs dark:text-white md:text-left md:ml-11 ml-5 md:mt-6 mt-1 font-medium md:tracking-normal">
                  {post.time_created}
                </h3>

              </div>
              
              <div className={`single-blog-wrapper${darkMode.dark ? "-dark" : ""}`}>
                <ReactQuill 
                  theme={"bubble"}
                  readOnly={true}
                  value={post.blog}
                />
              </div>

              <div className="w-full">
                {/* <h3 className="w-full text-2xl text-left ml-12 mt-8 text-secondary tracking-tight">Share</h3>
                */}
                <div className="md:text-2xl text-sm text-secondary md:mt-8 mt-4 mb-4 md:ml-11 ml-5 md:tracking-tight">
                  Share
                </div>
                <div className="md:ml-9 ml-3 mt-2 md:mt-0">
                  <span className="mx-2">
                    <Image
                      width="25"
                      height="25"
                      src={"/svgs/twitter-pink.svg"}
                      alt="twitter"
                    />
                  </span>
                  <span className="mx-2">
                    <Image
                      width="25"
                      height="25"
                      src={"/svgs/linkedin-pink.svg"}
                      alt="twitter"
                    />
                  </span>
                  <span className="mx-2">
                    <Image
                      width="25"
                      height="25"
                      src={"/svgs/facebook-pink.svg"}
                      alt="twitter"
                    />
                  </span>
                  {/* <span className="mx-2">
                    <Image
                      width="25"
                      height="25"
                      src={"/svgs/google.svg"}
                      alt="twitter"
                    />
                  </span> */}
                </div>
              </div>
            </div>
          ))
        }
      }

      try{
        const res = await blogServices.getAllPosts({})
        if (res?.status === STATUS_CODE.SUCCESS) {
          for (const value of Object.entries(res?.data.data)){
            if (value[1]["id"] != postId){
              console.log(value[1])
              otherPost.push(value[1])
            }
          }

          setOtherPostContainer(otherPost.slice(0, 2).map((post) => 
            <div className="w-full h-79 border-2 border-secondary text-md" key={post.id}>
              <div className="text-center mt-2">
                <Image
                  src={`${BACKEND_DOMAIN}${post.image}`}
                  width="400"
                  height="150"
                  alt="hero-image"
                  className=""
                />
              </div>
              <div className="mt-2">
                <h3 className="text-secondary md:text-md text-sm font-medium ml-3">
                  {post.title}
                </h3>
                <h3 className="md:text-2xl text-sm dark:text-white font-bold ml-3">
                  Lorem ipsum dolor sit amet
                </h3>
                <h3 className="md:text-sm text-xs text-primary ml-3 mt-2 mb-3">
                  {post.user.username}
                </h3>
              </div>
            </div>
          ))
        }
      }catch(err){}

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
      setUpdateComment(false)
    }
  }, [updateComment])

  return (
    <div className="dark:bg-black mx-auto">
      <>{postContainer}</>
      {/* Comment */}
      <div className="ml-12 my-6">
        <div className="font-medium text-secondary lg:text-xl ">Comments</div>
        <div className="w-full lg:w-2/5">
          <form className="">
            <div className="flex items-center space-x-4">
            <div className="bg-blue-400" >
              <Image src={user.profile_img ? `${BACKEND_DOMAIN}${user.profile_img}` : "/images/author.png"} width="50" height="50" alt="avatar" />
            </div>
            <div>
              <input 
                name="comment" 
                value={commentContainer.comment ? commentContainer.comment : ''}
                onChange={handleInputChange}
                type="text" 
                placeholder="Comment here ..." 
                className=" "style={{borderBottom:"2px solid gray"}}
              />
              <button 
                type="button"
                onClick={createComment}
                style={{textDecoration: 'underline'}}
              >
                  Comment
              </button>
            </div>

            </div>

            <hr className="divider my-4" />

            <>{singleCommentContainer}</>
            
          </form>
        </div>
      </div>
      <div className="w-full">
      {/* <h3 className="uppercase w-full text-2xl text-left ml-12 mt-14 text-secondary tracking-tight font-medium">Recommended for you</h3> */}
      <div className="uppercase md:text-2xl text-sm text-secondary md:ml-11 ml-5 mt-8">
        Recommended for you
      </div>
      <div className="container flex md:ml-11 mt-8">
        <>{otherPostContainer}</>
      </div>
    </div>
    </div>
  );
}
