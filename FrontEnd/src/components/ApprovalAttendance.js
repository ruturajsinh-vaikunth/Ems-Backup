import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import {BiArrowBack} from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import  { useState } from "react";
import AttendanceService from "../services/AttendanceService";
import { Button, Modal } from 'react-bootstrap';

export default function ApprovalAttendance(){
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [attendanceStatus, setattendanceStatus] = useState("Approve");
    const [reason, setReason] = useState("");
    const [inputBox, setInputBox] = useState(false);

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function onStatusChange(value){
        if(value === "Reject"){
            setInputBox(true);
        }
        else{
            setInputBox(false);
            setReason(null);
        }
    }

    function updateStatus(){
        AttendanceService.updateStatus(state._id,attendanceStatus,reason)
        .then(response => {
            if(response.status === 200){
                navigate("/attendance-admin");
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

    return(
        <div>
        <Header/>
        <Sidebar/>
        <div className="container">
            <div className="main-body">
    
                <div className="row gutters-sm">
                    <div className="col-md-12">
                    <NavLink to={{ pathname : "/attendance-admin"}} > 
                       <BiArrowBack  size={30} className="mt-2"/>
                    </NavLink>
                    <div className="card mt-3">
                        <div className="card-body">
                        
                        <p className="mt-2"> Attendance Status of 
                        <NavLink to={{ pathname: "/employee-info"}} state={{ employee_id: state.employee_id}} className="text-primary">
                            { state.employee_id}
                        </NavLink>
                          </p>
                            <div className="row">
                                <div className="card shadow m-2" style={{width: '20rem', backgroundColor: '#'}}>
                                    <div className="card-body m-2">
                                         Date : {state.date}<br/>
                                         In Time: {state.in_time}<br/>
                                         Out Time: {state.out_time}<br/>
                                         Type : {state.type}<br/>
                                         Status: {state.status}<br />


                                        <div className="row mt-4">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0">Status</h6>
                                            </div>
                                            <div className="col-sm-8">
                                                <select className="form-select" name='status' value={attendanceStatus} onChange={(e) => {
                                                                                                                                        setattendanceStatus(e.target.value);
                                                                                                                                        onStatusChange(e.target.value);
                                                                                                                                        }
                                                                                                                                    } required>
                                                    <option value="Approve">Approve</option>
                                                    <option value="Reject">Reject</option>
                                                </select>
                                            </div>
                                        </div>

                                        {
                                                inputBox ? 
                                                <><div className="row mt-3">
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Reason</h6>
                                                        </div>
                                                        <div className="col-sm-8" >
                                                            <input type="text" placeholder="Reason" className="form-control"  value={reason} onChange={(e) => setReason(e.target.value)}/>
                                                        </div>
                                                    </div>
                                                </> : null
                                            }

                                        <div className="row mt-3">
                                            <div className="col-sm-3">
                                                <button className="btn btn-primary" onClick={handleShow}>Update</button>
                                            </div>
                                            <div className="col-sm-3 ml-5" >
                                            <NavLink to={{ pathname : "/attendance-admin"}} > 
                                                <button className="btn btn-danger">Cancel</button>
                                            </NavLink>
                                            </div>
                                        </div>

                                        <Modal show={showModal} onHide={handleClose} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm To {attendanceStatus} Status</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <Button variant="info" onClick={updateStatus} className="mr-2">
                                    Update
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                     Cancel
                                </Button>
                            </Modal.Body>
                            </Modal>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}