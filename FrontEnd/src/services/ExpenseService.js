import http from "../http-common";

const allExpenses = () =>{
    const userToken = localStorage.getItem('userToken')
    return http.get("/expenses/all-expense", {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AddExpense = (title, description, amount, date, addedby) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/expenses/add-expense", {title, description, amount, date, addedby}, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const searchExpense = (SaerchfromDate, SearchtoDate) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/expenses/search-expense", {SaerchfromDate, SearchtoDate}, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const ExpensebyId = (_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/expenses/expensebyid", {_id}, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const ExpenseService = {
    allExpenses,
    AddExpense,
    searchExpense,
    ExpensebyId
};



export default ExpenseService;