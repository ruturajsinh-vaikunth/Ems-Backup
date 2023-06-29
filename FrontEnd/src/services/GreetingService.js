import http from '../http-common';

const AllEmployeeData = () => {
    const userToken = localStorage.getItem('userToken')
    return http.get("/employee/greeting-employeedata", {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    });
}

const SendGreetings = (date, sender, receiver, type, greetings) => {
  const userToken = localStorage.getItem('userToken')
    return http.post("/greetings/send-greetings", {date, sender, receiver, type, greetings}, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    });
}

const findSentGreetings = ( sender ) => {
  const userToken = localStorage.getItem('userToken')
    return http.post("/greetings/find-sent-greetings", { sender }, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    });
}

const findReceivedGreetings = ( receiver ) => {
  const userToken = localStorage.getItem('userToken')
    return http.post("/greetings/find-received-greetings", { receiver }, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    });
}


const GreetingService = {
    AllEmployeeData,
    SendGreetings,
    findSentGreetings,
    findReceivedGreetings
};

export default GreetingService;