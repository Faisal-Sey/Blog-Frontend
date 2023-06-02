import React, { useEffect, useRef } from 'react';
import { parse } from 'node-html-parser';

export default function BlogContent({postBlog}) {

    const blogContentRef = useRef(null)

    useEffect(() => {
        blogContentRef.current.innerHTML = parse(postBlog ? postBlog : '').innerHTML
    }, [postBlog])
    

    return (
        <span ref={blogContentRef}></span>
    )
}