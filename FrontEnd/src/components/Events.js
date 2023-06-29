import Sidebar from "./Sidebar";
import React , { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import '../styles/css/chunk-vendors.93d5f80e.css'
import '../styles/css/chunk-34ccc797.8d3259f5.css'
import EventService from "../services/EventService";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import {RiFileEditLine} from 'react-icons/ri'
import {RiCloseFill} from 'react-icons/ri'
import { Modal } from "react-bootstrap";

export default function Events(){

   
    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const [EventData, setEventData] = useState([])
    const [showDeleteModal, setDeleteShow] = useState(false);
    const handleDeleteShow = () => setDeleteShow(true);
    const handleDeleteClose = () => setDeleteShow(false);

    const [deleteid, setdeleteid] = useState("")
    const [deletetitle, setdeletetitle] = useState("")
    const [deletestartdate, setdeletestartdate] = useState("")
    const [deleteenddate, setdeleteenddate] = useState("")
    const [deletemode, setdeletemode] = useState("")
    const [deletestatus, setdeletestatus] = useState("")
    const [deleteeventimage, setdeleteeventimage] = useState("")
    const [deleteeventgallery, setedeleteeventgallery] = useState([])
    const [showdeletealert, setshowdeletealert] = useState(false)
    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    function getAllEvents(){
        EventService.findAllEvents()
        .then((response) => {
            const Data = response.data;
            const FilterData = []
            for(let i=0;i<Data.length;i++){
                var currentDate = new Date()
                var from = new Date(Data[i].startdate);
                var to   = new Date(Data[i].enddate);
                var check = new Date(currentDate);
            
                if((check > from && check < to) === true){
                    FilterData.push({
                        _id: Data[i]._id,
                        title: Data[i].title,
                        description : Data[i].description,
                        startdate: Data[i].startdate,
                        enddate: Data[i].enddate, 
                        eventimage : Data[i].eventimage,
                        eventgallery: Data[i].eventgallery,
                        mode: Data[i].mode,
                        status: 'Live',
                        statusclass: 'text-danger'
                    })
                }else{
                    if (from.getTime() > check.getTime()) {
                        FilterData.push({
                            _id: Data[i]._id,
                            title: Data[i].title,
                            description : Data[i].description,
                            startdate: Data[i].startdate,
                            enddate: Data[i].enddate, 
                            eventimage : Data[i].eventimage,
                            eventgallery: Data[i].eventgallery,
                            mode: Data[i].mode,
                            status: 'Upcoming',
                            statusclass: 'text-primary' 
                        })
                    } else {
                        FilterData.push({
                            _id: Data[i]._id,
                            title: Data[i].title,
                            description : Data[i].description,
                            startdate: Data[i].startdate,
                            enddate: Data[i].enddate, 
                            eventimage : Data[i].eventimage,
                            eventgallery: Data[i].eventgallery,
                            mode: Data[i].mode,
                            status: 'Completed',
                            statusclass: 'text-success'
                        })
                    }
                }
            }

            let status = {
                'Upcoming': 1,
                'Live': 2,
                'Completed': 3,
              };

            FilterData.sort((a, b) => status[a.status] - status[b.status]);
            setEventData(FilterData)
        })
        .catch((e) => {
            console.log(e);
        })
    } 

    useEffect(() => {
       
        setTimeout(() => {
            getAllEvents();
          }, 1000)
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

   

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }

    function handledeletechange(_id, title, startdate, enddate, mode, status, eventimage, eventgallery){
        setdeleteid(_id)
        setdeletetitle(title)
        setdeletestartdate(startdate)
        setdeleteenddate(enddate)
        setdeletemode(mode)
        setdeletestatus(status)
        setdeleteeventimage(eventimage)
        setedeleteeventgallery(eventgallery)
    }


    function deleteEvent(){
        
        EventService.deleteEventById(deleteid, deleteeventimage, deleteeventgallery)
        .then((res) => {
            if(res.status === 200){
                handleDeleteClose()
                setshowdeletealert(true)
                getAllEvents()
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }

    const showCards = () => {
        return (
          <>
            {EventData && EventData.map((data,index) => {
              return (
                <div  className="col-sm-4 card-group mb-4" key={index}>
                        <div className="card">
                            <div className="containerEvent">
                                <Link to={`/event-info/${data._id}`} style={{textDecoration: 'none', color: 'black'}}>
                                    <img src={`http://localhost:5000/public/images/${data.eventimage}`} loading="lazy" className="card-img-top" alt="..." style={{ width: '100%', height: '7rem', objectFit: 'cover' }}></img>
                                </Link>
                                <Link to={`/edit-event/${data._id}`}><button className="btn ripple round btn-icon rounded-circle m-1 leftbutton" title="Edit"><RiFileEditLine size={24}/></button></Link>
                                <button className="btn ripple round btn-icon rounded-circle m-1 rightbutton" onClick={() => {handleDeleteShow(); handledeletechange(data._id, data.title, convert(data.startdate), convert(data.enddate), data.mode, data.status, data.eventimage, data.eventgallery );}} title="delete"><RiCloseFill size={24}/></button>
                            </div>
                            
                                                <div className="card-body">
                                                    <Link to={`/event-info/${data._id}`} style={{textDecoration: 'none', color: 'black'}}>

                                                    <h6 className="card-title textCut">{data.title}</h6>
                                                    <div className="d-flex justify-content-between">
                                                        <span className="card-text"><span className="t-font-boldest">Start Date: </span>{convert(data.startdate)}</span>
                                                        <span className="card-text"><span className="t-font-boldest">Time: </span>{new Date(data.startdate).toLocaleTimeString()}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <span className="card-text"><span className="t-font-boldest">End Date: </span>{convert(data.enddate)}</span>
                                                        <span className="card-text"><span className="t-font-boldest">Time: </span>{new Date(data.enddate).toLocaleTimeString()}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <span className="card-text t-font-boldest">Mode : {data.mode === 'Online' ? <span className="text-success">{data.mode}</span> : <span className="text-secondary">{data.mode}</span>}</span>
                                                        <span className="card-text t-font-boldest">Status : <span className={data.statusclass}>{data.status}</span></span>
                                                    </div>
                                                    </Link>

                                                </div>
                        </div>
                    
                </div>
                
              )
            })}
          </>
        )
      }
      const showSkeleton = () => {
        return (
          <>
            {Array(10)
              .fill()
              .map((item, index) => {
                return (
                  <div  className="col-sm-3 mb-3" key={index}>
                    <div className="card" style={{height: '210px'}} >
                        <Skeleton height={80} width={240} />
                      <div className="card-body mt-2"> 
                        <Skeleton height={50} width={160} className="mt-4" style={{marginTop: '10px'}}  />
                        </div>
                    </div>
                  </div>
                )
              })}
          </>
        )
      }
      const showUserCards = () => {
        return (
          <>
            {EventData && EventData.map((data,index) => {
              return (
                <div  className="col-sm-4 card-group mb-4" key={index}>
                <div className="card" >
                    <Link to={`/event-info/${data._id}`} style={{textDecoration: 'none', color: 'black'}}>
                        <div className="containerEvent">
                                <img src={`http://localhost:5000/public/images/${data.eventimage}`} loading="lazy" className="card-img-top" alt="..." style={{ width: '100%', height: '7rem', objectFit: 'cover' }}></img>
                        </div>
                        <div className="card-body">
                                <h6 className="card-title textCut">{data.title}</h6>
                                    <div className="d-flex justify-content-between">
                                        <span className="card-text"><span className="t-font-boldest">Start Date: </span>{convert(data.startdate)}</span>
                                        <span className="card-text"><span className="t-font-boldest">Time: </span>{new Date(data.startdate).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="card-text"><span className="t-font-boldest">End Date: </span>{convert(data.enddate)}</span>
                                        <span className="card-text"><span className="t-font-boldest">Time: </span>{new Date(data.enddate).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="card-text t-font-boldest">Mode : {data.mode === 'Online' ? <span className="text-success">{data.mode}</span> : <span className="text-secondary">{data.mode}</span>}</span>
                                        <span className="card-text t-font-boldest">Status : <span className={data.statusclass}>{data.status}</span></span>
                                    </div>
                        </div>
                    </Link>
                </div>
                 </div>
              )
            })}
          </>
        )
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
                                        <div className="d-flex justify-content-between">
                                                    <div className="breadcrumb p-2">
                                                        <h1>Events</h1>
                                                    </div>
                                            </div> 
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        {showdeletealert === true ?
                                                                <div  className="mt-2" style={{fontSize : '16px'}}> 
                                                                    <div className="alert alert-dismissible alert-danger">
                                                                        <strong>Event Deleted!!!</strong>
                                                                        <button type="button" className="close" data-dismiss="alert" onClick={() => setshowdeletealert(false)}>X</button>
                                                                    </div>
                                                            </div> : null
                                                }
                                        <div className="row">
                                                
                                                {EventData.length > 0 ? showCards() : showSkeleton()}
                                        </div>
                                        <Modal show={showDeleteModal} onHide={handleDeleteClose} animation={false}>
                                                    <Modal.Header closeButton>
                                                    <Modal.Title>Are you sure to delete this event ?</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="row">
                                                                <div className="col-sm-12">
                                                                    Title: {deletetitle} 
                                                                </div>    
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-12">
                                                                    Start Date: {deletestartdate} 
                                                                </div>    
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-12">
                                                                    End Date: {deleteenddate} 
                                                                </div>    
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-12">
                                                                    Mode: {deletemode} 
                                                                </div>    
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-12">
                                                                    Status: {deletestatus} 
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
                        </main>
                    </div>
                    
                </div>
            )
    }
    else{
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
                                                    <h1>Events</h1>
                                                </div>
                                        </div> 
                                        <div className="separator-breadcrumb border-top"></div>
                                    </div>
                                    <div className="row">
                                            {EventData.length > 0 ? showUserCards() : showSkeleton()}
                                    </div>
                                </div>
                        </div>
                    </main>
                </div>
                
            </div>
            )
    }
}