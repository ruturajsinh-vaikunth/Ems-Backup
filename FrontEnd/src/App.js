// import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './routing/ProtectedRoute';
import Dashboard from './components/Dashboard';
import DashboardProfile from './components/DashboardProfile';
import ProfileAdmin from './components/ProfileAdmin';
import AddEmployee from './components/AddEmployee';
import EmployeeInfo from './components/EmployeeInfo';
import ManagerInfo from './components/ManagerInfo';
import Leaves from './components/Leaves';
import LeavesList from './components/LeavesList';
import LeavesAdmin from './components/LeavesAdmin';
import CancelRequests from './components/CancelRequests';
import Attendance from './components/Attendance';
import AttendanceInfo from './components/AttendanceInfo';
import AttendanceAdmin from './components/AttendanceAdmin'
import AdminAttendance from './components/AdminAttendance';
import LeavesEntry from './components/LeavesEntry';
import ApprovalLeave from './components/ApprovalLeave';
import ApprovalAttendance from './components/ApprovalAttendance';
import LeavesAttachment from './components/LeavesAttachment';
import SettingHolidays from './components/SettingHolidays';
import SettingWeekoffs from './components/SettingWeekoffs';
import UserPresent from './components/UserPresent';
import UserOnLeave from './components/UserOnLeave';
import Holidays from './components/Holidays';
// import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import TotalStock from './components/TotalStock';
import AssignAssets from './components/AssignAssets';
import MyAssets from './components/MyAssets';
import AssetInfo from './components/AssetInfo';
import PostTicket from './components/PostTicket';
import MyTicket from './components/MyTickets';
import TicketCategories from './components/TicketCategories';
import Tickets from './components/Tickets';
import TicketChat from './components/TicketChat';
import TicketChatUser from './components/TicketChatUser';
import AdminPoliciesDocuments from './components/AdminPoliciesDocuments';
import EmployeePoliciesDocuments from './components/EmployeePoliciesDocuments';
import PdfViewer from './components/PdfViewer';
import BirthdayCalender from './components/BirthdayCalender';
import WorkAnniversary from './components/WorkAnniversary';
import WishReply from './components/WishReply';
import GreetingCardHistory from './components/GreetingCardHistory';
import FloatingHolidays from './components/FloatingHolidays';
import TimeSheet from './components/TimeSheet';
import TimeSheetAdmin from './components/TimeSheetAdmin';
import Expenses from './components/Expenses';
import ExpenseInfo from './components/ExpenseInfo';
import Events from './components/Events';
import EventAdd from './components/EventAdd';
import EventInfo from './components/EventInfo';
import EventEdit from './components/EventEdit';
import ProjectsAdmin from './components/ProjectAdmin';
import ProjectsManager from './components/ProjectManager';
import AddProject from './components/AddProject';
import AddTask from './components/AddTask';
import AddTaskEmployee from './components/AddTaskEmployee';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import TaskDetails from './components/TaskDetails';
import UpdateTask from './components/UpdateTask';
import UpdateProject from './components/UpdateProject';

