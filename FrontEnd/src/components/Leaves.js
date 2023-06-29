import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import http from '../http-common';
import { useDispatch } from 'react-redux';
import LeavesPerYearService from "../services/LeavesPerYearService";
import LeavesService from "../services/LeavesService";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
export default function Leaves(){

    const dispatch = useDispatch()

    
    const AccountInfo = localStorage.getItem('store')
    const userInfo1 = JSON.parse(AccountInfo);
    let employee_id = userInfo1.employee_id;
    const navigate = useNavigate();

    const [finalAvailableLeaves, setFinalAvailableLeaves] = useState([])

    const [GlobalArray, setGlobalArray] = useState([])
    const { handleSubmit } = useForm()
    const [from_date, setfromdate] = useState("");
    const [to_date, settodate] = useState("");
    const [leave_type, setleavetype] = useState("");
    const [duration, setduration] = useState("01.0");
    const [attachment, setattachment] = useState(null);

    const [specialleave_from_date, setspecialleave_fromdate ] = useState("")
    const [specialleave_to_date, setspecialleave_to_date ] = useState("")
    const [specialleave_attachment,setspecialleave_attachment] = useState(null);
    const [specialleave_TypeChange, onspecialleave_TypeChange] = useState("");
    const [SpecialLeaveError, setSpecialLeaveError] = useState("");

    const [showEarned, setshowEarned] = useState(false);
    const [showCasual, setshowCasual] = useState(false);
    const [showSick, setshowSick] = useState(false);
    const [showComp, setshowComp] = useState(false);
    const [showFloat, setshowFloat] = useState(false);

    const [FormErrors, setFormErrors] = useState("");

    const [UpdateAlert, setUpdateAlert] = useState(false);
    const [AddAlert, setAddAlert] = useState(false);

    const [LeaveUpdateAlert, setLeaveUpdateAlert] = useState(false);
    const [LeaveAddAlert, setLeaveAddAlert] = useState(false);

    const [SelectedLeaves, setSelectedLeaves] = useState([])

    const [showModal , setModal] = useState(false);
    const handleClose = () => setModal(false);
    const handleShow = () => setModal(true);

    function onTypeChange(index, event, date){
        const newValues = [...leave_type]
        newValues[index] = event.target.value;
        const Leaveselected = []
        for(let i=0; i<newValues.length;i++){
            if(newValues[i]=== "EarnedLeave"){
                Leaveselected.push({index : i, color: '#ECAA70'})
            }
            if(newValues[i]=== "CasualLeave"){
                Leaveselected.push({index : i, color: '#7FA5CA'})
            }
            if(newValues[i]=== "SickLeave"){
                Leaveselected.push({index : i, color: '#E4E647'})
            }
            if(newValues[i]=== "CompOff"){
                Leaveselected.push({index : i, color: '#AED582'})
            }
            if(newValues[i]=== "FloatingLeave"){
                Leaveselected.push({index : i, color: '#80CBC4'})
            }
        }
        setSelectedLeaves(Leaveselected);
        if (GlobalArray[index]) {
            var obj = GlobalArray[index];
            obj.leave_type = event.target.value;
            GlobalArray[index] = obj; 
        } else {
            GlobalArray[index] = { 'leave_type' : event.target.value, 'employee_id' : employee_id ,'date' : date, 'duration': duration, 'status' : 'Pending' };
        }

        setGlobalArray(GlobalArray)
        setleavetype(newValues);
    }
    

    function onDurationChange(index, event){
        const newValues = [...duration]
        newValues[index] = event.target.value;
        if (GlobalArray[index]) {
            var obj = GlobalArray[index];
            obj.duration = parseFloat(event.target.value);
            GlobalArray[index] = obj; 
        } else {
            GlobalArray[index] = { 'duration' : parseFloat(event.target.value)};
        }
        setGlobalArray(GlobalArray)
        setduration(newValues);
    }

    function onfilechange(e) {

        const chosenFiles1 = Array.prototype.slice.call(e.target.files)
        setattachment(chosenFiles1);
    }

    function onsetspecialleavefilechange(e){
        const chosenFiles1 = Array.prototype.slice.call(e.target.files)
        setspecialleave_attachment(chosenFiles1);
    }

      const TotalDuration = GlobalArray.map(
        function(item){ return item.duration },
      )

    function sum(a) {
        return (a.length && parseFloat(a[0]) + sum(a.slice(1))) || 0;
      }
      
    let totalLeave = sum(TotalDuration).toFixed(1);


      var date1 = new Date(from_date);  
      var date2 = new Date(to_date);  

      var time_difference = date2.getTime() - date1.getTime();  
  
      var result = (time_difference / (1000 * 60 * 60 * 24)) + 1;

      function getDatesInRange(startDate, endDate) {
        const date = new Date(startDate.getTime());
      
        const dates = [];
      
        while (date <= endDate) {
          dates.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
      
        return dates;
      }
      

    const datesArray = getDatesInRange(date1, date2)

    function convertfordate(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day ].join("-");
    }

    //leave color array push with j color of that type with index
      const lengthfortype = [];
      for(let i=0; i< result; i++){
            lengthfortype.push({index: i, date : convertfordate(datesArray[i])});
        }
      
        const lengthfortype1 = [];

        for(let i=0; i<lengthfortype.length; i++) {
                lengthfortype1.push({
            ...lengthfortype[i], 
            ...SelectedLeaves[i]
            });
        }

    function AllApplyLeaves(){
     let ResultofLeavesbyEmp  = LeavesService.LeavesbyEmp(userInfo1.employee_id)
        .then((response) => {
          
            return response.data.leaves;                  
        })
        .catch((e) => {
            console.log(e , "Not Found");
        })
        
        ResultofLeavesbyEmp.then((AllApplyLeavesbyEmpId) => {
            let result = LeavesPerYearService.findLeavesbyId(userInfo1.employee_id, new Date().getFullYear())
                                .then((response) => {
                                    
                                    if(response.data.msg === "No Data"){
                                        return "No Data";
                                    }
                                    else{
                                       
                                        return response.data;
                                    }
                                })
                                .catch((e) => {
                                    console.log("Not Found");
                                })

                            result.then((AllLeavesperYearbyEmpId) => {
                                
                                //Count of EarnedLeave

                            const typeDuration = AllApplyLeavesbyEmpId.filter(
                                item => item.leave_type && item.leave_type.includes("EarnedLeave")
                            )
                            
            
                            const ArrayofDuration = typeDuration.map(
                                function(item){ return item.duration },
                            )
                            
                            let TotalEarnedLeave = sum(ArrayofDuration).toFixed(1);
                            
                            //Count of CasualLeave
                    
                            const CasualTotal = AllApplyLeavesbyEmpId.filter(
                                item => item.leave_type && item.leave_type.includes("CasualLeave")
                            )
                        
                            const ArrayofCasualDuration = CasualTotal.map(
                                function(item){ return item.duration },
                              )
                        
                              
                            let TotalCasualLeave = sum(ArrayofCasualDuration).toFixed(1);
                            
                                //Count of SickLeave
                    
                                const SickTotal = AllApplyLeavesbyEmpId.filter(
                                    item => item.leave_type && item.leave_type.includes("SickLeave")
                                )
                            
                                const ArrayofSickDuration = SickTotal.map(
                                    function(item){ return item.duration },
                                  )
                            
                                  
                                let TotalSickLeave = sum(ArrayofSickDuration).toFixed(1);
                                
                                    //Count of CompOff
                    
                                    const CompTotal = AllApplyLeavesbyEmpId.filter(
                                        item => item.leave_type && item.leave_type.includes("CompOff")
                                    )
                                
                                    const ArrayofCompDuration = CompTotal.map(
                                        function(item){ return item.duration },
                                      )
                                
                                      
                                    let TotalCompLeave = sum(ArrayofCompDuration).toFixed(1);
                                    
                                   //Count of FloatingLeave
                    
                                   const FloatingTotal = AllApplyLeavesbyEmpId.filter(
                                    item => item.leave_type && item.leave_type.includes("FloatingLeave")
                                )
                            
                                const ArrayofFloatingDuration = FloatingTotal.map(
                                    function(item){ return item.duration },
                                  )
                            
                                  
                                let TotalFloatingLeave = sum(ArrayofFloatingDuration).toFixed(1);
                                
                                
                                let finalAvailableLeaves = []
                                if(AllLeavesperYearbyEmpId === "No Data"){
                                    finalAvailableLeaves.push({
                                        _id: AllLeavesperYearbyEmpId._id,
                                        EarnedLeave  : 0,
                                        CasualLeave  : 0,
                                        SickLeave  : 0,
                                        CompOff  : 0,
                                        FloatingLeave  : 0
                                    })
                                }else{
                                    finalAvailableLeaves.push({
                                        _id: AllLeavesperYearbyEmpId._id,
                                        EarnedLeave  : (AllLeavesperYearbyEmpId.EarnedLeave - TotalEarnedLeave),
                                        CasualLeave  : (AllLeavesperYearbyEmpId.CasualLeave - TotalCasualLeave),
                                        SickLeave  : (AllLeavesperYearbyEmpId.SickLeave - TotalSickLeave),
                                        CompOff  : (AllLeavesperYearbyEmpId.CompOff - TotalCompLeave),
                                        FloatingLeave  : (AllLeavesperYearbyEmpId.FloatingLeave - TotalFloatingLeave)
                                    })
                                }

                                

                                setFinalAvailableLeaves(finalAvailableLeaves)
                            })
        })
    }


    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };
        

    useEffect(() => {
        AllApplyLeaves();

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

                    
    const ontodatechnage = (e) => {
                        settodate(e.target.value)
                        for(let i=0; i<finalAvailableLeaves.length;i++){
                            if(finalAvailableLeaves[i].EarnedLeave === 0){
                                setshowEarned(false);
                            }
                            else{
                                setshowEarned(true);
                            }
                        }

                        for(let i=0; i<finalAvailableLeaves.length;i++){
                            if(finalAvailableLeaves[i].CasualLeave === 0){
                                setshowCasual(false);
                            }
                            else{
                                setshowCasual(true);
                            }
                        }


                        for(let i=0; i<finalAvailableLeaves.length;i++){
                            if(finalAvailableLeaves[i].SickLeave === 0){
                                setshowSick(false);
                            }
                            else{
                                setshowSick(true);
                            }
                        }

                        for(let i=0; i<finalAvailableLeaves.length;i++){
                            if(finalAvailableLeaves[i].CompOff === 0){
                                setshowComp(false);
                            }
                            else{
                                setshowComp(true);
                            }
                        }


                        for(let i=0; i<finalAvailableLeaves.length;i++){
                            if(finalAvailableLeaves[i].FloatingLeave === 0){
                                setshowFloat(false);
                            }
                            else{
                                setshowFloat(true);
                            }
                        }

    }


    const submitForm = async () => {
        const userToken = localStorage.getItem('userToken')
        if(GlobalArray.length === 0){
            setFormErrors("Please select Leaves")
            return;
        }
        else{
            setFormErrors("")
        }

        const formData = new FormData();

        function getRandomFileName() {
            var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
            var random = ("" + Math.random()).substring(2, 8); 
            var random_number = timestamp+random;  
            return random_number;
          }


        // eslint-disable-next-line
        files.map((file) => {
            formData.append('attachment', file, getRandomFileName())
        })

        
        
        formData.append("globalArray", JSON.stringify(GlobalArray))
        
        const resp = await http.post(`/leaves/leavesadd`, formData, {
            headers: {
              "content-type": "multipart/form-data",
              'Authorization': `Bearer ${userToken}`,
            },
          });


          if(resp.data.msg === "Ok"){
            window.scrollTo(0, 0);
            setAddAlert(true);
          }
          else{
            window.scrollTo(0, 0);
            setUpdateAlert(true);
          }
    }

    const files = attachment ? [...attachment] : [];

    function handleRedirect(){
        setUpdateAlert(false)
        setAddAlert(false)
        navigate("/leaves-list");
    }
    const specialleavesubmitForm = async () => {
        const userToken = localStorage.getItem("userToken")
        if(specialleave_TypeChange === ""){
            setSpecialLeaveError("Please Select Type");
            return;
        }
        else{
            setSpecialLeaveError("");
        }

        const formData = new FormData();

        function getRandomFileName() {
            var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
            var random = ("" + Math.random()).substring(2, 8); 
            var random_number = timestamp+random;  
            return random_number;
          }
        // eslint-disable-next-line
        filesforspecialleave.map((file) => {
            formData.append('attachment', file, getRandomFileName())
        })

        formData.append('employee_id', employee_id)
        formData.append('from_date', specialleave_from_date)
        formData.append('to_date', specialleave_to_date)
        formData.append('leave_type', specialleave_TypeChange)
        formData.append('status', "Pending")

        const resp = await http.post(`/leaves/specialleavesadd`, formData, {
            headers: {
              "content-type": "multipart/form-data",
              'Authorization': `Bearer ${userToken}`,
            },
          });

          if(resp.data.msg === "Ok"){
            setLeaveAddAlert(true);
          }
          else{
            setLeaveUpdateAlert(true)
          }

           
    }

    function handleLeaveRedirect(){
        setLeaveUpdateAlert(false);
        setLeaveAddAlert(false);
        handleClose();
    }

    const filesforspecialleave = specialleave_attachment ? [...specialleave_attachment] : [];


    let toMap = {};
    let resultToReturn = false;
    for (let i = 0; i < GlobalArray.length; i++) {

        if (toMap[GlobalArray[i].leave_type]) {
            resultToReturn = true;
            // terminate the loop
            break;
        }
        toMap[GlobalArray[i].leave_type] = true;
    }
    const TotalLeavesArray = []
    if (resultToReturn) {
        GlobalArray.forEach(element => {
            TotalLeavesArray.push({
                combine_leave_type: element.leave_type,
                duration: parseFloat(element.duration),
            })
        });
       
    }
    else {
        GlobalArray.forEach(element => {
            TotalLeavesArray.push({
                combine_leave_type: element.leave_type,
                duration: parseFloat(element.duration),
            })
        })
    }

    
    
    const CombineLeaves = Object.values(TotalLeavesArray.reduce((acc,{combine_leave_type,duration}) =>
    // eslint-disable-next-line
    ((acc[combine_leave_type] = acc[combine_leave_type] || {combine_leave_type, duration: 0}).duration += duration, acc), {}));

    function resetvalues(){
        setfromdate("")
        settodate("")
        setattachment("")      
        setGlobalArray([])                                              
    }


    if(userInfo1.account_type === "Employee"){
        return(
            <div>
                    <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="breadcrumb">
                                                <h1>Apply Leaves</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="card mb-30">
                                            <div className="card-body">
                                            <h5 className="fw-bolder mb-5">Available Leave</h5>
                                            {finalAvailableLeaves && finalAvailableLeaves.map((countofleaves,index) => (
                                            <div className="row mb-5" key={index}>

                                                <div className="col">
                                                    <button className="badge badge-primary badge-round-primary xl m-1 text-white" style={{backgroundColor: '#ECAA70'}} disabled>{countofleaves.EarnedLeave}</button><br/><span>Earned Leave</span>
                                                </div>

                                                <div className="col">
                                                    <button className="badge badge-primary badge-round-primary xl m-1 text-white" style={{backgroundColor: '#7FA5CA'}} disabled>{countofleaves.CasualLeave}</button><br/><span>Casual Leave</span>
                                                </div>

                                                <div className="col">
                                                    <button className="badge badge-primary badge-round-primary xl m-1 text-white" style={{backgroundColor: '#E4E647'}} disabled>{countofleaves.SickLeave}</button><br/><span>Sick Leave</span>
                                                </div>

                                                <div className="col">
                                                    <button className="badge badge-primary badge-round-primary xl m-1 text-white" style={{backgroundColor: '#AED582'}} disabled>{countofleaves.CompOff}</button><br/><span>Comp off</span>
                                                </div>
                                                
                                                <div className="col">
                                                    <button className="badge badge-primary badge-round-primary xl m-1 text-white" style={{backgroundColor: '#80CBC4'}} disabled>{countofleaves.FloatingLeave}</button><br/><span>Floating Leave</span>
                                                </div>
                                            </div>

                                            ) )}
                                            <hr />
                                            <p className="text-primary pointer-change" onClick={handleShow}>Apply Special Leave</p>
                                            <hr />
                                            <Modal show={showModal} onHide={handleClose} animation={false} size='xl'>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Applying Special Leaves</Modal.Title>
                                                </Modal.Header>
                                                    <Modal.Body>
                                                    {LeaveUpdateAlert === true ?
                                                        <div style={{fontSize : '16px'}}> 
                                                            <div className="alert alert-info alert-dismissible fade show">
                                                                <strong>Updated!!</strong> Successfully.
                                                                <button type="button" className="close" data-dismiss="alert" onClick={handleLeaveRedirect}>X</button>
                                                            </div>
                                                        </div> : null
                                                    }
                                                    {LeaveAddAlert === true ?
                                                        <div style={{fontSize : '16px'}}> 
                                                            <div className="alert alert-success alert-dismissible">
                                                                <strong>Added!!</strong> Successfully.
                                                                <button type="button" className="close" data-dismiss="alert" onClick={handleLeaveRedirect}>X</button>
                                                            </div>
                                                        </div> : null
                                                    }
                                                    <form className="leave-form" onSubmit={handleSubmit(specialleavesubmitForm)} encType='multipart/form-data'> 

                                                    <div className="row mt-5">
                                                        <div className="col-sm-5">
                                                            <div>
                                                                <span>From<span className="text-danger">*</span></span>
                                                                <input type='date' className="form-control" value={specialleave_from_date} onChange={(e) => setspecialleave_fromdate(e.target.value)} required/>
                                                            </div>
                                                            <div className="mt-4">
                                                                <span>To</span><span className="text-danger">*</span>
                                                                <input type='date' className="form-control" value={specialleave_to_date} onChange={(e) => setspecialleave_to_date(e.target.value)}  required/>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-7">
                                                            <div>
                                                                <span>Attachment</span>
                                                                <div className="form-group" x-data="{ fileName: '' }">
                                                                <div className="input-group">
                                                                        <span className="input-group-text px-3 text-muted"><i className="i-Upload"></i></span>
                                                                        <input type='file' className="form-control" placeholder="Browse file" x-model="fileName" accept="image/*,.pdf" onChange={onsetspecialleavefilechange} multiple /> 
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4">
                                                            <span>Type</span><span className="text-danger">*</span>
                                                            <select id="selectedLeave1" className="custom-select rounded-0" onChange={(e) => onspecialleave_TypeChange(e.target.value)} required>
                                                                <option>Select Type</option>
                                                                <option>Maternity Leave</option>
                                                                <option>Paternity Leave</option>
                                                                <option>Wedding Leave</option>
                                                                <option>Bereavment Leave</option>
                                                            </select><br />
                                                            <p className="text-danger">{SpecialLeaveError}</p>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    


                                                    <div className="row mt-5">
                                                        <div className="col-sm-2">
                                                            <button className="btn btn-primary" type="submit">Apply</button>
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <button className="btn btn-secondary" type="reset">Reset</button>
                                                        </div>
                                                    </div>

                                                    </form>
                                                    </Modal.Body>
                                            </Modal>
                                            {UpdateAlert === true ?
                                                <div  style={{fontSize : '16px'}}> 
                                                    <div className="alert alert-info alert-dismissible fade show">
                                                        <strong>Updated!!</strong> Successfully.
                                                        <button type="button" className="close" data-dismiss="alert" onClick={handleRedirect}>X</button>
                                                    </div>
                                                </div> : null
                                            }
                                            {AddAlert === true ?
                                                <div  style={{fontSize : '16px'}}> 
                                                    <div className="alert alert-success alert-dismissible fade show">
                                                        <strong>Added!!</strong> Successfully.
                                                        <button type="button" className="close" data-dismiss="alert" onClick={handleRedirect}>X</button>
                                                    </div>
                                                </div> : null
                                            }
                                            <form className="leave-form" onSubmit={handleSubmit(submitForm)} encType='multipart/form-data'> 

                                            <div className="row mt-5">
                                                <div className="col-sm-5">
                                                    <div>
                                                        <span>From<span className="text-danger">*</span></span>
                                                        <input type='date' className="input form-control" value={from_date} onChange={(e) => setfromdate(e.target.value)} required/>
                                                    </div>
                                                    <div className="mt-4">
                                                        <span>To</span><span className="input text-danger">*</span>
                                                        <input type='date' className="form-control" value={to_date} onChange={ontodatechnage}  required/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-1 ml-3">
                                                    <div className="d-flex " style={{height: '200px'}}>
                                                        <div className="vr"></div>
                                                        </div>
                                                    </div>
                                                <div className="col-sm-5">
                                                    <div className="mt-2" >
                                                        <span>Attachment</span>
                                                        <div className="form-group" x-data="{ fileName: '' }">
                                                            <div className="input-group" >
                                                                <span className="input-group-text px-3 text-muted"><i className="i-Upload"></i></span>
                                                                <input type='file' style={{zIndex: 0}} className="form-control" placeholder="Browse file" x-model="fileName" accept="image/*,.pdf" onChange={onfilechange} multiple />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row mt-4 mb-4">
                                                {lengthfortype1 && lengthfortype1.map((test, index,{length}) =>  {
                                                    return(
                                                    <div className="col-sm-4" key={index}>
                                                        {/* style={{backgroundColor: data.color}} */}
                                                        
                                                    <select id="selectedLeave" name="dropdownleavetype" className="form-control" onChange={(e) => onTypeChange(index,e,test.date)} required style={{backgroundColor: test.color}}>
                                                        <option>Select Type</option>
                                                        {
                                                            showEarned ? 
                                                            <option value={'EarnedLeave'} id="1" style={{backgroundColor: "#ECAA70"}}>Earned Leave</option>
                                                            : null 
                                                        }
                                                        {
                                                            showCasual ?
                                                            <option value={'CasualLeave'} id="2" style={{backgroundColor: "#7FA5CA"}}>Casual Leave</option>
                                                            : null 
                                                        }
                                                        {
                                                            showSick ?
                                                            <option value={'SickLeave'} id="3" style={{backgroundColor: "#E4E647"}}>Sick Leave</option>
                                                            : null 
                                                        }
                                                        {
                                                            showComp ?
                                                            <option value={'CompOff'} id="4" style={{backgroundColor: "#AED582"}} >CompOff</option>
                                                            : null 
                                                        }
                                                        {
                                                            showFloat ?
                                                            <option value={'FloatingLeave'} id="5" style={{backgroundColor: "#80CBC4"}} >Floating Leave</option>
                                                            : null 
                                                        }
                                                    </select><br />
                                                    
                                                    {!test.color ? <div className="card mb-3 rounded-0" style={{top: '-30px', border: `1px solid #ced4da `}}>
                                                    <div className="card-body">
                                                        <label className="p-3">{new Date(test.date).toDateString()}</label>
                                                    </div>
                                                    </div> : <div className="card mb-3 rounded-0" style={{top: '-30px', border: `1px solid ${test.color} `}}>
                                                    <div className="card-body">
                                                        <label className="p-3">{new Date(test.date).toDateString()}</label>
                                                    </div>
                                                    </div>}
                                                    
                                                    
                                                    {lengthfortype1.length > 2 ? 
                                                    (<>
                                                        <div className="row">
                                                        {index === 0 ? (<>
                                                            <div className="col-sm-5">
                                                                <input type="checkbox" id="duration1" name="duration" value={0.5} onChange={(e) => onDurationChange(index,e)} />
                                                                <label className="ml-2" htmlFor="duration1">Half</label>
                                                            </div>
                                                        </>) : (<></>)}
                                                      
                                                        {index + 1 === length 
                                                        ? (<>
                                                              <div className="col-sm-5">
                                                                <input type="checkbox" id="duration2" name="duration" value={0.5} onChange={(e) => onDurationChange(index,e)} />
                                                                <label className="ml-2" htmlFor="duration2">Half</label>
                                                            </div>
                                                        </>) 
                                                        :  (<></>)
                                                        }
                                                        
                                                        </div>
                                                    </>) : 
                                                    (<> </>)
                                                    }
                                                    {lengthfortype1.length < 2 || lengthfortype1.length === 2
                                                    ? (<div style={{fontSize: '11px'}}>
                                                        
                                                        <div className="form-check form-check-inline ">
                                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={"0.5"} checked={duration === "First Half"} onChange={(e) => onDurationChange(index,e)}   />
                                                            <label className="form-check-label" htmlFor="inlineRadio1">First-Half</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={"0.51"}   checked={duration === "Second Half"} onChange={(e) => onDurationChange(index,e)}  />
                                                            <label className="form-check-label" htmlFor="inlineRadio2">Second-Half</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={"1.0"} checked={duration === "Full Day"} onChange={(e) => onDurationChange(index,e)}  />
                                                            <label className="form-check-label" htmlFor="inlineRadio3">Full Day</label>
                                                        </div>
                                                    </div>) : (<></>)
                                                    }

                                                    </div>
                                                    )
                                                 })
                                                }
                                            </div>
                                            <p className="text-danger">{FormErrors}</p>
                                            {totalLeave === "0.0" ? null :
                                            <div className="row mt-5 ml-auto mr-auto">
                                                <div className="col-sm-12">
                                                <div className="card shadow" style={{backgroundColor: '#eee', fontSize: '15px'}}>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            {CombineLeaves && CombineLeaves.map((data, index) => (
                                                                
                                                                <h5 className="text-center font-weight-bold" >
                                                                        {CombineLeaves.length > 1 ?
                                                                            <>
                                                                            <span className="text-center">
                                                                            {data.duration}
                                                                            <br/>
                                                                            {data.combine_leave_type}
                                                                            </span>
                                                                            {index + 1 === CombineLeaves.length ? 
                                                                            <>
                                                                            <span className="text-center font-weight-bold ml-4 mr-4">=</span></> : 
                                                                            <>
                                                                            <span className="text-center font-weight-bold ml-4 mr-4">+</span></>}
                                                                            </>
                                                                            :
                                                                            <>
                                                                            <span className="text-center">
                                                                            {data.duration}
                                                                            <br/>
                                                                            {data.combine_leave_type}
                                                                            </span>
                                                                            <span className="text-center font-weight-bold ml-4 mr-4">=</span>
                                                                            </>
                                                                             
                                                                        }
                                                                        
                                                                </h5>
                                                                
                                                            ))}
                                                            
                                                            
                                                            
                                                            <h5 className="text-center font-weight-bold ml-4" >
                                                                    <span>
                                                                        {totalLeave}
                                                                        <br/>
                                                                        Total Leave(s)
                                                                    </span>
                                                            </h5>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>}

                                            <div className="row mt-5 justify-content-end">
                                                <div className="col-sm-2">
                                                    <button className="btn btn-primary" type="submit">Apply</button>
                                                </div>
                                                <div className="col-sm-2">
                                                    <button className="btn btn-secondary" type="reset" title="Reset" onClick={resetvalues}>Reset</button>
                                                </div>
                                            </div>

                                            </form>
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





