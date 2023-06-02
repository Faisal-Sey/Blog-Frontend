import React, { useState, useEffect } from 'react'
import blogServices from '../../../services/blogServices'
import { STATUS_CODE } from '../../../utils/systemSettings';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setPostIdAction } from '../../../redux/actions/currentBlogAction'

function HeroCard() {

  const posts = [];

  const dispatch = useDispatch();

  const router = useRouter();

  const getSingleBlog = async(postId) => {
    dispatch(setPostIdAction(postId));
    router.push({
      pathname:"/slug/[pid]",
      query: {
        pid: postId,
        same: true
      }
    });
  };

  const [secondPostContainer, setSecondPostContainer] = useState(null);
    
  useEffect(async() => {
      try {
        const res = await blogServices.getAllPosts({});
        if (res?.status === STATUS_CODE.SUCCESS) {
          for (const value of Object.entries(res?.data.data)) {
            posts.push(value[1]);
          }
    
          if (posts.length >= 1) {
            setSecondPostContainer(posts.slice(1, posts.length).map((post) => (
            <div className="border-2 border-white p-2 mx-4" key={post.id}>
              <div>
                {post.title}
              </div>
              <div 
                onClick={() => getSingleBlog(post.id)} 
                className="uppercase font-medium mt-2"
                style={{cursor: 'pointer'}}
              >
                  read
              </div>
            </div>
           ))
           );
          } 
        }
      }catch(err){}
    })

  return (
    <>{secondPostContainer}</>
  )
}

export default HeroCard