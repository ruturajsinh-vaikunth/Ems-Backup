import http from "../http-common";

const findQualificationDetail = employee_id => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/qualificationdetail`,{employee_id: employee_id}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }});
}

const addQualification = (employee_id,degree,institute,from_date,to_date,complete_year,gpa_score) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/addqualification`,{employee_id, degree, institute, from_date, to_date, complete_year, gpa_score} , {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }});
}

const EditQualification = (_id, degree, institute, from_date, to_date, complete_year, gpa_Score) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/editQua`,{_id, degree, institute, from_date, to_date, complete_year, gpa_Score}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}

const DeleteQualification = (_id) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/deleteQua`,{_id: _id}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}

const QualificationService = {
    findQualificationDetail,
    addQualification,
    EditQualification,
    DeleteQualification
};

export default QualificationService;