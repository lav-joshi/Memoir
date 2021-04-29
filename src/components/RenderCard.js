import React , {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import parse from 'html-react-parser';

import '../App.css';

const RenderCard = ({blog}) => {
    const [show, setShow] = useState(false);
    const [desc , setDesc] = useState("");

    useEffect(()=>{
        var html = blog.description;
        var res = html.replace("<img ", "<img align='center' ");
        setDesc(res);
    },[])

    return (
    <>
        <div className="col "  >
            <div className="card">
                <img onClick={() => setShow(true)} style={{ "height": "300px", "width": "400" }} src={blog.imageURL} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text float-end">                   ~ {blog.name}</p>
                </div>
            </div>
        </div>

        <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="my-modal"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {blog.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{parse(desc)}</p>
        </Modal.Body>
      </Modal>

    </>
    )
}

export default RenderCard
