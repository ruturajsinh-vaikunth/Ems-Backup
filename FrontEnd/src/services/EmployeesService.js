import http from "../http-common";

const findByEmployee_id = (employee_id) => {
  const userToken = localStorage.getItem('userToken')
    return http.post(`/employee/employeeinfo`,{employee_id: employee_id}, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }});
};

const updateEmployee = (_id, employee_id,firstname,email,designation,gender,birth_date,date_of_anniversary,address,city,state,country,pincode,experience,nationality,marital_status) => {
    const userToken = localStorage.getItem('userToken')
    return http.patch(`/employee/employeeupdate`, {_id, employee_id,firstname,email,designation,gender,birth_date,date_of_anniversary,address,city,state,country,pincode,experience,nationality,marital_status}, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }});
};

const addEmployee = (employee_id,addfirstname,addemail,adddesignation,addgender,addbirth_date,adddate_of_anniversary,addaddress,addcity,addstate,addcountry,addpincode,addemployee_status,addexperience,addnationality,addmarital_status) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/employee/addemployee`,{employee_id: employee_id,addfirstname: addfirstname, addemail: addemail, adddesignation: adddesignation, addgender: addgender, addbirth_date: addbirth_date, adddate_of_anniversary: adddate_of_anniversary, addaddress: addaddress, addcity: addcity, addstate: addstate, addcountry: addcountry, addpincode: addpincode, addemployee_status: addemployee_status,addexperience: addexperience, addnationality: addnationality,addmarital_status: addmarital_status},{headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }});
}

const ProfileLinks = (employee_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post('/employee/profile-links',{employee_id},{headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }})
}

const ProfileLinkEdit = (employee_id, websiteUrl , githubUrl, twitterUrl, instagramUrl, facebookUrl) => {
    const userToken = localStorage.getItem('userToken')
    return http.post('/employee/profile-links-edit', {data : {employee_id: employee_id, websiteUrl: websiteUrl , githubUrl: githubUrl, twitterUrl: twitterUrl, instagramUrl: instagramUrl, facebookUrl: facebookUrl} }, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }}) 
}

const EmployeesService = {
    findByEmployee_id,
    updateEmployee,
    addEmployee,
    ProfileLinks,
    ProfileLinkEdit
};

export default EmployeesService;
