import http from "../http-common";

const allAddTicketCategory = () =>{
    const userToken = localStorage.getItem('userToken')
    return http.get("/ticket/all-ticket-category", {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AddTicketCategory = (category) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/ticket/add-ticket-category", {category}, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const EditTicketCategory = (category, _id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/ticket/edit-ticket-category", {category, _id}, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const CreateNewTicket = (employee_id, category, comment, Added_by_type, username) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/ticket/create-ticket", {employee_id, category, comment, Added_by_type, username}, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AllTickets = () => {
    const userToken = localStorage.getItem('userToken')
    return http.get("/ticket/get-all-tickets", {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const TicketByEmpId = (employee_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/ticket/ticket-employeeid", {employee_id}, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const ChatOfTicketById = (_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/ticket/ticket-chatbyid", {_id}, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}


const AddNewChatOfTicket = (ticket_id, Added_by_type, comment, username) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/ticket/add-ticket-chat", {ticket_id, Added_by_type, comment, username}, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const CloseTicket = (ticket_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/ticket/close-ticket", {ticket_id}, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const TicketDetails = (ticket_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/ticket/ticket-details", {ticket_id}, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const TicketService = {
    allAddTicketCategory,
    AddTicketCategory,
    EditTicketCategory,
    CreateNewTicket,
    AllTickets,
    TicketByEmpId,
    ChatOfTicketById,
    AddNewChatOfTicket,
    CloseTicket,
    TicketDetails
};



export default TicketService;