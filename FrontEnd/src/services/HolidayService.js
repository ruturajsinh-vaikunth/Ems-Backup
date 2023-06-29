import http from '../http-common';

const findAllHolidays = () => {
    return http.get(`/holidays/allholidays`);
}

var now = new Date();
var startDayOfYear = new Date(now.getFullYear(), 0, 1);
var enddayOfYear = new Date(now.getFullYear(), 11, 31);

function convertnew(str) {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day ].join("-");
}

let startOfYear = convertnew(startDayOfYear)
let endOfYear = convertnew(enddayOfYear)


const findNotFloatingHolidays = () => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/holidays/notfloating-holidays`, {startOfYear, endOfYear}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const findFloatingHolidays = () => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/holidays/floating-holidays`, {startOfYear, endOfYear}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const AddHolidayDetails = (holidayTitle, start, end, allDay) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/holidays/holidayentry`, {holidayTitle, start, end, allDay}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const UpdateHolidayDetails = (id, Title) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/holidays/editholiday`, {id, Title}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const DeleteHolidayDetails = (id, oldImage) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/holidays/deleteholiday`, {id, oldImage}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const AddWeekoff = (arr) => {
    return http.post(`/holidays/weekoffentry`,arr);
}

const WeekoffData = () => {
    return http.get(`/holidays/weekoffdata`);
}

const UpdateWeekoffData = (arr) => {
    return http.post(`/holidays/update-weekoffdata`, arr);
}

const HolidayService = {
    findAllHolidays,
    findNotFloatingHolidays,
    findFloatingHolidays,
    AddHolidayDetails,
    UpdateHolidayDetails,
    DeleteHolidayDetails,
    AddWeekoff,
    WeekoffData,
    UpdateWeekoffData
};

export default HolidayService;