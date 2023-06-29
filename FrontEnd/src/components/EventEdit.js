import Sidebar from "./Sidebar";
import React , { useEffect ,useState} from "react";
import { useRef } from "react";
import http from '../http-common';
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import {BiArrowBack} from "react-icons/bi";
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import '../styles/css/chunk-vendors.93d5f80e.css'
import '../styles/css/chunk-34ccc797.8d3259f5.css'
import { DateRangePicker } from 'rsuite';
import { Editor } from '@tinymce/tinymce-react';
import Unauthorized from "./Unauthorized";
import { useParams, useNavigate } from "react-router-dom";
import EventService from "../services/EventService";

export default function EventEdit(){

   
    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    
    const _id = useParams()._id;
    const navigate = useNavigate()

    const { handleSubmit } = useForm()
    const editorRef = useRef();
    const eventimageRef = useRef(null)
    const eventimagegalleryRef = useRef(null)

    const [title, settitle] = useState("")
    const [mode, setMode] = useState("")
    const [Description, setDescription] = useState("")
    const [titleError, settitleError] = useState("")
    const [daterange, setdaterange]  = useState()

    const [EventGalleryImages, setEventGalleryImages] = useState(null)
    const [EventImage, setEventImage] = useState()
    const [Msg, setMsg] = useState("")
    const [showAddEventAlert, setshowAddEventAlert]  = useState(false)

    const [oldEventImage, setoldEventImage] = useState("")
    const [oldEventGallery, setoldEventGallery] = useState([])

    function findEvent(){
        EventService.findEventById(_id)
        .then((response) => {
            settitle(response.data.title)
            setMode(response.data.mode)
            setDescription(response.data.description)
            const datestring = []
            datestring.push(new Date(response.data.startdate))
            datestring.push(new Date(response.data.enddate))
            setdaterange(datestring);
            setoldEventImage(response.data.eventimage)
            setoldEventGallery(response.data.eventgallery)
        })
        .catch((e) => {
            console.log(e);
        })
    }
 
    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    useEffect(() => {
        findEvent()
        const AccountInfo = localStorage.getItem('store')
        const userInfo1 = JSON.parse(AccountInfo);
        const minutes = 1 * 60 * 1000;
          
        if(navigator.onLine === true){
        const interval = setInterval(() => {
            parseJwt(userInfo1._id)
          }, minutes);
        
          return () => clearInterval(interval);
        }
        else{
            dispatch(logout())
        }

        const token = localStorage.getItem('userToken')
        const decode = JSON.parse(atob(token.split('.')[1]));
        if (decode.exp * 1000 < new Date().getTime()) {
            dispatch(logout())
            localStorage.removeItem('userToken')
            window.location.reload()
        }
         // eslint-disable-next-line
    }, [])

    function onEventImagechange(e){
        const chosenFile = Array.prototype.slice.call(e.target.files)
        setEventImage(chosenFile)
    }

    function onEventGallerychange(e){
        const chosenFiles1 = Array.prototype.slice.call(e.target.files)
        setEventGalleryImages(chosenFiles1);
    }


    function submitForm(){
        if(!title || /^\s*$/.test(title) ){
            settitleError('Please Enter Title')
            return
        }else{
            settitleError("")
        }



        const userToken = localStorage.getItem('userToken')

        const formData = new FormData();

        function getRandomFileName() {
            var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
            var random = ("" + Math.random()).substring(2, 8); 
            var random_number = timestamp+random;  
            return random_number;
          }

        if(files.length === 0 && file.length === 0 ){
            
            http.post(`/events/edit-event`, {_id: _id, title: title, description: editorRef.current.getContent(), startdate: dates[0],  enddate: dates[1], mode: mode }, {
                headers: {
                  'Authorization': `Bearer ${userToken}`,
                },
              })
              .then((response) => {
                if(response.status === 200){
                    findEvent()
                    window.scroll(0,0)
                    setMsg(response.data.msg)
                    setshowAddEventAlert(true)
                }
              })
              .catch((e) => {
                console.log(e);
              })
        }
        if(files.length !== 0 && file.length === 0){
            formData.append('_id', _id)
            formData.append('title', title)
            if (editorRef.current) {
                formData.append('description', editorRef.current.getContent())
            }
            formData.append('startdate',dates[0])
            formData.append('enddate',dates[1])
    
            if(files.length !== 0){
                const data = []
                 // eslint-disable-next-line
                oldEventGallery.map((image) => {
                    
                    data.push({oldimage : image.image})
                    
                })
                formData.append('oldEventGalleryimage', JSON.stringify(data))
                
                 // eslint-disable-next-line
                 files.map((file) => {
                    formData.append('image', file, getRandomFileName())
                })
            }
    
            formData.append('mode', mode)
            
            http.post(`/events/edit-event`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                  'Authorization': `Bearer ${userToken}`,
                },
              })
              .then((response) => {
                if(response.status === 200){
                    findEvent()
                    window.scroll(0,0)
                    setMsg(response.data.msg)
                    setshowAddEventAlert(true)
                }
              })
              .catch((e) => {
                console.log(e);
              })
        }
        if(files.length === 0 && file.length !== 0 ){
            formData.append('_id', _id)
            formData.append('title', title)
            if (editorRef.current) {
                formData.append('description', editorRef.current.getContent())
            }
            formData.append('startdate',dates[0])
            formData.append('enddate',dates[1])
    
    
            if(file.length !== 0){
                formData.append('oldEventImage', oldEventImage)
                 // eslint-disable-next-line
                 file.map((file) => {
                    formData.append('eventimage', file, getRandomFileName())
                })
            }
    
            formData.append('mode', mode)
            
            http.post(`/events/edit-event`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                  'Authorization': `Bearer ${userToken}`,
                },
              })
              .then((response) => {
                if(response.status === 200){
                    findEvent()
                    window.scroll(0,0)
                    setMsg(response.data.msg)
                    setshowAddEventAlert(true)
                }
              })
              .catch((e) => {
                console.log(e);
              })
        }
        if(files.length !== 0 && file.length !== 0 ){
            formData.append('_id', _id)
            formData.append('title', title)
            if (editorRef.current) {
                formData.append('description', editorRef.current.getContent())
            }
            formData.append('startdate',dates[0])
            formData.append('enddate',dates[1])
    
            if(files.length !== 0){
                const data = []
                 // eslint-disable-next-line
                oldEventGallery.map((image) => {
                    data.push({oldimage : image.image})
                })
                formData.append('oldEventGalleryimage', JSON.stringify(data))
                 // eslint-disable-next-line
                 files.map((file) => {
                    formData.append('image', file, getRandomFileName())
                })
            }
    
            if(file.length !== 0){
                formData.append('oldEventImage', oldEventImage)
                 // eslint-disable-next-line
                 file.map((file) => {
                    formData.append('eventimage', file, getRandomFileName())
                })
            }
    
            formData.append('mode', mode)
            
            http.post(`/events/edit-event`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                  'Authorization': `Bearer ${userToken}`,
                },
              })
              .then((response) => {
                if(response.status === 200){
                    findEvent()
                    window.scroll(0,0)
                    setMsg(response.data.msg)
                    setshowAddEventAlert(true)
                }
              })
              .catch((e) => {
                console.log(e);
              })
        }




          
    }

    const file = EventImage ? [...EventImage] : [];
    const files = EventGalleryImages ? [...EventGalleryImages] : [];
    const dates = daterange ? [...daterange] : [];
    

    if(userInfo.account_type === "Admin" || userInfo.account_type === "Manager"){
        return(
            <div>
                    <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                        <div className="d-flex justify-content-between">
                                                    <div className="breadcrumb p-2">
                                                        <h1>Edit Event</h1>
                                                    </div>
                                                    <div className="p-2">
                                                            <button className="btn round btn-icon rounded-circle m-1" title="Back" onClick={() => navigate(-1)}>
                                                                <BiArrowBack  size={24} className="pointer-change" />    
                                                            </button>
                                                    </div>
                                                   
                                            </div> 
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        {showAddEventAlert === true ?
                                                        <div  className="mt-2" style={{fontSize : '16px'}}> 
                                                            <div className="alert alert-dismissible alert-success">
                                                                <strong>{Msg}</strong>
                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setshowAddEventAlert(false)}>X</button>
                                                            </div>
                                                    </div> : null
                                        }
                                        <form onSubmit={handleSubmit(submitForm)}>
                                            <div className="row">
                                                <div role="group" className="form-group col-md-6 mb-3">
                                                    <label className="d-block" >Title</label>
                                                    <div className="bv-no-focus-ring">
                                                        <input type="text" placeholder="Title" required="required" aria-required="true" className="form-control"  value={title} onChange={(e) => settitle(e.target.value)} />
                                                            <span className="text-danger">{titleError}</span>
                                                    </div>
                                                </div>
                                                <div role="group" className="form-group col-md-6 mb-3">
                                                    <label  className="d-block" >Date</label>
                                                    <div className="bv-no-focus-ring">
                                                        <DateRangePicker
                                                            block
                                                            showMeridian
                                                            value={daterange}
                                                            onChange={setdaterange}
                                                            format="yyyy-MM-dd hh:mm aa"
                                                        />
                                                    </div>
                                                </div>
                                                <div role="group" className="form-group col-md-12 mb-3">
                                                    <label  className="d-block" >Description</label>
                                                    <div className="bv-no-focus-ring">
                                                         <Editor
                                                            onInit={(evt, editor) => editorRef.current = editor}
                                                            initialValue={Description}
                                                            init={{
                                                            height: 500,
                                                            menubar: false,
                                                            plugins: [
                                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                            ],
                                                            toolbar: 'undo redo | blocks | ' +
                                                                'bold italic forecolor | alignleft aligncenter ' +
                                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                                'removeformat | help',
                                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div role="group" className="form-group col-md-6 mb-3">
                                                    <label  className="d-block" >Event Image</label>
                                                    <div className="bv-no-focus-ring">
                                                    <div className="form-group" x-data="{ fileName: '' }">
                                                                <div className="input-group">
                                                                        <span className="input-group-text px-3 text-muted"><i className="i-Upload"></i></span>
                                                                        <input type='file' ref={eventimageRef} className="form-control" placeholder="Browse file" x-model="fileName" accept="image/*"  multiple={false} onChange={onEventImagechange} /> 
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div role="group" className="form-group col-md-6 mb-3">
                                                    <label  className="d-block" >Event Gallery</label>
                                                    <div className="bv-no-focus-ring">
                                                    <div className="form-group" x-data="{ fileName: '' }">
                                                                <div className="input-group">
                                                                        <span className="input-group-text px-3 text-muted"><i className="i-Upload"></i></span>
                                                                        <input type='file' ref={eventimagegalleryRef} className="form-control" placeholder="Browse file" x-model="fileName" accept="image/*"  multiple={true}  onChange={onEventGallerychange}/> 
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div role="group" className="form-group col-md-6 mb-3">
                                                    <label  className="d-block" >Mode of Event</label>
                                                    <div className="bv-no-focus-ring">
                                                        <select id="inline-form-custom-select-pref1" className="custom-select" value={mode} onChange={(e) => setMode(e.target.value)} required>
                                                            <option value="">select</option>
                                                            <option value="Online">Online</option>
                                                            <option value="Offline">Offline</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                        <button className="btn mt-3 btn-primary" type="submit">
                                                            Submit
                                                        </button>
                                                    
                                                    </div>
                                            </div>
                                            
                                                {/* <div className="row ml-auto mr-auto">
                                                    <div className="col-sm-4">
                                                        <h6 className="mb-0">Title</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <input type='text' className='form-control' value={title} onChange={(e) => settitle(e.target.value)} required/>
                                                        <span className="text-danger">{titleError}</span>
                                                    </div>
                                                </div> */}
                                                
                                                {/* <div className="row mt-2 ml-auto mr-auto">
                                                    <div className="col-sm-4">
                                                        <h6 className="mb-0">Date</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                    <DateRangePicker
                                                        block
                                                        showMeridian
                                                        value={daterange}
                                                        onChange={setdaterange}
                                                        format="yyyy-MM-dd hh:mm aa"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-2 ml-auto mr-auto">
                                                    <div className="col-sm-4">
                                                        <h6 className="mb-0">Description</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                    <Editor
                                                        editorState={editorState}
                                                        toolbarClassName="toolbarClassName"
                                                        wrapperClassName="wrapperClassName"
                                                        editorClassName="editorClassName"
                                                        onEditorStateChange={updateTextDescription}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-2 ml-auto mr-auto">
                                                    <div className="col-sm-4">
                                                        <h6 className="mb-0">Event Image</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                    <div className="form-group" x-data="{ fileName: '' }">
                                                                <div className="input-group">
                                                                        <span className="input-group-text px-3 text-muted"><i className="i-Upload"></i></span>
                                                                        <input type='file' className="form-control" placeholder="Browse file" x-model="fileName" accept="image/*"  multiple={false} /> 
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-2 ml-auto mr-auto">
                                                    <div className="col-sm-4">
                                                        <h6 className="mb-0">Event Gallery</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        
                                                        <div className="form-group" x-data="{ fileName: '' }">
                                                                <div className="input-group">
                                                                        <span className="input-group-text px-3 text-muted"><i className="i-Upload"></i></span>
                                                                        <input type='file' className="form-control" placeholder="Browse file" x-model="fileName" accept="image/*"  multiple={true} /> 
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                
                                                
                                                    
                                                   
                                            
                                        </form>
                                    </div>
                            </div>

                        </main>
                    </div>
                    
                </div>
            )
    }
    else{
            return(
               <Unauthorized/>
            )
    }
}