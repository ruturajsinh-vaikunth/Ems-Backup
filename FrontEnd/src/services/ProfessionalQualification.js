import http from "../http-common";

const findProfessionalQualificationDetail = employee_id => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/pqdetail`,{employee_id: employee_id}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }});
}

const addProfessionalQualification = (employee_id,company,job_title,pq_from_date,pq_to_date) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/pqadd`,{employee_id: employee_id,company: company,job_title: job_title,pq_from_date: pq_from_date,pq_to_date: pq_to_date}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }});
}

const EditProfessionalQualification = (_id, company,job_title,from_date,to_date) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/editPQ`, {_id, company,job_title,from_date,to_date}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}

const DeleteProfessionalQualification = (_id) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/employee/pqdelete`,{_id : _id}, {headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  }})
}

const ProfessionalQualificationService = {
    findProfessionalQualificationDetail,
    addProfessionalQualification,
    EditProfessionalQualification,
    DeleteProfessionalQualification
};

export default ProfessionalQualificationService;
