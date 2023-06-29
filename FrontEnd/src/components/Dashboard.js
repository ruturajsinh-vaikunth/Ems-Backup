import Sidebar from "./Sidebar";
import { useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import UserService from "../services/UserService";
import LeavesService from "../services/LeavesService";
import AttendanceService from "../services/AttendanceService";
import { logout } from "../features/auth/authSlice";
import { Chart } from "react-google-charts";
import { NavLink } from "react-router-dom";
import { refreshToken } from "../features/auth/authActions";

export default function Dashboard(){

    const dispatch = useDispatch()

    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    
    const [AllUsers, setAllUsers] = useState({});
    const [AllAttendance, setAllAttendance] = useState("");
    const [AllEmployeeLeaves, setAllEmployeeLeaves]  = useState("");

        function getAllusers(){
            UserService.allUsers()
            .then(response => {
                setAllUsers(response.data);
            })
            .catch(e => {
                console.log(e);
            })
        }

      function todayattendance(){
          AttendanceService.AdminTodayAttendance()
          .then(response => {
              setAllAttendance(response.data.length);
          })
          .catch(e => {
              console.log(e);
          })
      }

      function TodayLeaves(){

        function convertAAA(str) {
          var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
          return [date.getFullYear() , mnth, day ].join("-");
        }

        const Dateoftoday = new Date(new Date().setDate(new Date().getDate()));
        const today = convertAAA(Dateoftoday)

        LeavesService.findTodayLeaves(today)
        .then((response) => {
            setAllEmployeeLeaves(response.data.length);
        })
        .catch((e) => {
            console.log(e , "Not Found");
        })
    }



        const parseJwt = (id) => {
            dispatch(refreshToken({_id : id}))
        };

        useEffect(() => {
            getAllusers();
            todayattendance();
            TodayLeaves();

        const AccountInfo = localStorage.getItem('store')
        const userInfo1 = JSON.parse(AccountInfo);
        const minutes = 1 * 60 * 1000;
          
        if(navigator.onLine === true){
        const interval = setInterval(() => {
            parseJwt(userInfo1._id)
          }, minutes);
        
          return () => clearInterval(interval);
        }
        else{
            dispatch(logout())
        }

        const token = localStorage.getItem('userToken')
        const decode = JSON.parse(atob(token.split('.')[1]));
        if (decode.exp * 1000 < new Date().getTime()) {
            dispatch(logout())
            localStorage.removeItem('userToken')
            window.location.reload()
        }
            
            // eslint-disable-next-line
        }, [])


        const data = [];
        let length = AllUsers.length;
        for(let i = 0; i < length; i++){
            data.push(AllUsers[i]);
        }


        const totalEmployee = data.filter(
          item => item.account_type && item.account_type.includes("Employee"),
       )
        

        const Chartdata = [
          ["Task", "Hours per Day"],
          ["Present", AllAttendance],
          ["onLeave", AllEmployeeLeaves],
        ]

        const chartoptions = {
          // eslint-disable-next-line
            title : 'Employees ' + "" +  totalEmployee.length,
            pieSliceText : 'value',
            tooltip: {
                text: 'value'
            },
        }

        if(userInfo.account_type=== "Admin" || userInfo.account_type === "Manager"){
        return(
            <div>
              <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                          <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                <div className="main-content">
                                  <div>
                                      <div className="breadcrumb">
                                        <h1>Dashboard</h1>
                                        
                                      </div>
                                      <div className="separator-breadcrumb border-top"></div>
                                  </div>
                                  <div className="row" >
                                      <div className="col-sm-12 col-md-6 col-lg-3">
                                      <NavLink to={{ pathname: '/users' }}>
                                        <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center" >
                                            <div className="card-body">
                                              <i className="i-Add-User" ></i>
                                              <div className="content">
                                                  <p className="text-muted mt-2 mb-0">Total Employee</p>
                                                  <p className="text-primary text-24 line-height-1 mb-2">{totalEmployee.length}</p>
                                              </div>
                                            </div>
                                        </div>
                                        </NavLink>
                                      </div>
                                      <div className="col-sm-12 col-md-6 col-lg-3">
                                      <NavLink to={{ pathname: '/user-present' }}>
                                        <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
                                            <div className="card-body">
                                              <i className="i-Address-Book"></i>
                                              <div className="content">
                                                  <p className="text-muted mt-2 mb-0">Employee Present</p>
                                                  <p className="text-primary text-24 line-height-1 mb-2">{AllAttendance}</p>
                                              </div>
                                            </div>
                                        </div>
                                        </NavLink>
                                      </div>
                                      <div className="col-sm-12 col-md-6 col-lg-3">
                                      <NavLink to={{ pathname: '/user-onleave' }}>
                                        <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
                                            <div className="card-body">
                                              <i className="i-Calendar-3"></i>
                                              <div className="content">
                                                  <p className="text-muted mt-2 mb-0">Employee on Leave</p>
                                                  <p className="text-primary text-24 line-height-1 mb-2">{AllEmployeeLeaves}</p>
                                              </div>
                                            </div>
                                        </div>
                                        </NavLink>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-sm-12 col-md-12 col-lg-6">
                                        <div className="card mb-30">
                                            <div className="card-body">
                                              <h4 className="card-title m-0">Employee</h4>
                                              <Chart
                                                chartType="PieChart"
                                                data={Chartdata}
                                                options={chartoptions}
                                                width={"83%"}
                                                height={"260px"}
                                              />
                                            </div>
                                        </div>
                                        </div>
                                      </div>
                                  </div>
                            </div>
                          </main>
                    </div>
                 
            </div>
            
        )
        }
    else{
        return(
            <div>
               <Sidebar/>
               <div className="main-content">
                    <p>Dashboard</p>
               </div>
            </div>
        )
    }
}