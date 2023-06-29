import Sidebar from "./Sidebar";
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Unauthorized from "./Unauthorized";
import EmployeesService from "../services/EmployeesService";
import EmergencyContactService from "../services/EmergencyContactService";
import FamilyDetailService from "../services/FamilDetailService";
import QualificationService from "../services/QualificationService";
import ProfessionalQualificationService from "../services/ProfessionalQualification";
import DataTable from 'react-data-table-component';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {BiArrowBack} from 'react-icons/bi';
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";

export default function EmployeeInfo(){


    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    const employee_id = useParams().employee_id;
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [Employee_data, setEmployee] = useState([]);
    const [EmergencyContact, setEmergencyContact] = useState([]);
    const [FamilyDetail, setFamilyDetail] = useState([]);
    const[QualificationDetail, setQualificationDetail] = useState([]);
    const[ProfessionalQualificationDetail,setProfessionalQualificationDetail] = useState([]);

    const [websiteUrl, setwebsiteUrl] = useState("");
    const [githubUrl, setgithubUrl] = useState("");
    const [twitterUrl, settwitterUrl] = useState("");
    const [instagramUrl, setinstagramUrl] = useState("");
    const [facebookUrl, setfacebookUrl] = useState("");


    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }
    
        function findEmployee(){
            EmployeesService.findByEmployee_id(employee_id)
            .then(response => {
                setEmployee(response.data);
              })
              .catch(e => {
                console.log(e);
              });
        }

        function findEmergencyContact(){
            EmergencyContactService.findEmergencyInfo(employee_id)
            .then(response => {
                setEmergencyContact(response.data);
            })
            .catch(e => {
                console.log(e);
            })
        }

        function findFamilyDetails(){
            FamilyDetailService.findFamilyDetail(employee_id)
            .then(response => {
                setFamilyDetail(response.data)
            })
            .catch(e => {
                console.log(e);
            })
        }

        function findQualificationDetails(){
            QualificationService.findQualificationDetail(employee_id)
            .then(response => {
                setQualificationDetail(response.data)
            })
            .catch(e => {
                console.log(e);
            })
        }

        function findProfessionalQualificationDetails(){
            ProfessionalQualificationService.findProfessionalQualificationDetail(employee_id)
            .then(response => {
                setProfessionalQualificationDetail(response.data)
            })
            .catch(e => {
                console.log(e);
            })
        }

        function profileLinks(){
            EmployeesService.ProfileLinks(employee_id)
            .then((response) => {
                if(response.data.msg === "No Data"){
                    setwebsiteUrl("-");
                    setgithubUrl("-");
                    settwitterUrl("-");
                    setinstagramUrl("-");
                    setfacebookUrl("-");
                }else{
                    setwebsiteUrl(response.data.websiteUrl);
                    setgithubUrl(response.data.githubUrl);
                    settwitterUrl(response.data.twitterUrl);
                    setinstagramUrl(response.data.instagramUrl);
                    setfacebookUrl(response.data.facebookUrl);
                }
                
            })
            .catch((e) => {
                console.log(e);
            })
        }

        const parseJwt = (id) => {
            dispatch(refreshToken({_id : id}))
            
        };


    useEffect(() => {

        findEmployee();
        findEmergencyContact();
        findFamilyDetails();
        findQualificationDetails();
        findProfessionalQualificationDetails();
        profileLinks();

        const AccountInfo = localStorage.getItem('store')
        const userInfo1 = JSON.parse(AccountInfo);
        const minutes = 4 * 60 * 1000;
          
        if(navigator.onLine === true){
        const interval = setInterval(() => {
            parseJwt(userInfo1._id)
          }, minutes);
        
          return () => clearInterval(interval);
        }
        else{
            dispatch(logout())
        }
        // eslint-disable-next-line
    }, [employee_id]);



   const convertedQualificationDetails = []
   for(let i =0; i< QualificationDetail.length;i++){
       convertedQualificationDetails.push({
           _id:  QualificationDetail[i]._id,
           employee_id: QualificationDetail[i].employee_id,
           degree: QualificationDetail[i].degree,
           institute: QualificationDetail[i].institute,
           from_date: convert(QualificationDetail[i].from_date),
           to_date: convert(QualificationDetail[i].to_date),
           complete_year: QualificationDetail[i].complete_year,
           gpa_Score: QualificationDetail[i].gpa_Score,
       })
   }

   const convertedProfessionalQualificationDetail = []
   for(let i=0; i<ProfessionalQualificationDetail.length; i++){
        convertedProfessionalQualificationDetail.push({
            _id:  ProfessionalQualificationDetail[i]._id,
            employee_id: ProfessionalQualificationDetail[i].employee_id,
            company: ProfessionalQualificationDetail[i].company,
            job_title: ProfessionalQualificationDetail[i].job_title,
            from_date: convert(ProfessionalQualificationDetail[i].from_date),
            to_date: convert(ProfessionalQualificationDetail[i].to_date),
        })
   }



    const Quacolumns = [
        {
            name: 'Degree',
            selector: row => row.degree,
            sortable: true,
        },
        {
            name: 'Institute',
            selector: row => row.institute,
            sortable: true,
        },
        {
            name: 'From Date',
            selector: row => row.from_date,
        },
        {
            name: 'To Date',
            selector: row => row.to_date,
        },
        {
            name: 'Completed Year',
            selector: row => row.complete_year,
            sortable: true,
        },
        {
            name: 'GPA Score',
            selector: row => row.gpa_Score,
        }
    ]

    const PQAcolumns = [
        {
            name: 'Company',
            selector: row => row.company,
            sortable: true,
        },
        {
            name: 'Job Title',
            selector: row => row.job_title,
            sortable: true,
        },
        {
            name: 'From Date',
            selector: row => row.from_date,
        },
        {
            name: 'To Date',
            selector: row => row.to_date,
        },
    ]

    const ECcolumns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Relation',
            selector: row => row.relation,
            sortable: true,
        },
        {
            name: 'Contact',
            selector: row => row.contact,
        },
    ]

    const FDcolumns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Relation',
            selector: row => row.relation,
            sortable: true,
        },
    ]

    if(userInfo.account_type=== "Admin" || userInfo.account_type === "Manager"){
        return(
               <div>
              <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                          <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                <div className="main-content">
                                    <div>
                                        <div className="d-flex justify-content-between">
                                                        <div className="mr-auto p-2">
                                                            <h4 className="fw-bolder">Employee Info</h4 >
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
                                        
                                        <div className="col-md-4 mb-3">
                                        
                                        {Employee_data == null 
                                            ?<div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex flex-column align-items-center text-center">
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            :  <div className="card">
                                            <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                            {Employee_data.ProfileImg === "" ? null : 
                                            <img src={`http://localhost:5000/public/images/${Employee_data.profileimg}`} alt="Admin" className="rounded-circle" width="150"></img>
                                            
                                            }
                                                
                                                <div className="mt-3">
                                                <h4>{Employee_data.firstname}</h4>
                                                <p className="text-secondary mb-1">{Employee_data.email}</p>
                                                <p className="text-muted font-size-sm">Employee Id : {Employee_data.employee_id}</p>
                                                
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        }
                                    


                                        <div className="card mt-3">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap='round' strokeLinejoin='round' className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6> 
                                                <br/>
                                                <a className="text-primary textCut" style={{textDecoration : 'none'}} href={websiteUrl} target="_blank" rel="noopener noreferrer">{websiteUrl}</a>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap='round' strokeLinejoin='round' className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                                                <a className="text-primary textCut" style={{textDecoration : 'none'}} href={githubUrl} target="_blank" rel="noopener noreferrer">{githubUrl}</a>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                                                <a className="text-primary textCut" style={{textDecoration : 'none'}} href={twitterUrl} target="_blank" rel="noopener noreferrer">{twitterUrl}</a>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth='2'strokeLinecap='round'strokeLinejoin='round' className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                                                <a className="text-primary textCut" style={{textDecoration : 'none'}} href={instagramUrl} target="_blank" rel="noopener noreferrer">{instagramUrl}</a>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                                <a className="text-primary textCut" style={{textDecoration : 'none'}} href={facebookUrl} target="_blank" rel="noopener noreferrer">{facebookUrl}</a>
                                            </li>
                                            </ul>
                                        </div>
                                        </div>
                                        <div className="col-md-8">
                                        {Employee_data == null 
                                            ?<div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex flex-column align-items-center text-center">
                                                    <h4>No Details</h4>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        : <div className="card mb-3">
                                            <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <h6 className="mb-0">Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                {Employee_data.firstname}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                {Employee_data.email}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <h6 className="mb-0">Designation</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                {Employee_data.designation}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <h6 className="mb-0">Gender</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                {Employee_data.gender}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <h6 className="mb-0">Birth Date</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                {convert(Employee_data.birth_date)}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <h6 className="mb-0">Date of Anniversary</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                {convert(Employee_data.date_of_anniversary)}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                {Employee_data.address} {Employee_data.city} {Employee_data.state} {Employee_data.country} {Employee_data.pincode}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <h6 className="mb-0">Employee Status</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                {Employee_data.employee_status}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <h6 className="mb-0">Experience</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                {Employee_data.experience}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <h6 className="mb-0">Nationality</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                {Employee_data.nationality}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <h6 className="mb-0">Marital Status</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                {Employee_data.marital_status}
                                                </div>
                                            </div>
                                            <hr />
                                            
                                            </div>
                                            </div>
                                        }

                                    

                                        </div>
                                    </div>
                                    
                                    <div className="row  mb-3">
                                        <div className="col-md-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <Tabs
                                                            defaultActiveKey="ShowQualificationDetail"
                                                            id="uncontrolled-tab-example"
                                                            className="mb-3"
                                                            >
                                                            <Tab eventKey="ShowQualificationDetail" title="Qualification">
                                                                {QualificationDetail.length === 0 
                                                                ? <div className="card h-100">
                                                                    <div className="card-body">
                                                                    <h6 className="d-flex justify-content-end mb-3">No Details</h6>
                                                                    </div>
                                                                </div>
                                                                :<div className="card h-100">
                                                                    <div className="card-body">
                                                                        <DataTable 
                                                                            columns={Quacolumns}
                                                                            data={convertedQualificationDetails}
                                                                        />
                                                                        </div>
                                                                </div>
                                                                }

                                                            </Tab>
                                                            
                                                            <Tab eventKey="ShowProfessionalQualificationDetail" title="Professional Qualification">
                                                                {ProfessionalQualificationDetail.length === 0
                                                                ? <div className="card h-100">
                                                                        <div className="card-body">
                                                                            <h6 className="d-flex justify-content-end mb-3">No Details</h6>
                                                                        </div>
                                                                        
                                                                </div>
                                                                : <div className="card h-100">
                                                                    <div className="card-body">
                                                                        <DataTable 
                                                                            columns={PQAcolumns}
                                                                            data={convertedProfessionalQualificationDetail}
                                                                        />
                                                                        </div>
                                                                    </div>
                                                                }

                                                            </Tab>

                                                            <Tab eventKey="ShowEmergencyContact" title="Emergency Contact">
                                                                {// eslint-disable-next-line
                                                                    EmergencyContact.length == 0 
                                                                    ? (<div className="card h-100">
                                                                        <div className="card-body">
                                                                        <h6 className="d-flex justify-content-end mb-3">No Details</h6>
                                                                        </div>
                                                                    </div>
                                                                    )
                                                                    : (<div className="card h-100">
                                                                    <div className="card-body">
                                                                        <DataTable 
                                                                            columns={ECcolumns}
                                                                            data={EmergencyContact}
                                                                        />
                                                                    </div>
                                                                    </div>
                                                                    )
                                                                }


                                                            </Tab>

                                                            <Tab eventKey="ShowFamilyDetail" title="Family Detail">
                                                                {// eslint-disable-next-line
                                                                    FamilyDetail.length == 0 
                                                                    ?  (<div className="card h-100">
                                                                            <div className="card-body">
                                                                                <h6 className="d-flex justify-content-end mb-3">No Details</h6>
                                                                            </div>
                                                                        </div>)
                                                                    : ( <div className="card h-100">
                                                                            <div className="card-body">

                                                                                <DataTable
                                                                                    columns={FDcolumns}
                                                                                    data={FamilyDetail}
                                                                                />
                                                                            </div>
                                                                        </div> )
                                                                }
                                                            </Tab>

                                                    </Tabs>
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