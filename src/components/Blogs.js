import axios from 'axios';
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import RenderCard from './RenderCard';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {

        axios.get("https://memoirsbackend.herokuapp.com/blog/getblogs").then((res) => {
            setBlogs(res.data.blogs);
        })
            .catch((e) => {
                alert("Something went wrong");
            });

    }, [])

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {
                blogs.map((blog ,index)=>{
                    return <RenderCard blog = {blog} key={index}/>
                })
            }
        </div>

    )
}

export default Blogs
