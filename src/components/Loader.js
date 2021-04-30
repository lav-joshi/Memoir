import React from 'react'
import {Spinner} from 'react-bootstrap';
const Loader = ({type}) => {
    return (
        <div style={{ "align-items":"center" ,"display":"flex" ,"justify-content":"center" , "height":"400px" ,"width":"100%" }}>
            {
                type ==="addingblog" ?    <b style={{ "font-size":"30px" }}>
                Please wait while your blog is getting published &nbsp;
                </b> : null
            }         
            <div style={{ "font-size":"30px" }} > 
              <Spinner animation="grow" /><Spinner animation="grow" /><Spinner animation="grow" />
            </div>
        </div>
    )
}

export default Loader
