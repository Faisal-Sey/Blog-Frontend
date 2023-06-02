import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import { Spin } from "antd";
import Navbar from "../components/navbar";
import { v4 as uuidv4 } from "uuid";
import image1 from "../public/images/image1.jpg";
import image2 from "../public/images/image2.jpg";
import image3 from "../public/images/image3.jpg";
import Footer from "../components/footer";
import { setSocialStatus } from '../redux/actions/setSocialStatusAction';
import { useSession } from 'next-auth/react';
import blogServices from "../services/blogServices";
import BlogContent from '../components/decode-blog-content';
import authService from "../services/authServices";
import { setPostIdAction } from "../redux/actions/currentBlogAction";
import { setAuthDataAction } from "../redux/actions/authActions"
import { BACKEND_DOMAIN, STATUS_CODE } from "../utils/systemSettings";
import SubscribeCard from "../components/subscribeCard";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

export default function Home({posts, tickets, evenPost, oddPost}) {
  const data = [
    { id: uuidv4(), img: image1 },
    { id: uuidv4(), img: image2 },
    { id: uuidv4(), img: image3 },
  ];

  const socialStatus = useSelector((store) => store.social)

  const darkMode = useSelector((store) => store.darkMode);

  const firstPost = [];

  const fifthPost = [];

  const seventhPost = [];

  const eighthPost = [];

  const router = useRouter();

  const [ticketContainer, setTicketContainer] = useState(null);

  if (posts[0]){
    firstPost.push(posts[0])
  }

  if (posts[4]){
    fifthPost.push(posts[4])
  }

  if (posts[7]){
    seventhPost.push(posts[7])
  }

  if (posts[8]){
    eighthPost.push(posts[8])
  }
  
  const dispatch = useDispatch();

  const getSingleBlog = async(postId) => {
    router.push({
      pathname:"/single-blog/[pid]",
      query: {
        pid: postId,
        same: true
      }
    });
  };

  const {data: session} = useSession();

  useEffect(() => {

    let isDone = false;

    const getData = async() => {
      if (tickets.length === 0) {
        setTicketContainer(<h3>No event tickets yet</h3>);
      } else {
        setTicketContainer(
          tickets.map((ticket) => (
            <div className="p-4 border-primary-light home-ticket-wrapper" key={ticket.id}>
              <Image
                src={`${BACKEND_DOMAIN}${ticket.image}`}
                alt="image1"
                width="140"
                height="110"
              />
              <div className="text-lg lg:text-xl text-secondary">
                {ticket.name}
              </div>
              <div className="mt-2 font-medium dark:text-white">
                {ticket.date}
              </div>
              <div className="mt-2 dark:text-white">{ticket.location}</div>
              <a href={ticket.url}>
                <button className="w-full mt-2 text-white p-4 text-center bg-card-primary dark:bg-black">
                  Access Event
                </button>
              </a>
            </div>
          ))
        );
      }
    }

    if (!(isDone)) {
      getData();
    }

    return () => {
      isDone = true
    }

  }, []);

  const callFunc = async(sess) => {
    try {
      const res = await authService.twitterRegister({
        token: sess.access_token
      })
      if (res?.status === STATUS_CODE.SUCCESS) {
        dispatch(setSocialStatus(true))
        dispatch(setAuthDataAction(true));
      }
      console.log(session)
    }catch(err){}
  }

  if (session?.access_token){
    if (!socialStatus.status){
      callFunc(session)
    }
  }



  return (
    <>
      <Navbar showCategories={true}/>
      <div className="dark:bg-black py-8">
        <main className="container mx-auto">
          {firstPost.map((post) => (
            <div className="" key={post?.id}  onClick={() => getSingleBlog(post?.id)}>
              <div className="grid grid-cols-3">
                <div className="col-span-3 lg:col-span-2 p-4 border-2 border-primary-light home-banner">
                  <Image
                    src={post?.image ? `${BACKEND_DOMAIN}${post?.image}`: image1}
                    width="500"
                    height="250"
                    alt="banner"
                  />
                </div>
                <div className="col-span-3 lg:col-span-1 p-4 border-2 border-primary-light first-post">
                  <div className="text-xl lg:text-2xl text-secondary my-4">
                    {post?.title}
                  </div>
                  <div className="text-xl dark:text-white lg:text-3xl font-bold">
                    <div className={`single-blog-text${darkMode.dark ? "-dark" : ""}`}>
                    <ReactQuill 
                      theme={"bubble"}
                      readOnly={true}
                      value={post.blog}
                    />
                    </div>
                  </div>
                  <div className="text-secondary">By {post?.user?.username}</div>
                </div>
              </div>
            </div>
          ))
          }

          <div className=" grid lg:grid-cols-3">
            {posts.slice(1, 4).map((post) => (
              <div className="second-post-wrapper" key={post?.id}  onClick={() => getSingleBlog(post?.id)}>  
                <div className="col-span-1 ">
                  <Image
                    src={post?.image ? `${BACKEND_DOMAIN}${post?.image}`: image1}
                    width="450"
                    height="200"
                    alt="image1"
                    className="second-post-image"
                  />
                  <div className="text-secondary text text-xl">
                    {post?.title}
                  </div>
                  <div className="text-xl dark:text-white lg:text-3xl font-bold">
                    <div className={`second-single-blog-text${darkMode.dark ? "-dark" : ""}`}>
                      <ReactQuill 
                        theme={"bubble"}
                        readOnly={true}
                        value={post.blog}
                      />
                    </div>
                  </div>
                  <div className="text-secondary">By {post?.user?.username}</div>
                </div>
              </div>
            ))
            }
          </div>
          
          <div className=" grid lg:grid-cols-2 gap-x-4 third-post-wrapper">
            <div>
              {posts.slice(4, 7).map((post) => (
                <div className="col-span-1 " key={post?.id}  onClick={() => getSingleBlog(post?.id)}>
                  <div className="grid lg:grid-cols-2 third-single-post-wrapper">
                    <div className="col-span-1">
                      <Image
                        src={post?.image ? `${BACKEND_DOMAIN}${post?.image}`: image1}
                        width="300"
                        height="280"
                        alt="image1"
                        className="second-post-image"
                      />
                    </div>
                    <div className="col-span-1 px-3 py-5">
                      <div className="text-secondary text text-xl">
                        {post?.title}
                      </div>
                      <div className="text-xl dark:text-white lg:text-3xl font-bold">
                        <div className={`third-single-blog-text${darkMode.dark ? "-dark" : ""}`}>
                          <ReactQuill 
                            theme={"bubble"}
                            readOnly={true}
                            value={post.blog}
                          />
                        </div>
                      </div>
                      <div className="text-secondary">By {post?.user?.username}</div>
                    </div>
                  </div>
                </div>
              ))
              }
            </div>
            <div>
              <SubscribeCard theme={"primary"}/>
              <>
              {
                seventhPost.map((post) => (
                <div className="seventh-post-wrapper" key={post?.id}>  
                  <div className="col-span-1 ">
                    <Image
                      src={post?.image ? `${BACKEND_DOMAIN}${post?.image}`: image1}
                      width="450"
                      height="280"
                      alt="image1"
                      className="second-post-image"
                    />
                    <div className="text-secondary text text-xl">
                      {post?.title}
                    </div>
                    <div className="text-xl dark:text-white lg:text-3xl font-bold">
                      <div className={`second-single-blog-text${darkMode.dark ? "-dark" : ""}`}>
                        <ReactQuill 
                          theme={"bubble"}
                          readOnly={true}
                          value={post.blog}
                        />
                      </div>
                    </div>
                    <div className="text-secondary">By {post?.user?.username}</div>
                  </div>
                </div>
              ))}
              </>
            </div>
          </div>
          <div className="py-8 ticket-wrapper">
              <div className="text-secondary border-primary-light text-xl lg:text-3xl leading-normal p-4">
                Events you need to attend
              </div>
              <div className="lg:grid lg:grid-cols-3 border-primary-light" style={{overflowY: "scroll", maxHeight: 300}}>
                {ticketContainer}
              </div>
          </div>
          <>
          {eighthPost.map((post) => (
              <div className="" key={post?.id}  onClick={() => getSingleBlog(post?.id)}>
                <div className="grid grid-cols-3">
                  <div className="col-span-3 lg:col-span-2 p-4 border-2 border-primary-light home-banner">
                    <Image
                      src={post?.image ? `${BACKEND_DOMAIN}${post?.image}`: image1}
                      width="500"
                      height="250"
                      alt="banner"
                    />
                  </div>
                  <div className="col-span-3 lg:col-span-1 p-4 border-2 border-primary-light">
                    <div className="text-xl lg:text-2xl text-secondary my-4">
                      {post?.title}
                    </div>
                    <div className="text-xl lg:text-3xl font-bold dark:text-white">
                      <div className='single-blog-text'>
                        <ReactQuill 
                          theme={"bubble"}
                          readOnly={true}
                          value={post.blog}
                        />
                      </div>
                    </div>
                    <button onClick={() => getSingleBlog(post?.id)}>
                      See more...
                    </button>
                    <div className="text-secondary">By {post?.user?.username}</div>
                  </div>
                </div>
              </div>
            ))}
            </>
            <div className="grid lg:grid-cols-2">
              <div className="col-span-1">
                  {evenPost.map((post) => (
                    <div className="col-span-1 p-4 border-primary-light even-post" key={post?.id}  onClick={() => getSingleBlog(post?.id)}>
                      <Image
                        src={post?.image ? `${BACKEND_DOMAIN}${post?.image}`: image1}
                        width="450"
                        height="200"
                        alt="image1"
                        className="second-post-image"
                      />
                      <div className="text-secondary text text-xl">
                        {post?.title}
                      </div>
                      <div className="text-xl dark:text-white lg:text-3xl font-bold">
                        <div className={`second-single-blog-text${darkMode.dark ? "-dark" : ""}`}>
                          <ReactQuill 
                            theme={"bubble"}
                            readOnly={true}
                            value={post.blog}
                          />
                        </div>
                      </div>
                      <div className="text-secondary">By {post?.user?.username}</div>
                    </div>
                  ))}
              </div>
      
              <div className="col-span-1">
                {oddPost.map((post) => (
                    <div className="col-span-1 p-4 border-primary-light odd-post" key={post?.id}>
                      <Image
                        src={post?.image ? `${BACKEND_DOMAIN}${post?.image}`: image1}
                        width="450"
                        height="200"
                        alt="image1"
                        className="second-post-image"
                      />
                      <div className="text-secondary text text-xl">
                        {post?.title}
                      </div>
                      <div className="text-xl dark:text-white lg:text-3xl font-bold">
                        <div className={`second-single-blog-text${darkMode.dark ? "-dark" : ""}`}>
                          <ReactQuill 
                            theme={"bubble"}
                            readOnly={true}
                            value={post.blog}
                          />
                        </div>
                      </div>
                      <div className="text-secondary">By {post?.user?.username}</div>
                    </div>
                ))
                }
              </div>
            </div>
        </main>
      </div>
      <Footer theme="primary" />
    </>
  );
}

Home.getInitialProps = async(ctx) => {
  const posts = []
  const tickets = []
  const evenPost = []
  const oddPost = []

  try{
    const res = await blogServices.getAllTickets({});
    if (res?.status === STATUS_CODE.SUCCESS) {
      for (const value of Object.entries(res?.data.data)) {
        tickets.push(value[1]);
      }
    }
  }catch(err){}

  try {
    const res = await blogServices.getAllPosts({});
    if (res?.status === STATUS_CODE.SUCCESS) {
      for (const value of Object.entries(res?.data.data)) {
        posts.push(value[1]);
      }
    }
  }catch(err){console.log(err)}

  if (posts.length > 9) {
    posts.slice(9, posts.length).forEach((post, index) => {
      if (index === 0 | index % 2) {
        evenPost.push(post)
      }

      else {
        oddPost.push(post)
      }
    });

  }

  return {posts: posts, tickets:tickets, oddPost:oddPost, evenPost: evenPost}
}