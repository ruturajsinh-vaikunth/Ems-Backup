import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import  { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import HolidayService from "../services/HolidayService";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";

export default function SettingWeekoffs(){

    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    const { handleSubmit } = useForm()
    const [UpdateAlert, setUpdateAlert] =  useState(false)


    function weekoffdata(){
        HolidayService.WeekoffData()
        .then(response => {
            // setDatas(response.data)
            const Datas = response.data;
            const TotalWeekOffs = Datas.filter(
                item => item.value && item.value.includes("1")
            )
            for(let i=0; i<TotalWeekOffs.length;i++){
                document.getElementById(`${TotalWeekOffs[i].Day}`).checked = true;
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

    const parseJwt = (id) => {
            dispatch(refreshToken({_id : id}))
    };
    useEffect(() => {
        weekoffdata();
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


    const updateForm = () => { 

        
            let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
            let notcheckboxes = document.querySelectorAll("input[type='checkbox']");

            
            const allCheckbox = []
            for (let i = 0; i < (notcheckboxes.length); i++) {
                allCheckbox.push({Day : notcheckboxes[i].value, value: 0})
            }

            const Checkedcheckbox = []
            if(document.querySelectorAll("input[type='checkbox']:checked")){
                for (let i = 0; i < checkboxes.length; i++) {
                    Checkedcheckbox.push({Day : checkboxes[i].value, value: 1})
                }
            }

            const mergeTest = (arr1,arr2) => {

                return arr1.map( (x) => {
                  const y = arr2.find( item => x.Day === item.Day);
                  if (y) {
                    return Object.assign({},x,y);
                  } else
                    return x
                }).concat(arr2.filter(item => arr1.every( x => x.Day !== item.Day)));
            }

            let finalArray = mergeTest(allCheckbox, Checkedcheckbox)
            
            HolidayService.UpdateWeekoffData(finalArray)
            .then(response => {
                if(response.status === 200){
                    weekoffdata();
                    setUpdateAlert(true);
                }
            })
            .catch(e => {
                console.log(e);
            })
            
    }

    if(userInfo.account_type === "Admin" || userInfo.account_type === "Manager"){
        return(
            <div>
            <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="breadcrumb">
                                                <h1>Manage Week-offs</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                    
                                                    {UpdateAlert === true ?
                                                        <div style={{fontSize : '16px'}}> 
                                                            <div className="alert alert-dismissible alert-info">
                                                                <strong>Updated!!</strong> Successfully.
                                                                <button type="button" className="close" data-dismiss="alert" onClick={() => setUpdateAlert(false)}>X</button>
                                                            </div>
                                                        </div> : null
                                                    }
                                                        <form onSubmit={handleSubmit(updateForm)}>
                                                            <div className="form-check">
                                                            <input className="form-check-input" type="checkbox"  value="Monday" id="Monday" name="MondayUpdate"/>
                                                            <label className="form-check-label">
                                                                Monday
                                                            </label>
                                                            </div>
                                                            <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="Tuesday" id="Tuesday" name="TuesdayUpdate" />
                                                            <label className="form-check-label">
                                                                Tuesday
                                                            </label>
                                                            </div>
                                                            <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="Wednesday" id="Wednesday" name="WednesdayUpdate" />
                                                            <label className="form-check-label">
                                                                Wednesday
                                                            </label>
                                                            </div>
                                                            <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="Thursday" id="Thursday" name="ThursdayUpdate" />
                                                            <label className="form-check-label">
                                                                Thursday
                                                            </label>
                                                            </div>
                                                            <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="Friday" id="Friday" name="FridayUpdate" />
                                                            <label className="form-check-label">
                                                                Friday
                                                            </label>
                                                            </div>
                                                            <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="Saturday" id="Saturday" name="SaturdayUpdate"/>
                                                            <label className="form-check-label">
                                                                Saturday
                                                            </label>
                                                            </div>
                                                            <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="Sunday" id="Sunday" name="SundayUpdate" />
                                                            <label className="form-check-label">
                                                                Sunday
                                                            </label>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-2">
                                                                    <button className="btn btn-primary  mt-2" type="submit">Save</button>
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <button className="btn btn-secondary  mt-2" type="reset">Reset</button>
                                                                </div>
                                                            </div>
                                                        </form>
                            
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
            <Unauthorized/>
        )
    }

}