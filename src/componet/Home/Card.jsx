import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Modal } from 'react-bootstrap';
import { MdDeleteSweep, MdReadMore, MdContentCopy } from "react-icons/md";
import { motion } from "framer-motion";
import { truncate } from '../utile';
import { CiBookmark } from "react-icons/ci";
import { notification } from "antd";

function Card(props) {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Function to calculate text size in MB
    const getTextSizeInMB = (text) => {
        const textSizeInBytes = new TextEncoder().encode(text).length;
        const sizeInMB = textSizeInBytes / (1024 * 1024); // Convert bytes to MB
        return sizeInMB.toFixed(2); // Return size with 2 decimal places
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get("https://6620d6863bf790e070b0dea1.mockapi.io/records/Blogs")
            .then((res) => {
                // Add the `mb` field to each blog based on the description size
                const blogsWithMB = res.data.map(blog => ({
                    ...blog,
                    mb: getTextSizeInMB(blog.describe) // Calculate the size of the description
                }));
                setBlogs(blogsWithMB);
            })
            .catch((err) => console.log(err));
    };

    const deleteBlog = (id) => {
        axios
            .delete(`https://6620d6863bf790e070b0dea1.mockapi.io/records/Blogs/${id}`)
            .then((res) => {
                console.log(res);
                fetchData();
                notification.error({ message: "Blog deleted successfully" });
            })
            .catch((err) => console.log(err));
    };

    const copyTextToClipboard = () => {
        if (selectedBlog) {
            const fullText = `${selectedBlog.title}:\n\n${selectedBlog.describe}`;
            navigator.clipboard.writeText(fullText).then(() => {
                notification.success({ message: "Blog copied to clipboard!" });
            }).catch(err => {
                notification.error({ message: "Failed to copy blog" });
                console.error(err);
            });
        }
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
                                    <div className="icon-box" onClick={() => deleteBlog(blog.id)}>
                                        <MdDeleteSweep />
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
                                        <p>{blog.mb} MB</p>
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
                                <h3>{selectedBlog && selectedBlog.title}:</h3>
                                <span className="copy-icon" onClick={copyTextToClipboard}>
                                    <MdContentCopy />
                                </span>
                            </div>

                            <p style={{ whiteSpace: 'pre-wrap' }}>
                                {selectedBlog && selectedBlog.describe}
                            </p>
                            <h5>Written by~{selectedBlog && selectedBlog.name}</h5>

                            <div className="flex">
                                <p>{selectedBlog && selectedBlog.mb} MB</p>
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
