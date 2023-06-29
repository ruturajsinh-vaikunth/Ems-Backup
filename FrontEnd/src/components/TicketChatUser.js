import Sidebar from "./Sidebar";
import React, { useEffect, useState} from "react";
import Unauthorized from "./Unauthorized";
import { useParams, useNavigate } from "react-router-dom";
import {useDispatch } from 'react-redux';
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import TicketService from "../services/TicketService";
import {HiUserCircle} from 'react-icons/hi';
import {RiUserSmileFill} from 'react-icons/ri';
import {BiArrowBack} from 'react-icons/bi';
import EmployeesService from "../services/EmployeesService"

export default function TicketChatUser(){

    const navigate = useNavigate();
    const ticket_id = useParams()._id;
    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const [ChatData, setChatData] = useState([])
    const [comment, setcomment] = useState("")
    const [Show, setShow] = useState(false)
    const [ReplyInput, setReplyInput] = useState(true)
    const [ProfileImage, setProfileImage] = useState("")

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
        
    };

    function findTicketChatById(){
        TicketService.ChatOfTicketById(ticket_id)
        .then((response) => {
            setChatData(response.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    const last3 = ChatData.slice(-3);

    function NewChat(){
        TicketService.AddNewChatOfTicket(ticket_id, userInfo.account_type, comment, userInfo.firstName )
        .then((response) => {
            findTicketChatById()
            setcomment("")
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2),
        hour = ("0" + date.getHours()).slice(-2),
        minutes = ("0" + date.getMinutes()).slice(-2);
        let NewDate = [day, mnth, date.getFullYear()].join("-")
        let NewTime = [hour, minutes].join(":")
        let DateTimeString = NewDate + " " + NewTime
        return DateTimeString;
    }

    function findTicketDetails(){
        TicketService.TicketDetails(ticket_id)
        .then((response) => {
            if(response.data.status === 'Closed'){
                setReplyInput(false)
            }
            else{
                setReplyInput(true)
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }


    function findEMPDetail(){
            EmployeesService.findByEmployee_id(userInfo.employee_id)
            .then((response) => {
                if(response.data === null ){
                    setProfileImage('null')
                    
                }
                else{
                    setProfileImage(response.data.profileimg);
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }



    useEffect(() => {
        findTicketChatById();
        findTicketDetails();
        findEMPDetail()
        
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

    


    if(userInfo.account_type === "Employee"){
        return(
            <div>
                    <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="d-flex justify-content-between breadcrumb">
                                                        <div className="mr-auto p-1">
                                                            <h5 className="fw-bolder">Conversation of TicketID : {ticket_id}</h5>
                                                        </div>
                                                        <div >
                                                            <button className="btn round btn-icon rounded-circle m-1 mb-2" title="Back" onClick={() => navigate(-1)}>
                                                                <BiArrowBack  size={26} className="pointer-change" />    
                                                            </button>
                                                        </div>
                                                        
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                   

                                                    <section >
                                                        <div className="container py-5">
                                                            <div className="row d-flex justify-content-start">
                                                                <div className="col-md-8 col-lg-6 col-xl-12">

                                                                    {Show === true ? 
                                                                    <>
                                                                    {ChatData.map((data,index) => (
                                                                        data.Added_by_type === 'Admin'  ? 
                                                                        <>
                                                                        <div className="d-flex flex-row justify-content-start mb-4">
                                                                            <div>
                                                                            <HiUserCircle size={50} color="black" className="mt-2" />
                                                                            <p style={{fontSize: '13px', textAlign: 'center'}}>{data.username}</p>
                                                                            </div>
                                                                        <div className="p-3 ms-3" style={{borderRadius: '15px' ,  backgroundColor: 'rgba(57, 192, 237,.2)'}}>
                                                                            <p className="small mb-0">{data.comment}</p>
                                                                            <p className="small mb-0" style={{fontSize: '11px'}}>{convert(data.createdAt)}</p>
                                                                        </div>
                                                                        
                                                                        </div>
                                                                        </> 
                                                                        : <>
                                                                        <div className="d-flex flex-row justify-content-end mb-4">
                                                                        <div className="p-3 me-3 border" style={{borderRadius: '15px' , backgroundColor: '#fbfbfb'}}>
                                                                            <h5>{data.comment}</h5>
                                                                            <h5 style={{fontSize: '11px'}}>{convert(data.createdAt)}</h5>

                                                                        </div>
                                                                        <div>
                                                                            {ProfileImage === 'null' ?
                                                                                <RiUserSmileFill size={40} color="black" className="mt-2" />
                                                                                :
                                                                                <img src={`http://localhost:5000/public/images/${ProfileImage}`} loading="lazy" alt="..." style={{ width: '94%', height: '3.5rem', objectFit: 'cover'  }} />
                                                                            }
                                                                            <p style={{fontSize: '13px',  textAlign: 'center'}}>{data.username}</p>
                                                                        </div>
                                                                        </div>
                                                                        </>                              
                                                                    ))}
                                                                    </> 
                                                                    : <>
                                                                
                                                                    {last3.map((data,index) => (
                                                                        data.Added_by_type === 'Admin'  ? 
                                                                        <>

                                                                        <div className="d-flex flex-row justify-content-start mb-4">

                                                                            <div>
                                                                            <HiUserCircle size={50} color="black" className="mt-2" />
                                                                            <p style={{fontSize: '13px', textAlign: 'center'}}>{data.username}</p>
                                                                            </div>
                                                                        <div className="p-3 ms-3" style={{borderRadius: '15px' ,  backgroundColor: 'rgba(57, 192, 237,.2)'}}>
                                                                            <h5>{data.comment}</h5>
                                                                            <h5 style={{fontSize: '11px'}}>{convert(data.createdAt)}</h5>
                                                                        </div>
                                                                        
                                                                        </div>
                                                                        
                                                                    
                                                                        </> 
                                                                        : <>
                                                                        <div className="d-flex flex-row justify-content-end mb-4">
                                                                        <div className="p-3 me-3 border" style={{borderRadius: '15px' , backgroundColor: '#fbfbfb'}}>
                                                                            <h5>{data.comment}</h5>
                                                                            <h5  style={{fontSize: '11px'}}>{convert(data.createdAt)}</h5>

                                                                        </div>
                                                                        <div>
                                                                            {ProfileImage === 'null' ?
                                                                                <RiUserSmileFill size={40} color="black" className="mt-2" />
                                                                                :
                                                                                <img src={`http://localhost:5000/public/images/${ProfileImage}`} loading="lazy" alt="..." style={{ width: '94%', height: '3.5rem', objectFit: 'cover'  }} />
                                                                            }
                                                                            <p style={{fontSize: '13px', textAlign: 'center'}}>{data.username}</p>
                                                                        </div>
                                                                        </div>
                                                                        </>                              
                                                                    ))}
                                                                    <div className="divider mb-4 pointer-change">
                                                                        <span></span>
                                                                        <span className="text-center mx-3 mb-0" style={{color: '#a2aab7'}} onClick={() => {setShow(true); window.scrollTo(0, 0);}}>Load More</span>
                                                                        <span></span>
                                                                    </div>
                                                                    </> }

                                                                    {ReplyInput === true ?
                                                                    <div className="form-outline">
                                                                        <textarea className="form-control" id="textAreaExample" rows="4" value={comment} onChange={(e) => setcomment(e.target.value)}></textarea>
                                                                        <label className="form-label">Type your message</label><br/>
                                                                        <button className="btn btn-primary" onClick={NewChat}>Submit</button>
                                                                    </div> : null }

                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                       
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
