import http from "../http-common";

const findFamilyDetail = employee_id => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/familydetail`,{employee_id: employee_id}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }});
}

const AddFamilyDetail = (employee_id,AddFDname,AddFDrelation) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/addfamilydetail`,{employee_id: employee_id,AddFDname: AddFDname,AddFDrelation: AddFDrelation}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }});
}

const EditFamilyDetail = (_id, name, relation) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/editFD`, {_id, name, relation}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}

const DeleteFamilyDetail = (_id) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/deleteFD`,{_id: _id}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}

const FamilyDetailService = {
    findFamilyDetail,
    AddFamilyDetail,
    DeleteFamilyDetail,
    EditFamilyDetail
};

export default FamilyDetailService;