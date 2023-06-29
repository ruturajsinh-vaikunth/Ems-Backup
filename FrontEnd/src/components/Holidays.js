import Sidebar from "./Sidebar";
import Unauthorized from "./Unauthorized";
import  { useEffect, useState } from "react";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import HolidayService from "../services/HolidayService";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

export default function Holidays(){

    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    const [HolidayData, setHolidayData] = useState([])

    function HolidayList(){
        HolidayService.findNotFloatingHolidays()
        .then((response) => {
             const data = response.data;
            function convert(str) {
                var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
                return [day, mnth, date.getFullYear()].join("-");
            }
            const ConvertHolidayData = []
            for(let i=0; i<data.length; i++){
                ConvertHolidayData.push({
                    Date: convert(data[i].start),
                    Day: ( new Date(data[i].start).getDay()),
                    Title: data[i].holidayTitle,
                    Image: data[i].Image     
                })
            }
            const HolidayData = []
            for(let i=0; i<ConvertHolidayData.length; i++){
                if(ConvertHolidayData[i].Day === 0){
                    HolidayData.push({
                        Date: ConvertHolidayData[i].Date,
                        Day: "Sun",
                        Title: ConvertHolidayData[i].Title,
                        Image: ConvertHolidayData[i].Image     
                    })
                }
                if(ConvertHolidayData[i].Day === 1){
                    HolidayData.push({
                        Date: ConvertHolidayData[i].Date,
                        Day: "Mon",
                        Title: ConvertHolidayData[i].Title,
                        Image: ConvertHolidayData[i].Image     
                    })
                }
                if(ConvertHolidayData[i].Day === 2){
                    HolidayData.push({
                        Date: ConvertHolidayData[i].Date,
                        Day: "Tue",
                        Title: ConvertHolidayData[i].Title,
                        Image: ConvertHolidayData[i].Image     
                    })
                }
                if(ConvertHolidayData[i].Day === 3){
                    HolidayData.push({
                        Date: ConvertHolidayData[i].Date,
                        Day: "Wed",
                        Title: ConvertHolidayData[i].Title,
                        Image: ConvertHolidayData[i].Image     
                    })
                }
                if(ConvertHolidayData[i].Day === 4){
                    HolidayData.push({
                        Date: ConvertHolidayData[i].Date,
                        Day: "Thu",
                        Title: ConvertHolidayData[i].Title,
                        Image: ConvertHolidayData[i].Image     
                    })
                }
                if(ConvertHolidayData[i].Day === 5){
                    HolidayData.push({
                        Date: ConvertHolidayData[i].Date,
                        Day: "Fri",
                        Title: ConvertHolidayData[i].Title,
                        Image: ConvertHolidayData[i].Image     
                    })
                }
                if(ConvertHolidayData[i].Day === 6){
                    HolidayData.push({
                        Date: ConvertHolidayData[i].Date,
                        Day: "Sat",
                        Title: ConvertHolidayData[i].Title,
                        Image: ConvertHolidayData[i].Image     
                    })
                }
            }
            setHolidayData(HolidayData)
        })
        .catch((e)=> {
            console.log(e);
        })
    }

    const parseJwt = (id) => {
            dispatch(refreshToken({_id : id}))
    };
    useEffect(() => {
        setTimeout(() => {
            HolidayList();
          }, 1000)
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


    const showCards = () => {
        return (
          <>
            {HolidayData && HolidayData.map((data,index) => {
              return (
                <div  className="col-sm-3 card-group mb-4" key={index}>
                  <div className="card holidaycard" >
                  <img src={`http://localhost:5000/public/images/${data.Image}`} loading="lazy" className="card-img-top" alt="..." style={{ width: '100%', height: '7rem', objectFit: 'cover' }}></img>
                                        <div className="card-body"> 
                                            <h6 className="card-title multicolortext">{data.Title}</h6>
                                            <div className="d-flex justify-content-between">
                                                <p className="card-text">{data.Date}</p>
                                                <p className="card-text">{data.Day}</p>
                                            </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        )
      }
      const showSkeleton = () => {
        return (
          <>
            {Array(10)
              .fill()
              .map((item, index) => {
                return (
                  <div  className="col-sm-3 mb-3" key={index}>
                    <div className="card" style={{height: '210px'}} >
                        <Skeleton height={80} width={230} />
                      <div className="card-body mt-2"> 
                        <Skeleton height={50} width={160} className="mt-4" style={{marginTop: '10px'}}  />
                        </div>
                    </div>
                  </div>
                )
              })}
          </>
        )
      }



    if(userInfo.account_type === "Employee"){
        return(
            <div>
                    <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="breadcrumb">
                                                <h1>Holidays</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                                                    <div className="row mt-4">
                                                        
                                                        {HolidayData.length > 0 ? showCards() : showSkeleton()}
                                                        
                                                    </div>
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
