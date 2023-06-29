import http from '../http-common';

const findAllPoliciesDocuments = () => {
    const userToken = localStorage.getItem('userToken')
    return http.get('/policies-documents/all-policies-documents', {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }});
}

const DeletePoliciesDocuments = (_id, file) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/policies-documents/delete-policies-documents`,{_id, file}, {headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }})
}


const PoliciesDocumentService = {
    findAllPoliciesDocuments,
    DeletePoliciesDocuments
};

export default PoliciesDocumentService;