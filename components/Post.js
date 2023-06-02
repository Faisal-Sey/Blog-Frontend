import React, { useState, useEffect, useRef } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Image from "next/image";
import Link from "next/link";
import { Modal, Input, Upload, Spin, message } from "antd";
import { ClockIcon } from "@heroicons/react/solid";
import { EyeIcon } from "@heroicons/react/solid";
import { PencilIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/solid";
import { CursorClickIcon } from "@heroicons/react/solid";
import authService from '../services/authServices'
import blogServices from "../services/blogServices";
import BlogContent from './blog-content';
import { STATUS_CODE } from "../utils/systemSettings";
import { BACKEND_DOMAIN } from "../utils/systemSettings";
import { useDispatch } from "react-redux";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import { previewBlogAction } from "../redux/actions/previewBlogAction";

const Post = () => {

  const blogPost = []

  const router = useRouter();

  const dispatch = useDispatch();

  const [blogPostUpdate, setBlogPostUpdate] = useState(false)

  const blogDraft = []

  const [blogDraftUpdate, setBlogDraftUpdate] = useState(false)

  const totalPostRef = useRef(0)

  const totalDraftRef = useRef(0)

  const totalDraftedRef = useRef(0)

  const totalContentRef = useRef("")

  const totalPublishedRef = useRef(0)

  const [state, setState] = useState({loading: false});

  const [type, setType] = useState({
    post: true,
    draft: false,
  })

  const blogContentRef = useRef(null);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],

      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ indent: '-1'}, { indent: '+1' }],

      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],

      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },

  }

  const formats = [
    'bold', 'italic', 'underline', 'strike',
    'align', 'list', 'indent',
    'size', 'header',
    'link', 'image', 'video',
    'color', 'background',
    'clean',
  ]

  const updatePost = async() => {
    const formData = new FormData()
    for(const pair of Object.entries(postContainer)){
      formData.append(pair[0], pair[1])
    }
    try {
      const res = await blogServices.updatePost(formData)
      if (res?.status === STATUS_CODE.SUCCESS){
        setIsPostModalVisible(false);
        setBlogPostUpdate(true);
      }
    }catch(err){
      const refresh = await authService.refreshToken({})
      const res = await blogServices.updatePost(formData)
      if (res?.status === STATUS_CODE.SUCCESS){
        setIsPostModalVisible(false);
        setBlogPostUpdate(true);
      }
    }
  }

  const handleChangeInput = (e) => {
    const value = e.target.value
    setPostContainer({
      ...postContainer,
      [e.target.name]: value
    })
  }

  const handleDraftChangeInput = (e) => {
    const value = e.target.value
    setDraftContainer({
      ...draftContainer,
      [e.target.name]: value
    })
  }

  const setQuill = (e) => {
    setPostContainer({
      ...postContainer,
      blog: e
    })
  }

  const setDraftQuill = (e) => {
    setDraftContainer({
      ...draftContainer,
      blog: e
    })
  }
  
  const titleRef = useRef(null);

  const [isPostModalVisible, setIsPostModalVisible] = useState(false);

  const [isDraftModalVisible, setIsDraftModalVisible] = useState(false);
  
  const [postContainer, setPostContainer] = useState(null);

  const [draftContainer, setDraftContainer] = useState(null);
  
  const [mapPost, setMapPost] = useState(null);

  const [mapDraft, setMapDraft] = useState(null);

  const handlePostModalOk = () => {
    setIsPostModalVisible(false);
  };

  const handlePostModalCancel = () => {
    setIsPostModalVisible(false);
  };

  const handleDraftModalOk = () => {
    setIsDraftModalVisible(false);
  };

  const handleDraftModalCancel = () => {
    setIsDraftModalVisible(false);
    blogContentRef.current = <div></div>
  };

  const [isWeb, setIsWeb] = useState(false)

  const [isDraftWeb, setIsDraftWeb] = useState(false)

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setPostContainer({
        ...postContainer,
        image: info.file.originFileObj
      });
      setIsWeb(true)
    }
  };

  const handleDraftChange = info => {
    if (info.file.status === 'uploading') {
      setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setDraftContainer({
        ...draftContainer,
        image: info.file.originFileObj
      });
      setIsDraftWeb(true)
    }
  };

  const { loading, imageUrl } = state;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  const trashPost = async(id) => {
    try {
      const res = await blogServices.deletePost({
        post_id: id
      })
      if (res?.status === STATUS_CODE.SUCCESS) {
        message.success("Post deleted successfully", 3)
        setBlogPostUpdate(true)
      }
    }catch(err){
      const refresh = await authService.refreshToken({})
      if (res?.status === STATUS_CODE.SUCCESS) {
        message.success("Post deleted successfully", 3)
        setBlogPostUpdate(true)
      }
    }
  }

  const trashDraft = async(id) => {
    try {
      const res = await blogServices.deleteDraft({
        draft_id: id
      })
      if (res?.status === STATUS_CODE.SUCCESS) {
        message.success("Draft deleted successfully", 3);
        setBlogDraftUpdate(true)
      }
    }catch(err){
      const refresh = await authService.refreshToken({})
      const res = await blogServices.deleteDraft({
        draft_id: id
      })
      if (res?.status === STATUS_CODE.SUCCESS) {
        message.success("Draft deleted successfully", 3);
        setBlogDraftUpdate(true)
      }
    }
  }

  const editPost = (post) => {
    setIsPostModalVisible(true);
    setPostContainer(post)
  }

  const editDraft = (draft) => {
    setIsDraftModalVisible(true);
    setDraftContainer(draft)
  }

  const viewPost = (post) => {
    dispatch(previewBlogAction(post))
    router.push("/preview-post")
  }

  const saveDraftPost = async() => {
    const today = new Date();
    const formatDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const title = (postContainer.title).trim();
    const formData = new FormData()
    formData.append("title", title)
    formData.append("blog", postContainer.blog)

    if (typeof postContainer.image === "blob"){
      formData.append("image", postContainer.image)
    }
    else {
      const img = "/posts/" + postContainer.image.slice(13,postContainer.image.length)
      formData.append("image", img)
    }
    formData.append("time_created", formatDate)
    formData.append("id", postContainer.id)
    try {
      const res = await blogServices.createDraft(formData);
      if (res?.status === STATUS_CODE.SUCCESS){
        message.success("Draft Created successfully", 3);
        setIsPostModalVisible(false);
        setType({...type, post:false, draft: true})
        setBlogPostUpdate(true)
      }
    }catch(err){
      const refresh = await authService.refreshToken({})
      const res = await blogServices.createDraft(formData);
      if (res?.status === STATUS_CODE.SUCCESS){
        message.success("Draft Created successfully", 3);
        setIsPostModalVisible(false);
        setType({...type, post:false, draft: true})
        setBlogPostUpdate(true)
      }
    }
  }

  const cleanDate = (date) => {
    const splittedDate = date.split(",")
    const splitDayMonth = splittedDate[0].split(" ")
    const day = parseInt(splitDayMonth[0][1]) ? splitDayMonth[0].slice(0, 2) : splitDayMonth[0][0]
    let month = splitDayMonth[1].trim()
    const months = ["January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"]
    month = months.indexOf(month) + 1
    const year = splittedDate[1].trim()
    
    return `${year}-${month}-${day}`
  }

  const saveDraft = async() => {
    const cleanedDate = cleanDate(draftContainer.time_created)
    const title = (draftContainer.title).trim();
    const formData = new FormData()
    formData.append("title", title)
    formData.append("blog", draftContainer.blog)
    if (typeof draftContainer.image === "blob"){
      formData.append("image", draftContainer.image)
      console.log("yes")
    }
    else {
      const img = "/posts/" + draftContainer.image.slice(13,draftContainer.image.length)
      console.log("no")
      formData.append("image", img)
    }
    formData.append("time_created", cleanedDate)
    formData.append("id", draftContainer.id)
    try {
      const res = await blogServices.updateDraft(formData);
      if (res?.status === STATUS_CODE.SUCCESS){
        message.success("Draft updated successfully", 3);
        setBlogDraftUpdate(true)
        setIsDraftModalVisible(false);
      }
    }catch(err){
      const refresh = await authService.refreshToken({})
      const res = await blogServices.updateDraft(formData);
      if (res?.status === STATUS_CODE.SUCCESS){
        message.success("Draft updated successfully", 3);
        setBlogDraftUpdate(true)
        setIsDraftModalVisible(false);
      }
    }
  }

  const previewSingleBlog = () => {
    dispatch(previewBlogAction(postContainer))
    router.push("/preview-post")
  };

  const previewDraftSingleBlog = () => {
    dispatch(previewBlogAction(draftContainer))
    router.push("/preview-post")
  };

  const publishDraft = async() => {
    const cleanedDate = cleanDate(draftContainer.time_created)
    const title = (draftContainer.title).trim();
    const formData = new FormData()
    formData.append("title", title)
    formData.append("blog", draftContainer.blog)
    if (typeof draftContainer.image === "blob"){
      formData.append("image", draftContainer.image)
    }
    else {
      const img = "/posts/" + draftContainer.image.slice(13,draftContainer.image.length)
      formData.append("image", img)
    }
    formData.append("time_created", cleanedDate)
    formData.append("id", draftContainer.id)
    try {
      const res = await blogServices.updateDraft(formData);
      if (res?.status === STATUS_CODE.SUCCESS){
        message.success("Draft updated successfully", 3);
      }
    }catch(err){
      const refresh = await authService.refreshToken({})
      const res = await blogServices.updateDraft(formData);
      if (res?.status === STATUS_CODE.SUCCESS){
        message.success("Draft updated successfully", 3);
      }
    }

    try{
      const res = await blogServices.saveDraft({
        draft_id: draftContainer.id
      })

      if (res?.status === STATUS_CODE.SUCCESS){
        message.success("Post published successfully", 3);
        setBlogDraftUpdate(true);
        setIsDraftModalVisible(false);
      }
    }catch(err){
      const res = await blogServices.saveDraft({
        draft_id: draftContainer.id
      })

      if (res?.status === STATUS_CODE.SUCCESS){
        message.success("Post published successfully", 3);
        setBlogDraftUpdate(true);
        setIsDraftModalVisible(false);

      }
    }
  }

  useEffect(() => {

    let isDone = false

    const getData = async() => {
      try {
        const res = await blogServices.getPosts({})
        if (res?.status === STATUS_CODE.SUCCESS){
          for (const value of Object.entries(res?.data.data)){
            blogPost.push(value[1]);
          }

          setMapPost(blogPost.map((post) =>
              <div 
                className="flex md:w-full w-max shadow-md cursor-pointer border-2 rounded-md"
                key={post.id}
              >
                <div className="flex space-x-4 mt-3 mb-6 ml-2 w-full">
                  <Image
                    src={`${BACKEND_DOMAIN}${post.image}`}
                    width="60"
                    height="60"
                    className="rounded-md"
                  />
                  <div className="flex flex-col md:w-full w-1/2 h-10">
                    <h3 className="md:text-xl text-sm md:font-normal font-medium md:tracking-wide">
                      {post.title}
                    </h3>
                    <div className="flex md:space-x-3 space-x-2 md:space-y-1">
                      <span className="flex md:text-center mt-1 gap-1">
                        <ClockIcon className="md:h-4 md:w-4 h-3 w-3 text-center hover:text-primary" />
                        <p className="text-xs hidden md:block">{post.time_created}</p>
                      </span>

                      <span className="flex text-center mt-1 gap-1">
                        <EyeIcon className="md:h-4 md:w-4 h-3 w-3 text-center hover:text-primary" />
                        <p className="text-xs hidden md:block">{post.view}</p>
                      </span>

                      <span className="flex text-center mt-1 gap-1">
                        <CursorClickIcon className="md:h-4 md:w-4 h-3 w-3 text-center hover:text-primary" />
                        <p className="text-xs hidden md:block">{post.clicks}</p>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex md:ml-60 ml-20 md:mt-3 mt-5 mb-3 md:space-x-12 space-x-4 mr-3 p-2 w-1/2 md:w-full">
                  <span className="flex flex-col" onClick={() => viewPost(post)}>
                    <EyeIcon className="md:h-5 md:w-5 h-4 w-4 ml-1 hover:text-primary" />
                    <p className="hover:text-primary hidden md:block">View</p>
                  </span>

                  <span className="flex flex-col" onClick={() => editPost(post)}>
                    <PencilIcon className="md:h-5 md:w-5 h-4 w-4 hover:text-primary" />
                    <p className="hover:text-primary hidden md:block">Edit</p>
                  </span>

                  <span className="flex flex-col" onClick={() => trashPost(post.id)}>
                    <TrashIcon className="md:h-5 md:w-5 h-4 w-4 hover:text-primary" />
                    <p class="hover:text-primary hidden md:block">Delete</p>
                  </span>
                </div>
              </div>
          ))

          totalPublishedRef.current.innerText = blogPost.length

          if (type.post){
            totalContentRef.current.innerText = "Total of "+ blogPost.length + " posts";
          }

        }
      }catch(err){
        const refresh = await authService.refreshToken({})
        const res = await blogServices.getPosts({})
        if (res?.status === STATUS_CODE.SUCCESS){
          for (const value of Object.entries(res?.data.data)){
            blogPost.push(value[1]);
          }

          setMapPost(blogPost.map((post) =>
              <div 
                className="flex md:w-full w-max shadow-md cursor-pointer border-2 rounded-md"
                key={post.id}
              >
                <div className="flex space-x-4 mt-3 mb-6 ml-2 w-full">
                  <Image
                    src={`${BACKEND_DOMAIN}${post.image}`}
                    width="60"
                    height="60"
                    className="rounded-md"
                  />
                  <div className="flex flex-col md:w-full w-1/2 h-10">
                    <h3 className="md:text-xl text-sm md:font-normal font-medium md:tracking-wide">
                      {post.title}
                    </h3>
                    <div className="flex md:space-x-3 space-x-2 md:space-y-1">
                      <span className="flex md:text-center mt-1 gap-1">
                        <ClockIcon className="md:h-4 md:w-4 h-3 w-3 text-center hover:text-primary" />
                        <p className="text-xs hidden md:block">{post.time_created}</p>
                      </span>

                      <span className="flex text-center mt-1 gap-1">
                        <EyeIcon className="md:h-4 md:w-4 h-3 w-3 text-center hover:text-primary" />
                        <p className="text-xs hidden md:block">{post.view}</p>
                      </span>

                      <span className="flex text-center mt-1 gap-1">
                        <CursorClickIcon className="md:h-4 md:w-4 h-3 w-3 text-center hover:text-primary" />
                        <p className="text-xs hidden md:block">{post.clicks}</p>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex md:ml-60 ml-20 md:mt-3 mt-5 mb-3 md:space-x-12 space-x-4 mr-3 p-2 w-1/2 md:w-full">
                  <span className="flex flex-col" onClick={() => viewPost(post)}>
                    <EyeIcon className="md:h-5 md:w-5 h-4 w-4 ml-1 hover:text-primary" />
                    <p className="hover:text-primary hidden md:block">View</p>
                  </span>

                  <span className="flex flex-col" onClick={() => editPost(post)}>
                    <PencilIcon className="md:h-5 md:w-5 h-4 w-4 hover:text-primary" />
                    <p className="hover:text-primary hidden md:block">Edit</p>
                  </span>

                  <span className="flex flex-col" onClick={() => trashPost(post.id)}>
                    <TrashIcon className="md:h-5 md:w-5 h-4 w-4 hover:text-primary" />
                    <p class="hover:text-primary hidden md:block">Delete</p>
                  </span>
                </div>
              </div>
          ))

          totalPublishedRef.current.innerText = blogPost.length

          if (type.post){
            totalContentRef.current.innerText = "Total of " + blogPost.length + " posts";
          }
        }
      }

      try {
        const res = await blogServices.getAllDrafts({})
        if (res?.status === STATUS_CODE.SUCCESS){
          for (const value of Object.entries(res?.data.data)){
            blogDraft.push(value[1]);
          }

          setMapDraft(blogDraft.map((draft) =>
              <div 
                className="flex md:w-full w-max shadow-md cursor-pointer border-2 rounded-md"
                key={draft.id}
              >
                <div className="flex space-x-4 mt-3 mb-6 ml-2 w-full">
                  <Image
                    src={`${BACKEND_DOMAIN}${draft.image}`}
                    width="60"
                    height="60"
                    className="rounded-md"
                  />
                  <div className="flex flex-col md:w-full w-1/2 h-10">
                    <h3 className="md:text-xl text-sm md:font-normal font-medium md:tracking-wide">
                      {draft.title}
                    </h3>
                    <div className="flex md:space-x-3 space-x-2 md:space-y-1">
                      <span className="flex md:text-center mt-1 gap-1">
                        <ClockIcon className="md:h-4 md:w-4 h-3 w-3 text-center hover:text-primary" />
                        <p className="text-xs hidden md:block">{draft.time_created}</p>
                      </span>

                    </div>
                  </div>
                </div>

                <div className="flex md:ml-60 ml-20 md:mt-3 mt-5 mb-3 md:space-x-12 space-x-4 mr-3 p-2 w-1/2 md:w-full">
                  <span className="flex flex-col" onClick={() => editDraft(draft)}>
                    <PencilIcon className="md:h-5 md:w-5 h-4 w-4 hover:text-primary" />
                    <p className="hover:text-primary hidden md:block">Edit</p>
                  </span>

                  <span className="flex flex-col" onClick={() => trashDraft(draft.id)}>
                    <TrashIcon className="md:h-5 md:w-5 h-4 w-4 hover:text-primary" />
                    <p class="hover:text-primary hidden md:block">Delete</p>
                  </span>
                </div>
              </div>
          ))

          totalDraftRef.current.innerText = blogDraft.length

          if (!type.post){
            totalContentRef.current.innerText = "Total of " + blogDraft.length + " drafts";
          }

        }
      }catch(err){
        const refresh = await authService.refreshToken({})
        const res = await blogServices.getAllDrafts({})
        if (res?.status === STATUS_CODE.SUCCESS){
          for (const value of Object.entries(res?.data.data)){
            blogDraft.push(value[1]);
          }

          setMapDraft(blogDraft.map((draft) =>
              <div 
                className="flex md:w-full w-max shadow-md cursor-pointer border-2 rounded-md"
                key={draft.id}
              >
                <div className="flex space-x-4 mt-3 mb-6 ml-2 w-full">
                  <Image
                    src={`${BACKEND_DOMAIN}${draft.image}`}
                    width="60"
                    height="60"
                    className="rounded-md"
                  />
                  <div className="flex flex-col md:w-full w-1/2 h-10">
                    <h3 className="md:text-xl text-sm md:font-normal font-medium md:tracking-wide">
                      {draft.title}
                    </h3>
                    <div className="flex md:space-x-3 space-x-2 md:space-y-1">
                      <span className="flex md:text-center mt-1 gap-1">
                        <ClockIcon className="md:h-4 md:w-4 h-3 w-3 text-center hover:text-primary" />
                        <p className="text-xs hidden md:block">{draft.time_created}</p>
                      </span>

                    </div>
                  </div>
                </div>

                <div className="flex md:ml-60 ml-20 md:mt-3 mt-5 mb-3 md:space-x-12 space-x-4 mr-3 p-2 w-1/2 md:w-full">
                  <span className="flex flex-col" onClick={() => editPost(draft)}>
                    <PencilIcon className="md:h-5 md:w-5 h-4 w-4 hover:text-primary" />
                    <p className="hover:text-primary hidden md:block">Edit</p>
                  </span>

                  <span className="flex flex-col" onClick={() => trashDraft(draft.id)}>
                    <TrashIcon className="md:h-5 md:w-5 h-4 w-4 hover:text-primary" />
                    <p class="hover:text-primary hidden md:block">Delete</p>
                  </span>
                </div>
              </div>
          ))

          totalDraftRef.current.innerText = blogDraft.length

          if (!type.post){
            totalContentRef.current.innerText = "Total of " + blogDraft.length + " drafts";
          }
        }
      }
    }

    if (!(isDone)) {
      getData();
    }

    return () => {
      isDone = true
      setBlogPostUpdate(false)
      setBlogDraftUpdate(false)
    }
  }, [blogPostUpdate, blogDraftUpdate, type])
  

  return (
    <>
      <div className=" bg-white w-full h-full">
        <div className="flex py-1 mt-6 gap-80 ml-14 w-5/6">
          <p className="md:text-3xl text-xl transform-translate-y-2 w-fit">
            Posts
          </p>

          <div className="border-2 border-gray-400 rounded overflow-hidden flex ml-80 space-x-10">
            <button className="flex items-center justify-center px-4 border-l">
              <SearchIcon className="h-5 w-5 text-purple-400" />
              <input type="text" className="py-2 ml-3" placeholder="Search" />
            </button>
          </div>
        </div>
        <div className="shadow-2xl md:w-5/6 w-fit ml-14 bg-white rounded-md">
          <div className="md:ml-14 ml-1 mt-1">
            <h3 className="text-xl text-gray-600 font-medium ml-2 mt-3">
              Recent Posts
            </h3>
            <div className="flex w-full">
              <div className="flex md:space-x-4 space-x-2 mt-3 mb-3 ml-2 md:w-full w-fit">
                <button 
                  className="flex border-2 border-gray-700 md:text-center md:space-x-8 space-x-1 rounded-md p-2 md:w-4/12 w-fit h-10"
                  onClick={() => setType({...type, post:true, draft: false})}
                >
                  <p className="md:text-base text-sm">Published</p>
                  <span ref={totalPublishedRef} className="border border-gray-700 md:w-6 md:h-6 w-5 h-5 md:text-sm text-xs text-center rounded-full">
                    10
                  </span>
                </button>
                <button 
                  className="flex shadow shadow-gray-600 text-center md:text-base text-sm md:space-x-12 space-x-2 rounded-md p-2 md:w-4/12 w-fit h-10"
                  onClick={() => setType({...type, post:false, draft: true})}
                >
                  <p className="md:text-base text-sm">Drafted</p>
                  <span ref={totalDraftRef} className="border border-gray-700 md:w-6 md:h-6 w-5 h-5 text-center rounded-full">
                    0
                  </span>
                </button>
              </div>

              <Link href="/dashboard/new-post">
                <button className="flex shadow text-center shadow-gray-600 md:ml-60 ml-44 mt-3 mb-3 bg-primary text-white space-x-2 rounded-md md:mr-3 mr-1 p-2 md:w-2/5 w-fit md:h-10" style={{marginLeft: "1rem"}}>
                  <span>
                    <PencilIcon className="md:ml-2 md:h-6 md:w-6 h-5 w-5" />
                  </span>
                  <p className="md:text-right hidden md:block">Add new post</p>
                </button>
              </Link>
            </div>

            {/* Blog cards */}
            <div style={{overflowY: "scroll", maxHeight: "55vh"}}>
              {type.post ? mapPost : mapDraft}
            </div>

            <div className="flex">
              <div className="flex space-x-4 mt-3 mb-3 md:ml-0 ml-2 w-full">
                <h3 ref={totalContentRef} className="flex md:text-left md:text-sm text-xs space-x-8 rounded-md p-2 md:w-1/2 w-full h-10">
                 Total of 0 entities
                </h3>
              </div>

              {/* <div className="flex ml-40 mt-5 mb-3 mr-3 gap-1">
                <button className="md:text-sm text-xs text-center p-2 py-1 h-7 bg-primary text-white rounded-md">
                  Previous
                </button>
                <button className="md:text-sm text-xs text-center p-2 py-1 h-7 bg-primary text-white rounded-md">
                  1
                </button>
                <button className="md:text-sm text-xs text-center p-2 py-1 h-7 bg-primary text-white rounded-md">
                  Next
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex mt-6 shadow-2xl w-4/5 ml-14 space-x-18 bg-white rounded-md"></div>
      </div>
      <Modal 
        title="Edit Post" 
        visible={isPostModalVisible} 
        onOk={handlePostModalOk} 
        onCancel={handlePostModalCancel}
        footer={null}
      > 
        <Input 
          type="text" 
          ref={titleRef}
          value={postContainer ? postContainer.title : ''}
          onChange={handleChangeInput}
          name="title"
          placeholder="Add Post Title" 
          className="post-title-input"
        />

        <div className="create-space"></div>
        
        {postContainer ? 
        <>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {<img src={isWeb ? URL.createObjectURL(postContainer.image) : `${BACKEND_DOMAIN}${postContainer.image}`} alt="avatar" style={{ width: '100%' }} />}<br/>
          </Upload>
        </>
        :
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          action="https://hotlarva.com/new-post"
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        } 
        <div className="flex flex-col">
          <div className="h-96 max:w-max w-fit md:ml-8">
            <ReactQuill 
              theme="snow" 
              modules={modules} 
              formats={formats}
              value={postContainer ? postContainer.blog : ''}
              onChange={setQuill}
            />
          </div>
          <div className="create-space"></div>
          <div className="flex md:mt-14 mt-32 md:ml-8 ml-3 space-x-4">
            <button 
              className="shadow shadow-gray-400 text-center p-2 rounded-md"
              onClick={saveDraftPost}
            >
              Save draft
            </button>
            <button 
              className="shadow shadow-gray-400 text-center p-2 rounded-md"
              onClick={previewSingleBlog}
            >
              Preview
            </button>
            <button 
              className="shadow shadow-gray-400 text-center bg-primary text-white p-2 rounded-md"
              onClick={updatePost}
            >
              Publish
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        title="Edit Draft" 
        visible={isDraftModalVisible} 
        onOk={handleDraftModalOk} 
        onCancel={handleDraftModalCancel}
        footer={null}
      > 
        <Input 
          type="text" 
          ref={titleRef}
          value={draftContainer ? draftContainer.title : ''}
          onChange={handleDraftChangeInput}
          name="title"
          placeholder="Add Post Title" 
          className="post-title-input"
        />

        <div className="create-space"></div>
        
        {draftContainer ? 
        <>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleDraftChange}
          >
            {<img src={isDraftWeb ? URL.createObjectURL(draftContainer.image) : `${BACKEND_DOMAIN}${draftContainer.image}`} alt="avatar" style={{ width: '100%' }} />}<br/>
          </Upload>
        </>
        :
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleDraftChange}
          action="https://hotlarva.com/new-post"
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        } 
        <div className="flex flex-col">
          <div className="h-96 max:w-max w-fit md:ml-8">
            <ReactQuill 
              theme="snow" 
              modules={modules} 
              formats={formats}
              value={draftContainer ? draftContainer.blog : ''}
              onChange={setDraftQuill}
            />
          </div>
          <div className="create-space"></div>
          <div className="flex md:mt-14 mt-32 md:ml-8 ml-3 space-x-4">
            <button 
              className="shadow shadow-gray-400 text-center p-2 rounded-md"
              onClick={saveDraft}
            >
              Save draft
            </button>
            <button 
              className="shadow shadow-gray-400 text-center p-2 rounded-md"
              onClick={previewDraftSingleBlog}
            >
              Preview
            </button>
            <button 
              className="shadow shadow-gray-400 text-center bg-primary text-white p-2 rounded-md"
              onClick={publishDraft}
            >
              Publish
            </button>
          </div>
        </div>
      </Modal>
    </>
    
  );
};

export default Post;
