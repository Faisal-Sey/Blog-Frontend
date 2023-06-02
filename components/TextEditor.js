import { useEffect, useRef, useState } from "react";
import { Input, message, Upload, Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import dynamic from "next/dynamic";
import { useQuill } from "react-quilljs";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import authService from '../services/authServices'
import blogServices from "../services/blogServices";
import { useDispatch, useSelector } from "react-redux";
import { STATUS_CODE } from "../utils/systemSettings";
import { previewBlogAction } from '../redux/actions/previewBlogAction';
import { useRouter } from "next/router";

function App() {
  const { quill, quillRef } = useQuill();

  const dispatch = useDispatch();

  const [state, setState] = useState({loading: false});

  const titleRef = useRef(null);

  const [blogImage, setBlogImage] = useState({
    image: null
  })

  const [isWeb, setIsWeb] = useState(false)

  const router = useRouter();

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
      setBlogImage({
        ...blogImage,
        image: info.file.originFileObj
      });
      setIsWeb(true)
    }
  };

  const { loading, imageUrl } = state;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const saveDraft = async() => {
    const today = new Date();
    const formatDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const title = (titleRef.current.input.value).trim();
    const formData = new FormData()
    formData.append("title", title)
    formData.append("blog", quill.root.innerHTML)
    formData.append("image", blogImage.image)
    formData.append("time_created", formatDate)
    try {
      const res = await blogServices.createDraft(formData);
      if (res?.status === STATUS_CODE.SUCCESS){
        message.success("Draft Created successfully", 3);
        router.push('/dashboard/posts')
      }
    }catch(err){
      const refresh = await authService.refreshToken({})
      const res = await blogServices.createDraft(formData);
      if (res?.status === STATUS_CODE.SUCCESS){
        message.success("Draft Created successfully", 3);
        router.push('/dashboard/posts')
      }
    }
  }
  

  const previewSingleBlog = async() => {
    const today = new Date();
    const formatDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const title = (titleRef.current.input.value).trim();
    if (title) {
      if (quill && (quill.getText()).trim()) {
        if (blogImage.image){
          const formData = new FormData()
          formData.append("title", title)
          formData.append("blog", quill.root.innerHTML)
          formData.append("image", blogImage.image)
          formData.append("time_created", formatDate)
          try {
            const res = await blogServices.addPreview(formData);
            if (res?.status === STATUS_CODE.SUCCESS){
              window.open(`http://127.0.0.1:3000/preview-single`, "_blank");
            }
          }catch(err){
            const refresh = await authService.refreshToken({})
            const res = await blogServices.addPreview(formData);
            if (res?.status === STATUS_CODE.SUCCESS){
              window.open(`http://127.0.0.1:3000/preview-single/`, "_blank");
            }
          }

        }else {message.error("Post image cannot be empty", 3)};
      }else {message.error("Post content cannot be empty", 3)};
    }else {message.error("Add Post title", 3)}
  }

  

  const getInnerContent = async() => {
    const today = new Date();
    const formatDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const title = (titleRef.current.input.value).trim();
    if (title) {
      if (quill && (quill.getText()).trim()) {
        if (blogImage.image){
          const formData = new FormData()
          formData.append("title", title)
          formData.append("blog", quill.root.innerHTML)
          formData.append("image", blogImage.image)
          formData.append("time_created", formatDate)
          try {
            const res = await blogServices.createPost(formData);
            if (res?.status === STATUS_CODE.SUCCESS){
              message.success("Post Created successfully", 3);
              router.push('/dashboard/posts')
            }
          }catch(err){
            const refresh = await authService.refreshToken({})
            const res = await blogServices.createPost(formData);
            if (res?.status === STATUS_CODE.SUCCESS){
              message.success("Post Created successfully", 3);
              router.push('/dashboard/posts')
            }
          }
        }else {message.error("Post image cannot be empty", 3)};
      }else {message.error("Post content cannot be empty", 3)};
    }else {message.error("Add Post title", 3)}
  }


  return (
    <>
    <Input 
      type="text" 
      ref={titleRef}
      placeholder="Add Post Title" 
      className="post-title-input"
    />

    <div className="create-space"></div>
    <div className="new-post-upload-button">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        action="/api/upload"
      >
        {blogImage.image ? <img src={URL.createObjectURL(blogImage.image)} alt="avatar" style={{ width: '100%' }} /> : uploadButton}    
        
      </Upload>
    </div>

    <div className="flex flex-col">
      <div className="h-96 max:w-max w-fit md:ml-8">
        <div ref={quillRef} />
      </div>

      <div className="flex md:mt-14 mt-32 md:ml-8 ml-3 space-x-4">
        <button 
          className="shadow shadow-gray-400 text-center p-2 rounded-md"
          onClick={saveDraft}
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
          onClick={getInnerContent}
        >
          Publish
        </button>
      </div>
    </div>
    </>
  );
}

export default App;
