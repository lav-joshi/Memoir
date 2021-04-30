import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Loader from './Loader';

import "bootstrap/dist/css/bootstrap.min.css";
import RenderCard from './RenderCard';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [hasLoaded , sethasLoaded] = useState(false);
    useEffect(() => {

        axios.get("https://memoirsbackend.herokuapp.com/blog/getblogs").then((res) => {
            sethasLoaded(true);
            setBlogs(res.data.blogs);
        }).catch((e) => {
                alert("Something went wrong");
        });

    }, [])

    return (
       <>
       {
          hasLoaded ? <div className="row row-cols-1 row-cols-md-3 g-4">
          {
              blogs.map((blog ,index)=>{
                  return <RenderCard blog = {blog} key={index}/>
              })
          }
         </div> : <Loader type="getting blog"/>
       }
        </>

    )
}

export default Blogs
