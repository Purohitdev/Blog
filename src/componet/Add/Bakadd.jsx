import React, { useRef, useState } from 'react'
import { Formik } from 'formik';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function Bakadd() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);


  

    return (
        

        <div className='showw new'>
            <div className='form'>


                <h1>ADD BLOG</h1>

                <Formik
                    initialValues={{ name: '', title: '', mb: '', date: '', describe: '', avatar: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'name Required';
                        }
                        if (!values.title) {
                            errors.title = 'title Required';
                        }
                        if (!values.mb) {
                            errors.mb = 'mb Required';
                        }
                        if (!values.date) {
                            errors.date = 'date Required';
                        }
                        if (!values.describe) {
                            errors.describe = 'describe Required';
                        }
                        if (!values.avatar) {
                            errors.avatar = 'image Required';
                        }

                        // if(values.avatar && values.describe && values.date && values.mb && values.title && values.name && bu ){
                        //     toast.success("Blog Successfully Added!");
                        //     console.log("click")

                        // }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {


                        setTimeout(() => {
                            axios
                                .post(
                                    // "https://6620d6863bf790e070b0dea1.mockapi.io/records/Blogs",
                                    // formdata
                                    "https://6620d6863bf790e070b0dea1.mockapi.io/records/Blogs",
                                    values
                                )
                                .then((res) => {
                                    console.log(res);
                                    setSubmitting(false);
                                    toast.success("Blog Successfully Added!");
                                    



                                    
                                    navigate("/");
                                    


                                })
                                .catch((err) => console.log(err));
                        }, 400);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
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


                            <div className="flex">

                                <div className='full'>
                                    <input
                                        placeholder='Blog mb'
                                        type="number"
                                        name="mb"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.mb}
                                    />
                                    <p className='err'>  ~ {errors.mb && touched.mb && errors.mb}</p>

                                </div>

                                <div className="full">
                                    <input
                                        placeholder='date'
                                        type="month"
                                        name="date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.date}
                                    />
                                    <p className='err'> ~{errors.date && touched.date && errors.date}</p>
                                </div>

                            </div>

                            <div className="full">

                                <textarea
                                    placeholder='describe'
                                    type="text"
                                    name="describe"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.describe}
                                />
                                <p className='err'> ~{errors.describe && touched.describe && errors.describe}</p>

                            </div>
                            <div className="flex">

                                <div className="full">
                                    <input
                                        placeholder='image(url)'
                                        type="text"
                                        name="avatar"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.avatar}
                                    />
                                    <p className='err'> ~{errors.avatar && touched.avatar && errors.avatar}</p>
                                </div>
                                <div className='full buttt'>

                                    <button type="submit" >
                                        submit blog
                                    </button>
                                 
                                </div>
                                
                            </div>
                            

                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Bakadd
