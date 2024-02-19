import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from "axios";
import { useParams } from 'react-router-dom';

const formvalidationSchema = yup.object({
    book_name: yup.string().required().min(4),
    book_count: yup.number().required(),
    author: yup.string().required().min(4),
    description: yup.string().required().min(5)
});

function AddBook() {
    const [isLoading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const myFormik = useFormik({
        initialValues: {
            book_name: "",
            book_count: "",
            author: "",
            description: ""
        },
        validationSchema: formvalidationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await axios.post(`https://638dfe2b4190defdb753283c.mockapi.io/books`, values);
                navigate("/portal/book");
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        },
    });

    return (
        <form className="container" onSubmit={myFormik.handleSubmit}>
            <div className="row mt-4 ps-5">
                <div className="col-lg-5  mt-5 m-auto">
                    <input
                        type="text"
                        className={`form-control ${myFormik.touched.book_name && myFormik.errors.book_name ? "is-invalid" : "is-valid"}`}
                        value={myFormik.values.book_name}
                        name="book_name"
                        placeholder="Enter Book Name"
                        onBlur={myFormik.handleBlur}
                        onChange={myFormik.handleChange}
                    />
                    <span style={{ color: "red", fontSize: ".5" }}>{myFormik.touched.book_name && myFormik.errors.book_name ? myFormik.errors.book_name : null}</span><br />
                    {/* Other input fields and error messages */}
                    <div className="d-sm-flex  justify-content-end mt-3">
                        <button disabled={isLoading} type="submit" className="btn btn-primary create-btn">
                            {isLoading ? "Loading" : "Add"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddBook;
