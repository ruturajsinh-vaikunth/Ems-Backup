import http from '../http-common';

const findAllLeavesperyear = () => {
    const userToken = localStorage.getItem('userToken')
    return http.get(`/leavesperyear`, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const AddLeavesperyear = (employee_id, earnedLeave, casualLeave, sickLeave, compoff, floatingLeave, year) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/leavesperyear/leaveperyearentry`, {employee_id, earnedLeave, casualLeave, sickLeave, compoff, floatingLeave, year}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const findLeavesbyId = (employee_id, year) => {
    const userToken = localStorage.getItem('userToken')
    return http.post('/leavesperyear/leavebyempid', {employee_id: employee_id, year: year}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }})
}

const updateleaves = (finalAvailableLeaves) => {
    return http.post('/leavesperyear/updateleaves', finalAvailableLeaves)
}

const LeavesPerYearService = {
    findAllLeavesperyear,
    AddLeavesperyear,
    findLeavesbyId,
    updateleaves
};

export default LeavesPerYearService;