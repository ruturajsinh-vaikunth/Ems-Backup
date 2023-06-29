
import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import UserService from "../services/UserService";
import {MdPersonAddAlt1} from 'react-icons/md';
import {ImCancelCircle} from 'react-icons/im';
import {FaUserEdit} from 'react-icons/fa';
import {RiLockPasswordLine} from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { MdEditCalendar } from 'react-icons/md';
import { Button, Modal } from 'react-bootstrap'
import {registerUser} from '../features/auth/authActions';
import {useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { Link  } from 'react-router-dom';
import { getUsers } from "../actions/usersActions";
import { employeeInfo } from "../features/employees/employeesActions";
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";

export default function AddEmployee(){

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);

    const [employee_id, setemployee_id] = useState("")
    const [email, setemail] = useState("")
    const [account_type, setaccount_type] = useState("") 
    const [status, setstatus] = useState("")
    const [showdiv, setshowdiv] = useState(false)

    const [AllUsers, setAllUsers] = useState([]);
    const [id, setid] = React.useState('');
    const [Name, setName] = React.useState('');
    const [UserEmail, setUserEmail] = React.useState('');
    const [AccountType, setAccountType] = React.useState('');
    const [Status, setStatus] = React.useState('');
    // const [filterText, setFilterText] = React.useState('');
    const [NameCustomError, setNameCustomError] = useState("");
    const [PasswordCustomError, setPasswordCustomError] = useState("");
    const [EditPasswordCustomError, setEditPasswordCustomError] = useState("");
    const [PasswordLengthCustomError, setPasswordLengthCustomError] = useState("");
    const [Error, setError] = useState([]);
    const [AlreadyExist, setAlreadyExist] = useState("");
    const [EditNameCustomError, setEditNameCustomError] = useState("");
    const [EditEmailCustomError, setEditEmailCustomError] = useState("");
    const [oldPassword, setoldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [OldPasswordWrong, setOldPasswordWrong] = useState("");

    const [showModal, setShow] = useState(false);
    const [showDelModal, setshowDelModal] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);
    const [showPassEditModal, setshowPassEditModal] = useState(false);
    const [AddUserAlert, setAddUserAlert] = useState(false);
    const [EditUserAlert, setEditUserAlert] = useState(false);
    const [EditPassAlert, setEditPassAlert] = useState(false);

    const handleClose = () => setShow(false);
    const handleDelClose = () => setshowDelModal(false);
    const handleEditClose = () => setshowEditModal(false);
    const handlePassEditClose = () => setshowPassEditModal(false);

    const handleShow = () => setShow(true);
    const handleDelShow = () => setshowDelModal(true);
    const handleEditShow = () => setshowEditModal(true);
    const handlePassEditShow = () => setshowPassEditModal(true)
    const [NullError, setNullError] = useState("")

    function searchbyuser(){
        if(employee_id === '' && email === '' && account_type === '' && status === ''){
            setNullError("Please Enter inputs")
            return
        }else{
            setNullError("")
        }

        UserService.filterUsers(employee_id, email, account_type, status)
        .then((response) => {
            setAllUsers(response.data);
            setshowdiv(true)
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function resetvalue(){
        setshowdiv(false)
        setemployee_id("")
        setemail("")
        setaccount_type("")
        setstatus("")

    }

    
      const dispatch = useDispatch()

      const { register, handleSubmit } = useForm()
    
      const submitForm = (data) => {
        if(!data.firstName || /^\s*$/.test(data.firstName) ){
            setNameCustomError('Please Enter Name')
            return
        }
        else{
            setNameCustomError('')
        }
        
        if (data.password !== data.confirmPassword) {
            setPasswordCustomError('Password mismatch')
          return
        }
        else{
            setPasswordCustomError('')
        }
       
        data.email = data.email.toLowerCase()
    
        dispatch(registerUser(data))
        .then((response)=>{
            if(response.meta.requestStatus === "fulfilled"){
                setError("")
                setAlreadyExist("")
                setAddUserAlert(true)
                searchbyuser();
                handleClose();
            }
            else{
                setError(response.payload.details)
            }
            if(response.payload === "User Already Exist."){
                setAlreadyExist("User Already Exist")
                return
            }
            else{
                setAlreadyExist("")
            }
        })

       
      }

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };

    useEffect(() => {
        getUsers();
        dispatch(employeeInfo);

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
    
    const data = AllUsers.filter(
        item => !item.account_type.includes("Admin")
    )
    
    
    const managerData = data.filter(
        item => !item.account_type.includes("Manager")
    )
    

    const columns = [
        {
            name: 'Employee Id',
            selector: row => row.employee_id,
            sortable: true,
            // width: "fit-content",
            minWidth: "8%",
            maxWidth: "11%",
            width: "11%",
            
            cell: row => (
                <>
                {row.account_type === "Manager" ?
                        <>
                        {row.status === "Deleted" ?
                            <Link to={`/manager-info/${row.employee_id}`} style={{textDecoration: 'none', color: 'white'}} className="pointer-change">
                                {row.employee_id}
                            </Link> : 
                            <Link to={`/manager-info/${row.employee_id}`} style={{textDecoration: 'none', color: 'blue'}} className="pointer-change">
                                {row.employee_id}
                            </Link>
                        }
                        </>
                :
                <>
                {row.status === "Deleted" ?
                    <Link to={`/employee-info/${row.employee_id}`} style={{textDecoration: 'none', color: 'white'}} className="pointer-change">
                           {row.employee_id}
                    </Link> : 
                    <Link to={`/employee-info/${row.employee_id}`} style={{textDecoration: 'none', color: 'blue'}} className="pointer-change">
                        {row.employee_id}
                    </Link>
                }
                </> }
                </>
            ),
            conditionalCellStyles: [
                {
                    when: row => row.status === "Deleted",
                    style: {
                        backgroundColor: '#fc2d38',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
            ]
        },
        {
            name: 'Name',
            selector: row => row.firstName,
            sortable: true,
            minWidth: "10%",
            maxWidth: "15%",
            width: "15%",
            conditionalCellStyles: [
                {
                    when: row => row.status === "Deleted",
                    style: {
                        backgroundColor: '#fc2d38',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
            ]
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            minWidth: "15%",
            maxWidth: "20%",
            width: "20%",
            conditionalCellStyles: [
                {
                    when: row => row.status === "Deleted",
                    style: {
                        backgroundColor: '#fc2d38',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
            ]
        },
        {
            name: 'Account Type',
            selector: row => row.account_type,
            minWidth: "10%",
            maxWidth: "15%",
            width: "15%",
            conditionalCellStyles: [
                {
                    when: row => row.status === "Deleted",
                    style: {
                        backgroundColor: '#fc2d38',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
            ]
        },
        {
            name: 'Status',
            selector: row => row.status,
            minWidth: "7%",
            maxWidth: "10%",
            width: "10%",
            conditionalCellStyles: [
                			{
                				when: row => row.status === "Deleted",
                				style: {
                					backgroundColor: '#fc2d38',
                					color: 'white',
                					'&:hover': {
                						cursor: 'pointer',
                					},
                				},
                			},
            ]
        },
        {
            name: 'Action',
            cell: row => (
                <>
                {userInfo.account_type === 'Admin' ?
                    <>
                    {row.status === "Deleted" ?
                                <>
                                <FaUserEdit size={26} className="pointer-change" title="Edit User Details" onClick={() => {handleEditShow(); handleDeleteChange(row._id, row.firstName,row.email ,row.account_type, row.status);}} />
                                <RiLockPasswordLine size={26} className="ml-3 pointer-change" title="Edit User Password" onClick={() => {handlePassEditShow(); handleDeleteChange(row._id, row.firstName,row.email ,row.account_type, row.status);}} />  
                                
                                <Link to={`/attendance-employee?employee_id=${row.employee_id}`} className="pointer-change">
                                    <FiEdit size={26} className="ml-3" color="white" title="View Attendance"  />
                                </Link>
                                <Link to={`/leave-entries?employee_id=${row.employee_id}`} className="pointer-change">
                                    <MdEditCalendar size={26} className="ml-3" color="white" title="Add/Edit Leaves Per Year" />
                                </Link>
                                <ImCancelCircle color="white" className="ml-3 pointer-change" title="Delete User Details" size={26} onClick={() => {handleDelShow(); handleDeleteChange(row._id, row.firstName,row.email ,row.account_type);}}/>
                                    
                                </> : 
                                <>
                                    <FaUserEdit size={26} className="pointer-change" title="Edit User Details" onClick={() => {handleEditShow(); handleDeleteChange(row._id, row.firstName,row.email ,row.account_type, row.status);}} />
                                    <RiLockPasswordLine size={26} className="ml-3 pointer-change" title="Edit User Password" onClick={() => {handlePassEditShow(); handleDeleteChange(row._id, row.firstName,row.email ,row.account_type, row.status);}} />  
                                    
                                    <Link to={`/attendance-employee?employee_id=${row.employee_id}`} className="pointer-change">
                                        <FiEdit size={26} className="ml-3" title="View Attendance"  />
                                    </Link>
                                    <Link to={`/leave-entries?employee_id=${row.employee_id}`} className="pointer-change">
                                        <MdEditCalendar size={26} className="ml-3" title="Add/Edit Leaves Per Year" />
                                    </Link>
                                    <ImCancelCircle color="red" className="ml-3 pointer-change" title="Delete User Details" size={26} onClick={() => {handleDelShow(); handleDeleteChange(row._id, row.firstName,row.email ,row.account_type);}}/>
                                </>
                    }
                    </> : 
                    <>
                    {row.status === "Deleted" ?
                                <>
                               
                                
                                <Link to={`/attendance-employee?employee_id=${row.employee_id}`} className="pointer-change">
                                    <FiEdit size={26} className="ml-3" color="white" title="View Attendance"  />
                                </Link>
                                <Link to={`/leave-entries?employee_id=${row.employee_id}`} className="pointer-change">
                                    <MdEditCalendar size={26} className="ml-3" color="white" title="Add/Edit Leaves Per Year" />
                                </Link>
                                <ImCancelCircle color="white" className="ml-3 pointer-change" title="Delete User Details" size={26} onClick={() => {handleDelShow(); handleDeleteChange(row._id, row.firstName,row.email ,row.account_type);}}/>
                                    
                                </> : 
                                <>
                                   
                                    
                                    <Link to={`/attendance-employee?employee_id=${row.employee_id}`} className="pointer-change">
                                        <FiEdit size={26} className="ml-3" title="View Attendance"  />
                                    </Link>
                                    <Link to={`/leave-entries?employee_id=${row.employee_id}`} className="pointer-change">
                                        <MdEditCalendar size={26} className="ml-3" title="Add/Edit Leaves Per Year" />
                                    </Link>
                                    <ImCancelCircle color="red" className="ml-3 pointer-change" title="Delete User Details" size={26} onClick={() => {handleDelShow(); handleDeleteChange(row._id, row.firstName,row.email ,row.account_type);}}/>
                                </>
                    }
                    </>
                }
                </>
            ),
            conditionalCellStyles: [
                			{
                				when: row => row.status === "Deleted",
                				style: {
                					backgroundColor: '#fc2d38',
                					color: 'white',
                					'&:hover': {
                						cursor: 'pointer',
                					},
                				},
                			},
            ]
        }
    ]

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
      };

     function handleDeleteChange(_id, name, email, account_type, stat){
        setid(_id);
        setName(name);
        setUserEmail(email);
        setAccountType(account_type);
        setStatus(stat)
     }


     function userDelete(){
        UserService.deleteById(id)
        .then(response => {
           if(response.status === 200){
            handleDelClose();
            searchbyuser();
           }
        })
        .catch(e => {
            console.log(e);
        })
     }

     function userEdit(){
        if(!Name || /^\s*$/.test(Name) ){
            setEditNameCustomError('Please Enter Name')
            return
        }
        else{
            setEditNameCustomError("")
        }
        // eslint-disable-next-line
        var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(validRegex.test(UserEmail)){
            setEditEmailCustomError('')
        }
        else{
            setEditEmailCustomError("Please Enter Valid Email")
            return
        }
        UserService.editUser(id, Name, UserEmail, AccountType, Status)
        .then(response => {
            if(response.status === 200){
                handleEditClose();
                setEditUserAlert(true);
                searchbyuser();
            }
        })
        .catch((e) => {
            console.log(e);
        })
     }

     function handlePasswordChange(e){
        setPassword(e.target.value)
        if (e.target.value.length < 4) {
            setPasswordLengthCustomError('Password must be 4 character long')
            return
        }
        else{
            setPasswordLengthCustomError('')
        }
    }

    function handleConfirmPasswordChange(e){
        setconfirmpassword(e.target.value)
        if (password !== e.target.value) {
            setEditPasswordCustomError('Password mismatch')
          return
        }
        else{
            setEditPasswordCustomError('')
        }
    }

     function userPasswordEdit(){

        UserService.editPassword(id, oldPassword, password)
        .then(response => {
            if(response.status === 200){
                handlePassEditClose();
                setEditPassAlert(true);
                searchbyuser();
                setOldPasswordWrong();
            }
        })
        .catch((e) => {
            setOldPasswordWrong(e.response.data.Msg);
        })
     }


//     function findInValues(arr, value) {
//         value = String(value).toLowerCase();
//         return arr.filter(o =>
//         Object.entries(o).some(entry =>
//             String(entry[1]).toLowerCase().includes(value)
//         )
//         );
//   }
  
//     const filteredItems = findInValues(data,  filterText);


//      const FilterComponent = ({ filterText, onFilter, onClear }) => (
//             <div className="buttonIn">
//                 <input
//                     id="search"
//                     type="text"
//                     placeholder="Search.."
//                     aria-label="Search Input"
//                     value={filterText}
//                     onChange={onFilter}
//                     autoFocus="autoFocus"
//                     className="form-control"
//                     style={{height: '38px'}}
//                 />

//             </div>
//         );

//      const subHeaderComponentMemo = React.useMemo(() => {
//         const handleClear = () => {
//             if(filterText){
//                 setFilterText('');
//             }
//         };
//         return (
           
//                 <div className="col-sm-3">
//                     <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
//                 </div>
           
        
//         )
//      },[filterText])

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
                                                        
                                                        <div className="p-2 breadcrumb">
                                                            <h1 >Users</h1>
                                                        </div>
                                                        <div className="p-1 mb-2">
                                                            <button className="btn btn-primary btn-sm" type="button" onClick={handleShow} style={{float: 'inline-start'}}>
                                                                <MdPersonAddAlt1 size={24} className="mr-2" color="white" />Add User
                                                            </button>
                                                        </div>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        {AddUserAlert === true ?
                                                                        <div style={{fontSize: '16px'}}> 
                                                                            <div className="alert alert-dismissible alert-success">
                                                                                <strong>User Details Added!!</strong> Successfully.
                                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setAddUserAlert(false)}>X</button>
                                                                            </div>
                                                        </div> : null }
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <div className="card mb-30">
                                                    <div className="card-body">
                                                        <div className="row mt-2">
                                                                <div className="col-sm-2">
                                                                    <label>Employee Id</label>
                                                                    <input className="form-control empselect" type="number" value={employee_id} onChange={(e) => setemployee_id(e.target.value)}/>      
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <label>Email</label>
                                                                    <input className="form-control empselect" type="email" value={email} onChange={(e) => setemail(e.target.value)} />      
                                                                </div>
                                                                <div className="col-sm-2">
                                                                    <label>Account Type</label>
                                                                    {userInfo.account_type === "Manager" ?
                                                                    <select className="custom-select empselect" value={account_type} onChange={(e) => setaccount_type(e.target.value)}>
                                                                            <option value="">Select</option>
                                                                            <option value="Employee">Employee</option>
                                                                    </select> : <select className="custom-select empselect" value={account_type} onChange={(e) => setaccount_type(e.target.value)}>
                                                                            <option value="">Select</option>
                                                                            <option value="Employee">Employee</option>
                                                                            <option value="Manager">Manager</option>
                                                                    </select>}     
                                                                </div>
                                                                <div className="col-sm-2">
                                                                    <label>Status</label>
                                                                    <select className="custom-select empselect" value={status} onChange={(e) => setstatus(e.target.value)}>
                                                                            <option value="">Select</option>
                                                                            <option value="Active">Active</option>
                                                                            <option value="Inactive">Inactive</option>
                                                                            <option value="Deleted">Deleted</option>
                                                                    </select>      
                                                                </div> 
                                                                <div className="col-sm-3 mt-4">
                                                                            <button className="btn btn-sm btn-primary searchbtn" title="Search" onClick={searchbyuser}>Search</button>
                                                                            <button className="btn btn-sm btn-secondary ml-3 resetbtn" title="Reset" onClick={resetvalue}>Reset</button>
                                                                            <p className="text-danger mt-3">{NullError}</p>
                                                                </div>     

                                                                <Modal show={showModal} onHide={handleClose} animation={false}>
                                                                                        <Modal.Header closeButton>
                                                                                            <Modal.Title> Add new account</Modal.Title>
                                                                                        </Modal.Header>
                                                                                        <Modal.Body>
                                                                                        <span className="text-danger ml-3">{AlreadyExist}</span>  
                                                                                            {Error && Error.map((data,index) => (
                                                                                                <div key={index}>
                                                                                                    <span className="text-danger ml-3">{data.message}</span>
                                                                                                </div>
                                                                                            ))}
                                                                                            
                                                                                        <form onSubmit={handleSubmit(submitForm)} className="row g-2 user-form ml-auto mr-auto">
                                                                                                <div className='col-md-6'>
                                                                                                    <label htmlFor='password'>Name</label>
                                                                                                    <input
                                                                                                    type='text'
                                                                                                    className='form-control'
                                                                                                    {...register('firstName')}
                                                                                                    required
                                                                                                    />
                                                                                                    <span className="text-danger">{NameCustomError}</span>
                                                                                                </div>
                                                                                                <div className='col-md-6'>
                                                                                                    <label htmlFor='password'>Email</label>
                                                                                                    <input
                                                                                                    type='email'
                                                                                                    className='form-control'
                                                                                                    {...register('email')}
                                                                                                    required
                                                                                                    />
                                                                                                    
                                                                                                </div>
                                                                                                <div className='col-md-6 mt-3'>
                                                                                                    <label htmlFor='password'>Password</label>
                                                                                                    <input
                                                                                                    type='password'
                                                                                                    className='form-control'
                                                                                                    {...register('password')}
                                                                                                    required
                                                                                                    />
                                                                                                    <span className="text-danger">{PasswordCustomError}</span>
                                                                                                </div>
                                                                                                <div className='col-md-6 mt-3'>
                                                                                                    <label htmlFor='password'>Confirm Password</label>
                                                                                                    <input
                                                                                                    type='password'
                                                                                                    className='form-control'
                                                                                                    {...register('confirmPassword')}
                                                                                                    required
                                                                                                    />
                                                                                                    <span className="text-danger">{PasswordCustomError}</span>
                                                                                                </div>
                                                                                                <div className='col-md-12 mt-3'>
                                                                                                    <label htmlFor='email'>Account type</label>
                                                                                                    {userInfo.account_type === "Manager" ?
                                                                                                    <select className="custom-select"  {...register('account_type')} required>
                                                                                                        <option value="Employee" selected>Employee</option>
                                                                                                    </select> : 
                                                                                                    <select className="custom-select"  {...register('account_type')} required>
                                                                                                        <option value="Employee" selected>Employee</option>
                                                                                                        <option value="Manager">Manager</option>
                                                                                                    </select>
                                                                                                    }
                                                                                                </div>
                                                                                                
                                                                                                <div className="col-12 mt-4">
                                                                                                    <button type='submit' className='button btn btn-primary'>
                                                                                                        Submit
                                                                                                    </button>
                                                                                                    <button className="btn btn-secondary ml-3" onClick={handleClose}>Cancel</button>
                                                                                                </div>
                                                                                            </form>
                                                                                        </Modal.Body>
                                                                </Modal>
                                                        </div>
                                    
                                   
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                        {showdiv === true ? 
                                        <div className="col-md-12 mt-3">
                                            <div className="card">
                                                <div className="card-body">
                                                       
                                                        {EditUserAlert === true ?
                                                                        <div style={{fontSize: '16px'}}> 
                                                                            <div className="alert alert-dismissible alert-success">
                                                                                <strong>User Details Update!!</strong> Successfully.
                                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setEditUserAlert(false)}>X</button>
                                                                            </div>
                                                                        </div> 
                                                        : null }
                                                        {EditPassAlert === true ?
                                                                        <div style={{fontSize: '16px'}}> 
                                                                            <div className="alert alert-dismissible alert-success">
                                                                                <strong>User Password Update!!</strong> Successfully.
                                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setEditPassAlert(false)}>X</button>
                                                                            </div>
                                                        </div> : null }
                                                        
                                                        {userInfo.account_type === "Admin" ?
                                                            <DataTable 
                                                                className="order-table vgt-table "
                                                                columns={columns}
                                                                data={data}
                                                                // subHeader
                                                                // subHeaderComponent={subHeaderComponentMemo}
                                                                pagination
                                                                paginationComponentOptions={paginationComponentOptions}
                                                            /> : 
                                                            <DataTable 
                                                                className="order-table vgt-table "
                                                                columns={columns}
                                                                data={managerData}
                                                                // subHeader
                                                                // subHeaderComponent={subHeaderComponentMemo}
                                                                pagination
                                                                paginationComponentOptions={paginationComponentOptions}
                                                            />
                                                            }

                                                            

                                                            <Modal show={showDelModal} onHide={handleDelClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Are you sure to Delete?</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                <h5>Name  : {Name}</h5>
                                                                <h5>Email : {UserEmail}</h5>
                                                                <h5>Account Type: {AccountType}</h5>
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="danger" onClick={userDelete}>
                                                                        Delete
                                                                    </Button>
                                                                    <Button variant="secondary" onClick={handleDelClose}>
                                                                        Cancel
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal>

                                                            <Modal show={showEditModal} onHide={handleEditClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Edit Details</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                <form onSubmit={handleSubmit(userEdit)} className="leave-form ml-3">
                                                                <label>Name</label> 
                                                                    <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} required/>
                                                                    <p className="text-danger">{EditNameCustomError}</p>
                                                                <label>Email</label> 
                                                                    <input type="email" className="form-control" value={UserEmail} onChange={(e) => setUserEmail(e.target.value)} required/>
                                                                    <p className="text-danger">{EditEmailCustomError}</p>
                                                                <label>Account type</label>
                                                                    <select className="custom-select" value={AccountType} onChange={(e) => setAccountType(e.target.value)}>
                                                                        <option value="Employee">Employee</option>
                                                                        <option value="Manager">Manager</option>
                                                                    </select>
                                                                <label className="mt-2">Status</label>
                                                                <select className="custom-select" value={Status} onChange={(e) => setStatus(e.target.value)}>
                                                                        <option value="Active">Active</option>
                                                                        <option value="Inactive">Inactive</option>
                                                                        <option value="Deleted">Deleted</option>
                                                                    </select>
                                                                <hr/>
                                                                <div className="row  justify-content-end">
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-primary">Update</button>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-secondary" onClick={handleEditClose}>Cancel</button>
                                                                    </div>
                                                                </div>
                                                                </form>
                                                                </Modal.Body>
                                                            </Modal>
                                                            
                                                            <Modal show={showPassEditModal} onHide={handlePassEditClose} animation={false}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Edit Password</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                
                                                                <form onSubmit={handleSubmit(userPasswordEdit)} className="leave-form ml-3">
                                                                <h5>Name: {Name}</h5><br/>
                                                                <h5>Email: {UserEmail}</h5><br/>
                                                                <label>current Password</label> 
                                                                    <input type="password" className="form-control" value={oldPassword} onChange={(e) => setoldPassword(e.target.value)} required/>
                                                                    <p className="text-danger">{OldPasswordWrong}</p>
                                                                <label>New Password</label> 
                                                                    <input type="password" className="form-control" value={password} onChange={(e) => handlePasswordChange(e)} required/>
                                                                    <p className="text-danger">{PasswordLengthCustomError}</p>
                                                                <label>Confirm Password</label> 
                                                                    <input type="password" className="form-control" value={confirmpassword} onChange={(e) => handleConfirmPasswordChange(e)} required/>
                                                                    <p className="text-danger">{EditPasswordCustomError}</p>
                                                                <hr/>
                                                                <div className="row justify-content-end">
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-primary">Update</button>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-secondary" onClick={handlePassEditClose}>Cancel</button>
                                                                    </div>
                                                                </div>
                                                                </form>
                                                                </Modal.Body>
                                                            </Modal>

                                                </div>
                                            </div>
                                        </div> : null }
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