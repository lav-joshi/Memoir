import axios from 'axios';
import React, { useState } from 'react';
import RichText from './RichText';
import Cookies from 'universal-cookie';
import Loader from './Loader';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();

const createHeader = (token) => {
    const authAxios = axios.create({
        baseURL: "https://memoirsbackend.herokuapp.com/",
        headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
            "Content-Type" : 'application/json'
        }
    });

    return authAxios;
}



const AddBlog = () => {


    const notify = (msg,type)=>{

        if(type ==="success"){
            toast.success(msg, {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
            });
        }else if(type==="error"){
            toast.error(msg, {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
            });
        }
     
    }

    const [isLoading , setisLoading] = useState(false);
    const [hasLoaded , sethasLoaded] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [base64decoded , setBAse64Decoded] = useState("");
    const [file, setFile] = useState();

    const handleTitleInput = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionInput = (desc) => {
        setDescription(desc);
    }

    const handleFileInput = (event) => {
        const selectedfile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(selectedfile);
        reader.onloadend = () => {
           setBAse64Decoded(JSON.stringify({ data: reader.result }));
           setFile(selectedfile);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sethasLoaded(false);
        if (cookies.get("token")) {

            const x = {
                title, 
                description,
                data : base64decoded
            }
         
            createHeader(cookies.get("token")).post("/blog/addblog", x).then((res) => {
                notify("Successfully Posted" , "success");
                setTitle("");
                setDescription("");
                setFile();
                setBAse64Decoded()
                sethasLoaded(true);
            }).catch((e) => {
                notify("Something went wrong" , "error");
                sethasLoaded(true);
            })
        } else {
            notify("Not allowed to add Blog , Log in first" , "error");
            sethasLoaded(true);
        }

    }


    return (
        <>
        {
          hasLoaded ? 
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label"><b>TITLE</b></label>
                  <input type="text" onChange = {handleTitleInput} value ={title} className="form-control" id="exampleFormControlInput1" placeholder="Title of your blog" requires />
              </div>
              <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label"><b>Choose DP of your post 😉 </b> </label>
                  <input type="file" onChange = {handleFileInput}  className="form-control" id="exampleFormControlInput1" placeholder="Attach File" />
              </div>
              <div className="mb-3">
                  <label for="exampleFormControlTextarea1" className="form-label"> <b>Describe your blog 📚</b> </label>
                  <RichText  onDescriptionChange={(desc)=>handleDescriptionInput(desc)} />
              </div>
              <button type="submit" class="btn btn-primary" style={{"margin-bottom":10}}> Submit</button>
          </form>
          :<Loader/>  
        }
        
        <ToastContainer/>
        </>
    )
}

export default AddBlog
