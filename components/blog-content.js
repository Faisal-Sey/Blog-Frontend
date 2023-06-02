import React, { useEffect, useRef } from 'react';
import { parse } from 'node-html-parser';
import 'react-quill/dist/quill.snow.css';

export default function BlogContent({postBlog}) {

    const blogContentRef = useRef(null)

    useEffect(() => {
        blogContentRef.current.innerHTML = parse(postBlog ? postBlog : '').innerHTML
    }, [postBlog])
    

    return (
        <span ref={blogContentRef}></span>
    )
}