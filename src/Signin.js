import { Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
// import { setLogin } from './reducer';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { setLogin } from './state';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const RegisterSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is Required"),
        password: Yup.string()
            .min(4, 'Should be at least 4')
            .max(16, 'Should be at most 16')
            .required('password is Required!!'),
    });

    const handleLogin = async (values) => {
        console.log(values);
        const data = await fetch(`${BACKEND_URL}/signin`,
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            }
        );
        const signin = await data.json();
        if (signin) {
            alert("Successfully signed in");
            navigate("/login");
        }else{
            alert("Failed to Signin");
        }
    }
    return (
        <>
            <body>
                <div class="background">
                    <div class="shape"></div>
                    <div class="shape"></div>
                </div>
                <div className='form'>
                    <h3>SignIn</h3>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={RegisterSchema}
                        onSubmit={(values) => {
                            handleLogin(values);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit
                        }) => (
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <label for="username">Username</label>
                                            <input type="text"
                                                placeholder="Email or Phone"
                                                onChange={handleChange('email')}
                                                value={values.email}
                                                id="username" />
                                        </div>
                                        {touched.email && errors.email && (
                                            <p className="text-[#ff0d10]">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-12">
                                        <label for="password" >Password</label>
                                        <div>
                                            <input type="password"
                                                onChange={handleChange('password')}
                                                value={values.password}
                                                placeholder="Password"
                                                id="password"
                                            />
                                        </div>
                                        {touched.password && errors.password && (
                                            <p className="text-[#ff0d10]">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            handleSubmit()
                                        }}
                                        type='submit'
                                        style={{ color: "black" }}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        )}
                    </Formik>
                    <div class="social">
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </body>
        </>
    )
}

export default Signin;

