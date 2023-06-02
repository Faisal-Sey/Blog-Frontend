import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import avatar from '../../../public/images/author.png'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setPostIdAction } from '../../../redux/actions/currentBlogAction'
import { BACKEND_DOMAIN, STATUS_CODE } from '../../../utils/systemSettings';
import blogServices from '../../../services/blogServices';
import BlogContent from '../../decode-blog-content';


function Blog() {

    const posts = [];

    const dispatch = useDispatch();

    const router = useRouter();

    const getSingleBlog = (postId) => {
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
                    setSecondPostContainer(
                        posts.slice(1, posts.length).map((post) => (
                        <div key={post.id}>
                        <div className='flex flex-col lg:flex-row my-8' key={post.id}>
                            <div className='w-full blog-card-image' >
                                <Image src={`${BACKEND_DOMAIN}${post.image}`} layout="responsive"  alt="blog 1" width={350} height={460}  />
                            </div>
                            <div className='flex flex-col justify-between px-4 blog-card-content'>
                                <div className='text-corporate font-medium text-xl blog-category-text'>
                                    #category
                                </div>
                                <div className='text-3xl font-bold'>
                                    {post.title}             
                                </div>
                                <div className='single-blog-text'>
                                    <BlogContent postBlog={post.blog}/>
                                </div>
                                <p onClick={() => getSingleBlog(post.id)} className='read-text'>Read...</p>                                
                                <div className='flex items-center'>
                                    <div>
                                        <Image src={post.user.profile_image ? `${BACKEND_DOMAIN}${post.user.profile_image}` : avatar} alt="avatar" width={50} height={50} />
                                    </div>
                                    <div className='px-4'>
                                        <div className='font-medium'>{post.user.username}</div>
                                        <div>{post.time_created}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
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

export default Blog