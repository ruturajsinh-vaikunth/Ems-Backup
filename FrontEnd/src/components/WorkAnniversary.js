import Sidebar from "./Sidebar";
import  { useState } from "react";
import  { useEffect } from "react";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import GreetingService from "../services/GreetingService";
import rrulePlugin from  '@fullcalendar/rrule'
import { Link } from 'react-router-dom';

export default function WorkAnniversary(){

    
    const [events, setevents] = useState([])
    const dispatch = useDispatch()

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth , day].join("-");
    }

    

    function EmployeeData(){
        GreetingService.AllEmployeeData()
        .then((response) => {
            const Data = response.data;
            const DataforInitial = []
            for(let i=0; i< Data.length; i++){
                DataforInitial.push({
                    _id: Data[i]._id,
                    start: convert(Data[i].date_of_anniversary),
                    title: Data[i].firstname,
                    Image: Data[i].profileimg,
                    eventContent:  `${Data[i].firstname}`,
                    rrule: {
                        freq: 'yearly',
                        dtstart: new Date(Data[i].date_of_anniversary).toISOString(),
                        until: '2050-12-31' // will also accept '20120201'
                      },
                      display: 'block',
                      textColor: '#000000',
                      borderColor: '#eee',
                      backgroundColor: '#F7F7F7'
                })
            }
           setevents(DataforInitial)
        })
        .catch((e) => {
            console.log(e);
        })
    }


    useEffect(() => {
        EmployeeData();

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

  const handleEventResize = (eventResizeInfo) =>{
    var event = eventResizeInfo.event;
    if (event.start.getDay() !== event.end.getDay()) {
        eventResizeInfo.revert();
    }
  }


        return(
            <div>
            <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="breadcrumb">
                                                <h1>Work Anniversary</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">
                       
                                                    <FullCalendar
                                                        plugins={[dayGridPlugin, interactionPlugin, rrulePlugin]}
                                                        initialView='dayGridMonth'
                                                        weekends={true}
                                                        events={events}
                                                        headerToolbar={{
                                                            left: 'today',
                                                            center: 'title',
                                                            right: 'prevYear,prev,next,nextYear'
                                                        }}
                                                        fixedWeekCount={false}
                                                        editable={true}
                                                        selectable={true}
                                                        eventResize={handleEventResize}
                                                        eventContent={renderEventContent}
                                                        // dayMaxEventRows={2}
                                                        // dayMaxEvents={true}
                                                        // dayGridMonth,dayGridWeek,
                                                        eventInteractive={true}
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

function renderEventContent(eventInfo) {
    
    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    let date = convert(eventInfo.event.start);
    const ruleData = eventInfo.event._def.recurringDef.typeData.rruleSet._rrule;
    const start = ruleData[0].options.dtstart;
    const startDate = convert(start)

    var years = new Date(new Date(date) - new Date(startDate)).getFullYear() - 1970;

    return (
        <Link to={`/wish-reply/?date=${date}&years=${years}&receiver=${eventInfo.event.title}&type=Anniversary`}  style={{textDecoration: 'none'}} className="pointer-change">
        <div className="row">
            <img className="ml-3" src={`http://localhost:5000/public/images/${eventInfo.event._def.extendedProps.Image}`} alt="img-profile" width='32' height='35'></img>
            <p className="text-center mt-2 ml-2" style={{fontSize: '13px'}}>{eventInfo.event.title}</p>
      </div>
      </Link>
    )
  }
