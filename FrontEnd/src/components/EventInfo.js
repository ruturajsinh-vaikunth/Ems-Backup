import Sidebar from "./Sidebar";
import React , { useEffect, useState } from "react";
import {useDispatch } from 'react-redux'
import { useParams, useNavigate } from "react-router-dom";
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {BiArrowBack} from "react-icons/bi";
import EventService from "../services/EventService";
import parse from 'html-react-parser'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/swiper.css";

    
export default function EventInfo(){
    const dispatch = useDispatch()
    const _id = useParams();
    const navigate = useNavigate()

    const [EventGallery, setEventGallery] = useState([])
    const [EventTitle, setEventTitle] = useState("")
    const [EventStartDate, setEventStartDate] = useState("")
    const [EventEndDate, setEventEndDate] = useState("")
    const [EventDescription, setEventDescription] = useState("")
    const [EventMode, setEventMode] = useState("")
    const [EventImage, setEventImage] = useState("")
    const [crousleshow, setcrousleshow] = useState(false)
    
    function findEvent(){
        EventService.findEventById(_id)
        .then((response) => {
            if(!response.data.eventgallery.length){
                console.log("Gallery Not found");
                setEventImage(response.data.eventimage);
            }else{
                setEventGallery(response.data.eventgallery)
                setcrousleshow(true)
            }

            setEventTitle(response.data.title)
            setEventStartDate(response.data.startdate)
            setEventEndDate(response.data.enddate)
            setEventDescription(response.data.description)
            setEventMode(response.data.mode)

        })
        .catch((e) => {
            console.log(e);
        })
    }

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
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
                                                    <h1>Event - Info</h1>
                                                </div>
                                                <div className="p-2">
                                                            <button className="btn round btn-icon rounded-circle m-1" title="Back" onClick={() => navigate(-1)}>
                                                                <BiArrowBack  size={24} className="pointer-change" />    
                                                            </button>
                                                </div>
                                    </div> 
                                    <div className="separator-breadcrumb border-top"></div>
                                    </div>
                                    <div className="row justify-content-center">
                                        {crousleshow === true ? 
                                            <div className="col-sm-12 col-md-12 col-lg-6">
                                            <Swiper
                                                    spaceBetween={30}
                                                    centeredSlides={true}
                                                    autoplay={{
                                                        delay: 3000,
                                                        disableOnInteraction: false,
                                                    }}
                                                    pagination={{
                                                        clickable: true,
                                                    }}
                                                    navigation={true}
                                                    modules={[Autoplay, Pagination, Navigation]}
                                                    className="mySwiper"
                                                >
                                                
                                                {EventGallery && EventGallery.map((data, index) => (
                                                    <SwiperSlide key={index}><img src={`http://localhost:5000/public/images/${data.image}`} alt="swiper"></img></SwiperSlide>
                                                ))}
                                            </Swiper>
                                            
                                            </div> : 
                                            <div className="col-sm-12 col-md-12 col-lg-6">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <img src={`http://localhost:5000/public/images/${EventImage}`}></img>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-sm-4">
                                            <div className="card shadow">
                                                <div className="card-body">
                                                    <div className="font-weight-bold">
                                                        Title
                                                    </div>
                                                    <span className="text-card">{EventTitle}</span>
                                                </div>
                                            </div>                
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="card shadow">
                                                <div className="card-body">
                                                    <div className="font-weight-bold">
                                                        Start Date
                                                    </div>
                                                    <span className="text-card">{convert(EventStartDate)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="card shadow">
                                                <div className="card-body">
                                                    <div className="font-weight-bold">
                                                        Start Time
                                                    </div>
                                                    <span className="text-card"> {new Date(EventStartDate).toLocaleTimeString()}</span>
                                                </div>
                                            </div>
                                        </div>               
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-sm-4">
                                                <div className="card shadow">
                                                    <div className="card-body">
                                                        <div className="font-weight-bold">
                                                            End Date
                                                        </div>
                                                        <span className="text-card">{convert(EventEndDate)}</span>
                                                    </div>
                                                </div> 
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="card shadow">
                                                <div className="card-body">
                                                    <div className="font-weight-bold">
                                                            End Time
                                                    </div>
                                                        <span className="text-card">{new Date(EventEndDate).toLocaleTimeString()}</span>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="card shadow">
                                                <div className="card-body">
                                                    <div className="font-weight-bold">
                                                        Mode
                                                    </div>
                                                    <span className="text-card">{EventMode}</span>
                                                </div>
                                            </div>
                                        </div>               
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-sm-12">
                                                <div className="card shadow">
                                                    <div className="card-body">
                                                       
                                                        <span className="text-card">{parse(EventDescription)}</span>
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