import { Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import { setLogin } from './state/index';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    console.log(location);
    const RegisterSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is Required"),
        password: Yup.string()
            .min(4, 'Should be at least 4')
            .max(16, 'Should be at most 16')
            .required('password is Required!!'),
    });

    const handleLogin = async (values) => {
        const data = await fetch(`${BACKEND_URL}/login`,
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            }
        );
        const login = await data.json();
        if (login) {
            dispatch(setLogin({
                user: login.user,
                token: login.userauthToken
            }));
            navigate("/");
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
                    <h3>Login Here</h3>
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
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
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
                                        <label for="password" className="text-gray-100 text-s font-semibold px-1">Password</label>
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
                    <Link to="/signin">SignIn</Link>
                </div>
                </div>
            </body>
        </>
    )
}

export default Login

