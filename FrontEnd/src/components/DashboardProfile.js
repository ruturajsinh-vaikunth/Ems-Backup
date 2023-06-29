
import Sidebar from "./Sidebar";
import http from '../http-common';
import { IoIosAddCircle } from 'react-icons/io';
import {useDispatch } from 'react-redux'
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import Unauthorized from "./Unauthorized";
import React, { useEffect, useState, useRef } from "react";
import EmployeesService from "../services/EmployeesService";
import EmergencyContactService from "../services/EmergencyContactService";
import FamilyDetailService from "../services/FamilDetailService";
import QualificationService from "../services/QualificationService";
import ProfessionalQualificationService from "../services/ProfessionalQualification";
import { Modal, Button } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import {FiEdit} from 'react-icons/fi';
import {FaUserEdit} from 'react-icons/fa';
import {RiDeleteBin6Fill} from 'react-icons/ri';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useForm } from 'react-hook-form';
import { findEmployeeByEmployeeid } from '../actions/employee';
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";

export default function DashboardProfile(){

    const dispatch = useDispatch()
    const inputRef = useRef(null);
    const { handleSubmit } = useForm()
    const [showModal, setShow] = useState(false);
    const [AddshowModal, setAddshowModal] = useState(false);
    const [showQuaEditModal, setQuaEditShow] = useState(false);
    const [showQuaDeleteModal, setQuaDeleteShow] = useState(false);

    const [showAQModal, setAQMoadl] = useState(false);
    const [showAPQModal, setAPQMoadl] = useState(false);
    const [showEditAPQModal, setEditAPQShow] = useState(false)
    const [showPQDeleteModal, setPQDeleteShow] = useState(false);

    const [showECModal, setECShow] = useState(false);
    const [showECDeleteModal, setECDeleteShow] = useState(false);
    const [showECAddModal, setECAddShow] = useState(false);

    const [showFDModal, setFDShow] = useState(false);
    const [showAddFDModal, setAddFDShow] = useState(false);
    const [showFDDeleteModal, setFDDeleteShow] = useState(false);

    const handleClose = () => setShow(false);
    const AddhandleClose = () => setAddshowModal(false);
    const handleQuaEditClose = () => setQuaEditShow(false);
    const handleQuaDeleteClose = () => setQuaDeleteShow(false);

    const handleAQClose = () => setAQMoadl(false);
    const handleAPQClose = () => setAPQMoadl(false);
    const handleEditAPQClose = () => setEditAPQShow(false);
    const handlePQDeleteClose = () => setPQDeleteShow(false);

    const handleECClose = () => setECShow(false);
    const handleECDeleteClose = () => setECDeleteShow(false);
    const handleECAddClose = () => setECAddShow(false);

    const handleFDClose = () => setFDShow(false);
    const handleAddFDClose = () => setAddFDShow(false);
    const handleFDDeleteClose = () => setFDDeleteShow(false);

    const handleShow = () => setShow(true);
    const AddhandleShow = () => setAddshowModal(true);
    const handleQuaEditShow = () => setQuaEditShow(true);
    const handleQuaDeleteShow = () => setQuaDeleteShow(true);

    const handleAQShow = () => setAQMoadl(true);
    const handleAPQShow = () => setAPQMoadl(true);
    const handleEditAPQShow = () => setEditAPQShow(true);
    const handlePQDeleteShow = () => setPQDeleteShow(true);

    const handleECShow = () => setECShow(true);
    const handleECDeleteShow = () => setECDeleteShow(true);
    const handleECAddShow = () => setECAddShow(true);

    const handleFDshow = () => setFDShow(true);
    const handleAddFDshow = () => setAddFDShow(true);
    const handleFDDeleteShow = () => setFDDeleteShow(true);

    const [showLinkModal, setLinkshow] = useState(false);
    const handleLinkClose = () => setLinkshow(false);
    const handleLinkshow = () => setLinkshow(true);

    
    const AccountInfo = localStorage.getItem('store')
    const userInfo1 = JSON.parse(AccountInfo);

     const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };


    const [Employee_data, setEmployee] = useState([]);
    const [EmergencyContact, setEmergencyContact] = useState([]);
    const [FamilyDetail, setFamilyDetail] = useState([]);
    const[QualificationDetail, setQualificationDetail] = useState([]);
    const[ProfessionalQualificationDetail,setProfessionalQualificationDetail] = useState([]);


    const [addfirstname, setaddfirstname] = useState("");
    const [addemail, setaddemail] = useState("");
    const [adddesignation, setadddesignation] = useState("");
    const [addgender, setaddgender] = useState("Male");
    const [addbirth_date, setaddbirth_date] = useState("");
    const [addaddress, setaddaddress] = useState("");
    const [adddate_of_anniversary, setadddate_of_anniversary] = useState("");
    const [addcity, setaddcity] = useState("");
    const [addstate, setaddstate] = useState("");
    const [addcountry, setaddcountry] = useState("");
    const [addpincode, setaddpincode] = useState("");
    const [addexperience, setaddexperience] = useState("0 to 1 Year");
    const [addnationality, setaddnationality] = useState("");
    const [addmarital_status, setaddmarital_status] = useState("Married");

    const [_id, setid] = useState("")
    const [firstname, setfirstname] = useState("");
    const [email, setemail] = useState("");
    const [designation, setdesignation] = useState("");
    const [gender, setgender] = useState("");
    const [Bdate, setBdate] = useState("");
    const [Date_of_anniversary, setDate_of_anniversary] = useState("");
    const [address, setaddress] = useState("");
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [country, setcountry] = useState("");
    const [pincode, setpincode] = useState("");
    const [experience, setexperience] = useState("");
    const [nationality, setnationality] = useState("");
    const [marital_status, setmarital_status] = useState("");
    const [ProfileImg, setProfileImg] = useState("");

    const [degree, setdegree] = useState("BTech");
    const [degreeName, setdegreeName] = useState("");
    const [institute, setinstitute] = useState("");
    const [from_date, setfrom_date] = useState("");
    const [to_date, setto_date] = useState("");
    const [complete_year, setcompleted_year] = useState("");
    const [gpa_Score, setgpa_score] = useState("");

    const [company, setcompany] = useState("");
    const [job_title, setjob_title] = useState("");
    const [pq_from_date, setpqfrom_date] = useState("");
    const [pq_to_date, setpqto_date] = useState("");

    const[AddECname, setAddECname] = useState("");
    const[AddECrelation, setAddECrelation] = useState("Father")
    const[AddECcontact, setAddECcontact] = useState("");

    const[AddFDname, setAddFDname] = useState("");
    const[AddFDrelation, setAddFDrelation] = useState("Father");

    const [FirstnameError, setFirstnameError] = useState("");
    const [emailError, setemailError] = useState("");
    const [DesignationError, setDesignationError] = useState("");
    const [addressError, setaddressError] = useState("");
    const [cityError, setcityError] = useState("");
    const [stateError, setstateError] = useState("");
    const [countryError, setcountryError] = useState("");
    const [pincodeError, setpincodeError] = useState("");

    const [AddFirstnameError, setAddFirstnameError] = useState("");
    const [AddemailError, setAddemailError] = useState("");
    const [AddDesignationError, setAddDesignationError] = useState("");
    const [AddaddressError, setAddaddressError] = useState("");
    const [AddcityError, setAddcityError] = useState("");
    const [AddstateError, setAddstateError] = useState("");
    const [AddcountryError, setAddcountryError] = useState("");
    const [AddpincodeError, setAddpincodeError] = useState("");
    const [AddexperienceError, setAddexperienceError] = useState("");
    const [AddnationalityError, setAddnationalityError] = useState("");

    const [degreenameError, setdegreenameError] = useState("");
    const [instituteError, setinstituteError] = useState("");
    const [completedyearError, setcompletedyearError] = useState("");
    const [gpascoreError, setgpascoreError] = useState("");

    const [companyError, setcompanyError] = useState("");
    const [jobtitleError, setjobtitleError] = useState("");

    const [AddECnameError, setAddECnameError] = useState("");
    const [AddFDnameError, setAddFDnameError] = useState("");
    const [AddECContactError, setAddECContactError] = useState("");
    const [relationnameError, setrelationnameError] = useState("");
    const [FDNameError, setFDNameError] = useState("");
    const [FDrelationnamError, setFDrelationnamError] = useState("");

    const [EditECnameError, setEditECnameError] = useState("");
    const [EditECContactError, setEditECContactError] = useState("");
    const [EditECContactError1, setEditECContactError1] = useState("");

    const [EditQuaInstituteError, setEditQuaInstituteError] = useState("");
    const [EditQuaCompleteYearError, setEditQuaCompleteYearError] = useState("");
    const [EditQuaGPAError, setEditQuaGPAError] = useState("");

    const [EditPQCompanyError , setEditPQCompanyError] = useState("");
    const [EditPQJobTitleError , setEditPQJobTitleError] = useState("");

    const [websiteUrlError, setwebsiteUrlError] = useState("");
    const [githubUrlError, setgithubUrlError] = useState("");
    const [twitterUrlError, settwitterUrlError] = useState("");
    const [instagramUrlError, setinstagramUrlError] = useState("");
    const [facebookUrlError, setfacebookUrlError] = useState("");

    const [selectedImage, setSelectedImage] = useState();
    const [PreviewFile, setPreviewFile] = useState();
    const [updatebuttonshow, setupdatebuttonshow] = useState(false);
    const [BackendError, setBackendError] = useState([]);
    const [AddQualificationError, setAddQualificationError] = useState([]);
    const [EditQualificationError, setEditQualificationError] = useState([]);
    const [EmailError, setEmailError] = useState("");

    const [QuaEditid , setQuaEditid] = useState("")
    const [QuaEditdegree , setQuaEditdegree] = useState("")
    const [QuaEditinstitute , setQuaEditinstitute] = useState("")
    const [QuaEditfromdate , setQuaEditfromdate] = useState("")
    const [QuaEdittodate , setQuaEdittodate] = useState("")
    const [QuaEditcompleteyear , setQuaEditcompleteyear] = useState("")
    const [QuaEditgpaScore, setQuaEditgpaScore] = useState("")

    const [PQEditid, setPQEditid] = useState("")
    const [PQEditcompany, setPQEditcompany] = useState("")
    const [PQEditjobtitle, setPQEditjobtitle] = useState("")
    const [PQEditfromdate, setPQEditfromdate] = useState("")
    const [PQEdittodate, setPQEdittodate] = useState("")

    const [ECEditid, setECEditid] = useState("")
    const [ECEditname, setECEditname] = useState("")
    const [ECEditrelation, setECEditrelation] = useState("")
    const [ECEditcontact, setECEditcontact] = useState("")

    const [FDEditid, setFDEditid] = useState("")
    const [FDEditname, setFDEditname] = useState("")
    const [FDEditrelation, setFDEditrelation] = useState("")

    const [websiteUrl, setwebsiteUrl] = useState("");
    const [githubUrl, setgithubUrl] = useState("");
    const [twitterUrl, settwitterUrl] = useState("");
    const [instagramUrl, setinstagramUrl] = useState("");
    const [facebookUrl, setfacebookUrl] = useState("");


    const [DeleteQuaAlert, setDeleteQuaAlert] = useState(false);
    const [DeletePQAlert, setDeletePQAlert] = useState(false);
    const [DeleteECAlert, setDeleteECAlert] = useState(false);
    const [DeleteFDAlert, setDeleteFDAlert] = useState(false);

    const [ProfileUpdateAlert, setProfileUpdateAlert] = useState(false);

    const [AddQuaAlert, setAddQuaAlert] = useState(false);
    const [AddPQAlert, setAddPQAlert] = useState(false);
    const [AddFDAlert, setAddFDAlert] = useState(false);
    const [AddECAlert, setAddECAlert] = useState(false);

    const [EditURLAlert, setEditURLAlert] = useState(false);

    const [EditQuaAlert, setEditQuaAlert] = useState(false);
    const [EditPQAlert, setEditPQAlert] = useState(false);
    const [EditFDAlert, setEditFDAlert] = useState(false);
    const [EditECAlert, setEditECAlert] = useState(false);

    const [AddRelationName, setAddRelationName] = useState("");
    const [AddFDRelationName, setAddFDRelationName] = useState("");
    const [EditFDRelationName, setEditFDRelationName] = useState("");

    let  employee_id  = userInfo1.employee_id;


    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }

    function convertYYMMDD(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear() , mnth, day ].join("-");
    }

        const findEmployee = () => {
            EmployeesService.findByEmployee_id(userInfo1.employee_id)
            .then(response => {
                setEmployee(response.data);
                setid(response.data._id);
                setfirstname(response.data.firstname);
                setemail(response.data.email);
                setdesignation(response.data.designation);
                setgender(response.data.gender);
                setBdate(convertYYMMDD(response.data.birth_date));
                setDate_of_anniversary(convertYYMMDD(response.data.date_of_anniversary));
                setaddress(response.data.address);
                setcity(response.data.city);
                setstate(response.data.state);
                setcountry(response.data.country);
                setpincode(response.data.pincode);
                setexperience(response.data.experience);
                setnationality(response.data.nationality);
                setmarital_status(response.data.marital_status);
                setProfileImg(response.data.profileimg)
              })
              .catch(e => {
                console.log(e);
              });
        }


        function findEmergencyContact(){
            EmergencyContactService.findEmergencyInfo(userInfo1.employee_id)
            .then(response => {
                setEmergencyContact(response.data);
            })
            .catch(e => {
                console.log(e);
            })
        }

        function findFamilyDetails(){
            FamilyDetailService.findFamilyDetail(userInfo1.employee_id)
            .then(response => {
                setFamilyDetail(response.data)
            })
            .catch(e => {
                console.log(e);
            })
        }

        function findQualificationDetails(){
            QualificationService.findQualificationDetail(userInfo1.employee_id)
            .then(response => {
                setQualificationDetail(response.data)
            })
            .catch(e => {
                console.log(e);
            })
        }

        function findProfessionalQualificationDetails(){
            ProfessionalQualificationService.findProfessionalQualificationDetail(userInfo1.employee_id)
            .then(response => {
                setProfessionalQualificationDetail(response.data)
            })
            .catch(e => {
                console.log(e);
            })
        }


        const submitForm = () => {
            
            if(!firstname || /^\s*$/.test(firstname)){
                setFirstnameError("Please Enter Email")
                return;
            }
            else{
                setFirstnameError("")
            }

            if(!email || /^\s*$/.test(email)){
                setemailError("Please Enter Email")
                return;
            }
            else{
                setemailError("")
            }

            if(!designation || /^\s*$/.test(designation)){
                setDesignationError("Please Enter Designation")
                return;
            }
            else{
                setDesignationError("")
            }

            if(!address || /^\s*$/.test(address)){
                setaddressError("Please Enter address")
                return;
            }
            else{
                setaddressError("")
            }

            if(!city || /^\s*$/.test(city)){
                setcityError("Please Enter city")
                return;
            }
            else{
                setcityError("")
            }

            if(!state || /^\s*$/.test(state)){
                setstateError("Please Enter state")
                return;
            }
            else{
                setstateError("")
            }

            if(!country || /^\s*$/.test(country)){
                setcountryError("Please Enter country")
                return;
            }
            else{
                setcountryError("")
            }

            if(!pincode || /^\s*$/.test(pincode)){
                setpincodeError("Please Enter pincode")
                return;
            }
            else{
                setpincodeError("")
            }
            
            let birth_date = Bdate;
            let date_of_anniversary = Date_of_anniversary;

                EmployeesService.updateEmployee({_id, employee_id,firstname,email,designation,gender,birth_date,date_of_anniversary,address,city,state,country,pincode,experience,nationality,marital_status})
                .then(response => {
                    if(response.status === 200){
                        findEmployee();
                        handleClose();
                        setBackendError("")
                        setFirstnameError("")
                        setEmailError("")
                        setProfileUpdateAlert(true);
                    }
                })
                .catch((e) => {
                    setBackendError(e.response.data.details)
                    setEmailError(e.response.data.msg);
                }
                );

            
        }

        function handlesetDetails(firstName, email){
            setaddfirstname(firstName)
            setaddemail(email)
        }

        const submitAddDetailsForm = () => {

            if(!addfirstname || /^\s*$/.test(addfirstname) ){
                setAddFirstnameError("Please Enter Firstname")
                return;
            }
            else{
                setAddFirstnameError("")
            }

            if(!addemail || /^\s*$/.test(addemail)){
                setAddemailError("Please Enter Email")
                return;
            }
            else{
                setAddemailError("")
            }

            if(!adddesignation || /^\s*$/.test(adddesignation)){
                setAddDesignationError("Please Enter Designation")
                return;
            }
            else{
                setAddDesignationError("")
            }

            if(!addaddress || /^\s*$/.test(addaddress)){
                setAddaddressError("Please Enter address")
                return;
            }
            else{
                setAddaddressError("")
            }

            if(!addcity || /^\s*$/.test(addcity)){
                setAddcityError("Please Enter city")
                return;
            }
            else{
                setAddcityError("")
            }

            if(!addstate || /^\s*$/.test(addstate)){
                setAddstateError("Please Enter state")
                return;
            }
            else{
                setAddstateError("")
            }

            if(!addcountry || /^\s*$/.test(addcountry)){
                setAddcountryError("Please Enter country")
                return;
            }
            else{
                setAddcountryError("")
            }

            if(!addpincode || /^\s*$/.test(addpincode)){
                setAddpincodeError("Please Enter pincode")
                return;
            }
            else{
                setAddpincodeError("")
            }

            if(!addexperience || /^\s*$/.test(addexperience)){
                setAddexperienceError("Please Enter experience")
                return;
            }
            else{
                setAddexperienceError("")
            }

            if(!addnationality || /^\s*$/.test(addnationality)){
                setAddnationalityError("Please Enter nationality")
                return;
            }
            else{
                setAddnationalityError("")
            }

            let addemployee_status = "Active"
            let addaccount_type = userInfo1.account_type

            EmployeesService.addEmployee({employee_id,addfirstname,addemail,adddesignation,addgender,addbirth_date,adddate_of_anniversary,addaddress,addcity,addstate,addcountry,addpincode,addemployee_status,addexperience,addnationality,addmarital_status,addaccount_type})
            .then(response => {
                if(response.data.msg === "employee added successfully"){
                    findEmployee();
                    AddhandleClose();
                }

            })
            .catch(e => {
                console.log(e);
            })
        }


        const submitQualificationForm = () => {

            

            if(!institute || /^\s*$/.test(institute) ){
                setinstituteError("Please Enter institute")
                return;
            }
            else{
                setinstituteError("")
            }

            if(!complete_year || /^\s*$/.test(complete_year) ){
                setcompletedyearError("Please Enter completed year")
                return;
            }
            else{
                setcompletedyearError("")
            }


            if(!gpa_Score || /^\s*$/.test(gpa_Score) ){
                setgpascoreError("Please Enter gpa score")
                return;
            }
            else{
                setgpascoreError("")
            }
            
            if(degree === ""){
                if(!degreeName || /^\s*$/.test(degreeName) ){
                    setdegreenameError("Please Enter Degree Name")
                    return;
                }
                else{
                    setdegreenameError("")
                }

                let degree = degreeName;
                QualificationService.addQualification({employee_id,degree,institute,from_date,to_date,complete_year,gpa_Score})
                .then(response => {
                    if(response.data.msg === ' Qualification added successfully'){
                        findQualificationDetails();
                        handleAQClose();
                        setAddQuaAlert(true)
                        setAddQualificationError("")
                        setdegree("")
                        setinstitute("")
                        setfrom_date("")
                        setto_date("")
                        setcompleted_year("")
                        setgpa_score("")
                    }
                })
                .catch(e => {
                    if(e.response.status === 400){
                        setAddQualificationError(e.response.data.details)
                    }
                })
            }else{
                QualificationService.addQualification({employee_id,degree,institute,from_date,to_date,complete_year,gpa_Score})
                .then(response => {
                    if(response.data.msg === ' Qualification added successfully'){
                        findQualificationDetails();
                        handleAQClose();
                        setAddQuaAlert(true)
                        setAddQualificationError("")
                        setdegree("")
                        setinstitute("")
                        setfrom_date("")
                        setto_date("")
                        setcompleted_year("")
                        setgpa_score("")
                    }
                })
                .catch(e => {
                    if(e.response.status === 400){
                        setAddQualificationError(e.response.data.details)
                    }
                })
            }
        }

        const submitProfessionalQualificationForm = () => {

            if(!company || /^\s*$/.test(company) ){
                setcompanyError("Please Enter company")
                return;
            }
            else{
                setcompanyError("")
            }

            if(!job_title || /^\s*$/.test(job_title) ){
                setjobtitleError("Please Enter job title")
                return;
            }
            else{
                setjobtitleError("")
            }

            ProfessionalQualificationService.addProfessionalQualification({employee_id,company,job_title,pq_from_date,pq_to_date})
            .then(response => {
                if(response.data.msg === 'ProfessionalQualification added successfully'){
                    findProfessionalQualificationDetails();
                    setAddPQAlert(true)
                    handleAPQClose();
                    setcompany("")
                    setjob_title("")
                    setpqfrom_date("")
                    setpqto_date("")
                }
            })
            .catch(e => {
                if(e.response.status === 400){
                    alert("All Fileds are required")
                }
            })
        }

        const submitEmergencyContactForm = () => {

            if(!AddECname || /^\s*$/.test(AddECname) ){
                setAddECnameError("Please Enter name")
                return;
            }
            else{
                setAddECnameError("")
            }
            

            if(!AddECcontact || AddECcontact.length !== 10 ){
                setAddECContactError("Number is must be 10 digits")
                return;
            }
            else{
                setAddECContactError("")
            }
            

            if(AddECrelation === ""){
                if(!AddRelationName || /^\s*$/.test(AddRelationName) ){
                    setrelationnameError("Please Enter Relation Name")
                    return;
                }
                else{
                    setrelationnameError("")
                }
                let AddECrelation = AddRelationName
                EmergencyContactService.addemergencycontact({employee_id,AddECname,AddECrelation,AddECcontact})
                .then(response => {
                    if(response.data.msg === 'EmergencyContact added successfully'){
                        findEmergencyContact();
                        handleECAddClose();
                        setAddECAlert(true)
                        setAddECname("")
                        setAddECrelation("")
                        setAddECcontact("")
                    }  
                })
                .catch(e => {
                    if(e.response.status === 400){
                        alert("All Fileds are required")
                    }
                })
            }else{
                EmergencyContactService.addemergencycontact({employee_id,AddECname,AddECrelation,AddECcontact})
                .then(response => {
                    if(response.data.msg === 'EmergencyContact added successfully'){
                        findEmergencyContact();
                        handleECAddClose();
                        setAddECAlert(true)
                        setAddECname("")
                        setAddECrelation("")
                        setAddECcontact("")
                    }  
                })
                .catch(e => {
                    if(e.response.status === 400){
                        alert("All Fileds are required")
                    }
                })  
            }
        }

        const submitFDForm = () => {

            if(!AddFDname || /^\s*$/.test(AddFDname) ){
                setAddFDnameError("Please Enter name")
                return;
            }
            else{
                setAddFDnameError("")
            }

            if(AddFDrelation === ""){
                if(!AddFDRelationName || /^\s*$/.test(AddFDRelationName) ){
                    setFDrelationnamError("Please Enter Relation name")
                    return;
                }
                else{
                    setFDrelationnamError("")
                }
                let AddFDrelation  = AddFDRelationName;
                FamilyDetailService.AddFamilyDetail({employee_id,AddFDname,AddFDrelation})
                .then(response => {
                    if(response.data.msg === 'familydetail added successfully'){
                        findFamilyDetails();
                        handleAddFDClose();
                        setAddFDAlert(true);
                        setAddFDname("")
                        setAddFDrelation("")
                    }  
                    
                })
                .catch(e => {
                    if(e.response.status === 400){
                        alert("All Fileds are required")
                    }
                })
            }else{
                FamilyDetailService.AddFamilyDetail({employee_id,AddFDname,AddFDrelation})
                .then(response => {
                    if(response.data.msg === 'familydetail added successfully'){
                        findFamilyDetails();
                        handleAddFDClose();
                        setAddFDAlert(true)
                        setAddFDname("")
                        setAddFDrelation("")
                    }  
                    
                })
                .catch(e => {
                    if(e.response.status === 400){
                        alert("All Fileds are required")
                    }
                })
            }
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

    var todayDate = new Date().toISOString().slice(0, 10);

    useEffect(() => {

        findEmployee();
        findEmergencyContact();
        findFamilyDetails();
        findQualificationDetails();
        findProfessionalQualificationDetails();
        profileLinks();
        findEmployeeByEmployeeid();

        

        const AccountInfo = localStorage.getItem('store')
        const userInfo1 = JSON.parse(AccountInfo);
        const minutes =  1 * 60 * 1000;
          
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

        // const token = localStorage.getItem('userToken');
        // if(!token){
        //     console.log("Token not");
        // }
        // else{
        //     const parseJwt = (token) => {        
        //         const decode = JSON.parse(atob(token.split('.')[1]));
        //         if (decode.exp * 1000 < new Date().getTime()) {
        //             // dispatch(logout())
        //             // navigate('/')
        //             localStorage.removeItem('userToken')
                    
        //         }
        //     };
        
        //     parseJwt(token)
        // }
       
        

        // eslint-disable-next-line
    }, [employee_id]);

    const EditLinkForm = () => {

        if(!websiteUrl || /^\s*$/.test(websiteUrl) ){
            setwebsiteUrlError("Please Enter websiteUrl")
            return;
        }
        else{
            setwebsiteUrlError("")
        }

        if(!githubUrl || /^\s*$/.test(githubUrl) ){
            setgithubUrlError("Please Enter githubUrl")
            return;
        }
        else{
            setgithubUrlError("")
        }

        if(!twitterUrl || /^\s*$/.test(twitterUrl) ){
            settwitterUrlError("Please Enter twitterUrl")
            return;
        }
        else{
            settwitterUrlError("")
        }

        if(!instagramUrl || /^\s*$/.test(instagramUrl) ){
            setinstagramUrlError("Please Enter instagramUrl")
            return;
        }
        else{
            setinstagramUrlError("")
        }

        if(!facebookUrl || /^\s*$/.test(facebookUrl) ){
            setfacebookUrlError("Please Enter facebookUrl")
            return;
        }
        else{
            setfacebookUrlError("")
        }

        EmployeesService.ProfileLinkEdit(employee_id, websiteUrl , githubUrl, twitterUrl, instagramUrl, facebookUrl)
        .then(response => {
            if(response.status === 200){
                handleLinkClose();
                profileLinks()
                setEditURLAlert(true);
            }
        })
        .catch(e => {
            console.log(e);
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
            selector: row => convert(row.from_date),
        },
        {
            name: 'To Date',
            selector: row => convert(row.to_date),
        },
        {
            name: 'Completed Year',
            selector: row => row.complete_year,
            sortable: true,
        },
        {
            name: 'GPA Score',
            selector: row => row.gpa_Score,
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <FiEdit size={26} className="pointer-change" title="Edit Details" onClick={() => {handleQuaEditShow(); handleQuaEdit(row._id, row.degree, row.institute, row.from_date, row.to_date, row.complete_year, row.gpa_Score)}} />
                    <RiDeleteBin6Fill size={26} className="ml-3 pointer-change" title="Delete Details" onClick={() => {handleQuaDeleteShow(); handleQuaEdit(row._id, row.degree, row.institute, row.from_date, row.to_date, row.complete_year, row.gpa_Score)}}/>
                </>
            ),
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
            selector: row => convert(row.from_date),
        },
        {
            name: 'To Date',
            cell: row => (
                <>
                {row.to_date === null ? <div>-</div> : <div>{convert(row.to_date)}</div>}
                </>
            )
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <FiEdit size={26} className="pointer-change" title="Edit Details" onClick={() => {handleEditAPQShow(); handlePQEdit(row._id, row.company, row.job_title, row.from_date, row.to_date)}} />
                    <RiDeleteBin6Fill size={26} className="ml-3 pointer-change" title="Delete Details" onClick={() => {handlePQDeleteShow(); handlePQEdit(row._id, row.company, row.job_title, row.from_date, row.to_date)}}/>
                </>
            ),
        }
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
        {
            name: 'Action',
            cell: row => (
                <>
                    <FiEdit size={26} className="pointer-change" title="Edit Details" onClick={() => {handleECShow(); handleECEdit(row._id, row.name, row.relation, row.contact)}} />
                    <RiDeleteBin6Fill size={26} className="ml-3 pointer-change" title="Delete Details" onClick={() => {handleECDeleteShow(); handleECEdit(row._id, row.name, row.relation, row.contact)}}/>
                </>
            ),
        }
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
        {
            name: 'Action',
            cell: row => (
                <>
                    <FiEdit size={26} className="pointer-change" title="Edit Details" onClick={() => {handleFDshow(); handleFDEdit(row._id, row.name, row.relation)}} />
                    <RiDeleteBin6Fill size={26} className="ml-3 pointer-change" title="Delete Details" onClick={() => {handleFDDeleteShow(); handleFDEdit(row._id, row.name, row.relation);}}/>
                </>
            ),
        }
    ]

    const handleQuaEdit = (_id, degree, institute, from_date, to_date, complete_year, gpa_Score) =>{
        setQuaEditid(_id);
        setQuaEditdegree(degree);
        setQuaEditinstitute(institute);
        setQuaEditfromdate(convertYYMMDD(from_date));
        setQuaEdittodate(convertYYMMDD(to_date));
        setQuaEditcompleteyear(complete_year);
        setQuaEditgpaScore(gpa_Score);
    }

    const handlePQEdit = (_id,company,job_title,from_date,to_date) => {
        setPQEditid(_id);
        setPQEditcompany(company);
        setPQEditjobtitle(job_title);
        setPQEditfromdate(convertYYMMDD(from_date));
        if(to_date === null){
            setPQEdittodate()
        }else{
            setPQEdittodate(convertYYMMDD(to_date));
        }
        
    }

    const handleECEdit = (_id, name, relation,contact) => {
        setECEditid(_id);
        setECEditname(name);
        setECEditrelation(relation);
        setECEditcontact(contact);
    }

    const handleFDEdit = (_id, name, relation) => {
        setFDEditid(_id);
        setFDEditname(name);
        setFDEditrelation(relation);
    }

    const EditQualificationForm = () => {

        if(!QuaEditinstitute || /^\s*$/.test(QuaEditinstitute) ){
            setEditQuaInstituteError("Please Enter institute")
            return;
        }
        else{
            setEditQuaInstituteError("")
        }

        if(!QuaEditcompleteyear || /^\s*$/.test(QuaEditcompleteyear) ){
            setEditQuaCompleteYearError("Please Enter completed year")
            return;
        }
        else{
            setEditQuaCompleteYearError("")
        }

        if(!QuaEditgpaScore || /^\s*$/.test(QuaEditgpaScore) ){
            setEditQuaGPAError("Please Enter GPA Score")
            return;
        }
        else{
            setEditQuaGPAError("")
        }

        if(QuaEditdegree === ""){
            if(!degreeName || /^\s*$/.test(degreeName) ){
                setdegreenameError("Please Enter Degree Name")
                return;
            }
            else{
                setdegreenameError("")
            }

            let QuaEditdegree = degreeName;

            QualificationService.EditQualification(QuaEditid, QuaEditdegree, QuaEditinstitute, QuaEditfromdate, QuaEdittodate, QuaEditcompleteyear, QuaEditgpaScore)
            .then(response => {
                if(response.status === 200){
                    handleQuaEditClose();
                    setEditQuaAlert(true);
                    findQualificationDetails();
                    setEditQualificationError("");
                }
            })
            .catch(e => {
                // if(e.response.data.message === "Not authorized, invalid token"){
                //     const token = localStorage.getItem('userToken')
                //     const AccountInfo = localStorage.getItem('store')
                //     const userInfo1 = JSON.parse(AccountInfo);

                //     parseJwt(token, userInfo1._id)
                // }
                setEditQualificationError(e.response.data.details)
            })
        }else{
            QualificationService.EditQualification(QuaEditid, QuaEditdegree, QuaEditinstitute, QuaEditfromdate, QuaEdittodate, QuaEditcompleteyear, QuaEditgpaScore)
            .then(response => {
                if(response.status === 200){
                    handleQuaEditClose();
                    setEditQuaAlert(true);
                    findQualificationDetails();
                    setEditQualificationError("");
                }
            })
            .catch(e => {
                // if(e.response.data.message === "Not authorized, invalid token"){
                //     const token = localStorage.getItem('userToken')
                //     const AccountInfo = localStorage.getItem('store')
                //     const userInfo1 = JSON.parse(AccountInfo);

                //     parseJwt(token, userInfo1._id)
                // }
                setEditQualificationError(e.response.data.details)
            })
        }
    }

    const EditProfessionalQualification = () => {

        if(!PQEditcompany || /^\s*$/.test(PQEditcompany) ){
            setEditPQCompanyError("Please Enter CompanyName")
            return;
        }
        else{
            setEditPQCompanyError("")
        }

        if(!PQEditjobtitle || /^\s*$/.test(PQEditjobtitle) ){
            setEditPQJobTitleError("Please Enter JobTitle")
            return;
        }
        else{
            setEditPQJobTitleError("")
        }

        ProfessionalQualificationService.EditProfessionalQualification(PQEditid, PQEditcompany, PQEditjobtitle, PQEditfromdate, PQEdittodate)
        .then(response => {
            if(response.status === 200){
                handleEditAPQClose();
                setEditPQAlert(true);
                findProfessionalQualificationDetails();
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

    const updateEmergencyContact = () => {

        if(!ECEditname || /^\s*$/.test(ECEditname) ){
            setEditECnameError("Please Enter name")
            return;
        }
        else{
            setEditECnameError("")
        }
        

        if(!ECEditcontact || ECEditcontact.length < 10 ){
            setEditECContactError("Number is must be 10 digits")
            return;
        }
        else{
            setEditECContactError("")
        }
        if(!ECEditcontact || ECEditcontact.length > 10){
            setEditECContactError1("Number is must be 10 digits")
            return;
        }else{
            setEditECContactError1("")
        }

        if(ECEditrelation === ""){
            if(!AddRelationName || /^\s*$/.test(AddRelationName) ){
                setrelationnameError("Please Enter Relation Name")
                return;
            }
            else{
                setrelationnameError("")
            }

            let ECEditrelation = AddRelationName
            EmergencyContactService.EditEmergencycontact(ECEditid, ECEditname, ECEditrelation, ECEditcontact)
            .then(response => {
                if(response.status === 200){
                    handleECClose();
                    setEditECAlert(true)
                    findEmergencyContact();
                }
            })
            .catch(e => {
                console.log(e);
            })
        }else{
            EmergencyContactService.EditEmergencycontact(ECEditid, ECEditname, ECEditrelation, ECEditcontact)
            .then(response => {
                if(response.status === 200){
                    handleECClose();
                    setEditECAlert(true)
                    findEmergencyContact();
                }
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    const updateFamilyDetails = () => {
        if(!FDEditname || /^\s*$/.test(FDEditname) ){
            setFDNameError("Please Enter name")
            return;
        }
        else{
            setFDNameError("")
        }
        if(FDEditrelation === ""){
            if(!EditFDRelationName || /^\s*$/.test(EditFDRelationName) ){
                setFDrelationnamError("Please Enter Relation name")
                return;
            }
            else{
                setFDrelationnamError("")
            }
            let FDEditrelation  = EditFDRelationName;
            FamilyDetailService.EditFamilyDetail(FDEditid, FDEditname, FDEditrelation)
            .then(response => {
                if(response.status === 200){
                    handleFDClose();
                    setEditFDAlert(true)
                    findFamilyDetails();
                }
            })
            .catch(e => {
                console.log(e);
            })
        }else{
            FamilyDetailService.EditFamilyDetail(FDEditid, FDEditname, FDEditrelation)
            .then(response => {
                if(response.status === 200){
                    handleFDClose();
                    setEditFDAlert(true)
                    findFamilyDetails();
                }
            })
            .catch(e => {
                console.log(e);
            })
        }
    } 


    const DeleteQua = (_id) => {
        QualificationService.DeleteQualification(_id)
        .then(response => {
            if(response.status === 200){
                handleQuaDeleteClose();
                setDeleteQuaAlert(true)
                findQualificationDetails();
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

    const DeletePQ = (_id) => {
        ProfessionalQualificationService.DeleteProfessionalQualification(_id)
        .then(response => {
            if(response.status === 200){
                handlePQDeleteClose();
                setDeletePQAlert(true)
                findProfessionalQualificationDetails();
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

    
    const DeleteEC = (_id) => {
        EmergencyContactService.Deleteemergencycontact(_id)
        .then(response => {
            if(response.status === 200){
                handleECDeleteClose();
                setDeleteECAlert(true)
                findEmergencyContact();
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

    const DeleteFD = (_id) => {
        FamilyDetailService.DeleteFamilyDetail(_id)
        .then(response => {
            if(response.status === 200){
                handleFDDeleteClose();
                setDeleteFDAlert(true)
                findFamilyDetails();
            }
        })
        .catch(e => {
            console.log(e);
        })
    }


    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedImage(e.target.files[0]);
          setPreviewFile(URL.createObjectURL(e.target.files[0]))
          setupdatebuttonshow(true)
        }
      };

    
    const profileImgChange = async() =>{
        const userToken = localStorage.getItem('userToken')
        const formData = new FormData();

        function getRandomFileName() {
            var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
            var random = ("" + Math.random()).substring(2, 8); 
            var random_number = timestamp+random;  
            return random_number;
          }
        
        formData.append('profileimg', selectedImage, getRandomFileName())
        
        formData.append("employee_id", employee_id)

        formData.append("oldImage", ProfileImg)
        
        const resp = await http.post(`/employee/profileimgadd`, formData, {
            headers: {
              "content-type": "multipart/form-data",
              'Authorization': `Bearer ${userToken}`,
            },
          });

          if(resp.status === 200){
            findEmployee()
            setupdatebuttonshow(false)
          }
    }
    
    function uniqByKeepLast( data, key) {
        return [
  
            ...new Map(
  
                  data.map( x => [key(x), x])
  
            ).values( )
  
        ]
    }

    const Excludingothertype = QualificationDetail.filter(
        item => !item.degree.includes("Diploma") && !item.degree.includes("BTech") && !item.degree.includes("BE") && !item.degree.includes("BCA") && !item.degree.includes("MCA") && item.degree.includes(item.degree),
    );
    const othertype = uniqByKeepLast(Excludingothertype, it => it.degree)

    const ExcludingotherRelation = EmergencyContact.filter(
        data => !data.relation.includes("Father") && !data.relation.includes("Mother") && !data.relation.includes("Brother") && !data.relation.includes("Sister") && !data.relation.includes("GrandParents") && data.relation.includes(data.relation),
    );
    const otherRelation = uniqByKeepLast(ExcludingotherRelation, it => it.degree)

    const ExcludingFDotherRelation = FamilyDetail.filter(
        data => !data.relation.includes("Father") && !data.relation.includes("Mother") && !data.relation.includes("Brother") && !data.relation.includes("Sister") && !data.relation.includes("GrandParents") && data.relation.includes(data.relation),
    )
    const FDotherRelation = uniqByKeepLast(ExcludingFDotherRelation, it => it.degree)

    const handleClick = () => {
        inputRef.current.click();
      };

    const handleFromDate = (e) => {
        setfrom_date(e.target.value)
        document.getElementsByName("to_date_input")[0].setAttribute('min', e.target.value);
    }

    const handleFromDateUpdate = (e) => {
        setQuaEditfromdate(e.target.value)
        document.getElementsByName("to_date_update")[0].setAttribute('min', e.target.value);
    }

    const handleToDateUpdate = (e) => {
        document.getElementsByName("to_date_update")[0].setAttribute('min', QuaEditfromdate);
        setQuaEdittodate(e.target.value)
       
    }

    const handlepqFromdate = (e) => {
        setpqfrom_date(e.target.value)
        document.getElementsByName("pq_add_to_date")[0].setAttribute('min', e.target.value);
    }

    const handlepqEditToDate = (e) => {
        document.getElementsByName("pq_edit_to_date")[0].setAttribute('min', PQEditfromdate);
        setPQEdittodate(e.target.value)
    }

        
    if(userInfo1.account_type === "Employee"){
      return(
        <div>
              <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                          <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                <div className="main-content">
                                 
                                  
        
                                    <div className="row gutters-sm">
                                        <div className="col-md-4 mb-3">
                                        {Employee_data === null 
                                            ? <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex flex-column align-items-center text-center">
                                                    <div className="profile-pic">
                                                    <label className="-label">
                                                    <span className="glyphicon glyphicon-camera"></span>
                                                </label>
                                                <input id="file" type="file" accept="image/*" ref={inputRef} style={{display: "none"}} onChange={imageChange}/>
                                                        
                                                        <img  src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png' alt="Admin"  className="rounded-circle profile-img" width="150"></img>
                                                    </div>
                                                    <div>
                                                    {/* <button className="btn btn-outline border border-black btn-sm  pointer-change" onClick={handleClick}><FaUserEdit />Edit</button> */}
                                                        
                                                        {updatebuttonshow === true ?
                                                        <button className="btn btn-primary btn-sm ml-2" onClick={profileImgChange}>Change</button>
                                                        :
                                                        null
                                                        }
                                                    </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            :  <div className="card">
                                            <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                            <div className="profile-pic">
                                                <label className="-label">
                                                    <span className="glyphicon glyphicon-camera"></span>
                                                </label>
                                                <input id="file" type="file" accept="image/*" ref={inputRef} style={{display: "none"}} onChange={imageChange}/>
                                                
                                                {ProfileImg === undefined ? 
                                                        <img  src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png' alt="Admin"  className="rounded-circle profile-img" width="150"></img>
                                                :
                                                        <>{selectedImage === undefined ?
                                                            <> {ProfileImg === '' ? null : <img  src={`http://localhost:5000/public/images/${ProfileImg}`} alt="Admin"  className="rounded-circle profile-img" width="150"></img>}
                                                            </>
                                                            : <img  src={PreviewFile} alt="Admin"  className="rounded-circle profile-img" width="150"></img>
                                                        } </>
                                                }
                                            </div>
                                                <div>
                                                
                                                <button className="btn btn-primary btn-rounded btn-sm  pointer-change mt-2" onClick={handleClick}><FaUserEdit size={20} className="mr-1" />Edit</button>
                                                        
                                                {updatebuttonshow === true ?
                                                <button className="btn btn-primary btn-sm ml-2 mt-2" onClick={profileImgChange}>Change</button>
                                                :
                                                null
                                                }
                                                </div>
                                                
                                                                            
                                                
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
                                                {EditURLAlert === true ?
                                                    <div className="m-3"> 
                                                        <div className="alert alert-info alert-dismissible">
                                                            <strong>URL Details Updated!!</strong> Successfully.
                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setEditURLAlert(false)}>X</button>
                                                        </div>
                                                    </div> : null }
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

                                            <div className="mt-3 mb-3 mr-auto p-2">
                                            <button className="btn btn-primary btn-rounded btn-sm mt-1" onClick={handleLinkshow}><FiEdit size={26} className="mr-2" />Edit</button> 
                                            </div>

                                            <Modal show={showLinkModal} onHide={handleLinkClose} animation={false}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Edit Details</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <form onSubmit={handleSubmit(EditLinkForm)} className="leave-form ml-auto mr-auto">
                                                        <div className="row">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Website URL</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input type="text" className="form-control text-primary" name='websiteUrl' value={websiteUrl} onChange={(e) => setwebsiteUrl(e.target.value)} required/>
                                                                <p className="text-danger">{websiteUrlError}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Github URL</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input type="text" className="form-control text-primary" name='githubUrl' value={githubUrl} onChange={(e) => setgithubUrl(e.target.value)} required/>
                                                                <p className="text-danger">{githubUrlError}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Twitter URL</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input type="text" className="form-control text-primary" name='twitterUrl' value={twitterUrl} onChange={(e) => settwitterUrl(e.target.value)} required/>
                                                                <p className="text-danger">{twitterUrlError}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Instagram URL</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input type="text" className="form-control text-primary" name='instagramUrl' value={instagramUrl} onChange={(e) => setinstagramUrl(e.target.value)} required/>
                                                                <p className="text-danger">{instagramUrlError}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="row mt-2">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Facebook URL</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input type="text" className="form-control text-primary" name='facebookUrl' value={facebookUrl} onChange={(e) => setfacebookUrl(e.target.value)} required/>
                                                                <p className="text-danger">{facebookUrlError}</p>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row justify-content-end">
                                                            <div className="col-sm-3">
                                                                <button className="btn btn-primary btn-sm" type="submit">
                                                                    Submit
                                                                </button>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <button className="btn btn-secondary btn-sm" onClick={handleLinkClose}>
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </Modal.Body>
                                            </Modal>
                                        </div>


                                        </div>
                                        <div className="col-md-8">
                                        {Employee_data == null 
                                            ?<div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex flex-column align-items-center text-center">
                                                    <h4>Add Employee Details <IoIosAddCircle size={30} onClick={() => {AddhandleShow(); handlesetDetails(userInfo1.firstName, userInfo1.email)}}/></h4>
                                                    </div>
                                                </div>
                                                <Modal show={AddshowModal} onHide={AddhandleClose} animation={false} size="xl">
                                                    <Modal.Header closeButton>
                                                    <Modal.Title>Add Details</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                    <div className="card mb-3">
                                                    <div className="card-body">  
                                                    <form onSubmit={handleSubmit(submitAddDetailsForm)} className="leave-form ml-auto mr-auto">
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Name</h6>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Email</h6>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Designation</h6>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="col-sm-4">
                                                            <input type="text" className="form-control" name='firstname' value={addfirstname} onChange={(e) => setaddfirstname(e.target.value)} required/>
                                                            <p className="text-danger">{AddFirstnameError}</p> 
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type="email" className="form-control" name='email' value={addemail} onChange={(e) => setaddemail(e.target.value)}  required/>
                                                            <p className="text-danger">{AddemailError}</p> 
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type="text" className="form-control" name='designation' value={adddesignation} onChange={(e) => setadddesignation(e.target.value)} required />
                                                            <p className="text-danger">{AddDesignationError}</p> 
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="row mt-4">
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Gender</h6>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Birth Date</h6>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Date of anniversary</h6>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="col-sm-4">
                                                            <select className="custom-select" name='gender' value={addgender} onChange={(e) => setaddgender(e.target.value)} required>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type='date' className="form-control" name='Addbirth_date' value={addbirth_date} onChange={(e) => setaddbirth_date(e.target.value)} max={todayDate} required />
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type='date' className="form-control" name='date_of_anniversary' value={adddate_of_anniversary}  onChange={(e) => setadddate_of_anniversary(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="row mt-4">
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Address</h6>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">City</h6>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">State</h6>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="col-sm-4">
                                                            <input type="text" className="form-control" name='address' placeholder="address" value={addaddress} onChange={(e) => setaddaddress(e.target.value)} required/>
                                                            <p className="text-danger">{AddaddressError}</p> 
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type="text" className="form-control" name='city' placeholder="city"  value={addcity} onChange={(e) => setaddcity(e.target.value)} required/>
                                                            <p className="text-danger">{AddcityError}</p> 
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type="text" className="form-control" name='state' placeholder="state"  value={addstate} onChange={(e) => setaddstate(e.target.value)} required/>
                                                            <p className="text-danger">{AddstateError}</p> 
                                                        </div>
                                                        
                                                    </div>

                                                    <div className="row mt-4">
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Country</h6>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">PinCode</h6>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Experience</h6>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="col-sm-4">
                                                            <input type="text" className="form-control" name='country' placeholder="country"  value={addcountry} onChange={(e) => setaddcountry(e.target.value)}  required/>
                                                            <p className="text-danger">{AddcountryError}</p> 
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type="text" className="form-control" name='pincode' placeholder="pincode"  value={addpincode} onChange={(e) => setaddpincode(e.target.value)}  required/>
                                                            <p className="text-danger">{AddpincodeError}</p> 
                                                        </div>
                                                        <div className="col-sm-4">
                                                        <select className="custom-select" name='experience' value={addexperience} onChange={(e) => setaddexperience(e.target.value)} required>
                                                                <option value="0 to 1 Year">0 to 1 Year</option>
                                                                <option value="1 to 3 Year">1 to 3 Year</option>
                                                                <option value="3 to 5 Year">3 to 5 Year</option>
                                                                <option value="5 to 7 Year">5 to 7 Year</option>
                                                                <option value="7 to 9 Year">7 to 10 Year</option>
                                                                <option value="10+ Years">10+ Years</option>
                                                            </select>
                                                            <p className="text-danger">{AddexperienceError}</p> 
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                    <div className="row mt-4">
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Nationality</h6>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Marital Status</h6>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="row mt-1">
                                                        <div className="col-sm-4">
                                                            <input type="text" className="form-control" name='nationality' value={addnationality} onChange={(e) => setaddnationality(e.target.value)} required/>
                                                            <p className="text-danger">{AddnationalityError}</p> 
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <select className="custom-select" name='marital_status' value={addmarital_status} onChange={(e) => setaddmarital_status(e.target.value)} required>
                                                                <option value="Married">Married</option>
                                                                <option value="Unmarried">Unmarried</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="row d-flex justify-content-end mt-4">
                                                        <div className="col-sm-3">
                                                            <button className="btn btn-primary btn-sm" type="submit">
                                                                Submit
                                                            </button>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <button className="btn btn-secondary btn-sm" onClick={AddhandleClose}>
                                                                Cancel
                                                            </button>
                                                            </div>
                                                    </div>
                                                    </form>
                                                    </div>
                                                    </div>
                                                    </Modal.Body>
                                                </Modal>
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
                                                {convert(Bdate)}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                <h6 className="mb-0">Date of Anniversary</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                {convert(Date_of_anniversary)}
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
                                            {ProfileUpdateAlert === true ?
                                                                <div className="m-1"> 
                                                                    <div className="alert alert-success alert-dismissible">
                                                                        <strong>Profile Updated!!</strong> Successfully.
                                                                        <button type="button" className="close" data-dismiss="alert" onClick={(e) =>setProfileUpdateAlert(false)}>X</button>
                                                                    </div>
                                            </div> : null }
                                            <div>
                                                <button className="btn btn-primary btn-rounded mt-1" onClick={handleShow}>Edit</button>
                                            </div>
                                            </div>
                                            </div>
                                        }

                                        <Modal show={showModal} onHide={handleClose} animation={false} size='xl'>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Edit Details</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <div className="card mb-3">
                                            <div className="card-body">
                                                {BackendError && BackendError.map((data,index) => (
                                                    <ul key={index}>
                                                        <li className="text-danger">{data.message}</li>
                                                    </ul>
                                                ))}
                                            <form onSubmit={handleSubmit(submitForm)} className="leave-form ml-auto mr-auto">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">Name</h6>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">Designation</h6>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-sm-4">
                                                    <input type="text" className="form-control" value={firstname} name='firstname' onChange={(e) => setfirstname(e.target.value)} required/>
                                                    <p className="text-danger error-font">{FirstnameError}</p> 
                                                </div>
                                            <div className="col-sm-4">
                                                    <input type="email" className="form-control" name='email' value={email} onChange={(e) => setemail(e.target.value)}  required/>
                                                    <p className="text-danger error-font">{emailError}</p> 
                                                    <p className="text-danger error-font">{EmailError}</p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <input type="text" className="form-control" name='designation' value={designation} onChange={(e) => setdesignation(e.target.value)} required />
                                                    <p className="text-danger error-font">{DesignationError}</p> 
                                                </div>
                                            </div>
                                            
                                            <div className="row mt-4">
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">Gender</h6>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">Birth Date</h6>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">Date of anniversary</h6>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-sm-4">
                                                    <select className="custom-select" name='gender' value={gender} onChange={(e) => setgender(e.target.value)} required>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-4">
                                                    <input type='date' className="form-control" name='updatebirth_date' value={Bdate} onChange={(e) => setBdate(e.target.value)}  max={todayDate} required/>
                                                </div>
                                                <div className="col-sm-4">
                                                    <input type='date' className="form-control" name='date_of_anniversary' value={Date_of_anniversary} onChange={(e) => setDate_of_anniversary(e.target.value)} />
                                                </div>
                                            </div>
                                            
                                            <div className="row mt-4">
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">Address</h6>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">City</h6>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">State</h6>
                                                </div>
                                            </div>
                                            <div className="row mt-1">
                                                <div className="col-sm-4">
                                                    <input type="text" className="form-control" name='address' value={address} onChange={(e) => setaddress(e.target.value)} required/>
                                                    <p className="text-danger error-font">{addressError}</p> 
                                                </div>
                                                <div className="col-sm-4">
                                                    <input type="text" className="form-control" name='city' value={city}  onChange={(e) => setcity(e.target.value)} required/>
                                                    <p className="text-danger error-font">{cityError}</p> 
                                                </div>
                                                <div className="col-sm-4">
                                                    <input type="text" className="form-control" name='state' value={state} onChange={(e) => setstate(e.target.value)} required/>
                                                    <p className="text-danger error-font">{stateError}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="row mt-4">
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">Country</h6>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">Pincode</h6>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">Experience</h6>
                                                </div>
                                            </div>
                                            <div className="row mt-1">
                                                <div className="col-sm-4">
                                                    <input type="text" className="form-control" name='country' value={country}  onChange={(e) => setcountry(e.target.value)}  required/>
                                                    <p className="text-danger error-font">{countryError}</p> 
                                                </div>
                                                <div className="col-sm-4">
                                                    <input type="number" className="form-control" name='pincode' value={pincode} onChange={(e) => setpincode(e.target.value)} required />
                                                    <p className="text-danger error-font">{pincodeError}</p> 
                                                </div>
                                                <div className="col-sm-4">
                                                    <select className="custom-select" name='experience' value={experience} onChange={(e) => setexperience(e.target.value)} required>
                                                                <option value="0 to 1 Year">0 to 1 Year</option>
                                                                <option value="1 to 3 Year">1 to 3 Year</option>
                                                                <option value="3 to 5 Year">3 to 5 Year</option>
                                                                <option value="5 to 7 Year">5 to 7 Year</option>
                                                                <option value="7 to 9 Year">7 to 10 Year</option>
                                                                <option value="10+ Years">10+ Years</option>
                                                            </select>
                                                </div>
                                            </div>
                                            
                                            <div className="row mt-4">
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">Nationality</h6>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0">Marital Status</h6>
                                                </div>
                                                
                                            </div>
                                            <div className="row mt-1">
                                                <div className="col-sm-4">
                                                    <input type="text" className="form-control" name='nationality' value={nationality} onChange={(e) => setnationality(e.target.value)} required/>
                                                </div>
                                                <div className="col-sm-4">
                                                    <select className="custom-select" name='marital_status' value={marital_status} onChange={(e) => setmarital_status(e.target.value)} required>
                                                        <option value="Married">Married</option>
                                                        <option value="Unmarried">Unmarried</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row d-flex justify-content-end mt-3">
                                            <div className="col-sm-3">
                                                <button className="btn btn-primary btn-sm" type="submit">
                                                    Update
                                                </button>
                                            </div>
                                            <div className="col-sm-3">
                                                <button className="btn btn-secondary btn-sm" onClick={handleClose}>
                                                    Cancel
                                                </button>
                                                </div>
                                            </div>

                                                </form>
                                            </div>
                                            </div>
                                            </Modal.Body>
                                        </Modal>

                                        </div>
                                    </div>
                                    
                                    <div className="row gutters-sm mb-3">
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
                                                                        <div className="d-flex justify-content-end  mb-3">
                                                                            <button className="btn btn-primary btn-sm ml-1 mt-2 pointer-change" title="Add Details" onClick={handleAQShow}><IoIosAddCircle size={30} className="mr-1" />Qualification</button>
                                                                        </div>
                                                                        {AddQuaAlert === true ?
                                                                        <div className="mt-2 mb-1"> 
                                                                            <div className="alert alert-success alert-dismissible fade show">
                                                                                <strong>Qualification Detail Added!!</strong> Successfully.
                                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setAddQuaAlert(false)}>X</button>
                                                                            </div>
                                                                        </div> : null }

                                                                        {EditQuaAlert === true ?
                                                                        <div className="mt-2 mb-1"> 
                                                                            <div className="alert alert-info alert-dismissible">
                                                                                <strong>Qualification Detail Updated!!</strong> Successfully.
                                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setEditQuaAlert(false)}>X</button>
                                                                            </div>
                                                                        </div> : null }

                                                                        {DeleteQuaAlert === true ? 
                                                                            <div className="mt-2 mb-1"> 
                                                                                <div className="alert alert-danger alert-dismissible">
                                                                                    <strong>Qualification Detail Deleted!!</strong> Successfully.
                                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setDeleteQuaAlert(false)}>X</button>
                                                                                </div>
                                                                            </div> : null
                                                                        }
                                                                    </div>
                                                                </div>
                                                                :<div className="card h-100">
                                                                    <div className="card-body">
                                                                    <div className="d-flex justify-content-end  mb-3">
                                                                        <button className="btn btn-primary btn-sm  mt-2 pointer-change" title="Add Details" onClick={handleAQShow}><IoIosAddCircle size={30} className="mr-1" />Qualification</button>
                                                                    </div>
                                                                    {AddQuaAlert === true ?
                                                                        <div className="mt-2 mb-1"> 
                                                                            <div className="alert alert-success alert-dismissible">
                                                                                <strong>Qualification Detail Added!!</strong> Successfully.
                                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setAddQuaAlert(false)}>X</button>
                                                                            </div>
                                                                        </div> : null }

                                                                        {EditQuaAlert === true ?
                                                                        <div className="mt-2 mb-1"> 
                                                                            <div className="alert alert-info alert-dismissible">
                                                                                <strong>Qualification Detail Updated!!</strong> Successfully.
                                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setEditQuaAlert(false)}>X</button>
                                                                            </div>
                                                                        </div> : null }

                                                                        {DeleteQuaAlert === true ? 
                                                                            <div className="mt-2 mb-1"> 
                                                                                <div className="alert alert-danger alert-dismissible">
                                                                                    <strong>Qualification Detail Deleted!!</strong> Successfully.
                                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setDeleteQuaAlert(false)}>X</button>
                                                                                </div>
                                                                            </div> : null
                                                                        }
                                                                        <DataTable 
                                                                            columns={Quacolumns}
                                                                            data={QualificationDetail}
                                                                        />
                                                                        </div>
                                                                </div>
                                                                }


                                                                
                                                                {/* Add */}
                                                                <Modal show={showAQModal} onHide={handleAQClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Add Qualification</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                {AddQualificationError && AddQualificationError.map((data,index) => (
                                                                    <ul key={index}>
                                                                        <li className="text-danger">{data.message}</li>
                                                                    </ul>
                                                                ))}
                                                                <form onSubmit={handleSubmit(submitQualificationForm)} className="leave-form ml-3" >
                                                                                        <div className="row">
                                                                                                <div className="col-sm-4">
                                                                                                <h6 className="mb-0">Degree</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <select className="custom-select" name='degree' value={degree} onChange={(e) => setdegree(e.target.value)} required>
                                                                                                        <option value="BTech">BTech</option>
                                                                                                        <option value="BE">BE</option>
                                                                                                        <option value="BCA">BCA</option>
                                                                                                        <option value="MCA">MCA</option>
                                                                                                        <option value="Diploma">Diploma</option>
                                                                                                        {othertype && othertype.map((data,index) => (
                                                                                                            <option key={index}>{data.degree}</option>
                                                                                                        ))}
                                                                                                        <option value="">Other</option>
                                                                                                    </select>
                                                                                                    {degree === "" ? 
                                                                                                    <>
                                                                                                        <input type={'text'} className="form-control" placeholder="Degree name" value={degreeName} onChange={(e) => setdegreeName(e.target.value)} /> 
                                                                                                        <p className="text-danger">{degreenameError}</p>
                                                                                                    </>
                                                                                                    : null}
                                                                                                </div>
                                                                                        </div>
                                                                                        
                                                                                        <div className="row mt-3">
                                                                                                <div className="col-sm-4">
                                                                                                <h6 className="mb-0">Institute</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <input type="text" className="form-control" name='institute' value={institute} onChange={(e) => setinstitute(e.target.value)} required/>
                                                                                                    <p className="text-danger">{instituteError}</p> 
                                                                                                </div>
                                                                                        </div>
                                                                                        
                                                                                        <div className="row mt-3">
                                                                                                <div className="col-sm-4">
                                                                                                    <h6 className="mb-0">From Date</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <input type='date' className="form-control" name='from_date_input' value={from_date} onChange={(e) => handleFromDate(e)}  required/>
                                                                                                </div>
                                                                                            </div>
                                                                                            
                                                                                            <div className="row mt-3">
                                                                                                <div className="col-sm-4">
                                                                                                <h6 className="mb-0">To Date</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <input type='date' className="form-control" name='to_date_input' value={to_date} onChange={(e) => setto_date(e.target.value)} required />
                                                                                                </div>
                                                                                            </div>
                                                                                            
                                                                                            <div className="row mt-3">
                                                                                                <div className="col-sm-4">
                                                                                                <h6 className="mb-0">Completed year</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <input type="text" className="form-control" name='completed_year' value={complete_year} onChange={(e) => setcompleted_year(e.target.value)} required/>
                                                                                                    <p className="text-danger">{completedyearError}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            
                                                                                            <div className="row mt-3">
                                                                                                <div className="col-sm-4">
                                                                                                <h6 className="mb-0">GPA score</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <input type="text" className="form-control" name='gpa_score' value={gpa_Score} onChange={(e) => setgpa_score(e.target.value)} required/>
                                                                                                    <p className="text-danger">{gpascoreError}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <hr />
                                                                                            <div className="row d-flex justify-content-end">
                                                                                            <div className="col-sm-3">
                                                                                                <button className="btn btn-primary btn-sm" type="submit">
                                                                                                    Submit
                                                                                                </button>
                                                                                            </div>
                                                                                            <div className="col-sm-3">
                                                                                                <button className="btn btn-secondary btn-sm" onClick={handleAQClose}>
                                                                                                    Cancel
                                                                                                </button>
                                                                                            </div>
                                                                                            </div>
                                                                </form>
                                                                </Modal.Body>
                                                                </Modal>

                                                                {/* Edit */}
                                                                <Modal show={showQuaEditModal} onHide={handleQuaEditClose} animation={false}>
                                                                    <Modal.Header closeButton>
                                                                    <Modal.Title>Edit Qualification</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                    {EditQualificationError && EditQualificationError.map((error, index) => (
                                                                        <span key={index} className="text-danger">
                                                                            {error.message}
                                                                        </span>
                                                                    ))

                                                                    }
                                                                                    
                                                                        <form onSubmit={handleSubmit(EditQualificationForm)} className="leave-form ml-3">
                                                                                        <div className="row">
                                                                                                <div className="col-sm-4">
                                                                                                <h6 className="mb-0">Degree</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <select className="custom-select" name='degree' value={QuaEditdegree} onChange={(e) => setQuaEditdegree(e.target.value)} required>
                                                                                                        <option value="BTech">BTech</option>
                                                                                                        <option value="BE">BE</option>
                                                                                                        <option value="BCA">BCA</option>
                                                                                                        <option value="MCA">MCA</option>
                                                                                                        <option value="Diploma">Diploma</option>
                                                                                                        {othertype && othertype.map((data,index) => (
                                                                                                            <option key={index}>{data.degree}</option>
                                                                                                        ))}
                                                                                                    <option value="">Other</option>
                                                                                                    </select>
                                                                                                    {QuaEditdegree === "" ? 
                                                                                                    <>
                                                                                                    <input type={'text'} className="form-control" placeholder="Degree name" value={degreeName} onChange={(e) => setdegreeName(e.target.value)} /> 
                                                                                                    <p className="text-danger">{degreenameError}</p>
                                                                                                    </>
                                                                                                    : null}
                                                                                                </div>
                                                                                        </div>
                                                                                        
                                                                                        <div className="row mt-3">
                                                                                                <div className="col-sm-4">
                                                                                                <h6 className="mb-0">Institute</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                <input type="text" className="form-control" name='institute' value={QuaEditinstitute} onChange={(e) => setQuaEditinstitute(e.target.value)} required/>
                                                                                                <p className="text-danger">{EditQuaInstituteError}</p> 
                                                                                                
                                                                                                </div>
                                                                                        </div>
                                                                                        
                                                                                        <div className="row mt-3">
                                                                                                <div className="col-sm-4">
                                                                                                <h6 className="mb-0">From Date</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <input type='date' className="form-control" name='from_date_update' value={QuaEditfromdate} onChange={(e) =>  handleFromDateUpdate(e)}  required/>
                                                                                                </div>
                                                                                        </div>
                                                                                            
                                                                                            <div className="row mt-3">
                                                                                                <div className="col-sm-4">
                                                                                                <h6 className="mb-0">To Date</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                    <input type='date' className="form-control" name='to_date_update' value={QuaEdittodate} onChange={(e) => handleToDateUpdate(e)} required />
                                                                                                </div>
                                                                                            </div>
                                                                                            
                                                                                            <div className="row mt-3">
                                                                                                <div className="col-sm-4">
                                                                                                <h6 className="mb-0">Completed year</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                <input type="text" className="form-control" name='completed_year' value={QuaEditcompleteyear} onChange={(e) => setQuaEditcompleteyear(e.target.value)} required/>
                                                                                                <p className="text-danger">{EditQuaCompleteYearError}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            
                                                                                            <div className="row mt-3">
                                                                                                <div className="col-sm-4">
                                                                                                <h6 className="mb-0">GPA score</h6>
                                                                                                </div>
                                                                                                <div className="col-sm-6">
                                                                                                <input type="text" className="form-control" name='gpa_score' value={QuaEditgpaScore} onChange={(e) => setQuaEditgpaScore(e.target.value)} required/>
                                                                                                <p className="text-danger">{EditQuaGPAError}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <hr />
                                                                                            <div className="row d-flex justify-content-end">
                                                                                            <div className="col-sm-3">
                                                                                                <button className="btn btn-primary btn-sm" type="submit">
                                                                                                    Submit
                                                                                                </button>
                                                                                            </div>
                                                                                            <div className="col-sm-3">
                                                                                                <button className="btn btn-secondary btn-sm" onClick={handleQuaEditClose}>
                                                                                                    Cancel
                                                                                                </button>
                                                                                            </div>
                                                                                            </div>
                                                                        </form>
                                                                    </Modal.Body>
                                                                </Modal>

                                                                {/* confirm  */}
                                                                <Modal show={showQuaDeleteModal} onHide={handleQuaDeleteClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Are you sure to Delete ?</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <p>Degree: {QuaEditdegree}</p>
                                                                    <p>Institute: {QuaEditinstitute}</p>
                                                                    <p>From Date: {convert(QuaEditfromdate)}</p>
                                                                    <p>To Date: {convert(QuaEdittodate)}</p>
                                                                    <p>Completed Year: {QuaEditcompleteyear}</p>
                                                                    <p>GPA Score: {QuaEditgpaScore}</p>
                                                            
                                                                    <Modal.Footer>                                        
                                                                    <Button  variant="danger" onClick={() => DeleteQua(QuaEditid)}>
                                                                        Delete
                                                                    </Button>
                                                                    <Button variant="secondary" onClick={handleQuaDeleteClose}>
                                                                        Cancel
                                                                    </Button>
                                                                    </Modal.Footer>
                                                                </Modal.Body>
                                                                </Modal>

                                                                
                                                            </Tab>
                                                            
                                                            <Tab eventKey="ShowProfessionalQualificationDetail" title="Professional Qualification">
                                                                {ProfessionalQualificationDetail.length === 0
                                                                ? <div className="card h-100">
                                                                        <div className="card-body">
                                                                        <div className="d-flex justify-content-end  mb-3">
                                                                            <button className="btn btn-primary btn-sm ml-2 mt-2 pointer-change" title="Add Details" onClick={handleAPQShow}><IoIosAddCircle size={30} className="mr-1" />Professional Qualification</button>
                                                                        </div>
                                                                        {AddPQAlert === true ?
                                                                            <div className="mt-2 mb-1"> 
                                                                                <div className="alert alert-success alert-dismissible">
                                                                                    <strong>Professional Qualification Detail Added!!</strong> Successfully.
                                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAddPQAlert(false)}>X</button>
                                                                                </div>
                                                                            </div> : null }

                                                                            {EditPQAlert === true ?
                                                                            <div className="mt-2 mb-1"> 
                                                                                <div className="alert alert-info alert-dismissible">
                                                                                    <strong>Professional Qualification Detail Updated!!</strong> Successfully.
                                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setEditPQAlert(false)}>X</button>
                                                                                </div>
                                                                            </div> : null }

                                                                            {DeletePQAlert === true ? 
                                                                                <div className="mt-2 mb-1"> 
                                                                                    <div className="alert alert-danger alert-dismissible fade show">
                                                                                        <strong>Professional Qualification Detail Deleted!!</strong> Successfully.
                                                                                        <button type="button" className="close" data-dismiss="alert" onClick={() => setDeletePQAlert(false)}>X</button>
                                                                                    </div>
                                                                                </div> : null
                                                                            }
                                                                        </div>
                                                                        
                                                                </div>
                                                                : <div className="card h-100">
                                                                    <div className="card-body">
                                                                    <div className="d-flex justify-content-end  mb-3">
                                                                            <button className="btn btn-primary btn-sm ml-2 mt-2 btn-sm  pointer-change" title="Add Details" onClick={handleAPQShow}><IoIosAddCircle size={30} className="mr-1" />Professional Qualification</button>
                                                                    </div>
                                                                    {AddPQAlert === true ?
                                                                        <div className="mt-2 mb-1"> 
                                                                            <div className="alert alert-success alert-dismissible">
                                                                                <strong>Professional Qualification Detail Added!!</strong> Successfully.
                                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setAddPQAlert(false)}>X</button>
                                                                            </div>
                                                                        </div> : null }

                                                                        {EditPQAlert === true ?
                                                                        <div className="mt-2 mb-1"> 
                                                                            <div className="alert alert-info alert-dismissible">
                                                                                <strong>Professional Qualification Detail Updated!!</strong> Successfully.
                                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setEditPQAlert(false)}>X</button>
                                                                            </div>
                                                                        </div> : null }

                                                                        {DeletePQAlert === true ? 
                                                                            <div className="mt-2 mb-1"> 
                                                                                <div className="alert alert-danger alert-dismissible">
                                                                                    <strong>Professional Qualification Detail Deleted!!</strong> Successfully.
                                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setDeletePQAlert(false)}>X</button>
                                                                                </div>
                                                                            </div> : null
                                                                        }

                                                                        <DataTable 
                                                                            columns={PQAcolumns}
                                                                            data={ProfessionalQualificationDetail}
                                                                        />
                                                                        </div>
                                                                    </div>
                                                                }
                                                                {/* Add */}
                                                                <Modal show={showAPQModal} onHide={handleAPQClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Add Professional Qualification</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                <form onSubmit={handleSubmit(submitProfessionalQualificationForm)} className="leave-form ml-3">
                                                                <div className="row">
                                                                        <div className="col-sm-4">
                                                                        <h6 className="mb-0">Company</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                        <input type="text" className="form-control" name='company' value={company} onChange={(e) => setcompany(e.target.value)} required/>
                                                                        <p className="text-danger">{companyError}</p>
                                                                        </div>
                                                                </div>
                                                                
                                                                <div className="row mt-3">
                                                                        <div className="col-sm-4">
                                                                        <h6 className="mb-0">Job title</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                        <input type="text" className="form-control" name='job_title' value={job_title} onChange={(e) => setjob_title(e.target.value)} required/>
                                                                        <p className="text-danger">{jobtitleError}</p>
                                                                        </div>
                                                                </div>
                                                                    
                                                                <div className="row mt-3">
                                                                        <div className="col-sm-4">
                                                                        <h6 className="mb-0">From Date</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <input type='date' className="form-control" name='pq_add_from_date' value={pq_from_date} onChange={(e) => handlepqFromdate(e)}  required/>
                                                                        </div>
                                                                </div>
                                                                    
                                                                <div className="row mt-3">
                                                                        <div className="col-sm-4">
                                                                        <h6 className="mb-0">To Date</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <input type='date' className="form-control" name='pq_add_to_date' value={pq_to_date} onChange={(e) => setpqto_date(e.target.value)} />
                                                                        </div>
                                                                </div>
                                                                <hr/>
                                                                <div className="row d-flex justify-content-end">
                                                                        <div className="col-sm-3">
                                                                            <button className="btn btn-primary btn-sm" type="submit">
                                                                                Submit
                                                                            </button>
                                                                </div>
                                                                <div className="col-sm-3">
                                                                            <button className="btn btn-secondary btn-sm" onClick={handleAPQClose}>
                                                                                Cancel
                                                                            </button>
                                                                </div>
                                                                </div>
                                                                </form>
                                                                </Modal.Body>
                                                                </Modal>

                                                                {/* Edit */}
                                                                <Modal show={showEditAPQModal} onHide={handleEditAPQClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Edit Professional Qualification</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                <form onSubmit={handleSubmit(EditProfessionalQualification)} className="leave-form ml-3">
                                                                <div className="row">
                                                                        <div className="col-sm-4">
                                                                        <h6 className="mb-0">Company</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                        <input type="text" className="form-control" name='company' value={PQEditcompany} onChange={(e) => setPQEditcompany(e.target.value)} required/>
                                                                        <p className="text-danger">{EditPQCompanyError}</p>
                                                                        </div>
                                                                </div>
                                                                
                                                                <div className="row mt-3">
                                                                        <div className="col-sm-4">
                                                                        <h6 className="mb-0">Job title</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                        <input type="text" className="form-control" name='job_title' value={PQEditjobtitle} onChange={(e) => setPQEditjobtitle(e.target.value)} required/>
                                                                        <p className="text-danger">{EditPQJobTitleError}</p>
                                                                        </div>
                                                                </div>
                                                                    
                                                                <div className="row mt-3">
                                                                        <div className="col-sm-4">
                                                                        <h6 className="mb-0">From Date</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <input type='date' className="form-control" name='pq_edit_from_date' value={PQEditfromdate} onChange={(e) => setPQEditfromdate(e.target.value)}  required/>
                                                                        </div>
                                                                </div>
                                                                    
                                                                <div className="row mt-3">
                                                                        <div className="col-sm-4">
                                                                        <h6 className="mb-0">To Date</h6>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <input type='date' className="form-control" name='pq_edit_to_date' value={PQEdittodate} onChange={(e) => handlepqEditToDate(e)} />
                                                                        </div>
                                                                </div>
                                                                <hr />
                                                                <div className="row d-flex justify-content-end">
                                                                        <div className="col-sm-3">
                                                                            <button className="btn btn-primary btn-sm" type="submit">
                                                                                Submit
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-sm-3">
                                                                            <button className="btn btn-secondary btn-sm" onClick={handleEditAPQClose}>
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                </div>
                                                                </form>
                                                                </Modal.Body>
                                                                </Modal>


                                                                {/* confirm  */}
                                                                <Modal show={showPQDeleteModal} onHide={handlePQDeleteClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Are you sure to Delete ?</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                <p>Company: {PQEditcompany}</p>
                                                                <p>Job Title: {PQEditjobtitle}</p>
                                                                <p>From Date: {convert(PQEditfromdate)}</p>
                                                                <p>To Date: {convert(PQEdittodate)}</p>

                                                                <Modal.Footer>
                                                                    <Button  variant="danger" onClick={() => DeletePQ(PQEditid)}>
                                                                        Delete
                                                                    </Button>
                                                                    <Button variant="secondary" onClick={handlePQDeleteClose}>
                                                                        Cancel
                                                                    </Button>
                                                                </Modal.Footer>
                                                                </Modal.Body>
                                                                </Modal>

                                                                

                                                            </Tab>

                                                            <Tab eventKey="ShowEmergencyContact" title="Emergency Contact">
                                                                {// eslint-disable-next-line
                                                                    EmergencyContact.length == 0 
                                                                    ? (<div className="card h-100">
                                                                        <div className="card-body">
                                                                            <div className="d-flex justify-content-end  mb-3">
                                                                                <button className="btn btn-primary btn-sm ml-2 mt-2  pointer-change" title="Add Details" onClick={handleECAddShow}><IoIosAddCircle size={30} className="mr-1" />Emergency contact</button>
                                                                            </div>
                                                                            {AddECAlert === true ?
                                                                            <div className="mt-2 mb-1"> 
                                                                                <div className="alert alert-success alert-dismissible ">
                                                                                    <strong>Emergency Contact Detail Added!!</strong> Successfully.
                                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAddECAlert(false)}>X</button>
                                                                                </div>
                                                                            </div> : null }

                                                                            {EditECAlert === true ?
                                                                            <div className="mt-2 mb-1"> 
                                                                                <div className="alert alert-info alert-dismissible">
                                                                                    <strong>Emergency Contact Detail Updated!!</strong> Successfully.
                                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setEditECAlert(false)}>X</button>
                                                                                </div>
                                                                            </div> : null }

                                                                            {DeleteECAlert === true ? 
                                                                                <div className="mt-2 mb-1"> 
                                                                                    <div className="alert alert-danger alert-dismissible">
                                                                                        <strong>Emergency Contact Detail Deleted!!</strong> Successfully.
                                                                                        <button type="button" className="close" data-dismiss="alert" onClick={() => setDeleteECAlert(false)}>X</button>
                                                                                    </div>
                                                                                </div> : null
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    )
                                                                    : (<div className="card h-100">
                                                                    <div className="card-body">
                                                                        <div className="d-flex justify-content-end  mb-3">
                                                                                <button className="btn btn-primary btn-sm ml-2 mt-2 pointer-change" title="Add Details" onClick={handleECAddShow}><IoIosAddCircle size={30} className="mr-1" />Emergency contact</button>
                                                                        </div>
                                                                        {AddECAlert === true ?
                                                                            <div className="mt-2 mb-1"> 
                                                                                <div className="alert alert-success alert-dismissible fade show">
                                                                                    <strong>Emergency Contact Detail Added!!</strong> Successfully.
                                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAddECAlert(false)}>X</button>
                                                                                </div>
                                                                            </div> : null }

                                                                            {EditECAlert === true ?
                                                                            <div className="mt-2 mb-1"> 
                                                                                <div className="alert alert-info alert-dismissible fade show">
                                                                                    <strong>Emergency Contact Detail Updated!!</strong> Successfully.
                                                                                    <button type="button" className="close" data-dismiss="alert" onClick={() => setEditECAlert(false)}>X</button>
                                                                                </div>
                                                                            </div> : null }

                                                                            {DeleteECAlert === true ? 
                                                                                <div className="mt-2 mb-1"> 
                                                                                    <div className="alert alert-danger alert-dismissible fade show">
                                                                                        <strong>Emergency Contact Detail Deleted!!</strong> Successfully.
                                                                                        <button type="button" className="close" data-dismiss="alert" onClick={() => setDeleteECAlert(false)}>X</button>
                                                                                    </div>
                                                                                </div> : null
                                                                            }
                                                                        <DataTable 
                                                                            columns={ECcolumns}
                                                                            data={EmergencyContact}
                                                                        />
                                                                    </div>
                                                                    </div>
                                                                    )
                                                                }

                                                                {/* add */}
                                                                <Modal show={showECAddModal} onHide={handleECAddClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Add Emergency Contact Details</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>  
                                                                <form onSubmit={handleSubmit(submitEmergencyContactForm)} className="leave-form ml-3">                                         
                                                                    <div className="row mb-2">
                                                                                <div className="col-sm-4">
                                                                                <label>Name</label>
                                                                                                                                        
                                                                                    <input type="text" className="form-control" name='name' value={AddECname} onChange={(e) => setAddECname(e.target.value)} required />
                                                                                    <p className="text-danger">{AddECnameError}</p>
                                                                                </div>
                                                                                <div className="col-sm-4">
                                                                                <label>Relation</label>
                                                                                    <select className="custom-select" name='relation' value={AddECrelation} onChange={(e) => setAddECrelation(e.target.value)} required>
                                                                                        <option value="Father">Father</option>
                                                                                        <option value="Mother">Mother</option>
                                                                                        <option value="Brother">Brother</option>
                                                                                        <option value="Sister">Sister</option>
                                                                                        <option value="GrandParents">GrandParents</option>
                                                                                        {otherRelation && otherRelation.map((data,index) => (
                                                                                                            <option key={index}>{data.relation}</option>
                                                                                        ))}
                                                                                        <option value="">Other</option>
                                                                                    </select>
                                                                                    {AddECrelation === "" ?
                                                                                    <>
                                                                                    <label>Relation</label>                                  
                                                                                    <input type="text" className="form-control" name='name' required placeholder="Relation name" value={AddRelationName} onChange={(e) => setAddRelationName(e.target.value)} />
                                                                                    <p className="text-danger">{relationnameError}</p>
                                                                                    </> : null
                                                                                    }
                                                                                </div>
                                                                                <div className="col-sm-4">
                                                                                <label>Contact</label>
                                                                                    <input type="number" className="form-control" name='contact' value={AddECcontact} onChange={(e) => setAddECcontact(e.target.value)} required/>
                                                                                    <p className="text-danger">{AddECContactError}</p>
                                                                                </div>
                                                                    </div>
                                                                    <div className="row d-flex justify-content-end">
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-primary btn-sm" type="submit">
                                                                            Submit
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-secondary btn-sm" onClick={handleECAddClose}>
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                
                                                                </form> 
                                                                </Modal.Body>
                                                                </Modal>

                                                                {/* update */}
                                                                <Modal show={showECModal} onHide={handleECClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Edit Emergency Contact Details</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                <form onSubmit={handleSubmit(updateEmergencyContact)} className="leave-form ml-3">
                                                                <div className="row mb-2" >
                                                                                <div className="col-sm-4">
                                                                                <label>Name</label>   
                                                                                    <input type="text" className="form-control" name='name' value={ECEditname} onChange={(e) => setECEditname(e.target.value)} required/>
                                                                                    <p className="text-danger">{EditECnameError}</p>
                                                                                </div>
                                                                                <div className="col-sm-4">
                                                                                <label>Relation</label>
                                                                                    <select className="custom-select" name='relation' value={ECEditrelation} onChange={(e) => setECEditrelation(e.target.value)} required>
                                                                                        <option value="Father">Father</option>
                                                                                        <option value="Mother">Mother</option>
                                                                                        <option value="Brother">Brother</option>
                                                                                        <option value="Sister">Sister</option>
                                                                                        <option value="GrandParents">GrandParents</option>
                                                                                        {otherRelation && otherRelation.map((data,index) => (
                                                                                                            <option key={index}>{data.relation}</option>
                                                                                        ))}
                                                                                        <option value="">Other</option>
                                                                                    </select>
                                                                                        {ECEditrelation === "" ?
                                                                                            <>
                                                                                            <label>Relation</label>                                  
                                                                                            <input type="text" className="form-control" name='name' required placeholder="Relation name" value={AddRelationName} onChange={(e) => setAddRelationName(e.target.value)} />
                                                                                            <p className="text-danger">{relationnameError}</p>
                                                                                            </> : null
                                                                                        }
                                                                                </div>
                                                                                <div className="col-sm-4">
                                                                                <label>Contact</label>
                                                                                    <input type="number" className="form-control" name='contact' value={ECEditcontact} onChange={(e) => setECEditcontact(e.target.value)} required/>
                                                                                    <p className="text-danger">{EditECContactError}</p>
                                                                                    <p className="text-danger">{EditECContactError1}</p>
                                                                                </div>
                                                                    </div>
                                                                    <div className="row d-flex justify-content-end">
                                                                        <div className="col-sm-3">
                                                                            <button className="btn btn-primary mt-2 mr-2 btn-sm" type="submit">
                                                                                Update
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-sm-3">
                                                                            <button className="btn btn-secondary mt-2 mr-2 btn-sm" onClick={handleECClose}>
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </form>
                                                                </Modal.Body>
                                                                </Modal>

                                                                {/* confirm  */}
                                                                <Modal show={showECDeleteModal} onHide={handleECDeleteClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Are you sure to Delete ?</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>

                                                                    <p>Name: {ECEditname}</p>
                                                                    <p>Relation: {ECEditrelation}</p>
                                                                    <p>Contact: {ECEditcontact}</p>
                                                                    
                                                                    <Modal.Footer>
                                                                    <Button  variant="danger" onClick={() => DeleteEC(ECEditid)}>
                                                                        Delete
                                                                    </Button>
                                                                    <Button variant="secondary" onClick={handleECDeleteClose} >
                                                                        Cancel
                                                                    </Button>
                                                                    </Modal.Footer>
                                                                </Modal.Body>
                                                                </Modal>

                                                            </Tab>

                                                            <Tab eventKey="ShowFamilyDetail" title="Family Detail">
                                                                {// eslint-disable-next-line
                                                                    FamilyDetail.length == 0 
                                                                    ?  (<div className="card h-100">
                                                                            <div className="card-body">
                                                                                <div className="d-flex justify-content-end  mb-3">
                                                                                    <button className="btn btn-primary btn-sm ml-2 mt-2  pointer-change" title="Add Details" onClick={handleAddFDshow}><IoIosAddCircle size={30} className="mr-1" />Family details</button>
                                                                                </div>
                                                                                {AddFDAlert === true ?
                                                                                <div className="mt-2 mb-1"> 
                                                                                    <div className="alert alert-success alert-dismissible fade show">
                                                                                        <strong>Family Detail Added!!</strong> Successfully.
                                                                                        <button type="button" className="close" data-dismiss="alert" onClick={() => setAddFDAlert(false)}>X</button>
                                                                                    </div>
                                                                                </div> : null }

                                                                                {EditFDAlert === true ?
                                                                                <div className="mt-2 mb-1"> 
                                                                                    <div className="alert alert-info alert-dismissible fade show">
                                                                                        <strong>Family Detail Updated!!</strong> Successfully.
                                                                                        <button type="button" className="close" data-dismiss="alert" onClick={() => setEditFDAlert(false)}>X</button>
                                                                                    </div>
                                                                                </div> : null
                                                                                }

                                                                                {DeleteFDAlert === true ? 
                                                                                    <div className="mt-2 mb-1"> 
                                                                                        <div className="alert alert-danger alert-dismissible fade show">
                                                                                            <strong>Family Detail Deleted!!</strong> Successfully.
                                                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setDeleteFDAlert(false)}>X</button>
                                                                                        </div>
                                                                                    </div> : null
                                                                                }
                                                                            </div>
                                                                        </div>)
                                                                    : ( <div className="card h-100">
                                                                            <div className="card-body">
                                                                            <   div className="d-flex justify-content-end  mb-3">
                                                                                    <button className="btn btn-primary btn-sm ml-2 mt-2  pointer-change" title="Add Details" onClick={handleAddFDshow}><IoIosAddCircle className="mr-1" size={30} />Family details</button>
                                                                                </div>
                                                                                {AddFDAlert === true ?
                                                                                <div className="mt-2 mb-1"> 
                                                                                    <div className="alert alert-success alert-dismissible fade show">
                                                                                        <strong>Family Detail Added!!</strong> Successfully.
                                                                                        <button type="button" className="close" data-dismiss="alert" onClick={() => setAddFDAlert(false)}>X</button>
                                                                                    </div>
                                                                                </div> : null }

                                                                                {EditFDAlert === true ?
                                                                                <div className="mt-2 mb-1"> 
                                                                                    <div className="alert alert-info alert-dismissible fade show">
                                                                                        <strong>Family Detail Updated!!</strong> Successfully.
                                                                                        <button type="button" className="close" data-dismiss="alert" onClick={() => setEditFDAlert(false)}>X</button>
                                                                                    </div>
                                                                                </div> : null
                                                                                }

                                                                                {DeleteFDAlert === true ? 
                                                                                    <div className="mt-2 mb-1"> 
                                                                                        <div className="alert alert-danger alert-dismissible fade show">
                                                                                            <strong>Family Detail Deleted!!</strong> Successfully.
                                                                                            <button type="button" className="close" data-dismiss="alert" onClick={() => setDeleteFDAlert(false)}>X</button>
                                                                                        </div>
                                                                                    </div> : null
                                                                                }
                                                                                <DataTable
                                                                                    columns={FDcolumns}
                                                                                    data={FamilyDetail}
                                                                                />
                                                                            </div>
                                                                        </div> )
                                                                }

                                                                {/* add  */}
                                                                <Modal show={showAddFDModal} onHide={handleAddFDClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Add Family Details</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                <form onSubmit={handleSubmit(submitFDForm)} className="leave-form ml-3"> 
                                                                <div className="row">
                                                                                <div className="col-sm-6">
                                                                                    <label>Name</label>
                                                                                    <input type="text" className="form-control"  value={AddFDname} onChange={(e) => setAddFDname(e.target.value)} required/>
                                                                                    <p className="text-danger">{AddFDnameError}</p>
                                                                                </div>
                                                                                <div className="col-sm-6">
                                                                                    <label>Relation</label>
                                                                                    <select className="custom-select" value={AddFDrelation} onChange={(e) => setAddFDrelation(e.target.value)} required>
                                                                                        <option value="Father">Father</option>
                                                                                        <option value="Mother">Mother</option>
                                                                                        <option value="Brother">Brother</option>
                                                                                        <option value="Sister">Sister</option>
                                                                                        <option value="GrandParents">GrandParents</option>
                                                                                        {FDotherRelation && FDotherRelation.map((data,index) => (
                                                                                                            <option key={index}>{data.relation}</option>
                                                                                        ))}
                                                                                        <option value="">Other</option>
                                                                                    </select>
                                                                                    {AddFDrelation === "" ?
                                                                                        <>
                                                                                        <label>Relation</label>                                  
                                                                                        <input type="text" className="form-control" name='name' required placeholder="Relation name" value={AddFDRelationName} onChange={(e) => setAddFDRelationName(e.target.value)} />
                                                                                        <p className="text-danger">{FDrelationnamError}</p>
                                                                                        </> : null
                                                                                    }
                                                                                </div>
                                                                </div>
                                                                <div className="row d-flex justify-content-end">
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-primary btn-sm" type="submit">
                                                                            Submit
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-secondary btn-sm" onClick={handleAddFDClose}>
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                </form>
                                                                </Modal.Body>
                                                                </Modal>

                                                                {/* update  */}
                                                                <Modal show={showFDModal} onHide={handleFDClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Edit Family Details</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                <form onSubmit={handleSubmit(updateFamilyDetails)} className="leave-form ml-3">
                                                                            <div className="row">
                                                                                <div className="col-sm-6">
                                                                                    <label>Name</label>
                                                                                    <input type="text" className="form-control"  value={FDEditname} onChange={(e) => setFDEditname(e.target.value)} required/>
                                                                                    <p className="text-danger">{FDNameError}</p>
                                                                                </div>
                                                                                <div className="col-sm-6">
                                                                                    <label>Relation</label>
                                                                                    <select className="custom-select" value={FDEditrelation} onChange={(e) => setFDEditrelation(e.target.value)} required>
                                                                                        <option value="Father">Father</option>
                                                                                        <option value="Mother">Mother</option>
                                                                                        <option value="Brother">Brother</option>
                                                                                        <option value="Sister">Sister</option>
                                                                                        <option value="GrandParents">GrandParents</option>
                                                                                        {FDotherRelation && FDotherRelation.map((data,index) => (
                                                                                                            <option key={index}>{data.relation}</option>
                                                                                        ))}
                                                                                        <option value="">Other</option>
                                                                                    </select>
                                                                                    {FDEditrelation === "" ?
                                                                                        <>
                                                                                        <label>Relation</label>                                  
                                                                                        <input type="text" className="form-control" name='name' required placeholder="Relation name" value={EditFDRelationName} onChange={(e) => setEditFDRelationName(e.target.value)} />
                                                                                        <p className="text-danger">{FDrelationnamError}</p>
                                                                                        </> : null
                                                                                    }
                                                                                </div>
                                                                        </div>
                                                                        <div className="row d-flex justify-content-end">
                                                                            <div className="col-sm-3">
                                                                                <button className="btn btn-primary mt-2 mr-2 btn-sm" type="submit">
                                                                                    Update
                                                                                </button>
                                                                            </div>
                                                                            <div className="col-sm-3">
                                                                                <button className="btn btn-secondary mt-2 mr-2 btn-sm" onClick={handleFDClose}>
                                                                                    Cancel
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </Modal.Body>
                                                                </Modal>

                                                                {/* confirm  */}
                                                                <Modal show={showFDDeleteModal} onHide={handleFDDeleteClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Are you sure to Delete ?</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <p>Name: {FDEditname}</p>
                                                                    <p>Relation: {FDEditrelation}</p>
                                                                    
                                                                    <Modal.Footer>
                                                                    <Button  variant="danger" onClick={() => DeleteFD(FDEditid)}>
                                                                        Delete
                                                                    </Button>
                                                                    <Button variant="secondary" onClick={handleFDDeleteClose}>
                                                                        Cancel
                                                                    </Button>
                                                                    </Modal.Footer>
                                                                </Modal.Body>
                                                                </Modal>

                                                                
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
