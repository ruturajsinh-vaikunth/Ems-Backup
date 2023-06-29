import http from "../http-common";

const AssignDetails = () =>{
    const userToken = localStorage.getItem('userToken')
    return http.get("/assets" , {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AssignNewAsset = (employee_id, asset_type, asset_name) =>{
    const userToken = localStorage.getItem('userToken')
    return http.post("/assets/assign-asset", {employee_id, asset_type, asset_name} , {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AssetsByEmployeeId = (employee_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/assets/assets-detail", {employee_id} , {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AssetsEditbyId = (_id, employee_id, asset_type, asset_name) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/assets/assets-edit", {_id, employee_id, asset_type, asset_name} , {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AssetsReturnbyId = (_id, reason, condition, asset_type) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/assets/assets-return", {_id, reason, condition, asset_type} , {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AssetRequestByEmployeeId = (employee_id, asset_type, reason) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/assets/asset-request", {employee_id, asset_type, reason} , {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AllAssetRequestData = () => {
    const userToken = localStorage.getItem('userToken')
    return http.get("/assets/request-data" , {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const GetAssetRequestbyEmployeeId = (employee_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/assets/asset-request-employeeid", {employee_id} , {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AssignRequestedAsset = (_id, employee_id, asset_type, asset_name) =>{
    const userToken = localStorage.getItem('userToken')
    return http.post("/assets/assign-request-asset", {_id, employee_id, asset_type, asset_name} , {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const RejectAssetRequest = (_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/assets/reject-request-asset", {_id} , {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const findAssetInfoByNumber = (asset_number) => {
    const userToken = localStorage.getItem('userToken')
    return http.post("/assets/asset-info", {asset_number} , {
        headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
    });
}

const AssetsService = {
    AssignDetails,
    AssignNewAsset,
    AssetsByEmployeeId,
    AssetsEditbyId,
    AssetsReturnbyId,
    AssetRequestByEmployeeId,
    AllAssetRequestData,
    AssignRequestedAsset,
    GetAssetRequestbyEmployeeId,
    RejectAssetRequest,
    findAssetInfoByNumber
};



export default AssetsService;