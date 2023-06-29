import http from "../http-common";

const allAttendance = () =>{
  const userToken = localStorage.getItem('userToken')
  return http.get("/attendance", {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }});
}

const AdminTodayAttendance = () =>{
  const userToken = localStorage.getItem('userToken')
  return http.get("/attendance/today-attendance", {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }});
}

const findAttendanceById = (_id) => {
  const userToken = localStorage.getItem('userToken')
    return http.post(`/attendance/attendanceinfobyid`,{_id}, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }})
}

const searchattendance = (employee_id, SaerchfromDate, SearchtoDate) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/attendance/search-attendance`,{employee_id, SaerchfromDate, SearchtoDate}, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }})
}

const TodayAttendance = (today) => {
  const userToken = localStorage.getItem('userToken')
    return http.post(`/attendance/today-attendance`,{today}, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }})
}

const submitAttendance = (GlobalArray) => {
  const userToken = localStorage.getItem('userToken')
    return http.post(`/attendance/entryattendance`, {data : GlobalArray}, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }});
};

const findAttendanceByEmployeeId = employee_id => {
  const userToken = localStorage.getItem('userToken')
    return http.post(`/attendance/attendanceinfo`,{employee_id}, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }})
}

const filterbyStatus = (filterstatus) => {
  const userToken = localStorage.getItem('userToken')
    return http.post(`/attendance/statusfilter`,{filterstatus: filterstatus}, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }})
}

const updateStatus  = (id,attendanceStatus,reason) => {
  const userToken = localStorage.getItem('userToken')
  return http.put(`/attendance/updatestatus`,{_id: id, attendanceStatus: attendanceStatus, reason : reason}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}

const approveAttendance  = (_id, status, statusChangeby) => {
  const userToken = localStorage.getItem('userToken')
  return http.put(`/attendance/approve-attendance`, {_id, status, statusChangeby}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}

const rejectAttendance  = ( id, status, reason, statusChangeby) => {
  const userToken = localStorage.getItem('userToken')
  return http.put(`/attendance/reject-attendance`,{_id: id, status: status, reason: reason, statusChangeby}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}


const filterdatefromrange = (employee_id,filterfromdate,filtertodate) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/attendance/filterdate`,{employee_id: employee_id,filterfromdate: filterfromdate, filtertodate: filtertodate}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}

const Last30Daysdata = (employee_id,convertyesterday,convertLast30Days) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/attendance/lastthirtydaysdata`,{employee_id,convertyesterday,convertLast30Days}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}


const AttendanceService = {
    submitAttendance,
    findAttendanceById,
    findAttendanceByEmployeeId,
    searchattendance,
    TodayAttendance,
    allAttendance,
    AdminTodayAttendance,
    filterbyStatus,
    updateStatus,
    approveAttendance,
    rejectAttendance,
    filterdatefromrange,
    Last30Daysdata
};

export default AttendanceService;
