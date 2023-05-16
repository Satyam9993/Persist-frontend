import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Home.css';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './state';
import { useParams } from 'react-router-dom';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Edit = () => {
  const mode = useSelector(state => state.mode);
  const token = useSelector(state => state.token);
  const { userId } = useParams();
  const dispatch = useDispatch();


  
  const fetchdata = async() => {
    const data = await fetch(`${BACKEND_URL}/getdata?userId=${userId}`,
      {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      }
    );
    const userdata = await data.json();
    dispatch(setUser({
      user: userdata.user
    }));
  }
  
  const data = useSelector(state => state.user.editdata.data);

  const [value, setValue] = useState(data);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchdata();
    setValue(data);
  }, [token])
  function createMarkup(c) {
    return { __html: c };
  }

  const saveData = async () => {
    const body = {
      data: value
    };
    const data = await fetch(`${BACKEND_URL}/edit`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      }
    );
    const saveddata = await data.json();
    if (saveddata) {
      dispatch(setUser({
        user: saveddata.user
      }));
      setIsEdit(false);
    }
  };

  return (
    <div className={mode === 'light' ? 'lightMode' : 'darkMode'}>
      <Navbar />
      <div>
        <img src={require('./assets/image.jpeg')} className='img' />
      </div>
      <div className='container'>
        <div style={{ display: 'flex', justifyContent: "end", alignItems: "center" }}>
          {isEdit ? <button onClick={saveData}>
            Save
          </button> : <button onClick={() => setIsEdit(!isEdit)}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: 20, width: 20 }} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            edit
          </button>}
        </div>
        {!isEdit ? <div dangerouslySetInnerHTML={createMarkup(value)} /> :
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        }
      </div>
    </div>
  )
}

export default Edit