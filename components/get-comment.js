import React, { useEffect, useState } from 'react';
import { TrashIcon } from "@heroicons/react/outline";
import authService from '../services/authServices'
import blogServices from '../services/blogServices';
import { STATUS_CODE } from '../utils/systemSettings';
import { message } from 'antd';
import Image from 'next/image'
import { useRouter } from 'next/router';

export default function GetComment({ postId }) {

    const [commentContainer, setCommentContainer] = useState(null)

    const router = useRouter();
    
    const deleteComment = async(commentId) => {
        try {
            const refresh = await authService.refreshToken({})
            const res = await blogServices.deleteComment({
                post_id: postId,
                comment_id: commentId
            })
            if (res?.status === STATUS_CODE.SUCCESS) {
                message.success("Comment deleted successfully", 3)
                window.location.reload(true)
            }
        }catch(err){}
    }
    
    const returnComments = (comment) => {

        const mapComments = Object.entries(comment).map((singleComment) => 
            <div key={singleComment.id}>
                <h3 style={{display: "inline", float: "left"}}>{(singleComment[1]).comment}</h3>
                <div className="mt-16 mb-3 mr-5 p-2" style={{display: "inline", float: "right", margin: 0}}>
                    <button className="bg-primary text-white p-1 px-4 rounded hover:bg-secondary trash-icon-btn">
                    <TrashIcon onClick={() => deleteComment((singleComment[1]).id)} className="md:h-10 md:w-6 h-5 w-3 text-white trash-icon"/>
                    </button>
                </div>
                <br/>
                <br/>
            </div>
        )
        
        return (
            <div className="comments">
                {mapComments}
            </div>
        )
    }

    useEffect(async () => {
        try {
            const refresh = await authService.refreshToken({})
            const res = await blogServices.getPost({
                post_id: postId
            })

            if (res?.status === STATUS_CODE.SUCCESS) {
                for (const value of Object.entries(res?.data.data)) {
                    setCommentContainer(returnComments(value[1]["comments"]))
                }
            }
        } catch (err) {}

    }, [postId])

    return (
        <>{commentContainer}</>
    )
}