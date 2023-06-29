import Sidebar from "./Sidebar";
import http from '../http-common';
import Unauthorized from "./Unauthorized";
import { Modal } from "react-bootstrap";
import  { useState } from "react";
import HolidayService from "../services/HolidayService";
import { useForm } from 'react-hook-form';
import  { useEffect } from "react";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'


export default function SettingHolidays(){

    const { handleSubmit } = useForm()
    const [INITIAL_EVENTS, setINITIAL_EVENTS] = useState([])
    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    const [holidayTitle, setholidayTitle] = useState("")
    const [floating, sefloating] = useState(false)
    const [selectedImage, setSelectedImage] = useState();
    const [EditSelectedImage, setEditSelectedImage] = useState();
    const [Msg, setMsg] = useState("")
    const [selectInfo, setselectInfo] = useState({})
    const [StatusChangedAlert, setStatusChangedAlert] = useState(false);
    const [showApproveModal, setApproveShow] = useState(false);
    const [DeleteAlert, setDeleteAlert] = useState(false);
    const [EditAlert, setEditAlert]= useState(false);
    const handleApproveShow = () => setApproveShow(true);
    const handleApproveClose = () => setApproveShow(false);

    const [showEditModal, setEditShow] = useState(false);
    const handleEditShow = () => setEditShow(true);
    const handleEditClose = () => setEditShow(false);

    const [showDeleteModal, setDeleteShow] = useState(false);
    const handleDeleteShow = () => setDeleteShow(true);
    const handleDeleteClose = () => setDeleteShow(false);

    const [TitleError, setTitleError] = useState("")
    const [EditTitleError, setEditTitleError] = useState(false)
    const [FileError, setFileError] = useState("")
    const [EditFileError, setEditFileError]  = useState("")

    const [id, setId] = useState("")
    const [start, setstart] = useState("")
    const [Title, setTitle] = useState("")
    const [Image, setImage] = useState("")

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth , day].join("-");
    }

   

    function HolidayList(){
        HolidayService.findAllHolidays()
        .then((response) => {
           const data = response.data;
           
            // // {
            // //   id: createEventId(),
            // //   title: 'All-day event',
            // //   start: todayStr
            // // },
            const DataforInitial = []
            for(let i=0; i< data.length; i++){
                DataforInitial.push({
                    _id: data[i]._id,
                    start: convert(data[i].start),
                    title: data[i].holidayTitle,
                    Image: data[i].Image
                })
            }
           setINITIAL_EVENTS(DataforInitial)
        })
        .catch((e)=> {
            console.log(e);
        })
    }


    useEffect(() => {
        HolidayList();
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

    
    const imageChange = (e) => {
           
            const chosenFiles = Array.prototype.slice.call(e.target.files)
            setSelectedImage(chosenFiles);
            
    };

    const EditimageChange = (e) => {
       
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        setEditSelectedImage(chosenFiles)
    }

    function submitHoliday() {
        
        if(!holidayTitle || /^\s*$/.test(holidayTitle) ){
            setTitleError("Please Enter Title")
            return;
        }
        else{
            setTitleError("")
        }

        if(files[0].size > 102400){
            setFileError("File size is not greater than 100kb");
            return;
        }
        else{
            setFileError("")
        }

        const userToken = localStorage.getItem('userToken')

        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect()
        let start =  selectInfo.startStr
        let end = selectInfo.endStr
        let allDay = selectInfo.allDay

        const formData = new FormData();
        
        formData.append('holidayTitle', holidayTitle)
        formData.append('start', start)
        formData.append('end', end)
        formData.append('allDay', allDay)
        formData.append('floating', floating)

        function getRandomFileName() {
            var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
            var random = ("" + Math.random()).substring(2, 8); 
            var random_number = timestamp+random;  
            return random_number;
          }

        // eslint-disable-next-line
        files.map((file) => {
            formData.append('Image', file, getRandomFileName())
        })

        // eslint-disable-next-line
        http.post(`/holidays/holidayentry`, formData, {
            headers: {
              "content-type": "multipart/form-data",
              'Authorization': `Bearer ${userToken}`,
            },
          })
          .then((response) => {
            setholidayTitle("")
            sefloating(false)
            window.scrollTo(0, 0);
            setMsg(response.data.msg)
            handleApproveClose();
            setStatusChangedAlert(true)
            HolidayList();
            setEditSelectedImage();
          })
          .catch(e => {
            if(e.response.status === 400){
                console.log("All Fileds are required");
            }
        })
   }

   function EditHoliday(){

        if(!Title || /^\s*$/.test(Title) ){
            setEditTitleError("Please Enter Title")
            return;
        }
        else{
            setEditTitleError("")
        }
        
        if(Editfiles.length === 0){
            const formData = new FormData();
            formData.append('id', id)
            formData.append('holidayTitle', Title)

            const userToken = localStorage.getItem('userToken')
            http.post(`/holidays/editholiday`, formData, {
                    headers: {
                    "content-type": "multipart/form-data",
                    'Authorization': `Bearer ${userToken}`,
                    }})
            .then((response)=>{
                if(response.status === 200){
                    window.scrollTo(0, 0);
                    HolidayList();
                    handleEditClose();
                    setEditAlert(true);
                    setEditSelectedImage();
                }
                
            })
            .catch((e) => {
                console.log(e);
            })
        }else{
            if(Editfiles[0].size > 100000){
                setEditFileError("File size is not greater than 100kb");
                return;
            }
            else{
                setEditFileError("")
            }


            const formData = new FormData();
            formData.append('id', id)
            formData.append('holidayTitle', Title)
            formData.append('oldImage', Image)
    
            function getRandomFileName() {
                var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
                var random = ("" + Math.random()).substring(2, 8); 
                var random_number = timestamp+random;  
                return random_number;
              }
            
            // eslint-disable-next-line
            Editfiles.map((file) => {
                formData.append('Image', file, getRandomFileName())
            })
    
    
            const userToken = localStorage.getItem('userToken')
            http.post(`/holidays/editholiday`, formData, {
                    headers: {
                      "content-type": "multipart/form-data",
                      'Authorization': `Bearer ${userToken}`,
                    }})
            .then((response)=>{
                if(response.status === 200){
                    window.scrollTo(0, 0);
                    HolidayList();
                    handleEditClose();
                    setEditAlert(true);
                    setEditSelectedImage();
                }
                
            })
            .catch((e) => {
                console.log(e);
            })
        }
        


       
   }

   

   function deleteEvent(){
    HolidayService.DeleteHolidayDetails(id, Image)
    .then((response)=>{
        if(response.status === 200){
            window.scrollTo(0, 0);
            HolidayList();
            handleDeleteClose();
            handleEditClose();
            setDeleteAlert(true);
        }
        
    })
    .catch((e) => {
        console.log(e);
    })
   }

   const files = selectedImage ? [...selectedImage] : [];
   const Editfiles = EditSelectedImage ? [...EditSelectedImage] : [];

    const handleDateSelect = (selectInfo) => {
    setselectInfo(selectInfo);
    handleApproveShow();
 
  }

  const handleEventResize = (eventResizeInfo) =>{
    var event = eventResizeInfo.event;
    if (event.start.getDay() !== event.end.getDay()) {
        eventResizeInfo.revert();
    }
  }


    const handleEventClick = (clickInfo) => {
            handleEditShow();
            setId(clickInfo.event.extendedProps._id)
            setstart(clickInfo.event.startStr)
            setTitle(clickInfo.event.title)
            setImage(clickInfo.event._def.extendedProps.Image)
    }


   if(userInfo.account_type === "Admin" || userInfo.account_type === "Manager"){
        return(
            <div>
            <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="breadcrumb">
                                                <h1>Holidays Setting</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">



                                                    {StatusChangedAlert === true ?
                                                        <div  className="mt-2" style={{fontSize : '16px'}}> 
                                                            <div className="alert alert-dismissible alert-success">
                                                                <strong>{Msg}</strong>
                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setStatusChangedAlert(false)}>X</button>
                                                            </div>
                                                    </div> : null
                                                    }
                                                    {EditAlert === true ?
                                                        <div  className="mt-2" style={{fontSize : '16px'}}> 
                                                            <div className="alert alert-dismissible alert-info">
                                                                <strong>Holiday data Edited Successfully!!!</strong>
                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setEditAlert(false)}>X</button>
                                                            </div>
                                                    </div> : null
                                                    }

                                                    {DeleteAlert === true ?
                                                        <div  className="mt-2" style={{fontSize : '16px'}}> 
                                                            <div className="alert alert-dismissible alert-danger">
                                                                <strong>Holiday data Deleted Successfully!!!</strong>
                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setDeleteAlert(false)}>X</button>
                                                            </div>
                                                    </div> : null
                                                    }
                                                    <FullCalendar
                                                        plugins={[dayGridPlugin, interactionPlugin]}
                                                        initialView='dayGridMonth'
                                                        weekends={true}
                                                        events={INITIAL_EVENTS}
                                                        headerToolbar={{
                                                            left: 'dayGridMonth',
                                                            center: 'title',
                                                            right: 'prevYear,prev,next,nextYear today'
                                                        }}
                                                        
                                                        fixedWeekCount={false}
                                                        initialEvents={INITIAL_EVENTS}
                                                        editable={true}
                                                        selectable={true}
                                                        eventResize={handleEventResize}
                                                        select={handleDateSelect}
                                                        eventContent={renderEventContent}
                                                        eventClick={handleEventClick}
                                                    />
                            
                            

                                                    <Modal show={showApproveModal} onHide={handleApproveClose} animation={false}>
                                                    <Modal.Header closeButton>
                                                    <Modal.Title>Add Event</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                    <form onSubmit={handleSubmit(submitHoliday)} className="leave-form ml-3">
                                                    <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <span>Date</span>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <span>{new Date(selectInfo.startStr).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-sm-3">
                                                                <span>Title</span>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input type='text' className="form-control" value={holidayTitle} onChange={(e) => setholidayTitle(e.target.value)} required />
                                                                <p className="text-danger">{TitleError}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2 justify-content-center ml-3">
                                                            
                                                            <div className="col-sm-7">
                                                                <div className="form-check" >
                                                                    <input className="form-check-input" type="checkbox" id="floating" value={true} onChange={(e) => sefloating(e.target.value)} />
                                                                    <span htmlFor="floating">
                                                                        Floating
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-sm-3">
                                                                <span>Image</span>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input id="file" type="file" accept="image/*"  className="form-control" onChange={imageChange} required/>
                                                                <p className="text-danger">{FileError}</p>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                        <div className="row  justify-content-end">
                                                                <div className="col-sm-3">
                                                                    <button className="btn btn-primary btn-sm">
                                                                        Submit
                                                                    </button>
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <button className="btn btn-secondary btn-sm" onClick={handleApproveClose}>
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                        </div>
                                                    </form>
                                                    </Modal.Body>
                                                    </Modal>

                                                    <Modal show={showEditModal} onHide={handleEditClose} animation={false}>
                                                    <Modal.Header closeButton>
                                                    <Modal.Title>Edit or Delete Event</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                    <form onSubmit={handleSubmit(EditHoliday)} className="leave-form ml-auto mr-auto">
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <span>Date</span>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <span>{new Date(start).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <span>Title</span>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input type='text' className="form-control" value={Title} onChange={(e) => setTitle(e.target.value)} required />
                                                                <p className="text-danger">{EditTitleError}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <span>Image</span>
                                                            </div>
                                                            <div className="col-sm-1">
                                                                <i className="nav-icon i-File-Download" style={{textDecoration: 'none'}}></i>
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <a href={`http://localhost:5000/public/images/${Image}`} className="textCut" target="_blank" rel="noopener noreferrer">{Image}</a>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <span></span>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input id="file" type="file" accept="image/*" className="form-control" onChange={EditimageChange}/>
                                                                <p className="text-danger">{EditFileError}</p>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                        <div className="row  justify-content-end">
                                                                <div className="col-sm-3">
                                                                    <button className="btn btn-primary btn-sm" type="submit">
                                                                        Update
                                                                    </button>
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <button className="btn btn-danger btn-sm" type="button" onClick={handleDeleteShow}>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <button className="btn btn-secondary btn-sm" type="button" onClick={handleEditClose}>
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                                
                                                        </div>
                                                    </form>
                                                
                                                    </Modal.Body>
                                                    </Modal>
                                                        
                                                    <Modal show={showDeleteModal} onHide={handleDeleteClose} animation={false}>
                                                    <Modal.Header closeButton>
                                                    <Modal.Title>Are you sure to delete ?</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="row">
                                                                <div className="col-sm-4">
                                                                    Date: {new Date(start).toLocaleDateString()}
                                                                </div>    
                                                            </div>
                                                        <div className="row mt-2 justify-content-end">
                                                                <div className="col-sm-3 mt-3">
                                                                    <button className="btn btn-danger btn-sm" onClick={deleteEvent}>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                                <div className="col-sm-3 mt-3">
                                                                    <button className="btn btn-secondary btn-sm" onClick={handleDeleteClose}>
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            
                                                        </div>
                                                    </Modal.Body>
                                                    </Modal>
                                    
                                                </div>
                                            </div>
                                        </div>
                                        </div>

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

function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
