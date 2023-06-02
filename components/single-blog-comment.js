import React, { useState, useEffect } from 'react';
import blogServices from '../services/blogServices';
import { STATUS_CODE, BACKEND_DOMAIN } from '../utils/systemSettings';
import Image from 'next/image'
import authService from '../services/authServices';


export default function SingleBlogComment({postId}) {

    const [commentContainer, setCommentContainer] = useState(null)

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

    useEffect(() => {

        let isDone = false;

        const getData = async() => {
            try {
                const res = await blogServices.getPost({
                    post_id: postId
                })

                if (res?.status === STATUS_CODE.SUCCESS) {
                    for (const value of Object.entries(res?.data?.data)) {
                        setCommentContainer(returnComments(value[1]["comments"]))
                    }
                }
                } catch (err) {
                const refresh = await authService.refreshToken({})
                const res = await blogServices.getPost({
                    post_id: postId
                })

                if (res?.status === STATUS_CODE.SUCCESS) {
                    for (const value of Object.entries(res?.data.data)) {
                        setCommentContainer(returnComments(value[1]["comments"]))
                    }
                }
            }
        }

        if (!(isDone)){
            getData();
        }

        return () => {
            isDone = true
        }

    }, [postId])

    return (
        <>{commentContainer}</>
    )
}