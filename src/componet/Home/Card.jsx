
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Modal } from 'react-bootstrap';
import { MdDeleteSweep, MdReadMore } from "react-icons/md";
import { motion } from "framer-motion";
import { truncate } from '../utile';
import { CiBookmark } from "react-icons/ci";
import {  toast } from 'react-toastify';
import {notification} from "antd";



function Card(props) {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get("https://6620d6863bf790e070b0dea1.mockapi.io/records/Blogs")
            .then((res) => {
                setBlogs(res.data);
            })
            .catch((err) => console.log(err));
    };

    const deleteBlog = (id) => {
        axios
            .delete(`https://6620d6863bf790e070b0dea1.mockapi.io/records/Blogs/${id}`)
            .then((res) => {
                console.log(res);
                fetchData();
                notification.error({message:"Blog deleted successfully"})

            })
            .catch((err) => console.log(err));
    };

    const handleOpenModal = (blog) => {
        setSelectedBlog(blog);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Container>
                <Row>
                    {blogs.map((blog, index) => (
                        <motion.div drag dragConstraints={props.reference} className="cards" key={index}>
                            <div className="div">
                                <div className="upper-card">
                                    <div className="icon-box">
                                        <div className="img-out">
                                            <img src={blog.avatar} alt="" />
                                        </div>
                                    </div>
                                    <div className="icon-box"  onClick={() => deleteBlog(blog.id)} >
                                        <MdDeleteSweep onClick={notify} />
                                    </div>
                                </div>
                                <div className="upper-card flex">
                                    <div className='name'>
                                        <p>~ {blog.name}</p>
                                    </div>
                                </div>
                                <div className="mid-box">
                                    <p className='title'>{blog.title}:</p>
                                    <p>{blog.describe ? truncate(blog.describe, 100) : ''}</p>
                                </div>
                                <div className="upper-card">
                                    <div className="md under">
                                        <p>{blog.mb}.mb</p>
                                    </div>
                                    <div className="date under">
                                        <p>last updated ~{blog.date}</p>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => handleOpenModal(blog)}><MdReadMore /> </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </Row>
            </Container>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="dov">
                        <div className='upper-img'>
                          <img src={selectedBlog && selectedBlog.avatar} alt="" /> 
                        </div>
                        <div className="detaill">
                            <div className="flex">
                                <h3>`{selectedBlog && selectedBlog.title}:</h3>
                                <span className='isnaa'><CiBookmark /></span>
                            </div>

                            <p>{selectedBlog && selectedBlog.describe}</p>
                            <h5>Written by~{selectedBlog && selectedBlog.name}</h5>

                            <div className="flex">

                                <p>{selectedBlog && selectedBlog.mb}.mb</p>
                                <h6>last updated ~{selectedBlog && selectedBlog.date}</h6>


                            </div>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </div>
    );
}

export default Card;
