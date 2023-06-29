import http from '../http-common';

const findAllEvents = () => {
    const userToken = localStorage.getItem('userToken')
    return http.get(`/events/all-events`,{headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const findEventById = (_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/events/find-event`,{_id},{headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const deleteEventById = (_id, oldimage, oldgallery) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/events/delete-event`,{_id, oldimage, oldgallery},{headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const EventService = {
    findAllEvents,
    findEventById,
    deleteEventById
};

export default EventService;