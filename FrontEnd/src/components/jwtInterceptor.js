import axios from "axios";

const jwtInterceoptor = axios.create({});

// jwtInterceoptor.interceptors.request.use((config) => {
//   let userToken = localStorage.getItem("userToken");
//   config.headers.common["Authorization"] = `bearer ${userToken}`;
//   return config;
// });

// jwtInterceoptor.interceptors.request.use(request => {
//   // Edit request config
//   let userToken = localStorage.getItem("userToken");
//   request.headers['Authorization'] = `bearer ${userToken}`;
//   return request;
// }, error => {
//   return Promise.reject(error);
// });

jwtInterceoptor.interceptors.request.use(
  config => {
    const token = localStorage.getItem('userToken')
    const AccountInfo = localStorage.getItem('store')
    const userInfo1 = JSON.parse(AccountInfo);
    const decode = JSON.parse(atob(token.split('.')[1]));
            if (decode.exp * 1000 < new Date().getTime()) {
              axios.post(`/user/refreshtoken`, {_id : userInfo1._id})
              .then((response) => {
                  localStorage.setItem('userToken', response.data.userToken)
                  return ;
              })
            }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  }
  
)

jwtInterceoptor.interceptors.response.use(
  (response) => {
    localStorage.setItem('userToken', response.data.userToken)
    return response;
  },
  async (error) => {
    // if (error.response.status === 401) {
      const AccountInfo = localStorage.getItem('store')
      const userInfo1 = JSON.parse(AccountInfo);

      const payload = {
        _id : userInfo1._id
      };

      let apiResponse = await axios.post(
        "http://localhost:5000/api/user/refreshtoken",
        payload
      );

      console.log(apiResponse);
      // localStorage.setItem("tokens", JSON.stringify(apiResponse.data));
      // error.config.headers[
      //   "Authorization"
      // ] = `bearer ${apiResponse.data.access_token}`;
      // return axios(error.config);
    // } else {
    //   return Promise.reject(error);
    // }
  }
);

export default jwtInterceoptor;