function App() {
  
  return (

   <Router>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/dashboard-profile-page' element={<DashboardProfile />} />
        <Route path='/profile-admin' element={<ProfileAdmin />} />
        <Route path='/users' element={<AddEmployee />} />
        <Route path='/employee-info/:employee_id' element={<EmployeeInfo />} />
        <Route path='/manager-info/:employee_id' element={<ManagerInfo />} />
        <Route path='/leaves' element={<Leaves />} />
        <Route path='/leaves-list' element={<LeavesList />} />
        <Route path='/leaves-admin' element={<LeavesAdmin />} />
        <Route path='/cancel-requests' element={<CancelRequests />} />
        <Route path='/leaves-attachment/:_id' element={<LeavesAttachment />} />
        <Route path='/approval-leave' element={<ApprovalLeave />} />
        <Route path='/approval-attendance' element={<ApprovalAttendance />} />
        <Route path='/attendance' element={<Attendance />} />
        <Route path='/attendance-info/:_id' element={<AttendanceInfo />} />
        <Route path='/attendance-admin' element={<AttendanceAdmin />} />
        <Route path='/attendance-employee' element={<AdminAttendance />} />
        <Route path='/leave-entries' element={<LeavesEntry />} />
        <Route path='/setting-holidays' element={<SettingHolidays />} />
        <Route path='/setting-weekoffs' element={<SettingWeekoffs />} />
        <Route path='/user-present' element={<UserPresent />} />
        <Route path='/user-onleave' element={<UserOnLeave />} />
        <Route path='/holidays' element={<Holidays />} />
        <Route path='/total-stock' element={<TotalStock />} />
        <Route path='/assign-assets' element={<AssignAssets />} />
        <Route path='/my-assets' element={<MyAssets />} />
        <Route path='/asset-info/:asset_number' element={<AssetInfo />} />
        <Route path='/post-ticket' element={<PostTicket />} /> 
        <Route path='/my-ticket' element={<MyTicket />} /> 
        <Route path='/ticket-categories' element={<TicketCategories />} /> 
        <Route path='/tickets' element={<Tickets />} /> 
        <Route path='/ticket-chat/:_id' element={<TicketChat />} />
        <Route path='/ticket-chatuser/:_id' element={<TicketChatUser />} />
        <Route path='/admin-policies-document' element={<AdminPoliciesDocuments />} />
        <Route path='/employee-policies-document' element={<EmployeePoliciesDocuments />} />
        <Route path='/pdf-viewer/:file' element={<PdfViewer />} />
        <Route path='/birthday-calender' element={<BirthdayCalender />} />
        <Route path='/work-anniversary' element={<WorkAnniversary />} />
        <Route path='/wish-reply/:date?/:years?/:receiver?/:type?' element={<WishReply />} />
        <Route path='/greetingcard-history' element={<GreetingCardHistory />} />
        <Route path='/floating-holidays' element={<FloatingHolidays />} />
        <Route path='/time-sheet' element={<TimeSheet/>} />
        <Route path='/admin-timesheet' element={<TimeSheetAdmin/>} />
        <Route path='/expenses' element={<Expenses/>}/>
        <Route path='/expense-info/:_id' element={<ExpenseInfo/>} />
        <Route path='/events' element={<Events/>}/>
        <Route path='/add-events' element={<EventAdd/>}/>
        <Route path='/event-info/:_id' element={<EventInfo/>}/>
        <Route path='/edit-event/:_id' element={<EventEdit/>}/>
        <Route path='/projects-admin' element={<ProjectsAdmin/>}/>
        <Route path='/projects-manager' element={<ProjectsManager/>}/>
        <Route path='/add-project' element={<AddProject/>}/>
        <Route path='/add-task/:_id' element={<AddTask/>}/>
        <Route path='/add-task-employee' element={<AddTaskEmployee/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/project-details/:_id' element={<ProjectDetails/>}/>
        <Route path='/task-details/:_id' element={<TaskDetails/>}/>
        <Route path='/task-update/:_id' element={<UpdateTask/>}/>
        <Route path='/project-update/:_id' element={<UpdateProject/>}/>
      </Route>
      <Route path='/forgot-password' element={<ForgotPassword />}></Route>
      <Route path='/reset-password/:number' element={<ResetPassword />}></Route>
    </Routes>
   </Router>
  );
}

export default App;




// const Login = lazy(() =>  import('./components/Login'));
// const ProtectedRoute = lazy(() =>  import('./routing/ProtectedRoute'));
// const Dashboard = lazy(() => import('./components/Dashboard'));
// const DashboardProfile = lazy(() => import('./components/DashboardProfile'));
// const ProfileAdmin = lazy(() =>  import('./components/ProfileAdmin'));
// const AddEmployee = lazy(() =>  import('./components/AddEmployee'));
// const EmployeeInfo = lazy(() =>  import('./components/EmployeeInfo'));
// const Leaves = lazy(() =>  import('./components/Leaves'));
// const LeavesList = lazy(() =>  import( './components/LeavesList'));
// const LeavesAdmin = lazy(() =>  import( './components/LeavesAdmin'));
// const CancelRequests = lazy(() =>  import( './components/CancelRequests'));
// const Attendance = lazy(() =>  import( './components/Attendance'));
// const AttendanceInfo = lazy(() =>  import( './components/AttendanceInfo'));
// const AttendanceAdmin = lazy(() =>  import( './components/AttendanceAdmin'));
// const AdminAttendance = lazy(() =>  import( './components/AdminAttendance'));
// const LeavesEntry = lazy(() =>  import( './components/LeavesEntry'));
// const ApprovalLeave = lazy(() =>  import( './components/ApprovalLeave'));
// const ApprovalAttendance = lazy(() =>  import( './components/ApprovalAttendance'));
// const LeavesAttachment = lazy(() =>  import( './components/LeavesAttachment'));
// const SettingHolidays = lazy(() =>  import( './components/SettingHolidays'));
// const SettingWeekoffs = lazy(() =>  import( './components/SettingWeekoffs'));
// const UserPresent = lazy(() =>  import( './components/UserPresent'));
// const UserOnLeave = lazy(() =>  import( './components/UserOnLeave'));
// const Holidays = lazy(() =>  import( './components/Holidays'));