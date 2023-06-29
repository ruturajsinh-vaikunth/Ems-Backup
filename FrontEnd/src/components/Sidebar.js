import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import UserService from '../services/UserService';
import { logout } from '../features/auth/authSlice'
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import '../styles/sidebar.css'
import { Modal } from 'react-bootstrap'
import EmployeesService from '../services/EmployeesService';

const Sidebar = () => {

  const dispatch = useDispatch()
  const { handleSubmit } = useForm()

  const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);


  const [ShowSidebar, setShowSidebar] = useState(true)
  const [ShowAdminLeave, setShowAdminLeave] = useState(false);
  const [ShowAdminAssets, setShowAdminAssets] = useState(false);
  const [ShowAdminHR, setShowAdminHR] = useState(false);
  const [ShowAdminHelpdesk, setShowAdminHelpdesk] = useState(false);
  const [ShowAdminEvent, setShowAdminEvent] = useState(false);
  const [ShowAdminSetting, setShowAdminSetting] = useState(false);

  const [DashboardActive, setDashboardActive] = useState(false)
  const [ProfileAdminActive, setProfileAdminActive] = useState(false)
  const [AddUserAdminActive, setAddUserAdminActive] = useState(false)
  const [LeavesAdmin, setLeavesAdmin] = useState(false)
  const [AttendanceAdmin, setAttendanceAdmin] = useState(false)
  const [TimesheetAdmin, setTimesheetAdmin] = useState(false)
  const [TotalStock, setTotalStock] = useState(false)
  const [PoliciesAdmin, setPoliciesAdmin] = useState(false)
  const [TicketCategoryAdmin, setTicketCategoryAdmin] = useState(false)
  const [ProjectsAdminActive, setProjectsAdminActive] = useState(false)
  const [ProjectsManagerActive, setProjectsManagerActive] = useState(false)
  const [SettingAdmin, setSettingAdmin]  = useState(false)
  const [UserDashboard, setUserDashboard]  = useState(false)
  const [UserLeaves, setUserLeaves] = useState(false)
  
  const [UserAttendance, setUserAttendance] = useState(false)
  const [UserTimesheet, setUserTimesheet] = useState(false)
  const [UserAssets, setUserAssets] = useState(false)
  const [EmployeePolicies, setEmployeePolicies] = useState(false)
  const [UserTickets, setUserTickets] = useState(false)
  const [UserMISC, setUserMISC] = useState(false)

  const [LeavesAdminActive, setLeavesAdminActive] = useState(false)
  const [CancelLeavesActive, setCancelLeavesActive] = useState(false)
  const [TotalStockActive, setTotalStockActive] = useState(false)
  const [AssignAssetActive, setAssignAssetActive] = useState(false)
  const [PoliciesActive , setPoliciesActive] = useState(false)
  const [TicketCategoryActive, setTicketCategoryActive] = useState(false)
  const [TicketsActive, setTicketsActive] = useState(false)
  const [SettingHolidayActive, setSettingHolidayActive] = useState(false)
  const [SettingWeekoffActive, setSettingWeekoffActive] = useState(false)
  const [BirthdayActive, setBirthdayActive] = useState(false)
  const [WorkActive, setWorkActive] = useState(false)
  const [GreetingActive, setGreetingActive] = useState(false)

  const [UserLeavesActive, setUserLeavesActive] = useState(false)
  const [UserLeavesListActive, setUserLeavesListActive] = useState(false)
  const [UserAssetsActive, setUserAssetsActive] = useState(false)
  const [EmployeePoliciesActive, setEmployeePoliciesActive] = useState(false)
  const [UserTicketsActive, setUserTicketsActive] = useState(false)
  const [UserPostTicketActive, setUserPostTicketActive] = useState(false)
  const [UserHolidaysActive, setUserHolidaysActive] = useState(false)
  const [UserFloatingHolidaysActive, setUserFloatingHolidaysActive] = useState(false)
  const [UserBirthdayActive, setUserBirthdayActive] = useState(false)
  const [UserWorkActive, setUserWorkActive] = useState(false)
  const [UserGreetingActive, setUserGreetingActive] = useState(false)

  const [ShowUserSidebar, setShowUserSidebar] = useState(true)
  const [ShowUserLeave, setShowUserLeave] = useState(false);
  const [ShowUserAssets, setShowUserAssets] = useState(false);
  const [ShowUserHR, setShowUserHR] = useState(false);
  const [ShowUserHelpdesk, setShowUserHelpdesk] = useState(false);
  const [ShowUserMISC, setShowUserMISC] = useState(false);
  const [ExpensesActive, setExpensesActive] = useState(false);
  const [AdminExpensesActive, setAdminExpensesActive] = useState(false);

  const [EventsActive, setEventsActive] = useState(false);
  const [EventActive, setEventActive] = useState(false);
  const [AddEventsActive, setAddEventsActive] = useState(false);

  const [ProjectsActive, setProjectsActive] = useState(false);

  const [UserShow, setUserShow] = useState(false)
  const [AdminShow, setAdminShow] = useState(false)

  const [showPassEditModal, setshowPassEditModal] = useState(false);
  const handlePassEditClose = () => setshowPassEditModal(false);
  const handlePassEditShow = () => setshowPassEditModal(true)

  const [showUserPassEditModal, setshowUserPassEditModal] = useState(false);
  const handleUserPassEditClose = () => setshowUserPassEditModal(false);
  const handleUserPassEditShow = () => setshowUserPassEditModal(true)

  const [oldPassword, setoldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [OldPasswordWrong, setOldPasswordWrong] = useState("");
  const [EditAlert, setEditAlert] = useState(false)
  const [EditPasswordCustomError, setEditPasswordCustomError] = useState("");
  const [PasswordLengthCustomError, setPasswordLengthCustomError] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [AdminProfileImg, setAdminProfileImg] = useState("");
 
  function findProfile(){
    EmployeesService.findByEmployee_id(userInfo.employee_id)
    .then((response) => {
      setprofileImage(response.data.profileimg);
    })
    .catch((e) => {
      console.log(e);
    })
  }

  function findAdminProfile(){
    UserService.getAdminbyId(userInfo._id)
    .then((response) => {
      setAdminProfileImg(response.data.profileimg)
    })
    .catch((e) => {
      console.log(e);
    })
  }

  function handletoggel(){
    setShowSidebar(!ShowSidebar)
  }

  function handleAdminLeave(){
    setShowAdminLeave(!ShowAdminLeave)
  }

  function handleAdminAssets(){
    setShowAdminAssets(!ShowAdminAssets)
  }

  function handleAdminHR(){
    setShowAdminHR(!ShowAdminHR)
  }

  function handleAdminHelpdesk(){
    setShowAdminHelpdesk(!ShowAdminHelpdesk)
  }

  function handleAdminEvent(){
    setShowAdminEvent(!ShowAdminEvent)
  }

  function handleAdminSetting(){
    setShowAdminSetting(!ShowAdminSetting)
  }


  function handleUsertoggel(){
    setShowUserSidebar(!ShowUserSidebar)
  }

  function handleUserLeave(){
    setShowUserLeave(!ShowUserLeave)
  }

  function handleUserAssets(){
    setShowUserAssets(!ShowUserAssets)
  }

  function handleUserHR(){
    setShowUserHR(!ShowUserHR)
  }

  function handleUserHelpdesk(){
    setShowUserHelpdesk(!ShowUserHelpdesk)
  }

  function handleUserMISC(){
    setShowUserMISC(!ShowUserMISC)
  }

  function handleUserShow(){
    setUserShow(!UserShow)
  }

  function handleAdminShow(){
    setAdminShow(!AdminShow)
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

    UserService.editPassword(userInfo._id, oldPassword, password)
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



 useEffect(() => {
  findProfile();
  findAdminProfile();
  if(window.location.pathname === "/Dashboard"){
    setDashboardActive(!DashboardActive)
   }
   
   if(window.location.pathname === "/profile-admin"){
    setProfileAdminActive(!ProfileAdminActive)
   }

   if(window.location.pathname === '/users'){
    setAddUserAdminActive(!AddUserAdminActive)
   }

   if(window.location.pathname === '/leaves-admin'){
    setLeavesAdmin(!LeavesAdmin)
    setLeavesAdminActive(!LeavesAdminActive)
   }

   if(window.location.pathname === "/cancel-requests"){
    setLeavesAdmin(!LeavesAdmin)
    setCancelLeavesActive(!CancelLeavesActive)
   }

   if(window.location.pathname === '/add-events'){
    setAddEventsActive(!AddEventsActive)
    setEventActive(!EventActive)
   }

   if(window.location.pathname === '/events'){
    setEventActive(!EventActive)
    setEventsActive(!EventsActive)
   }

   if(window.location.pathname === '/attendance-admin'){
    setAttendanceAdmin(!AttendanceAdmin)
   }

   if(window.location.pathname === '/admin-timesheet'){
    setTimesheetAdmin(!TimesheetAdmin)
   }

   if(window.location.pathname === '/total-stock'){
    setTotalStock(!TotalStock)
    setTotalStockActive(!TotalStockActive)
   }

   
   if(window.location.pathname === '/assign-assets'){
    setTotalStock(!TotalStock)
    setAssignAssetActive(!AssignAssetActive)
   }

   if(window.location.pathname === '/admin-policies-document'){
    setPoliciesAdmin(!PoliciesAdmin)
    setPoliciesActive(!PoliciesActive)
   }

   if(window.location.pathname === "/ticket-categories"){
    setTicketCategoryAdmin(!TicketCategoryAdmin)
    setTicketCategoryActive(!TicketCategoryActive)
   }

   if(window.location.pathname === "/tickets"){
    setTicketCategoryAdmin(!TicketCategoryAdmin)
    setTicketsActive(!TicketsActive)
   }

   if(window.location.pathname === "/projects-admin"){
    setProjectsAdminActive(!ProjectsAdminActive)
   }

   if(window.location.pathname === "/projects-manager"){
    setProjectsManagerActive(!ProjectsManagerActive)
   }

   if(window.location.pathname === '/setting-holidays'){
    setSettingAdmin(!SettingAdmin)
    setSettingHolidayActive(!SettingHolidayActive)
   }

   if(window.location.pathname === '/setting-weekoffs'){
    setSettingAdmin(!SettingAdmin)
    setSettingWeekoffActive(!SettingWeekoffActive)
   }

   if(window.location.pathname === '/birthday-calender'){
    setSettingAdmin(!SettingAdmin)
    setBirthdayActive(!BirthdayActive)
   }

   if(window.location.pathname === '/work-anniversary'){
    setSettingAdmin(!SettingAdmin)
    setWorkActive(!WorkActive)
   }

   if(window.location.pathname === '/greetingcard-history'){
    setSettingAdmin(!SettingAdmin)
    setGreetingActive(!GreetingActive)
   }


  //User side
   if(window.location.pathname === '/dashboard-profile-page'){
    setUserDashboard(!UserDashboard)
   }

   if(window.location.pathname === "/leaves"){
    setUserLeaves(!UserLeaves)
    setUserLeavesActive(!UserLeavesActive)
   }

   if(window.location.pathname === '/leaves-list'){
    setUserLeaves(!UserLeaves)
    setUserLeavesListActive(!UserLeavesListActive)
   }

   if(window.location.pathname === '/attendance'){
    setUserAttendance(!UserAttendance)
   }

   if(window.location.pathname === '/time-sheet'){
    setUserTimesheet(!UserTimesheet)
   }

   if(window.location.pathname === '/my-assets'){
    setUserAssets(!UserAssets)
    setUserAssetsActive(!UserAssetsActive)
   }

   if(window.location.pathname === '/employee-policies-document'){
    setEmployeePolicies(!EmployeePolicies)
    setEmployeePoliciesActive(!EmployeePoliciesActive)
   }

   if(window.location.pathname === '/my-ticket'){
    setUserTickets(!UserTickets)
    setUserTicketsActive(!UserTicketsActive)
   }

   if(window.location.pathname === '/post-ticket'){
    setUserTickets(!UserTickets)
    setUserPostTicketActive(!UserPostTicketActive)
   }

   if(window.location.pathname === '/holidays'){
    setUserMISC(!UserMISC)
    setUserHolidaysActive(!UserHolidaysActive)
   }
   
   if(window.location.pathname === '/floating-holidays'){
    setUserMISC(!UserMISC)
    setUserFloatingHolidaysActive(!UserFloatingHolidaysActive)
   }

   if(window.location.pathname === '/birthday-calender'){
    setUserMISC(!UserMISC)
    setUserBirthdayActive(!UserBirthdayActive)
   }
   
   if(window.location.pathname === '/work-anniversary'){
    setUserMISC(!UserMISC)
    setUserWorkActive(!UserWorkActive)
   }

   if(window.location.pathname === '/greetingcard-history'){
    setUserMISC(!UserMISC)
    setUserGreetingActive(!UserGreetingActive)
   }

   if(window.location.pathname === '/expenses'){
    setExpensesActive(!ExpensesActive)
    setAdminExpensesActive(!AdminExpensesActive)
   }

   if(window.location.pathname === '/projects'){
    setProjectsActive(!ProjectsActive)
   }


   // eslint-disable-next-line
}, [])


  if(userInfo.account_type === "Admin" || userInfo.account_type === "Manager"){
      return(
      <div className="app-admin-wrap layout-sidebar-large clearfix">
      <div className="main-header">
        <div className="logo"><img src="http://localhost:5000/public/images/emslogo.png"alt=""/></div>
        <div className="menu-toggle" onClick={handletoggel}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        
        <div  style={{margin: 'auto'}}></div>
        <div className="header-part-right">
          <div className="dropdown">
            <div id="dropdown-1" className="dropdown b-dropdown m-md-2 user col align-self-end show btn-group">
                <button
                  id="dropdown-1__BV_toggle_" aria-haspopup="true" aria-expanded="true" type="button"
                  className="btn dropdown-toggle btn-link text-decoration-none dropdown-toggle-no-caret" onClick={handleAdminShow}>
                    {AdminProfileImg === undefined ? <img className="mr-2" id="userDropdown" src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                  alt="profile" data-toggle="dropdown" /> :
                    <img className="mr-2" id="userDropdown"  src={`http://localhost:5000/public/images/${AdminProfileImg}`}
                  alt="profile" data-toggle="dropdown"/> }
                  </button>
                <ul role="menu" tabIndex="-1" aria-labelledby="dropdown-1__BV_toggle_" className={AdminShow ? "dropdown-menu show headerdropdown" : "dropdown-menu"}>
                  <div aria-labelledby="userDropdown" className="dropdown-menu-right">
                      <div className="dropdown-header"><i className="i-Lock-User mr-1"></i>{userInfo.firstName}</div>
                      {userInfo.account_type === "Admin" || userInfo.account_type === "Manager" ?
                            <>
                              <NavLink to="/profile-admin" className="dropdown-item" >Edit Profile</NavLink>
                            </> :
                            <>
                            <NavLink to="/dashboard-profile-page" className="dropdown-item" >Edit Profile</NavLink>
                            </>

                      }
                      <span className='dropdown-item' onClick={handlePassEditShow}>Change Password</span>
                      <a href='/' className='dropdown-item' onClick={() => dispatch(logout())}>Sign out</a>
                  </div>
                </ul>
            </div>
          </div>

              <Modal show={showPassEditModal} onHide={handlePassEditClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Change Password</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    {EditAlert === true ?
                                        <div className="m-2"> 
                                            <div className="alert alert-success alert-dismissible">
                                                <strong>Password Changed</strong> Successfully.
                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setEditAlert(false)}>X</button>
                                            </div>
                                        </div> : null
                                        }
                                    <form onSubmit={handleSubmit(userPasswordEdit)} className="leave-form" style={{ marginLeft: '15px'}}>
                                    <div className='row'>
                                        <div className='col-sm-4'>
                                          <label>Current Password</label> 
                                        </div>
                                        <div className='col-sm-6'>
                                          <input type="password" className="form-control" value={oldPassword} onChange={(e) => setoldPassword(e.target.value)} required/>
                                          <p className="text-danger">{OldPasswordWrong}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                      <div className='col-sm-4'>
                                        <label>New Password</label> 
                                      </div>
                                        <div className='col-sm-6'>
                                          <input type="password" className="form-control" value={password} onChange={(e) => handlePasswordChange(e)} required/>
                                          <p className="text-danger">{PasswordLengthCustomError}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                      <div className='col-sm-4'>
                                        <label>Confirm Password</label> 
                                      </div>
                                      <div className='col-sm-6'>
                                        <input type="password" className="form-control" value={confirmpassword} onChange={(e) => handleConfirmPasswordChange(e)} required/>
                                        <p className="text-danger">{EditPasswordCustomError}</p>
                                      </div>
                                    </div>
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
      <div data-v-24bd52de="" className="side-content-wrap">
        <section data-v-24bd52de="" className={ShowSidebar ? "ps-container sidebar-left ps rtl-ps-none scroll open  ps--active-y" : "ps-container sidebar-left rtl-ps-none ps scroll  ps--active-y"}>
            <div data-v-24bd52de="">
              <ul data-v-24bd52de="" className="navigation-left">
              
                  <li data-v-24bd52de="" data-item="dashboards" data-submenu="true" className={DashboardActive ? "nav-item active" : "nav-item"} >
                    <NavLink to="/Dashboard" style={{textDecoration: 'none'}}
                        className="nav-item-hold" ><i
                        data-v-24bd52de="" className="nav-icon i-Bar-Chart" style={{textDecoration: 'none'}}></i><span data-v-24bd52de=""
                        className="nav-text">Dashboard</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="Profile page" data-submenu="true" className={ProfileAdminActive ? "nav-item active" : "nav-item"}>
                  <NavLink to="/profile-admin" style={{textDecoration: 'none'}}
                        className="nav-item-hold"><i data-v-24bd52de="" className="nav-icon i-Male-21"></i><span data-v-24bd52de=""
                        className="nav-text">Profile page</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="users" data-submenu="true" className={AddUserAdminActive ? "nav-item active" : "nav-item"}>
                  <NavLink to="/users"  className="nav-item-hold" style={{textDecoration: 'none'}} ><i
                        data-v-24bd52de="" className="nav-icon i-Add-User"></i><span data-v-24bd52de="" className="nav-text">Users</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="leave" data-submenu="true" className={LeavesAdmin ? "nav-item active" : "nav-item"} onClick={handleAdminLeave}>
                    <NavLink className="nav-item-hold" style={{textDecoration: 'none'}}><i
                        data-v-24bd52de="" className="nav-icon i-Calendar-3"></i><span data-v-24bd52de=""
                        className="nav-text">Leave</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="attendance" data-submenu="true" className={AttendanceAdmin ? "nav-item active" : "nav-item"}>
                  <NavLink to="/attendance-admin" className="nav-item-hold" style={{textDecoration: 'none'}}><i
                        data-v-24bd52de="" className="nav-icon i-Address-Book"></i><span data-v-24bd52de=""
                        className="nav-text">Attendance</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="assets" data-submenu="true" className={TimesheetAdmin ? "nav-item active" : "nav-item"}>
                    <NavLink to='/admin-timesheet' className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Over-Time"></i><span data-v-24bd52de=""
                        className="nav-text">TimeSheet </span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="assets" data-submenu="true" className={TotalStock ? "nav-item active" : "nav-item"} onClick={handleAdminAssets}>
                    <NavLink className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Computer-2"></i><span data-v-24bd52de=""
                        className="nav-text">Assets</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="hr" data-submenu="true" className={PoliciesAdmin ? "nav-item active" : "nav-item"} onClick={handleAdminHR}>
                    <NavLink className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Management"></i><span data-v-24bd52de=""
                        className="nav-text">HR</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="helpdesk" data-submenu="true" className={TicketCategoryAdmin ? "nav-item active" : "nav-item"} onClick={handleAdminHelpdesk}>
                    <NavLink className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Consulting"></i><span data-v-24bd52de=""
                        className="nav-text">Helpdesk</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  {userInfo.account_type === "Manager" ?

                    <li data-v-24bd52de="" data-item="project" data-submenu="true" className={ProjectsManagerActive ? "nav-item active" : "nav-item"}>
                    <NavLink to="/projects-manager"  className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Library"></i><span data-v-24bd52de=""
                        className="nav-text">Projects</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                    </li>

                  : 
                  <li data-v-24bd52de="" data-item="project" data-submenu="true" className={ProjectsAdminActive ? "nav-item active" : "nav-item"}>
                    <NavLink to="/projects-admin"  className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Library"></i><span data-v-24bd52de=""
                        className="nav-text">Projects</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  }
                  <li data-v-24bd52de="" data-item="expenses" data-submenu="true" className={ExpensesActive ? "nav-item active" : "nav-item"}>
                    <NavLink to='/expenses' className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Financial"></i><span data-v-24bd52de=""
                        className="nav-text">Expenses</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="events" data-submenu="true" className={EventActive ? "nav-item active" : "nav-item"} onClick={handleAdminEvent}>
                    <NavLink className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Shutter"></i><span data-v-24bd52de=""
                        className="nav-text">Events</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="setting" data-submenu="true" className={SettingAdmin ? "nav-item active" : "nav-item"} onClick={handleAdminSetting}>
                    <NavLink  className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Gear"></i><span data-v-24bd52de=""
                        className="nav-text">Setting</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
              </ul>
            </div>
           
      </section> 
      <section  className={ShowAdminLeave ? "ps-container sidebar-left-secondary rtl-ps-none open  ps--active-y" : "ps-container sidebar-left-secondary ps rtl-ps-none  ps--active-y"}>
      <div data-v-24bd52de="">
            <ul  className="childNav">
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/leaves-admin" className=""><i data-v-24bd52de=""
                  className={LeavesAdminActive ? "nav-icon i-Calendar-3 router-link-exact-active" :"nav-icon i-Calendar-3"}></i><span data-v-24bd52de="" className={LeavesAdminActive ? "item-name router-link-exact-active" : "item-name"}>Leave List</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/cancel-requests" className=""><i data-v-24bd52de=""
                  className={CancelLeavesActive ? "nav-icon i-Close router-link-exact-active" : "nav-icon i-Close"}></i><span data-v-24bd52de="" className={CancelLeavesActive ? "item-name router-link-exact-active" : "item-name"}>Cancel Requests</span></NavLink></li>
            </ul>
        </div>
       
      </section>
      <section  className={ShowAdminAssets ? "ps-container sidebar-left-secondary rtl-ps-none open  ps--active-y" : "ps-container sidebar-left-secondary ps rtl-ps-none  ps--active-y"}>
        <div data-v-24bd52de="">
            <ul data-v-24bd52de="" data-parent="assets" className="childNav">
              <li data-v-24bd52de="" className="nav-item"><NavLink to='/total-stock' className=""><i data-v-24bd52de=""
                  className={TotalStockActive ? "nav-icon i-Data-Center router-link-exact-active" : "nav-icon i-Data-Center"}></i><span data-v-24bd52de="" className={TotalStockActive ? "item-name router-link-exact-active" : "item-name"}>Stock</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to='/assign-assets' className=""><i data-v-24bd52de=""
                  className={AssignAssetActive ? "nav-icon i-Add-Window router-link-exact-active" : "nav-icon i-Add-Window"}></i><span data-v-24bd52de="" className={AssignAssetActive ? "item-name router-link-exact-active" : "item-name"}>Assign</span></NavLink>
              </li>
            </ul>
        </div>
      </section>
      <section  className={ShowAdminHR ? "ps-container sidebar-left-secondary rtl-ps-none open  ps--active-y" : "ps-container sidebar-left-secondary ps rtl-ps-none  ps--active-y"}>
      <div data-v-24bd52de="">
            <ul data-v-24bd52de="" data-parent="hr" className="childNav">
              <li data-v-24bd52de="" className="nav-item"><NavLink to='/admin-policies-document' className=""><i data-v-24bd52de=""
                  className={PoliciesActive ? "nav-icon i-File-Clipboard-File--Text router-link-exact-active" : "nav-icon i-File-Clipboard-File--Text" }></i><span data-v-24bd52de="" className={PoliciesActive ? "item-name router-link-exact-active" : "item-name"}>Policies & Documents</span></NavLink>
              </li>
            </ul>
        </div>
      </section>
      <section  className={ShowAdminHelpdesk ? "ps-container sidebar-left-secondary rtl-ps-none open  ps--active-y" : "ps-container sidebar-left-secondary ps rtl-ps-none  ps--active-y"}>
      <div data-v-24bd52de="">
            <ul data-v-24bd52de="" data-parent="helpdesk" className="childNav">
              <li data-v-24bd52de="" className="nav-item"><NavLink to='/ticket-categories'><i data-v-24bd52de=""
                  className={TicketCategoryActive ? "nav-icon i-Error-404-Window router-link-exact-active": "nav-icon i-Error-404-Window"}></i><span data-v-24bd52de="" className={TicketCategoryActive ? "item-name router-link-exact-active" : "item-name"}>Categories</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to='/tickets'><i data-v-24bd52de=""
                  className={TicketsActive ? "nav-icon i-Ticket router-link-exact-active" : "nav-icon i-Ticket"}></i><span data-v-24bd52de="" className={TicketsActive ? "item-name router-link-exact-active" : "item-name"}>Tickets</span></NavLink>
              </li>
            </ul>
        </div>
      </section>
      <section  className={ShowAdminEvent ? "ps-container sidebar-left-secondary rtl-ps-none open  ps--active-y" : "ps-container sidebar-left-secondary ps rtl-ps-none  ps--active-y"}>
      <div data-v-24bd52de="">
            <ul data-v-24bd52de="" data-parent="helpdesk" className="childNav">
              <li data-v-24bd52de="" className="nav-item"><NavLink to='/add-events'><i data-v-24bd52de=""
                  className={AddEventsActive ? "nav-icon i-Error-404-Window router-link-exact-active": "nav-icon i-Error-404-Window"}></i><span data-v-24bd52de="" className={AddEventsActive ? "item-name router-link-exact-active" : "item-name"}>Add Event</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to='/events'><i data-v-24bd52de=""
                  className={EventsActive ? "nav-icon i-Ticket router-link-exact-active" : "nav-icon i-Ticket"}></i><span data-v-24bd52de="" className={EventsActive ? "item-name router-link-exact-active" : "item-name"}>Events</span></NavLink>
              </li>
            </ul>
        </div>
      </section>
      <section  className={ShowAdminSetting ? "ps-container sidebar-left-secondary rtl-ps-none open  ps--active-y" : "ps-container sidebar-left-secondary ps rtl-ps-none  ps--active-y"}>
      <div data-v-24bd52de="">
            <ul data-v-24bd52de="" data-parent="setting" className="childNav">
            
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/setting-holidays"><i data-v-24bd52de=""
                  className={SettingHolidayActive ? "nav-icon i-Calendar-4 router-link-exact-active" : "nav-icon i-Calendar-4"}></i><span data-v-24bd52de="" className={SettingHolidayActive ? "item-name router-link-exact-active" : "item-name"}>Holidays</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/setting-weekoffs"><i data-v-24bd52de=""
                  className={SettingWeekoffActive ? "nav-icon i-Gears router-link-exact-active" : "nav-icon i-Gears"}></i><span data-v-24bd52de="" className={SettingWeekoffActive ? "item-name router-link-exact-active" : "item-name"}>Weekoffs</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/birthday-calender"><i data-v-24bd52de=""
                  className={BirthdayActive ? "nav-icon  i-Christmas-Candle router-link-exact-active" : "nav-icon  i-Christmas-Candle"}></i><span data-v-24bd52de="" className={BirthdayActive ? "item-name router-link-exact-active" : "item-name"}>Birthday Calender</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/work-anniversary"><i data-v-24bd52de=""
                  className={WorkActive ? "nav-icon i-Calendar router-link-exact-active" : "nav-icon i-Calendar"}></i><span data-v-24bd52de="" className={WorkActive ? "item-name router-link-exact-active" : "item-name"}>Work Anniversary</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/greetingcard-history"><i data-v-24bd52de=""
                  className={GreetingActive ? "nav-icon i-Mail-Read router-link-exact-active" : "nav-icon i-Mail-Read"}></i><span data-v-24bd52de="" className={GreetingActive ? "item-name router-link-exact-active" : "item-name"}>GreetingCard History</span></NavLink>
              </li>
            </ul>
        </div>
      </section>
      <div data-v-24bd52de="" className="sidebar-overlay"></div>
      </div>
      </div>
      )
  }
  else{
    return (

      <div className="app-admin-wrap layout-sidebar-large clearfix" >
      <div className="main-header">
        <div className="logo"><img src="http://localhost:5000/public/images/emslogo.png"alt=""/></div>
        <div className="menu-toggle" onClick={handleUsertoggel}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        
        <div  style={{margin: 'auto'}}></div>
        <div className="header-part-right">
          <div className="dropdown">
            <div id="dropdown-1" className="dropdown b-dropdown m-md-2 user col align-self-end btn-group">
            
                <button
                  id="dropdown-1__BV_toggle_" aria-haspopup="true" aria-expanded="true" type="button"
                  className="btn dropdown-toggle btn-link text-decoration-none dropdown-toggle-no-caret" onClick={handleUserShow}>
                  
                  {profileImage === undefined ? <img className="mr-2" id="userDropdown" src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                  alt="profile" data-toggle="dropdown"  /> :
                  <img className="mr-2" id="userDropdown"  src={`http://localhost:5000/public/images/${profileImage}`}
                  alt="profile" data-toggle="dropdown" /> }</button>
                <ul role="menu" tabIndex="-1" aria-labelledby="dropdown-1__BV_toggle_" className={UserShow ? "dropdown-menu show headerdropdown" : "dropdown-menu"}>
                  <div aria-labelledby="userDropdown" className="dropdown-menu-right">
                  <div className="dropdown-header"><i className="i-Lock-User mr-1"></i>{userInfo.firstName}</div>
                  {userInfo.account_type === "Admin" || userInfo.account_type === "Manager" ?
                            <>
                              <NavLink to="/profile-admin" className="dropdown-item" >Edit Profile</NavLink>
                            </> :
                            <>
                            <NavLink to="/dashboard-profile-page" className="dropdown-item" >Edit Profile</NavLink>
                            </>

                      }
                      <span className='dropdown-item' onClick={handleUserPassEditShow}>Change Password</span>
                      <a href='/' className='dropdown-item' onClick={() => dispatch(logout())}>Sign out</a>
                  </div>
                </ul>
            </div>
          </div>
                                  <Modal show={showUserPassEditModal} onHide={handleUserPassEditClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Change Password</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    {EditAlert === true ?
                                        <div className="m-2"> 
                                            <div className="alert alert-success alert-dismissible">
                                                <strong>Password Changed</strong> Successfully.
                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setEditAlert(false)}>X</button>
                                            </div>
                                        </div> : null
                                        }
                                    <form onSubmit={handleSubmit(userPasswordEdit)} className="leave-form" style={{ marginLeft: '15px'}}>
                                    <div className='row'>
                                        <div className='col-sm-4'>
                                          <label>Current Password</label> 
                                        </div>
                                        <div className='col-sm-6'>
                                          <input type="password" className="form-control" value={oldPassword} onChange={(e) => setoldPassword(e.target.value)} required/>
                                          <p className="text-danger">{OldPasswordWrong}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                      <div className='col-sm-4'>
                                        <label>New Password</label> 
                                      </div>
                                        <div className='col-sm-6'>
                                          <input type="password" className="form-control" value={password} onChange={(e) => handlePasswordChange(e)} required/>
                                          <p className="text-danger">{PasswordLengthCustomError}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                      <div className='col-sm-4'>
                                        <label>Confirm Password</label> 
                                      </div>
                                      <div className='col-sm-6'>
                                        <input type="password" className="form-control" value={confirmpassword} onChange={(e) => handleConfirmPasswordChange(e)} required/>
                                        <p className="text-danger">{EditPasswordCustomError}</p>
                                      </div>
                                    </div>
                                    <hr/>
                                    <div className="row justify-content-end">
                                        <div className="col-sm-3">
                                            <button className="btn btn-primary">Update</button>
                                        </div>
                                        <div className="col-sm-3">
                                            <button className="btn btn-secondary" onClick={handleUserPassEditClose}>Cancel</button>
                                        </div>
                                    </div>
                                    </form>
                                    </Modal.Body>
                                  </Modal>
        </div>
 
      </div>
      <div data-v-24bd52de="" className="side-content-wrap" >
        <section data-v-24bd52de=""  className={ShowUserSidebar ? "ps-container sidebar-left rtl-ps-none ps scroll open ps--active-y ps--scrolling-y" : "ps-container sidebar-left rtl-ps-none ps scroll  ps--active-y"}>
            <div data-v-24bd52de="" >
              <ul data-v-24bd52de="" className="navigation-left">
              {/* active */}
                  <li data-v-24bd52de="" data-item="dashboards" data-submenu="true" className={UserDashboard ? "nav-item active" : "nav-item"}>
                    <NavLink to="/dashboard-profile-page"
                        className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Bar-Chart"></i><span data-v-24bd52de=""
                        className="nav-text">Dashboard</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="leave" data-submenu="true" className={UserLeaves ? "nav-item active" : "nav-item" } onClick={handleUserLeave}>
                    <NavLink className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Calendar-3"></i><span data-v-24bd52de=""
                        className="nav-text">Leave</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="attendance" data-submenu="true" className={UserAttendance ? "nav-item active" : "nav-item"}>
                  <NavLink to="/attendance" className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Address-Book"></i><span data-v-24bd52de=""
                        className="nav-text">Attendance</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="timesheet" data-submenu="true" className={UserTimesheet ? "nav-item active" : "nav-item"}>
                    <NavLink to='/time-sheet' className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Over-Time"></i><span data-v-24bd52de=""
                        className="nav-text">TimeSheet </span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="assets" data-submenu="true" className={UserAssets ? "nav-item active" : "nav-item"} onClick={handleUserAssets}>
                    <NavLink className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Computer-2"></i><span data-v-24bd52de=""
                        className="nav-text">Assets</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="hr" data-submenu="true" className={EmployeePolicies ? "nav-item active" : "nav-item"} onClick={handleUserHR}>
                    <NavLink className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Management"></i><span data-v-24bd52de=""
                        className="nav-text">HR</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="helpdesk" data-submenu="true" className={UserTickets ? "nav-item active" : "nav-item"} onClick={handleUserHelpdesk}>
                    <NavLink className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Support"></i><span data-v-24bd52de=""
                        className="nav-text">Admin Helpdesk</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  
                  <li data-v-24bd52de="" data-item="project" data-submenu="true" className={ProjectsActive ? "nav-item active" : "nav-item"}>
                    <NavLink to="/projects"  className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Library"></i><span data-v-24bd52de=""
                        className="nav-text">Projects</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                    </li>
                  <li data-v-24bd52de="" data-item="expenses" data-submenu="true" className={AdminExpensesActive ? "nav-item active" : "nav-item"}>
                    <NavLink to='/expenses' className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Financial"></i><span data-v-24bd52de=""
                        className="nav-text">Expenses</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="events" data-submenu="true" className={EventsActive ? "nav-item active" : "nav-item"}>
                    <NavLink to='/events' className="nav-item-hold"><i
                        data-v-24bd52de="" className="nav-icon i-Shutter"></i><span data-v-24bd52de=""
                        className="nav-text">Events</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
                  <li data-v-24bd52de="" data-item="misc" data-submenu="true" className={UserMISC ? "nav-item active" : "nav-item"} onClick={handleUserMISC}>
                    <NavLink  className="nav-item-hold" ><i
                        data-v-24bd52de="" className="nav-icon i-Folder-Zip"></i><span data-v-24bd52de=""
                        className="nav-text">MISC</span></NavLink>
                    <div data-v-24bd52de="" className="triangle"></div>
                  </li>
              </ul>
            </div>
            {/* <div className="ps__rail-x" style={{left: '0px', bottom: '0px'}}>
              <div className="ps__thumb-x" tabIndex="0" style={{left: '0px', width: '0px'}}>
              </div>
          </div>
          <div className="ps__rail-y" style={{top: '0px', height: '191px', right: '0px'}}>
            <div className="ps__thumb-y" tabIndex="0" style={{top: '0px', height: '270px'}}></div>
          </div> */}
      </section> 
      <section  className={ShowUserLeave ? "ps-container sidebar-left-secondary rtl-ps-none open  ps--active-y" : "ps-container sidebar-left-secondary ps rtl-ps-none  ps--active-y"}>
            <ul  className="childNav">
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/leaves" className=""><i data-v-24bd52de=""
                  className={UserLeavesActive ? "nav-icon i-Calendar-2 router-link-exact-active" : "nav-icon i-Calendar-2"}></i><span data-v-24bd52de="" className={UserLeavesActive ? "item-name router-link-exact-active" : "item-name"}>Apply Leaves</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/leaves-list" className=""><i data-v-24bd52de=""
                  className={UserLeavesListActive ? "nav-icon i-Calendar-2 router-link-exact-active" : "nav-icon i-Calendar-3"}></i><span data-v-24bd52de="" className={UserLeavesListActive ? "item-name router-link-exact-active" : "item-name"}>Leave List</span></NavLink></li>
            </ul>

      </section>
      <section  className={ShowUserAssets ? "ps-container sidebar-left-secondary rtl-ps-none open  ps--active-y" : "ps-container sidebar-left-secondary ps rtl-ps-none  ps--active-y"}>
            <ul data-v-24bd52de="" data-parent="assets" className="childNav">
              <li data-v-24bd52de="" className="nav-item"><NavLink to='/my-assets' className=""><i data-v-24bd52de=""
                  className={UserAssetsActive ? "nav-icon i-Computer-Secure router-link-exact-active" : "nav-icon i-Computer-Secure"}></i><span data-v-24bd52de="" className={UserAssetsActive ?  "item-name router-link-exact-active" : "item-name"}>My Assets</span></NavLink>
              </li>
            </ul>
      </section>
      <section  className={ShowUserHR ? "ps-container sidebar-left-secondary rtl-ps-none open  ps--active-y" : "ps-container sidebar-left-secondary ps rtl-ps-none  ps--active-y"}>
            <ul data-v-24bd52de="" data-parent="hr" className="childNav">
              <li data-v-24bd52de="" className="nav-item"><NavLink to='/employee-policies-document' className=""><i data-v-24bd52de=""
                  className={EmployeePoliciesActive ? "nav-icon i-File-Clipboard-File--Text router-link-exact-active" : "nav-icon i-File-Clipboard-File--Text"}></i><span data-v-24bd52de="" className={EmployeePoliciesActive ? "item-name router-link-exact-active" : "item-name"}>Policies & Documents</span></NavLink>
              </li>
            </ul>
      </section>
      <section  className={ShowUserHelpdesk ? "ps-container sidebar-left-secondary rtl-ps-none open  ps--active-y" : "ps-container sidebar-left-secondary ps rtl-ps-none  ps--active-y"}>
            <ul data-v-24bd52de="" data-parent="helpdesk" className="childNav">
              <li data-v-24bd52de="" className="nav-item"><NavLink to='/my-ticket'><i data-v-24bd52de=""
                  className={UserTicketsActive ? "nav-icon i-Ticket router-link-exact-active" : "nav-icon i-Ticket"}></i><span data-v-24bd52de="" className={UserTicketsActive ? "item-name router-link-exact-active" : "item-name"}>My Ticket</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to='/post-ticket'><i data-v-24bd52de=""
                  className={UserPostTicketActive ? "nav-icon i-Movie-Ticket router-link-exact-active" : "nav-icon i-Movie-Ticket"}></i><span data-v-24bd52de="" className={UserPostTicketActive ? "item-name router-link-exact-active" : "item-name"}>Post Ticket</span></NavLink>
              </li>
            </ul>
      </section>
      <section  className={ShowUserMISC ? "ps-container sidebar-left-secondary rtl-ps-none open  ps--active-y" : "ps-container sidebar-left-secondary ps rtl-ps-none  ps--active-y"}>
            <ul data-v-24bd52de="" data-parent="misc" className="childNav">
            
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/holidays"><i data-v-24bd52de=""
                  className={UserHolidaysActive ? "nav-icon i-Calendar-4 router-link-exact-active" : "nav-icon i-Calendar-4"}></i><span data-v-24bd52de="" className={UserHolidaysActive ? "item-name router-link-exact-active" : "item-name"}>Holidays</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/floating-holidays"><i data-v-24bd52de=""
                  className={UserFloatingHolidaysActive ? "nav-icon i-Calendar-3 router-link-exact-active" : "nav-icon i-Calendar-3"}></i><span data-v-24bd52de="" className={UserFloatingHolidaysActive ? "item-name router-link-exact-active" : "item-name"}>Floating Holidays</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/birthday-calender"><i data-v-24bd52de=""
                  className={UserBirthdayActive ? "nav-icon i-Christmas-Candle router-link-exact-active" : "nav-icon i-Christmas-Candle"}></i><span data-v-24bd52de="" className={UserBirthdayActive ? "item-name router-link-exact-active" : "item-name"}>Birthday Calender</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/work-anniversary"><i data-v-24bd52de=""
                  className={UserWorkActive ? "nav-icon i-Calendar router-link-exact-active" : "nav-icon i-Calendar"}></i><span data-v-24bd52de="" className={UserWorkActive ? "item-name router-link-exact-active" : "item-name"}>Work Anniversary</span></NavLink>
              </li>
              <li data-v-24bd52de="" className="nav-item"><NavLink to="/greetingcard-history"><i data-v-24bd52de=""
                  className={UserGreetingActive ? "nav-icon i-Mail-Read router-link-exact-active" : "nav-icon i-Mail-Read"}></i><span data-v-24bd52de="" className={UserGreetingActive ? "item-name router-link-exact-active" : "item-name"}>GreetingCard History</span></NavLink>
              </li>
            </ul>
      </section>
      </div>
      </div>

    );
  }
};

export default Sidebar;