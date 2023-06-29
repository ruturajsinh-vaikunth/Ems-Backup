import http from "../http-common";

const allUsers = () =>{
    const userToken = localStorage.getItem('userToken')
  return http.get("/users", {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    },
  });
}

const filterUsers = (employee_id, email, account_type, status) =>{
  const userToken = localStorage.getItem('userToken')
  return http.post("/users/filter-user", {employee_id, email, account_type, status} , {
  headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${userToken}`,
  },
});
}

const editUser = (id, Name, UserEmail, AccountType, Status) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/users/edituser`, {id, Name, UserEmail, AccountType, Status}, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    },
  })
}

const editPassword = (id, oldPassword, password) => {
  const userToken = localStorage.getItem('userToken')
  return http.post(`/users/editpassword`, {id, oldPassword, password}, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    },
  })
}

const deleteById = (id) => {
  const userToken = localStorage.getItem('userToken')
    return http.post(`/users/deleteuser`,{id}, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    },});
}

const ResetPassword = (email) => {
    return http.post(`/users/resetpassword`,{email})
}

const findString = (string) => {
    return http.post(`/users/findresetlink`,{string : string} )
}

const editpasswordbyEmail = (email, password) => {
  return http.post(`/users/editpasswordbyemail`, {email, password})
}

const getAdminbyId = (_id) =>{
  const userToken = localStorage.getItem('userToken')
  return http.post(`/users/adminbyid`, {_id}, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    },
  })
}

const getManagerbyEmpId  = (employee_id) =>{
  const userToken = localStorage.getItem('userToken')
  return http.post(`/users/managerbyid`, {employee_id}, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    },
  })
}

const UserService = {
    allUsers,
    filterUsers,
    editUser,
    editPassword,
    deleteById,
    ResetPassword,
    findString,
    editpasswordbyEmail,
    getAdminbyId,
    getManagerbyEmpId
};



export default UserService;
