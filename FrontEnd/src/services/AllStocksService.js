import http from "../http-common";

const allstocks = () =>{
    const userToken = localStorage.getItem('userToken')
    return http.get("/stock", {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AddStocks = (type, quantity) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/stock/add-stock", {type, quantity}, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AllStocksService = {
    allstocks,
    AddStocks
};



export default AllStocksService;