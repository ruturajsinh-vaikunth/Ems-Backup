import http from '../http-common';

const findAllLeaves = () => {
    const userToken = localStorage.getItem('userToken')
    return http.get(`/leaves`, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const findTodayLeaves = (today) =>{
  const userToken = localStorage.getItem('userToken')
    return http.post(`/leaves/today-leaves`,{today}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const leavescurrentyearbyEmpId = (employee_id, startDate, endDate) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/leaves/empIdleavescurrentyear`,{employee_id: employee_id, startDate: startDate, endDate : endDate}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const leavesofcurrentyearbyapplieddate = (dateType, newfirstdayofyear, newlastdayofyear,filterLeavetype,filterstatus,employee_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/leaves/leavescurrentyear`,{dateType: dateType, newfirstdayofyear: newfirstdayofyear, newlastdayofyear: newlastdayofyear, filterLeavetype : filterLeavetype, filterstatus : filterstatus, employee_id: employee_id}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }})
}

const searchleaves = (employee_id, SaerchfromDate, SearchtoDate) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/leaves/search-leaves`,{employee_id, SaerchfromDate, SearchtoDate}, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }})
}

const LeavesbyEmp = (employee_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post('/leaves/leavebyempid', {employee_id: employee_id}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }})
}

const Leavesbyid = (_id) => {
  const userToken = localStorage.getItem('userToken')
  return http.post('/leaves/leavebyid', {_id: _id}, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }})
}

const UpdatebyCurrentdates = (DisplayDataofAllLeaves) => {
    return http.post('/leaves/updatebycurrentdate',{DisplayDataofAllLeaves})
}

const ApprovalLeave = (_id,status) => {
    const userToken = localStorage.getItem('userToken')
    return http.post('/leaves/approval',{_id, status}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }})
}

const CancelLeaveRequest = (_id, status) => {
    const userToken = localStorage.getItem('userToken')
    return http.post('/leaves/cancel-request',{_id, status}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }})
}

const ApprovalOfCancelLeaveRequest = (_id, status) => {
    const userToken = localStorage.getItem('userToken')
    return http.post('/leaves/approval-cancel-request',{_id, status}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }})
}

const LeavesService = {
    findAllLeaves,
    findTodayLeaves,
    leavescurrentyearbyEmpId,
    leavesofcurrentyearbyapplieddate,
    searchleaves,
    LeavesbyEmp,
    Leavesbyid,
    UpdatebyCurrentdates,
    ApprovalLeave,
    CancelLeaveRequest,
    ApprovalOfCancelLeaveRequest
};

export default LeavesService;