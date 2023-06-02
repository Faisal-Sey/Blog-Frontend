import React, { useState, useEffect } from "react";
import Image from 'next/image'
import CorporateNavbar from './navbar'
// import BlogCard from './cards/blog'
import blogServices from "../../services/blogServices";
import authService from '../../services/authServices'
import { STATUS_CODE, BACKEND_DOMAIN} from "../../utils/systemSettings";
import HeroCard from './cards/hero'
import BlogContent from "../decode-blog-content";


function Hero() {

  const posts = [];

  const [firstPost, setFirstPost] = useState({});
  
  useEffect(async() => {

    try {
      const refresh = await authService.refreshToken({})
      const res = await blogServices.getAllPosts({});
      if (res?.status === STATUS_CODE.SUCCESS) {
        for (const value of Object.entries(res?.data.data)) {
          posts.push(value[1]);
        }

        if (posts.length >= 1) {
          setFirstPost(posts[0]);
        }

      }
    } catch (err) {
      ;
    }

  })

  return (
    <div className="lg:h-screen">
      <div 
        className="h-3/4 hero_bg"
        style={{
          backgroundImage: `url(${BACKEND_DOMAIN}${firstPost.image})`, 
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <CorporateNavbar />
        {/* Hero text */}
        <div className='text-white lg:w-1/2 lg:pl-12'>
          <div className='hero-styled-text uppercase font-bold border-l-2 px-2 border-corporate'>{firstPost.title}</div>
          <div className='font-extrabold text-2xl lg:text-5xl'>
            <BlogContent postBlog={firstPost.blog}/>
          </div>

        </div>
      </div>
      <div className='grid  lg:grid-cols-5 py-4 lg:px-8 bg-corporate lg:py-4 h-1/4 text-white '>
        <HeroCard />
      </div>
    </div>
  )
}

export default Hero