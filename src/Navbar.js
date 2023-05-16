import React from 'react';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout, setMode, setUser } from './state';
import { Link, useNavigate } from 'react-router-dom';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Navbar = () => {
    const mode = useSelector(state => state.mode);
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lightMode = () => {
        dispatch(setMode());
    };

    const logout = () => {
        dispatch(setLogout())
        navigate("/")
    }

    const Duplicate = async () => {
        if (!user) {
            navigate('/signin')
        }
        const data = await fetch(`${BACKEND_URL}/duplicate`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        const newdata = await data.json();
        if (newdata) {
            dispatch(setUser({
                user : newdata.user
            }))
            navigate(`/${user._id}/edit`);
        }
        else{
            alert("Alert!")
        }
    };

    return (
        <div className={`navcontainer ${mode === 'light' ? 'changeDarkMode' : 'changeLightMode'}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className='nav'>
                    <li>Prodomic Lab</li>
                    <span>/</span>
                    <li>Prodomic</li>
                </div>
                <div>
                    {!user?.editdata?.isedit ? <span onClick={Duplicate}>
                        <svg style={{ height: 20, width: 20, marginRight: 10, cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                        </svg>
                    </span> : <Link to={`${user._id}/edit`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style={{ height: 20, width: 20, marginRight: 10 }}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </Link>}
                    <label className="switch" style={{ marginRight: "20px" }}>
                        <input type="checkbox" checked={mode === 'dark'} onClick={lightMode} />
                        <span className="slider round"></span>
                    </label>
                    {!token ? <Link to={"/login"}>
                        <svg style={{ height: 20, width: 20, marginRight: 10 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                    </Link> : <span onClick={logout}>
                        <svg style={{ height: 20, width: 20, marginRight: 10 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </span>}
                </div>
            </div>

        </div>
    )
}

export default Navbar