import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

function Bakadd() {
    const navigate = useNavigate();
    
    // Handle textarea change to preserve tab spaces
    const handleTextareaChange = (e, handleChange) => {
        const value = e.target.value.replace(/\t/g, '    '); // Replace tabs with four spaces
        handleChange(e, value);
    };

    return (
        <div className='showw new'>
            <div className='form'>
                <h1>ADD BLOG</h1>
                <Formik
                    initialValues={{ name: '', title: '', describe: '', avatar: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.name.trim()) errors.name = 'Name Required';
                        if (!values.title.trim()) errors.title = 'Title Required';
                        if (!values.describe.trim()) errors.describe = 'Description Required';
                        if (!values.avatar.trim()) errors.avatar = 'Image URL Required';
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        const blogData = { ...values, date: new Date().toISOString().split('T')[0] };
                        axios.post("https://6620d6863bf790e070b0dea1.mockapi.io/records/Blogs", blogData)
                            .then(() => {
                                notification.success({ message: "Blog added successfully" });
                                navigate("/");
                            })
                            .catch(err => console.log(err))
                            .finally(() => setSubmitting(false));
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="flex">
                                <div className='full'>
                                    <input
                                        placeholder='Username'
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    <p className='err'> ~{errors.name && touched.name && errors.name}</p>
                                </div>
                                <div className='full'>
                                    <input
                                        placeholder='Blog title'
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                    />
                                    <p className='err'> ~{errors.title && touched.title && errors.title}</p>
                                </div>
                            </div>
                            <div className="full">
                                <textarea
                                    placeholder='Describe your blog'
                                    name="describe"
                                    onChange={(e) => handleTextareaChange(e, handleChange)}
                                    onBlur={handleBlur}
                                    value={values.describe}
                                    style={{ whiteSpace: "pre-wrap" }}
                                />
                                <p className='err'> ~{errors.describe && touched.describe && errors.describe}</p>
                            </div>
                            <div className="flex">
                                <div className="full">
                                    <input
                                        placeholder='Image URL'
                                        type="text"
                                        name="avatar"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.avatar}
                                    />
                                    <p className='err'> ~{errors.avatar && touched.avatar && errors.avatar}</p>
                                </div>
                                <div className='full buttt'>
                                    <button type="submit" disabled={isSubmitting}>
                                        Submit Blog
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Bakadd;
