import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useGetDetailsQuery } from '../app/services/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'
import { FaUserAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import '../styles/header.css'
import UserService from '../services/UserService';
import { Modal } from 'react-bootstrap'

export default function Header(){

    const dispatch = useDispatch()

    const AccountInfo = localStorage.getItem('store')
    const Userinfo = JSON.parse(AccountInfo);

    const { handleSubmit } = useForm()

    const [showPassEditModal, setshowPassEditModal] = useState(false);
    const handlePassEditClose = () => setshowPassEditModal(false);
    const handlePassEditShow = () => setshowPassEditModal(true)
    const [EditAlert, setEditAlert] = useState(false)

    const [oldPassword, setoldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [OldPasswordWrong, setOldPasswordWrong] = useState("");

    const [EditPasswordCustomError, setEditPasswordCustomError] = useState("");
    const [PasswordLengthCustomError, setPasswordLengthCustomError] = useState("");

  
    // automatically authenticate user if token is found
    const { data, isFetching } = useGetDetailsQuery('userDetails', {
      pollingInterval: 900000, // 15mins
    })
  
    useEffect(() => {
      if (data) dispatch(setCredentials(data))
    }, [data, dispatch])

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

        UserService.editPassword(Userinfo._id, oldPassword, password)
        .then(response => {
            if(response.status === 200){
                setOldPasswordWrong();
                setEditAlert(true);
                setTimeout(function(){
                    handlePassEditClose()
                }, 2500); 
            }
        })
        .catch((e) => {
            setOldPasswordWrong(e.response.data.Msg);
        })
     }
    return(
        <header>
            <div className='header-status'>
                <div className='cta'>
                    <span className='bta'>
                    {isFetching
                        ? `Fetching your profile...`
                        : Userinfo !== null
                        ? 
                            
                            
                                <div className="dropdown mr-4 sticky-top">
                                        <div className="dropdown-toggle mr-2 pointer-change" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                            <FaUserAlt size={22} className="mr-2" />
                                            <small className='text-muted h6 mr-2'>{Userinfo.firstName}</small>
                                        </div>
                                        
                                        <div className="dropdown-menu sticky-top userDropdown" aria-labelledby="dropdownMenuButton" >
                                            {Userinfo.account_type === "Admin" || Userinfo.account_type === "Manager" ?
                                            <>
                                            <NavLink to="/profile-admin" className="dropdown-item" >Edit Profile</NavLink>
                                            </> :
                                            <>
                                            <NavLink to="/dashboard-profile-page" className="dropdown-item" >Edit Profile</NavLink>
                                            </>

                                        }
                                            <span className='dropdown-item' onClick={handlePassEditShow}>Change Password</span>
                                            <a href='/' className='dropdown-item' onClick={() => dispatch(logout())}>Logout</a>
                                        
                                        </div>

                                    <Modal show={showPassEditModal} onHide={handlePassEditClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Change Password</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    {EditAlert === true ?
                                        <div className="m-2"> 
                                            <div className="alert alert-info alert-dismissible fade show">
                                                <strong>Password Changed</strong> Successfully.
                                                <button type="button" className="btn-close" data-dismiss="alert" onClick={() => setEditAlert(false)}></button>
                                            </div>
                                        </div> : null
                                        }
                                    <form onSubmit={handleSubmit(userPasswordEdit)} className="leave-form" style={{ marginLeft: '15px'}}>
                                    
                                    <label>Current Password</label> 
                                        <input type="password" className="form-control" value={oldPassword} onChange={(e) => setoldPassword(e.target.value)} required/>
                                        <p className="text-danger">{OldPasswordWrong}</p>
                                    <label>New Password</label> 
                                        <input type="password" className="form-control" value={password} onChange={(e) => handlePasswordChange(e)} required/>
                                        <p className="text-danger">{PasswordLengthCustomError}</p>
                                    <label>Confirm Password</label> 
                                        <input type="password" className="form-control" value={confirmpassword} onChange={(e) => handleConfirmPasswordChange(e)} required/>
                                        <p className="text-danger">{EditPasswordCustomError}</p>
                                    <div className="row mt-3 justify-content-end">
                                        <div className="col-sm-3">
                                            <button className="btn btn-outline-secondary">Update</button>
                                        </div>
                                        <div className="col-sm-3">
                                            <button className="btn btn-secondary" onClick={handlePassEditClose}>Cancel</button>
                                        </div>
                                    </div>
                                    </form>
                                    </Modal.Body>
                                    </Modal>
                                </div>
                           
                            
                        : <span className='text-muted'></span>
                        }
                    </span>
                
                    
                </div>
            </div>
        </header>
    )
}