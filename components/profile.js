import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Avatar from "../assets/images/avatar.jpg";
import Link from 'next/link'

import { ChatAlt2Icon } from "@heroicons/react/solid";
import { ReplyIcon } from "@heroicons/react/solid";
import { CogIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/solid";
import authService from '../services/authServices'
import blogServices from "../services/blogServices";
import { STATUS_CODE } from "../utils/systemSettings";


function Profile({ theme }) {

    const [userInfo, setUserInfo] = useState({})

    const status = useSelector((store) => store.authStatus);

    const router = useRouter();

    const getImage = (img) => {
        return `${BACKEND_DOMAIN}/${img}`;
    };

    const [sections, setSections] = useState({
        recent: true,
        comment: false,
        response: false,
    });

    const comments = [];

    const responses = [];

    const [mapComments, setMapComments] = useState(null);
    const [mapResponses, setMapResponses] = useState(null);

    useEffect(() => {

        let isDone = false;

        const getData = async () => {
            try {
                const getInfo = await blogServices.getUserInfo({});
                if (getInfo?.status === STATUS_CODE.SUCCESS){
                  setUserInfo(getInfo?.data.data.user);
                }
            }catch(err){
                const refresh = await authService.refreshToken({})
                const getInfo = await blogServices.getUserInfo({});
                if (getInfo?.status === STATUS_CODE.SUCCESS){
                    setUserInfo(getInfo?.data.data.user);
                }
            }

            try {
                const comment = await blogServices.getComment({});
                for (const [index, value] of Object.entries(comment?.data?.data)) {
                    comments.push(value);
                }

                if (comments.length === 0) {
                    setMapComments("No comments yet");
                } else {
                    setMapComments(
                        comments.map((comment, index) => (
                            <div key={index}>
                                <div className="ml-2">
                                    <div className="flex gap-2">
                                        <ChatAlt2Icon className="h-5 w-5 text-secondary" />
                                        <h3 className="text-sm text-secondary font-medium">
                                            Comment
                                        </h3>
                                    </div>
                                    <p className="text-sm">{comment.comment.comment}</p>
                                    <p className="text-gray-400 text-sm">
                                        commented on{" "}
                                        <span className="text-sm text-secondary">
                                            {comment.post_title}
                                        </span>
                                    </p>
                                    <p className="text-sm">
                                        {comment.time} . {comment.date}
                                    </p>
                                </div>
                                <br />
                            </div>
                        ))
                    );
                }
            } catch (err) { 
                const refresh = await authService.refreshToken({})
                const comment = await blogServices.getComment({});
                for (const [index, value] of Object.entries(comment?.data?.data)) {
                    comments.push(value);
                }

                if (comments.length === 0) {
                    setMapComments("No comments yet");
                } else {
                    setMapComments(
                        comments.map((comment, index) => (
                            <div key={index}>
                                <div className="ml-2">
                                    <div className="flex gap-2">
                                        <ChatAlt2Icon className="h-5 w-5 text-secondary" />
                                        <h3 className="text-sm text-secondary font-medium">
                                            Comment
                                        </h3>
                                    </div>
                                    <p className="text-sm">{comment.comment.comment}</p>
                                    <p className="text-gray-400 text-sm">
                                        commented on{" "}
                                        <span className="text-sm text-secondary">
                                            {comment.post_title}
                                        </span>
                                    </p>
                                    <p className="text-sm">
                                        {comment.time} . {comment.date}
                                    </p>
                                </div>
                                <br />
                            </div>
                        ))
                    );
                }
            }

            try {
                const response = await blogServices.getResponse({});
                for (const [index, value] of Object.entries(response?.data?.data)) {
                    responses.push(value);
                }

                if (responses.length == 0) {
                    setMapResponses("No responses yet");
                } else {
                    setMapResponses(
                        responses.map((response, index) => (
                            <div key={index}>
                                <div className="ml-2">
                                    <div className="flex gap-2">
                                        <ReplyIcon className="h-5 w-5 text-secondary" />
                                        <h3 className="text-sm text-secondary font-medium">
                                            Response
                                        </h3>
                                    </div>
                                    <p className="text-sm">{response.response.response}</p>
                                    <p className="text-gray-400 text-sm">
                                        replied to{" "}
                                        <span className="text-sm text-secondary">
                                            {response.comment}
                                        </span>
                                    </p>
                                    <p className="text-sm">
                                        {response.time} . {response.date}
                                    </p>
                                </div>
                                <br />
                            </div>
                        ))
                    );
                }
            } catch (err) {
                const refresh = await authService.refreshToken({})
                const response = await blogServices.getResponse({});
                for (const [index, value] of Object.entries(response?.data?.data)) {
                    responses.push(value);
                }
            
                if (responses.length == 0) {
                    setMapResponses("No responses yet");
                } else {
                    setMapResponses(
                        responses.map((response, index) => (
                            <div key={index}>
                                <div className="ml-2">
                                    <div className="flex gap-2">
                                        <ReplyIcon className="h-5 w-5 text-secondary" />
                                        <h3 className="text-sm text-secondary font-medium">
                                            Response
                                        </h3>
                                    </div>
                                    <p className="text-sm">{response.response.response}</p>
                                    <p className="text-gray-400 text-sm">
                                        replied to{" "}
                                        <span className="text-sm text-secondary">
                                            {response.comment}
                                        </span>
                                    </p>
                                    <p className="text-sm">
                                        {response.time} . {response.date}
                                    </p>
                                </div>
                                <br />
                            </div>
                        ))
                    );
                }
            }
        }

        if (!(isDone)){
            getData();
        }

        return () => {
            isDone = true
        }

    }, []);

    if (status.status) {
        return (
            <div className={`main ${theme}-bg `}>
                <div className="container flex justify-center py-6">
                    <div className="px-20 py-20 bg-white dark:bg-black max-w-3xl profile-modal hover:shadow">
                        <h3 className={`text-2xl text-${theme} font-medium mb-5`}>
                            User Profile
                        </h3>
                        <div className="flex justify-between w-full">
                            <Image
                                src={
                                    userInfo.profile_img
                                        ? getImage(userInfo.profile_img)
                                        : Avatar
                                }
                                width="100"
                                height="100"
                                alt="profile-pic"
                                className="rounded-full"
                            />
                            <div className="ml-2">
                                <div className="p-3">
                                    <h3 className="text-2xl dark:text-white font-medium">{userInfo.username}</h3>{" "}
                                    <span className="dark:text-white">{userInfo.email}</span>
                                </div>
                            </div>
                            <div className="ml-10" style={{cursor: "pointer"}}>
                                <div className="p-3">
                                    <Link href="/profile-settings">
                                        <CogIcon className={`h-7 w-7 text-${theme}`} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between w-fit">
                            <div className="mt-3 mb-3 w-full">
                                <div className="p-3">
                                    <p className="text-md font-medium dark:text-white text-gray-700">
                                        Your Activity
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/3">
                                <div
                                    className={`border-2 border-${theme} rounded overflow-hidden flex mt-3`}
                                >
                                    <button className="flex items-center justify-center px-5">
                                        <SearchIcon className="h-5 w-5 text-purple-400" />
                                        <input
                                            type="text"
                                            className="py-2 ml-2 overflow-hidden"
                                            placeholder="Search"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <button
                                className={`w-full h-10 border-2 ${sections.recent ? `bg-${theme} text-white` : "text-" + theme} border-${theme} text-md  `}
                                onClick={() =>
                                    setSections({
                                        ...sections,
                                        recent: true,
                                        comment: false,
                                        response: false,
                                    })
                                }
                            >
                                Recent
                            </button>
                            <button
                                className={`w-full h-10 border-2 border-${theme} ${sections.comment ? `bg-${theme} text-white` : "text-" + theme} text-md`}
                                onClick={() =>
                                    setSections({
                                        ...sections,
                                        recent: false,
                                        comment: true,
                                        response: false,
                                    })
                                }
                            >
                                Comments
                            </button>
                            <button
                                className={`w-full h-10 border-2 border-${theme} ${sections.response ? `bg-${theme} text-white` : "text-" + theme} text-md`}
                                onClick={() =>
                                    setSections({
                                        ...sections,
                                        recent: false,
                                        comment: false,
                                        response: true,
                                    })
                                }
                            >
                                Response
                            </button>
                        </div>
                        <div className={`border-2 border-${theme} mt-3 p-2`}>
                            <div
                                className="dark:text-white"
                                style={{
                                    display:
                                        sections.recent || sections.comment ? "block" : "none",
                                }}
                            >
                                {mapComments}
                            </div>

                            <hr className={`mt-2 mb-2 dark:text-white border-${theme}`} />

                            <div className="dark:text-white"
                                style={{
                                    display:
                                        sections.recent || sections.response ? "block" : "none",
                                }}
                            >
                                {mapResponses}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        message.error("Please login or signup to continue", 3)
        router.push("/login");
        return <></>;
    }
}

export default Profile;
