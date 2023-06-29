import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import  { useEffect, useState, useRef } from "react";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import {FaUserEdit} from 'react-icons/fa'
import { useForm } from 'react-hook-form';
import UserService from "../services/UserService";
import { Modal } from 'react-bootstrap'
import http from '../http-common';

export default function Profile(){

    
    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    const inputRef = useRef(null);

    const { handleSubmit } = useForm()
    const [id, setId] = useState("");
    const [Name, setName] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [AccountType, setAccountType] = useState("");
    const [EditNameCustomError, setEditNameCustomError] = useState("");
    const [EditEmailCustomError, setEditEmailCustomError] = useState("");
    const [showEditModal, setshowEditModal] = useState(false);
    const [EditUserAlert, setEditUserAlert] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [PreviewFile, setPreviewFile] = useState();
    const [ProfileImg, setProfileImg] = useState("");
    const [updatebuttonshow, setupdatebuttonshow] = useState(false);

    const handleEditClose = () => setshowEditModal(false);
    const handleEditShow = () => setshowEditModal(true);


    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };

    const handleClick = () => {
        inputRef.current.click();
      };

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
        
        formData.append("_id", userInfo._id)

        formData.append("oldImage", ProfileImg)
        
        const resp = await http.post(`/users/Adminprofileimgadd`, formData, {
            headers: {
              "content-type": "multipart/form-data",
              'Authorization': `Bearer ${userToken}`,
            },
          });

          if(resp.status === 200){
            getAdminDetail()
            setupdatebuttonshow(false)
          }
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
        UserService.editUser(id, Name, UserEmail)
        .then(response => {
            if(response.status === 200){
                handleEditClose();
                getAdminDetail()
                setEditUserAlert(true);
            }
        })
        .catch((e) => {
            console.log(e);
        })
     }

    function getAdminDetail(){
        UserService.getAdminbyId(userInfo._id)
        .then((res) => {
            setId(res.data._id)
            setName(res.data.firstName)
            setUserEmail(res.data.email)
            setAccountType(res.data.account_type)
            setProfileImg(res.data.profileimg)
        })
        .catch((e) => {
            console.log(e);
        })
     }

    useEffect(() => {
        getAdminDetail()
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
                                                <h1>Profile</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-6">
                                                <div className="card card-profile-1 mb-30">
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
                                                            <button className="btn btn-primary btn-rounded btn-sm  pointer-change mt-2" onClick={handleClick}><FaUserEdit className="mr-1" size={22} />Profile Image</button>
                                                                    
                                                            {updatebuttonshow === true ?
                                                            <>
                                                            <button className="btn btn-primary btn-sm ml-2 mt-2" onClick={profileImgChange} >Change</button>
                                                            </>
                                                            :
                                                            null
                                                            }
                                                        </div>

                                                        <div className="mt-3">
                                                        <h4>{Name}</h4>
                                                        <p className="text-secondary mb-1">{UserEmail}</p>
                                                        <p className="text-muted font-size-sm">{AccountType}</p>
                                                        </div>
                                                        
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-lg-6">
                                                <div className="card mb-30">
                                                    <div className="card-body">
                                                    <div className="row">
                                                    <div className="col-sm-4">
                                                        <h5 className="mb-0">Name</h5>
                                                    </div>
                                                    <div className="col-sm-8 text-muted">
                                                    <h5 className="mb-0">{Name}</h5>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <h5 className="mb-0">Email</h5>
                                                    </div>
                                                    <div className="col-sm-8 text-muted">
                                                    <h5 className="mb-0">{UserEmail}</h5>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <h5 className="mb-0">AccountType</h5>
                                                    </div>
                                                    <div className="col-sm-8 text-muted">
                                                    <h5 className="mb-0">{AccountType}</h5>
                                                    </div>
                                                </div>
                                                <hr />
                                                <button className="btn btn-primary btn-rounded btn-sm mt-1" onClick={() => handleEditShow()}><FaUserEdit className="mr-1" size={22} />Details</button>
                                                {EditUserAlert === true ?
                                                                <div style={{fontSize: '16px'}}> 
                                                                    <div className="alert alert-dismissible alert-success mt-3">
                                                                        <strong>Details Updated!!</strong> Successfully.
                                                                        <button type="button" className="close" data-dismiss="alert" onClick={() => setEditUserAlert(false)}>X</button>
                                                                    </div>
                                            </div> : null }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>   
                                    <Modal show={showEditModal} onHide={handleEditClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <form onSubmit={handleSubmit(userEdit)} className="leave-form ml-auto mr-auto">
                                    <label>Name</label> 
                                        <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} required/>
                                        <p className="text-danger">{EditNameCustomError}</p>
                                    <label>Email</label> 
                                        <input type="email" className="form-control" value={UserEmail} onChange={(e) => setUserEmail(e.target.value)} required/>
                                        <p className="text-danger">{EditEmailCustomError}</p>
                                    <hr/>
                                    <div className="row justify-content-end">
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