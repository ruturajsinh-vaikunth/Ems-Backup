import http from "../http-common";

const findEmergencyInfo = employee_id => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/emergencyinfo`,{employee_id: employee_id}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }});
}

const addemergencycontact = (employee_id,AddECname,AddECrelation,AddECcontact) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/addemergencycontact`,{employee_id : employee_id,AddECname: AddECname,AddECrelation: AddECrelation,AddECcontact: AddECcontact}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}

const EditEmergencycontact = (_id, name, relation, contact) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/editEC`, {_id, name, relation, contact}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}

const Deleteemergencycontact = (_id) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/deleteEC`,{_id : _id}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}

const EmergencyContactService = {
    findEmergencyInfo,
    addemergencycontact,
    EditEmergencycontact,
    Deleteemergencycontact,
};

export default EmergencyContactService;