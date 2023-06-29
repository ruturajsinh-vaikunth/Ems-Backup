
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import '../styles/css/index.d9965542.css'
import '../styles/css/chunk-2014a769.9731fe9b.css'
import { useDispatch } from 'react-redux';
import { GoInfo } from 'react-icons/go';
import Unauthorized from "./Unauthorized";
import AttendanceService from "../services/AttendanceService";
import HolidayService from "../services/HolidayService";
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import  { Tooltip as ReactTooltip }  from "react-tooltip";
import { Chart } from "react-google-charts";
import "react-tooltip/dist/react-tooltip.css";
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";

export default function Attendance(){

    const { handleSubmit } = useForm()
    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo1 = JSON.parse(AccountInfo);
    // eslint-disable-next-line
    const [Attendance,setAttendance] = useState([]);
    const [TimeFormatyesterdayData, settimeFormatyesterdayData] = useState([])
    const [yesterday, setYesterday] = useState("")
    const [result, setResult] = useState("")
    const [filterfromdate, setfilterfromdate] = useState("");
    const [filtertodate, setfiltertodate] = useState("");
    const [currentweekDatesdatas, setcurrentweekDatesdatas] = useState([]);
    const [ConvertedDateLength, setConvertedDateLength] = useState("0");
    const [satSunDatedlength, setsatSunDatedlength] = useState("0");
    const [PendingApprovalsLength, setPendingApprovalsLength] = useState("0");
    const [TotalPublicHolidays, setTotalPublicHolidays] = useState(0);
    const [TotalWFH, setTotalWFH] = useState(0);
    const [TotalRegurlized, setTotalRegurlized] = useState(0);

    const [arr4, setarr4] = useState([]);
    const [Error,setError] = useState("");
    const [showTypeModal , setTypeModal] = useState(false);
    const handleTypeClose = () => setTypeModal(false);
    const handleTypeShow = () => setTypeModal(true);

    let  employee_id  = userInfo1.employee_id;
    let firstname = userInfo1.firstName;



    const [selectedData, setSelectedData] = React.useState();
    const [RegurlizedValue, setRegurlizedValue] = useState("")
    const [in_time, setinTime] = useState("")
    const [out_time, setoutTime] = useState("")
    const [breakStartTime, setbreakStartTime] = useState("")
    const [breakEndTime, setbreakEndTime] = useState("")
    const [duration, setduration] = useState("Full Day")
    const [comment, setcomment] = useState("")
    const [GlobalArray, setGlobalArray] = useState([])
    const [SubmitAttendanceError, setSubmitAttendanceError] = useState("");
    const [Datas, setDatas] = useState([]);
    const [Chartdata, setChartdata] = useState([]);
    const [chartoptions, setChartoptions] = useState([]);
    const [LastThirtyDaysTotalHours, setLastThirtyDaysTotalHours] = useState("")
    const [AttendaceFilterDivSHow, setAttendaceFilterDivSHow] = useState(false)
    const [HolidaysData, setHolidaysData] = useState([]);

    const [handleclearSelectedRows, sethandleclearSelectedRows] = useState(false)

    function onInTimeChange(index, event, date,id){
        const newValues = [...in_time]
        newValues[index] = event.target.value;
        
        if (GlobalArray[index]) {
            var obj = GlobalArray[index];
            obj.in_time = event.target.value;
            GlobalArray[index] = obj; 
        } else {
            GlobalArray[index] = { '_id' : id ,'in_time' : event.target.value, 'type': RegurlizedValue, 'date': date, 'employee_id': employee_id, 'firstname': userInfo1.firstname, status: '' };
        }
        setGlobalArray(GlobalArray)
        setinTime(newValues);
    }

    function onOutTimeChange(index, event){
        const newValues = [...out_time]
        newValues[index] = event.target.value;
        if (GlobalArray[index]) {
            var obj = GlobalArray[index];
            obj.out_time = event.target.value;
            GlobalArray[index] = obj; 
        } else {
            GlobalArray[index] = { 'out_time' : event.target.value };
        }
        setGlobalArray(GlobalArray)
        setoutTime(newValues);
    }

    function onBreakStartTimeChange(index, event){
        const newValues = [...breakStartTime]
        newValues[index] = event.target.value;
        if (GlobalArray[index]) {
            var obj = GlobalArray[index];
            obj.breakStartTime = event.target.value;
            GlobalArray[index] = obj; 
        } else {
            GlobalArray[index] = { 'breakStartTime' : event.target.value };
        }
        setGlobalArray(GlobalArray)
        setbreakStartTime(newValues);
    }

    function onBreakEndTimeChange(index, event){
        const newValues = [...breakEndTime]
        newValues[index] = event.target.value;
        if (GlobalArray[index]) {
            var obj = GlobalArray[index];
            obj.breakEndTime = event.target.value;
            GlobalArray[index] = obj; 
        } else {
            GlobalArray[index] = { 'breakEndTime' : event.target.value, };
        }
        setGlobalArray(GlobalArray)
        setbreakEndTime(newValues);
    }

    function onDurationChange(index, event) {
        const newValues = [...duration];
        newValues[index] = event.target.value;
        if (GlobalArray[index]) {
            var obj = GlobalArray[index];
            obj.duration = event.target.value;
            GlobalArray[index] = obj; 
        } else {
            GlobalArray[index] = { 'duration' : event.target.value, 'comment': "" };
        }
        setGlobalArray(GlobalArray)
        setduration(newValues);
       
    }

    function onCommentChange(index,event){
        const newValues = [...comment];
        newValues[index] = event.target.value;
        if (GlobalArray[index]) {
            var obj = GlobalArray[index];
            obj.comment = event.target.value;
            GlobalArray[index] = obj; 
        } else {
            GlobalArray[index] = { 'comment' : event.target.value, 'duration': "" };
        }
        
        setGlobalArray(GlobalArray)
        setcomment(newValues);
        //emp[index].push('comment',event.target.value);
    }

    function submitNewAttendance(){
        
        if(GlobalArray.length === 0){
            setError("Please Enter Values");
        }
        else{
            
            for(let i=0; i<GlobalArray.length ; i++){
                GlobalArray[i].type = RegurlizedValue
            }
            


            const finalGlobalArray = GlobalArray.filter(
                // eslint-disable-next-line
                item => !item.status.includes("Approve"))

                console.log(finalGlobalArray);


            AttendanceService.submitAttendance(finalGlobalArray)
            .then(response => {
                if(response.data.msg === "Ok" || response.data.msg === "Updated"){
                    sethandleclearSelectedRows(!handleclearSelectedRows)
                    setSelectedData(null)
                    handleTypeClose();
                    filterDateFromRange();
                    ThirtyDaysData();
                    setError("")
                }
            })
            .catch(e => {
                console.log(e);
                setSubmitAttendanceError("All Fileds are required")
                
            })
        }
    }


    function attendanceInfo(){
        const AccountInfo = JSON.parse(localStorage.getItem('store'));
        AttendanceService.findAttendanceByEmployeeId(AccountInfo.employee_id)
        .then(response => {
            setAttendance(response.data);
            const Attendance = response.data;
            function convertAAA(str) {
                var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
                return [date.getFullYear() , mnth, day ].join("-");
            }
            function tConvert (time) {
                // Check correct time format and split into components
                time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
              
                if (time.length > 1) { // If time format correct
                  time = time.slice (1);  // Remove full string match value
                  time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
                  time[0] = +time[0] % 12 || 12; // Adjust hours
                }
                return time.join (''); // return adjusted time or original string
            }

            const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
            const ex3 = convertAAA(yesterday)
            setYesterday(yesterday)

            // const today = new Date(new Date().setDate(new Date().getDate()));
            // const ex3 = convertAAA(today)


            const yesterdayData = Attendance.filter(
                item => item.date && item.date.includes(new Date(ex3).toISOString()) 
            )

            const timeFormatyesterdayData = []
            if(yesterdayData.length === 0){
                timeFormatyesterdayData.push({
                    in_time : "00:00",
                    out_time : "00:00",
                })
            }
            
            for(let i=0; i<yesterdayData.length; i++){
                timeFormatyesterdayData.push({
                    in_time : tConvert(yesterdayData[i].in_time),
                    out_time : tConvert(yesterdayData[i].out_time)
                })
            }

            settimeFormatyesterdayData(timeFormatyesterdayData)
            
            for(let i=0; i< yesterdayData.length;i++){
                function toSeconds(time_str) {
                    // Extract hours, minutes and seconds
                    var parts = time_str.split(':');
                    // compute  and return total seconds
                    return parts[0] * 3600 + // an hour has 3600 seconds
                    parts[1] * 60 // a minute has 60 seconds 
                    ; // seconds
                }
                
                var a = yesterdayData[i].in_time
                var b = yesterdayData[i].out_time
                
                var difference = Math.abs(toSeconds(a) - toSeconds(b));
                
            
                var result = [
                    Math.floor(difference / 3600), 
                    Math.floor((difference % 3600) / 60), 
                    
                ];

                // 0 padding and concatation
                result = result.map(function(v) {
                    return v < 10 ? '0' + v : v;
                }).join(':');

            }

            setResult(result)
                })
                .catch(e => {
                    console.log(e);
                })
    }


    function HolidayList(){
        HolidayService.findAllHolidays()
        .then((response) => {
             const data = response.data;
             const AccountInfo = localStorage.getItem('store')
             const userInfo1 = JSON.parse(AccountInfo);

            const ConvertHolidayData = []
            for(let i=0; i<data.length; i++){
                ConvertHolidayData.push({
                    employee_id: userInfo1.employee_id,
                    date: data[i].start,
                    in_time: '-',
                    out_time: '-',
                    breakStartTime: '-',
                    breakEndTime: '-',
                    duration: '',
                    status: '',
                    type: 'Public Holiday',
                    reason: '', 
                })
            }

            setHolidaysData(ConvertHolidayData);
        })
    }


    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear() ].join("-");
    }

    function tConvert (time) {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
    }

    function convertAAA(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear() , mnth, day ].join("-");
    }

    
    const Last30Days = new Date(new Date().setDate(new Date().getDate() - 30));

    let curr = new Date()
    let week = []


    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i 
        const day = new Date(curr.setDate(first))
        week.push(convertAAA(day))
    }

    var first = curr.getDate() - curr.getDay();
    var last = first - 6; 


    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));

    let newfirstday = lastday;
    let newlastday = firstday;

    let finalfirstday = convertAAA(newfirstday);
    let finallastday = convertAAA(newlastday);

    function weekoffdata(){
        HolidayService.WeekoffData()
        .then(response => {
            const AllDatas = response.data;
            const TotalWeekOffs = AllDatas.filter(
                item => item.value && item.value.includes("1")
            )
            setDatas(TotalWeekOffs)
        })
        .catch(e => {
            console.log(e);
        })
    }


    function getAttendanceOfCurrentWeek(){
        AttendanceService.filterdatefromrange(userInfo1.employee_id,finalfirstday,finallastday)
            .then(response => {
                setcurrentweekDatesdatas(response.data);

            })
            .catch(e => {
                console.log(e);
            })
    }

    function ThirtyDaysData(){
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        const Last30Days = new Date(new Date().setDate(new Date().getDate() - 30));

         function convertYYMMDD(str) {
            var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear() , mnth, day ].join("-");
        }

      let convertyesterday  = convertYYMMDD(yesterday);
      let convertLast30Days  = convertYYMMDD(Last30Days);


        AttendanceService.Last30Daysdata(userInfo1.employee_id,convertyesterday,convertLast30Days)
        .then(response => {
            const ResultThirtyDaysData = response.data;

            var getDateArray = function(start, end) {
                const arr = []
                var dt = new Date(start);
                while (dt <= end) {
                    arr.push((new Date(dt))); //save only the Day MMM DD YYYY part
                    dt.setDate(dt.getDate() + 1);
                }
                return arr;
            }
    
            const ThirtyDatesArray = getDateArray((Last30Days), (yesterday));   
            

            const convertedarr3 = [];
            for(let i=0; i<ThirtyDatesArray.length; i++){
                convertedarr3.push({
                    employee_id: userInfo1.employee_id,
                    date: convertYYMMDD(ThirtyDatesArray[i]),
                    in_time: '00:00',
                    out_time: '00:00',
                    breakStartTime: '00:00',
                    breakEndTime: '00:00',
                    duration: '',
                    status: '',
                    type: 'Absent',
                    reason: '', 
                })
            }
            const arr3 = [];
            for(let i = 0; i<convertedarr3.length;i++){
                arr3.push({
                    employee_id: employee_id,
                    date: new Date(convertedarr3[i].date).toISOString(),
                    in_time: '00:00',
                    out_time: '00:00',
                    breakStartTime: '00:00',
                    breakEndTime: '00:00',
                    duration: '',
                    status: '',
                    type: 'Absent',
                    reason: '', 
                })
            }
            
    
            const FetchDateforThirtyDays = []
            for(let i=0; i< ResultThirtyDaysData.length; i++){
            FetchDateforThirtyDays.push({
                employee_id: ResultThirtyDaysData[i].employee_id,
                date: ResultThirtyDaysData[i].date,
                in_time: ResultThirtyDaysData[i].in_time,
                out_time: ResultThirtyDaysData[i].out_time,
                breakStartTime: ResultThirtyDaysData[i].breakStartTime,
                breakEndTime: ResultThirtyDaysData[i].breakEndTime,
                duration: ResultThirtyDaysData[i].duration,
                status: ResultThirtyDaysData[i].status,
                type: ResultThirtyDaysData[i].type,
                reason: ResultThirtyDaysData[i].reason, 
                comment: ResultThirtyDaysData[i].comment,
            })
            }

            const monthDatas = merge(arr3, FetchDateforThirtyDays);

            

                let res = HolidayService.WeekoffData()
                .then(response => {
                    const AllDatas = response.data;
                    const TotalWeekOffs = AllDatas.filter(
                        item => item.value && item.value.includes("1")
                    )
                    return TotalWeekOffs;
                })
                .catch(e => {
                    console.log(e);
                })
                
                res.then((TotalWeekOffs) => {
                    const Weekoffs = []
                    for(let i =0;i<TotalWeekOffs.length; i++){
                        Weekoffs.push({
                            Day: TotalWeekOffs[i].Day,
                            type : "WO",
                            employee_id : userInfo1.employee_id, 
                            in_time : '-', 
                            out_time: '-', 
                            breakStartTime : '-', 
                            breakEndTime : '-' , 
                            duration : '-' , 
                            status : '', 
                        })
                    }

                    const testWeekatas = []
                    for(let i=0; i<monthDatas.length; i++){
                        if(new Date(monthDatas[i].date).getDay() === 0){
                            testWeekatas.push({
                                date: monthDatas[i].date,
                                Day : "Sunday",
                                breakEndTime : monthDatas[i].breakEndTime,
                                breakStartTime : monthDatas[i].breakStartTime,
                                comment : monthDatas[i].comment,
                                duration : monthDatas[i].duration,
                                employee_id : monthDatas[i].employee_id,
                                firstname : monthDatas[i].firstname,
                                in_time : monthDatas[i].in_time,
                                out_time :  monthDatas[i].out_time,
                                reason :  monthDatas[i].reason,
                                status :   monthDatas[i].status,
                                type : monthDatas[i].type,
                                _id : monthDatas[i]._id,
                                
                            })
                        }
                        if(new Date(monthDatas[i].date).getDay() === 1){
                            testWeekatas.push({
                                date: monthDatas[i].date,Day : "Monday",
                                breakEndTime : monthDatas[i].breakEndTime,
                                breakStartTime : monthDatas[i].breakStartTime,
                                comment : monthDatas[i].comment,
                                duration : monthDatas[i].duration,
                                employee_id : monthDatas[i].employee_id,
                                firstname : monthDatas[i].firstname,
                                in_time : monthDatas[i].in_time,
                                out_time :  monthDatas[i].out_time,
                                reason :  monthDatas[i].reason,
                                status :   monthDatas[i].status,
                                type : monthDatas[i].type,
                                _id : monthDatas[i]._id,
                            })
                        }
                        if(new Date(monthDatas[i].date).getDay() === 2){
                            testWeekatas.push({
                                date: monthDatas[i].date,Day : "Tuesday",
                                breakEndTime : monthDatas[i].breakEndTime,
                                breakStartTime : monthDatas[i].breakStartTime,
                                comment : monthDatas[i].comment,
                                duration : monthDatas[i].duration,
                                employee_id : monthDatas[i].employee_id,
                                firstname : monthDatas[i].firstname,
                                in_time : monthDatas[i].in_time,
                                out_time :  monthDatas[i].out_time,
                                reason :  monthDatas[i].reason,
                                status :   monthDatas[i].status,
                                type : monthDatas[i].type,
                                _id : monthDatas[i]._id,
                            })
                        }
                        if(new Date(monthDatas[i].date).getDay() === 3){
                            testWeekatas.push({
                                date: monthDatas[i].date,Day : "Wednesday",
                                breakEndTime : monthDatas[i].breakEndTime,
                                breakStartTime : monthDatas[i].breakStartTime,
                                comment : monthDatas[i].comment,
                                duration : monthDatas[i].duration,
                                employee_id : monthDatas[i].employee_id,
                                firstname : monthDatas[i].firstname,
                                in_time : monthDatas[i].in_time,
                                out_time :  monthDatas[i].out_time,
                                reason :  monthDatas[i].reason,
                                status :   monthDatas[i].status,
                                type : monthDatas[i].type,
                                _id : monthDatas[i]._id,
                            })
                        }
                        if(new Date(monthDatas[i].date).getDay() === 4){
                            testWeekatas.push({
                                date: monthDatas[i].date,
                                Day : "Thursday",
                                breakEndTime : monthDatas[i].breakEndTime,
                                breakStartTime : monthDatas[i].breakStartTime,
                                comment : monthDatas[i].comment,
                                duration : monthDatas[i].duration,
                                employee_id : monthDatas[i].employee_id,
                                firstname : monthDatas[i].firstname,
                                in_time : monthDatas[i].in_time,
                                out_time :  monthDatas[i].out_time,
                                reason :  monthDatas[i].reason,
                                status :   monthDatas[i].status,
                                type : monthDatas[i].type,
                                _id : monthDatas[i]._id,
                            })
                        }
                        if(new Date(monthDatas[i].date).getDay() === 5){
                            testWeekatas.push({
                                date: monthDatas[i].date,
                                Day : "Friday",
                                breakEndTime : monthDatas[i].breakEndTime,
                                breakStartTime : monthDatas[i].breakStartTime,
                                comment : monthDatas[i].comment,
                                duration : monthDatas[i].duration,
                                employee_id : monthDatas[i].employee_id,
                                firstname : monthDatas[i].firstname,
                                in_time : monthDatas[i].in_time,
                                out_time :  monthDatas[i].out_time,
                                reason :  monthDatas[i].reason,
                                status :   monthDatas[i].status,
                                type : monthDatas[i].type,
                                _id : monthDatas[i]._id,
                            })
                        }
                        if(new Date(monthDatas[i].date).getDay() === 6){    
                            testWeekatas.push({
                                date: monthDatas[i].date,
                                Day : "Saturday",
                                breakEndTime : monthDatas[i].breakEndTime,
                                breakStartTime : monthDatas[i].breakStartTime,
                                comment : monthDatas[i].comment,
                                duration : monthDatas[i].duration,
                                employee_id : monthDatas[i].employee_id,
                                firstname : monthDatas[i].firstname,
                                in_time : monthDatas[i].in_time,
                                out_time :  monthDatas[i].out_time,
                                reason :  monthDatas[i].reason,
                                status :   monthDatas[i].status,
                                type : monthDatas[i].type,
                                _id : monthDatas[i]._id})
                        }
                    }
                    
            
                    const mergeWeekOffdatas = (arr1,arr2) => {
            
                        return arr1.map( (x) => {
                        const y = arr2.find( item => x.Day === item.Day);
                        if (y) {
                            return Object.assign({},x,y);
                        } else
                            return x
                        }).concat(arr2.filter(item => arr1.every( x => x.Day !== item.Day)));
                    }
            
                    const testResult = mergeWeekOffdatas(testWeekatas,Weekoffs)
                    

                    const MergeMonthDatas = merge(monthDatas,testResult)

                    const mergeHolidays = (arr1,arr2) => {

                        return arr1.map( (x) => {
                          const y = arr2.find( item => x.date === item.date);
                          if (y) {
                            return Object.assign({},x,y);
                          } else
                            return x
                        }).concat(arr2.filter(item => arr1.every( x => x.date === item.date)));
                    }

                    let holidayresponse =  HolidayService.findAllHolidays()
                    holidayresponse.then((response) => {
                            const AccountInfo = localStorage.getItem('store')
                            const userInfo1 = JSON.parse(AccountInfo);

                            const ConvertHolidayData = []
                            for(let i=0; i<response.data.length; i++){
                                ConvertHolidayData.push({
                                    employee_id: userInfo1.employee_id,
                                    date: response.data[i].start,
                                    in_time: '00:00',
                                    out_time: '00:00',
                                    breakStartTime: '-',
                                    breakEndTime: '-',
                                    duration: '',
                                    status: '',
                                    type: 'Public Holiday',
                                    reason: '', 
                                })
                            }
                        
                    const MergeHolidaysData = mergeHolidays(MergeMonthDatas, ConvertHolidayData)

                    const LastThirtyDaysFinalData = merge(MergeHolidaysData, FetchDateforThirtyDays)
                    
                    const excludeweekoff = LastThirtyDaysFinalData.filter(
                        item => item.type && !item.type.includes("WO")
                    )

                    const excludeweekofffinal = excludeweekoff.filter(
                        item => item.type && !item.in_time.includes("00:00")
                    )
                    
                    
                
                    function countHours(start, end){
                        function toSeconds(time_str) {
                            // Extract hours, minutes and seconds
                            var parts = time_str.split(':');
                            // compute  and return total seconds
                            return parts[0] * 3600 + // an hour has 3600 seconds
                            parts[1] * 60 // a minute has 60 seconds 
                            ; // seconds
                        }
                        var a = start
                        var b = end
                        
                        var difference = Math.abs(toSeconds(a) - toSeconds(b));

                        var resultnew = [
                            Math.floor(difference / 3600), // an hour has 3600 seconds
                            Math.floor((difference % 3600) / 60), // a minute has 60 seconds
                        ];
                            resultnew = resultnew.map(function(v) {
                                return v < 10 ? '0' + v : v;
                            }).join(':');

                        return resultnew;
                        }
                        

                    const dataForHours = []
                    for(let i=0; i<excludeweekofffinal.length;i++){
                    dataForHours.push(countHours(excludeweekofffinal[i].in_time, excludeweekofffinal[i].out_time))
                    }


                    // function sumArray(array) {
                    //     let sum = 0; 
                    //     array.forEach(item => {
                    //     sum += parseInt(item);
                    //     });
                    //     return sum;
                    // }

                    function addTimes(timeArray) {
                        let mins = timeArray.reduce((acc, time) => {
                          let [h, m] = time.split(':');
                          acc += h*60 + m*1;
                          return acc;
                        }, 0);
                        // console.log((mins/60|0) + ':' + ('0'+(mins%60)).slice(-2));
                        return (mins/60|0);
                      }
                      
                      setLastThirtyDaysTotalHours(addTimes(dataForHours));

                
                    const Chartdata = [
                        [
                            { label: 'Type', type: 'string' },
                            { label: 'No of Days', type: 'number'},
                            { type: 'string', role: 'tooltip'},
                        ]
                    ]
                    
                    const color = [];
            
                    for(let i=0; i<LastThirtyDaysFinalData.length; i++){
                        if(LastThirtyDaysFinalData[i].type === "WO"){
                            color.push("#ddd")
                        }
                        else{
                            if(LastThirtyDaysFinalData[i].type === "Public Holiday"){
                                color.push("#ED1C24")
                            }else{
                                color.push("#fff")
                            }
                        }
                        var data = [LastThirtyDaysFinalData[i].type, 3.33, ` ${LastThirtyDaysFinalData[i].type}, ${new Date(LastThirtyDaysFinalData[i].date).toDateString()} `];
                        Chartdata.push(data)
                        
                    }

                    const chartoptions = { 
                        // eslint-disable-next-line
                        // pieSliceText : 'value',
                        pieSliceText: 'none',
                        // pieSliceBorderColor : "transparent",
                        backgroundColor : 'transparent',
                        colors: color,
                        pieHole : 0.4,
                        legend: 'none',
                        tooltip : {
                            text: 'none',
                            textStyle: {
                                color : 'grey'
                            }
                        }
                        // enableInteractivity: false,
                    }

                    setChartdata(Chartdata)
                    setChartoptions(chartoptions)
                    })
                })

        })
        .catch(e => {
            console.log(e);
        })
    }

 
    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };

    useEffect(() => {
       
        attendanceInfo();
        getAttendanceOfCurrentWeek();
        ThirtyDaysData();
        weekoffdata();
        HolidayList();

        // var today = new Date().toISOString().split('T')[0];
        // document.getElementsByName("fromdate")[0].setAttribute('max', today);
        // document.getElementsByName("todate")[0].setAttribute('max', today);

        const Last30Days = new Date(new Date().setDate(new Date().getDate() - 30));
        const Yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        setfilterfromdate(convertAAA(Last30Days))
        setfiltertodate(convertAAA(Yesterday))

        const AccountInfo = localStorage.getItem('store')
        const userInfo1 = JSON.parse(AccountInfo);
        const minutes = 1* 60 * 1000;
          
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


        //current week Datas
        const weekDatas = [];
        for(let i=0; i<week.length; i++){
            weekDatas.push({
                employee_id: employee_id,
                date: new Date(week[i]).toISOString(),
                in_time: '00:00',
                out_time: '00:00',
                breakStartTime: '00:00',
                breakEndTime: '00:00',
                duration: '',
                status: '',
                type: 'Absent',
                reason: '', 
            })
        }

        const ConvertedFetchDate = []
        for(let i=0; i< currentweekDatesdatas.length; i++){
            ConvertedFetchDate.push({
                employee_id: currentweekDatesdatas[i].employee_id,
                date: currentweekDatesdatas[i].date,
                in_time: currentweekDatesdatas[i].in_time,
                out_time: currentweekDatesdatas[i].out_time,
                breakStartTime: currentweekDatesdatas[i].breakStartTime,
                breakEndTime: currentweekDatesdatas[i].breakEndTime,
                duration: currentweekDatesdatas[i].duration,
                status: currentweekDatesdatas[i].status,
                type: currentweekDatesdatas[i].type,
                reason: currentweekDatesdatas[i].reason, 

            })
        }

        const merge = (arr1,arr2) => {

        return arr1.map( (x) => {
          const y = arr2.find( item => x.date === item.date);
          if (y) {
            return Object.assign({},x,y);
          } else
            return x
        }).concat(arr2.filter(item => arr1.every( x => x.date !== item.date)));
        }
       
        let arr3 = merge(weekDatas, ConvertedFetchDate)

        const Weekoffs = []
        for(let i =0;i<Datas.length; i++){
            Weekoffs.push({
                Day: Datas[i].Day,
                type : "WO",
                employee_id : employee_id, 
                in_time : '-', 
                out_time: '-', 
                breakStartTime : '-', 
                breakEndTime : '-' , 
                duration : '-' , 
                status : '', 
            })
        }
        const testWeekatas = []
        for(let i=0; i<arr3.length; i++){
            if(new Date(arr3[i].date).getDay() === 0){
                testWeekatas.push({
                    date: arr3[i].date,
                    Day : "Sunday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                    
                })
            }
            if(new Date(arr3[i].date).getDay() === 1){
                testWeekatas.push({
                    date: arr3[i].date,Day : "Monday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                })
            }
            if(new Date(arr3[i].date).getDay() === 2){
                testWeekatas.push({
                    date: arr3[i].date,Day : "Tuesday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                })
            }
            if(new Date(arr3[i].date).getDay() === 3){
                testWeekatas.push({
                    date: arr3[i].date,Day : "Wednesday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                })
            }
            if(new Date(arr3[i].date).getDay() === 4){
                testWeekatas.push({
                    date: arr3[i].date,
                    Day : "Thursday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                })
            }
            if(new Date(arr3[i].date).getDay() === 5){
                testWeekatas.push({
                    date: arr3[i].date,
                    Day : "Friday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id,
                })
            }
            if(new Date(arr3[i].date).getDay() === 6){
                testWeekatas.push({
                    date: arr3[i].date,
                    Day : "Saturday",
                    breakEndTime : arr3[i].breakEndTime,
                    breakStartTime : arr3[i].breakStartTime,
                    comment : arr3[i].comment,
                    duration : arr3[i].duration,
                    employee_id : arr3[i].employee_id,
                    firstname : arr3[i].firstname,
                    in_time : arr3[i].in_time,
                    out_time :  arr3[i].out_time,
                    reason :  arr3[i].reason,
                    status :   arr3[i].status,
                    type : arr3[i].type,
                    _id : arr3[i]._id})
            }
        }
        

        const mergeWeek = (arr1,arr2) => {

            return arr1.map( (x) => {
              const y = arr2.find( item => x.Day === item.Day);
              if (y) {
                return Object.assign({},x,y);
              } else
                return x
            }).concat(arr2.filter(item => arr1.every( x => x.Day !== item.Day)));
        }

        const WeekMergeResult = mergeWeek(testWeekatas,Weekoffs)
        
        const MergeFetchData = merge(WeekMergeResult,ConvertedFetchDate)

        const mergeHolidays = (arr1,arr2) => {

            return arr1.map( (x) => {
              const y = arr2.find( item => x.date === item.date);
              if (y) {
                return Object.assign({},x,y);
              } else
                return x
            }).concat(arr2.filter(item => arr1.every( x => x.date === item.date)));
        }

        const HolidayMergeResult = mergeHolidays(MergeFetchData, HolidaysData)

        const finalResult = merge(HolidayMergeResult, ConvertedFetchDate)

        const weekData = [] 
        for(let i=0; i<finalResult.length; i++){
            if(finalResult[i].in_time === "00:00"){
                weekData.push({
                        date : convert(finalResult[i].date),
                        in_time: "00:00",
                        out_time: "00:00",
                        type: finalResult[i].type,
                })
            }else{
                weekData.push({
                    date : convert(finalResult[i].date),
                    in_time: tConvert(finalResult[i].in_time),
                    out_time: tConvert(finalResult[i].out_time),
                    type: finalResult[i].type,
                })
            }
        }

        const EMPcolumns = [
            {
                name: 'Date',
                selector: row => convert(row.date),
                sortable: true,
                // width: '12%',
            },
            {
                name: 'In Time',
                selector: row =>  row.in_time,
                // width: '10%',
            },
            {
                name: 'Out Time',
                selector: row => row.out_time,
                // width: '10%',
            },
            {
                name: 'BreakStartTime',
                selector: row => row.breakStartTime,
                // width: '12%',
            },
            {
                name: 'BreakEndTime',
                selector: row => row.breakEndTime,
                // width: '12%',
            },
            {
                name: 'Type',
                selector: row => row.type,
                width: '14%',
                cell: row => (
                                <>
                                {row.type === "Public Holiday" ? 
                                <>
                                <div className="text-warning">{row.type}</div>
                                <GoInfo  size={22} className="ml-1" color="#C5BFBF" id={row.date}   />
                                <ReactTooltip
                                        className="bg-white tooltip"
                                        style={{zIndex: 3}}
                                        anchorId={row.date}
                                        place="bottom"
                                        container="body"
                                        content={
                                            <>
                                            <table className="table table-bordered responsive" style={{color: 'black'}}>
                                            <thead>
                                                <tr>
                                                <th>Category</th>
                                                <th>Date</th>
                                                <th>Status Changed date</th>
                                                <th>Status Changed by</th>
                                                <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <td className="text-warning">{row.type}</td>
                                                <td>{convert(row.date)}</td>
                                                <td>{!row.updatedAt  ? <span>-</span> : convert(row.updatedAt)}</td>
                                                <td>{!row.statusChangeby  ? <span>-</span> : row.statusChangeby}</td>
                                                <td>{!row.status ? <span>-</span> : row.status}</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                            </>
                                        }
                                    />
                                </> : 
                                <>
                                {row.type}
                                <GoInfo  size={22} className="ml-1" color="#C5BFBF" id={row.date} />
                                <ReactTooltip
                                        className="bg-white react-tooltip"
                                        style={{ zIndex: 3  }}
                                        anchorId={row.date}
                                        place="bottom"
                                        container="body"
                                        content={
                                            <>
                                            <table className="table table-bordered responsive" style={{color: 'black'}}>
                                            <thead>
                                                <tr>
                                                <th scope="col">Category</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Status Changed date</th>
                                                <th scope="col">Status Changed by</th>
                                                <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <td>{row.type}</td>
                                                <td>{convert(row.date)}</td>
                                                <td>{!row.updatedAt  ? <span>-</span> : convert(row.updatedAt)}</td>
                                                <td>{!row.statusChangeby  ? <span>-</span> : row.statusChangeby}</td>
                                                <td>{!row.status ? <span>-</span> : row.status}</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                            </>
                                        }
                                    />
                                </>}
                                
                                </>
                            ),
            },
            {
                name: 'Duration',
                selector: row => row.duration,
                width: '10%'
            },
            {
                name: 'Status',
                selector: row => row.status,
                // width: '13%'
            },
            
        ]

         const onSelectedRowsChange = (state) => {
            setSelectedData(state.selectedRows)
            setGlobalArray(state.selectedRows)
         }


         function filterDateFromRange(){

            var getDateArray = function(start, end) {
                const arr = []
                var dt = new Date(start);
                while (dt <= end) {
                    arr.push((new Date(dt))); //save only the Day MMM DD YYYY part
                    dt.setDate(dt.getDate() + 1);
                }
                return arr;
            }

            var startDate = new Date(filterfromdate);
            var endDate = new Date(filtertodate);


            AttendanceService.filterdatefromrange(employee_id,filterfromdate,filtertodate)
            .then(response => {

                const DatesAraay = getDateArray(startDate, endDate);


                const ConvertedFetchDate = response.data;
                

                const ConvertedDate = []
                for(let i=0; i< DatesAraay.length; i++){
                  ConvertedDate.push({
                    employee_id: employee_id,
                    date: DatesAraay[i].toISOString(),
                    in_time: '00:00',
                    out_time: '00:00',
                    breakStartTime: '00:00',
                    breakEndTime: '00:00',
                    firstname: firstname,
                    duration: '',
                    status: '',
                    type: 'Absent',
                    reason: '', 
                    })
                    
                }

                setConvertedDateLength(ConvertedDate.length)


                const merge = (arr1,arr2) => {

                    return arr1.map( (x) => {
                      const y = arr2.find( item => x.date === item.date);
                      if (y) {
                        return Object.assign({},x,y);
                      } else
                        return x
                    }).concat(arr2.filter(item => arr1.every( x => x.date !== item.date)));
                }
                    
                
                let arr3 = merge(ConvertedDate, ConvertedFetchDate)

                const Weekoffs = []
                for(let i =0;i<Datas.length; i++){
                    Weekoffs.push({
                        Day: Datas[i].Day,
                        type : "WO",
                        employee_id : employee_id, 
                        in_time : '-', 
                        out_time: '-', 
                        breakStartTime : '-', 
                        breakEndTime : '-' , 
                        firstname: firstname,
                        duration : '-' , 
                        status : '', 
                    })
                }
                const testWeekatas = []
                for(let i=0; i<arr3.length; i++){
                    if(new Date(arr3[i].date).getDay() === 0){
                        testWeekatas.push({
                            date: arr3[i].date,
                            Day : "Sunday",
                            breakEndTime : arr3[i].breakEndTime,
                            breakStartTime : arr3[i].breakStartTime,
                            comment : arr3[i].comment,
                            duration : arr3[i].duration,
                            employee_id : arr3[i].employee_id,
                            firstname : firstname,
                            in_time : arr3[i].in_time,
                            out_time :  arr3[i].out_time,
                            reason :  arr3[i].reason,
                            status :   arr3[i].status,
                            type : arr3[i].type,
                            _id : arr3[i]._id,
                            updatedAt: arr3[i].updatedAt,
                        })
                    }
                    if(new Date(arr3[i].date).getDay() === 1){
                        testWeekatas.push({
                            date: arr3[i].date,Day : "Monday",
                            breakEndTime : arr3[i].breakEndTime,
                            breakStartTime : arr3[i].breakStartTime,
                            comment : arr3[i].comment,
                            duration : arr3[i].duration,
                            employee_id : arr3[i].employee_id,
                            firstname : arr3[i].firstname,
                            in_time : arr3[i].in_time,
                            out_time :  arr3[i].out_time,
                            reason :  arr3[i].reason,
                            status :   arr3[i].status,
                            type : arr3[i].type,
                            _id : arr3[i]._id,
                            updatedAt: arr3[i].updatedAt,
                        })
                    }
                    if(new Date(arr3[i].date).getDay() === 2){
                        testWeekatas.push({
                            date: arr3[i].date,Day : "Tuesday",
                            breakEndTime : arr3[i].breakEndTime,
                            breakStartTime : arr3[i].breakStartTime,
                            comment : arr3[i].comment,
                            duration : arr3[i].duration,
                            employee_id : arr3[i].employee_id,
                            firstname : arr3[i].firstname,
                            in_time : arr3[i].in_time,
                            out_time :  arr3[i].out_time,
                            reason :  arr3[i].reason,
                            status :   arr3[i].status,
                            type : arr3[i].type,
                            _id : arr3[i]._id,
                            updatedAt: arr3[i].updatedAt,
                        })
                    }
                    if(new Date(arr3[i].date).getDay() === 3){
                        testWeekatas.push({
                            date: arr3[i].date,Day : "Wednesday",
                            breakEndTime : arr3[i].breakEndTime,
                            breakStartTime : arr3[i].breakStartTime,
                            comment : arr3[i].comment,
                            duration : arr3[i].duration,
                            employee_id : arr3[i].employee_id,
                            firstname : arr3[i].firstname,
                            in_time : arr3[i].in_time,
                            out_time :  arr3[i].out_time,
                            reason :  arr3[i].reason,
                            status :   arr3[i].status,
                            type : arr3[i].type,
                            _id : arr3[i]._id,
                            updatedAt: arr3[i].updatedAt,
                        })
                    }
                    if(new Date(arr3[i].date).getDay() === 4){
                        testWeekatas.push({
                            date: arr3[i].date,
                            Day : "Thursday",
                            breakEndTime : arr3[i].breakEndTime,
                            breakStartTime : arr3[i].breakStartTime,
                            comment : arr3[i].comment,
                            duration : arr3[i].duration,
                            employee_id : arr3[i].employee_id,
                            firstname : arr3[i].firstname,
                            in_time : arr3[i].in_time,
                            out_time :  arr3[i].out_time,
                            reason :  arr3[i].reason,
                            status :   arr3[i].status,
                            type : arr3[i].type,
                            _id : arr3[i]._id,
                            updatedAt: arr3[i].updatedAt,
                        })
                    }
                    if(new Date(arr3[i].date).getDay() === 5){
                        testWeekatas.push({
                            date: arr3[i].date,
                            Day : "Friday",
                            breakEndTime : arr3[i].breakEndTime,
                            breakStartTime : arr3[i].breakStartTime,
                            comment : arr3[i].comment,
                            duration : arr3[i].duration,
                            employee_id : arr3[i].employee_id,
                            firstname : arr3[i].firstname,
                            in_time : arr3[i].in_time,
                            out_time :  arr3[i].out_time,
                            reason :  arr3[i].reason,
                            status :   arr3[i].status,
                            type : arr3[i].type,
                            _id : arr3[i]._id,
                            updatedAt: arr3[i].updatedAt,
                        })
                    }
                    if(new Date(arr3[i].date).getDay() === 6){
                        testWeekatas.push({
                            date: arr3[i].date,
                            Day : "Saturday",
                            breakEndTime : arr3[i].breakEndTime,
                            breakStartTime : arr3[i].breakStartTime,
                            comment : arr3[i].comment,
                            duration : arr3[i].duration,
                            employee_id : arr3[i].employee_id,
                            firstname : arr3[i].firstname,
                            in_time : arr3[i].in_time,
                            out_time :  arr3[i].out_time,
                            reason :  arr3[i].reason,
                            status :   arr3[i].status,
                            type : arr3[i].type,
                            _id : arr3[i]._id,
                            updatedAt: arr3[i].updatedAt,
                        })
                    }
                }
                

                const mergeWeekOffdatas = (arr1,arr2) => {

                    return arr1.map( (x) => {
                      const y = arr2.find( item => x.Day === item.Day);
                      if (y) {
                        return Object.assign({},x,y);
                      } else
                        return x
                    }).concat(arr2.filter(item => arr1.every( x => x.Day === item.Day)));
                }

                const testResult = mergeWeekOffdatas(testWeekatas,Weekoffs)


                let LegthofWeekOffs = testResult.filter(
                    item => item.type && item.type.includes("WO")
                )
                
                const finalResult = merge(testResult,ConvertedFetchDate)
                
                setsatSunDatedlength(LegthofWeekOffs.length);

                const mergeHolidays = (arr1,arr2) => {

                    return arr1.map( (x) => {
                      const y = arr2.find( item => x.date === item.date);
                      if (y) {
                        return Object.assign({},x,y);
                      } else
                        return x
                    }).concat(arr2.filter(item => arr1.every( x => x.date === item.date)));
                }

                const MergeHolidaysData = mergeHolidays(finalResult, HolidaysData)

                const testFinalResult = merge(MergeHolidaysData,ConvertedFetchDate)

                setarr4(testFinalResult); 
                

                setAttendaceFilterDivSHow(true)
                
                const PendingApprovals = testFinalResult.filter(
                    item => item.status && item.status.includes('Pending'),
                )

                const TotalPublicHolidays = testFinalResult.filter(
                    item => item.type && item.type.includes("Public Holiday")
                )

                const TotalWFH = testFinalResult.filter(
                    item => item.type && item.type.includes("Work From Home")
                )

                const TotalRegurlized = testFinalResult.filter(
                    item => item.type && item.type.includes("Regurlized")
                )

                setTotalPublicHolidays(TotalPublicHolidays.length);

                setPendingApprovalsLength(PendingApprovals.length);

                setTotalWFH(TotalWFH.length)
                setTotalRegurlized(TotalRegurlized.length)

                getAttendanceOfCurrentWeek();
                attendanceInfo()

                
            })
            .catch(e => {
                console.log(e);
            })
        
         }

        if(userInfo1.account_type === "Employee"){
            return(
                <div>
                    <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="breadcrumb">
                                                <h1>My Attendance Record</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="card mb-30">
                                            <div className="card-body">
                                                    <div className="row mt-3">
                                                        <div className="col-sm-5">
                                                            <div className="card shadow" >
                                                            
                                                                    <div className="chart">
                                                                    <Chart
                                                                        chartType="PieChart"
                                                                        data={Chartdata}
                                                                        options={chartoptions}
                                                                        width={"98%"}
                                                                        height={"350px"}
                                                                    />
                                                                    </div>
                                                                    
                                                                        <p className="labelOverlay h6">{LastThirtyDaysTotalHours}</p>
                                                                        <p className="labelOverlaytotal h6">hours</p>
                                                                            

                                                                <p className="text-center">
                                                                Last 30 Days Attendance 
                                                                <br/>
                                                                <span className="text-center text-secondary">
                                                                From {convert(Last30Days)} To {convert(yesterday)} </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-7">
                                                            <div className="card p-2 shadow">
                                                                {TimeFormatyesterdayData.map((yesterdaydata,index) => (
                                                                <div className="row" key={index}>
                                                                    <div className="col" style={{borderRight: '1px solid #6c757d' }}>
                                                                    <span className="t-font-boldest" style={{fontSize: '1rem'}}>Yesterday's <br/> Data</span><br />
                                                                </div>
                                                                <div className="col ml-3">
                                                                    <span className="fw-bolder">{yesterdaydata.in_time}</span><br />
                                                                    <span className="text-secondary" style={{fontSize: '0.7rem'}}>In Time</span>
                                                                </div>
                                                                <div className="col ml-3" >
                                                                    <span className="fw-bolder">{yesterdaydata.out_time}</span><br />
                                                                    <span className="text-secondary" style={{fontSize: '0.7rem'}}>Out Time</span>
                                                                </div>
                                                                <div className="col ml-3">
                                                                    <span className="fw-bolder">{result} h</span><br />
                                                                    <span className="text-secondary" style={{fontSize: '0.7rem'}}>Total Time</span>
                                                                </div>
                                                                    
                                                                </div>
                                                                ))}
                                                            
                                                            </div>
                                                            <div className="card p-2 mt-3 shadow">
                                                                <h4 className="t-font-boldest">Current Week's Status</h4>
                                                                <div className="table-responsive">
                                                                <table className="table table-bordered">
                                                                    <tbody>
                                                                    {weekData && weekData.map((Datas,index) => (
                                                                        <tr key={index}>
                                                                            <td>{Datas.date}</td>
                                                                            <td>{Datas.in_time}</td>
                                                                            <td>{Datas.out_time}</td>
                                                                            
                                                                            <td>{Datas.type}</td>
                                                                        </tr>
                                                                    )
                                                                    )}
                                                                    </tbody>
                                                                </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                
                                                    <div className="container mt-4 border-top">
                                                        <div className="row mb-1">
                                                            <div className="col-sm-3 mt-2">
                                                                <span>From<span className="text-danger">*</span></span>
                                                            </div>
                                                            <div className="col-sm-3 mt-2">
                                                                <span>To<span className="text-danger">*</span></span>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-3">
                                                                <input type='date' className="form-control" name="fromdate" value={filterfromdate} onChange={(e) => setfilterfromdate(e.target.value)}  
                                                                />
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <input type='date'  name="todate" className="form-control" value={filtertodate} onChange={(e) => setfiltertodate(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-4">
                                                            <div className="col-sm-3">
                                                                <button className="btn btn-primary btn-sm mr-3" onClick={filterDateFromRange}>View Attendance</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                    
                                            {AttendaceFilterDivSHow === true ?
                                            <div className="col-md-12 mt-3" >
                                            <div className="card ">
                                                <div className="card-body">                    
                                                        
                                                    <div className="card shadow" style={{backgroundColor: '#FAFAFA'}}>
                                                            <div className="row p-3">
                                                                <div className="col" style={{borderRight: '1px solid #6c757d' }}>
                                                                    <span className="text-secondary" style={{fontSize: '0.7rem'}}>Total Days</span><br />
                                                                    <span className="fw-bolder">{ConvertedDateLength}</span>
                                                                </div>
                                                                <div className="col" style={{borderRight: '1px solid #6c757d' }}>
                                                                    <span className="text-secondary" style={{fontSize: '0.7rem'}}>Work Days</span><br />
                                                                    <span className="fw-bolder">{(ConvertedDateLength) - (satSunDatedlength + TotalPublicHolidays) }</span>
                                                                </div>
                                                                <div className="col" style={{borderRight: '1px solid #6c757d' }}>
                                                                    <span className="text-secondary" style={{fontSize: '0.7rem'}}>Week-Offs/Holidays</span><br />
                                                                    <span className="fw-bolder">{satSunDatedlength + TotalPublicHolidays}</span>
                                                                </div>
                                                                <div className="col" style={{borderRight: '1px solid #6c757d' }}>
                                                                    <span className="text-secondary" style={{fontSize: '0.7rem'}}>Work From Home</span><br />
                                                                    <span className="fw-bolder">{TotalWFH}</span>
                                                                </div>
                                                                <div className="col" style={{borderRight: '1px solid #6c757d' }}>
                                                                    <span className="text-secondary" style={{fontSize: '0.7rem'}}>Regurlized</span><br />
                                                                    <span className="fw-bolder">{TotalRegurlized}</span>
                                                                </div>
                                                                <div className="col">
                                                                    <span className="text-secondary" style={{fontSize: '0.7rem'}}>Pending Approvals</span><br />
                                                                    <span className="fw-bolder">{PendingApprovalsLength}</span>
                                                                </div>
                                                            </div>
                                                    </div>
                                                        
                                                    <h5 className="mt-4">Attendance Record</h5>
                                                    
                                                        <DataTable 
                                                            columns={EMPcolumns}
                                                            data={arr4}
                                                            responsive = {true}
                                                            selectableRows
                                                            selectableRowsHighlight
                                                            onSelectedRowsChange={onSelectedRowsChange}
                                                            clearSelectedRows={handleclearSelectedRows}
                                                            className="dataTable attendance-list"     
                                                        />
                                                
                                                        <div className="row mt-5">
                                                                <div className="col-sm-3">
                                                                    <div className="form-check" >
                                                                        <input className="form-check-input" type="checkbox" id="regurlized" value="Regurlized" onChange={(e) => setRegurlizedValue(e.target.value)} />
                                                                        <label className="fw-normal fs-6" htmlFor="regurlized" onClick={ handleTypeShow }>
                                                                            Regurlized
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2">
                                                                    <div className="form-check" >
                                                                        <input className="form-check-input" type="checkbox" id="wfm" value="Work From Home" onChange={(e) => setRegurlizedValue(e.target.value)}/>
                                                                        <label  className="fw-normal" htmlFor="wfm" onClick={ handleTypeShow }>
                                                                        WFH
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <div className="form-check" >
                                                                        <input className="form-check-input" type="checkbox" id="co" value="Compensatory off" onChange={(e) => setRegurlizedValue(e.target.value)} />
                                                                            <label  className="fw-normal" htmlFor="co" onClick={ handleTypeShow }>
                                                                            Compensatory off
                                                                            </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="form-check" >
                                                                        <input className="form-check-input" type="checkbox" id="eco" value="Extended Compensatory off" onChange={(e) => setRegurlizedValue(e.target.value)} />
                                                                            <label className="fw-normal" htmlFor="eco" onClick={ handleTypeShow }>
                                                                            Extended Compensatory off
                                                                            </label>
                                                                    </div>
                                                                </div>
                                                        </div>

                                                        <Modal show={showTypeModal} onHide={handleTypeClose} animation={false} size='hello'>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>Applying {RegurlizedValue} request</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                {selectedData === undefined || selectedData === null || selectedData.length === 0 ? 
                                                                            <div>
                                                                                <p>No Selected data</p>
                                                                            </div>
                                                                    : 
                                                                    <>
                                                                    <p className="text-danger">{Error}</p>
                                                                    <p className="text-danger">{SubmitAttendanceError}</p>
                                                                <form onSubmit={handleSubmit(submitNewAttendance)}>
                                                                    <table className="table table-bordered responsive">
                                                                    <thead>
                                                                        <tr>
                                                                        <th scope="col">Date</th>
                                                                        <th scope="col">In Time</th>
                                                                        <th scope="col">Out Time</th>
                                                                        <th scope="col">Break Start Time</th>
                                                                        <th scope="col">Break End Time</th>
                                                                        <th scope="col">Duration</th>
                                                                        <th scope="col">Comment</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {selectedData && selectedData.map((selecteddata,index) => (
                                                                        <tr key={index}>
                                                                        {selecteddata.status === "Approve" ? (
                                                                                <>
                                                                                <td>
                                                                                    {convert(selecteddata.date)}
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="time" className="form-control" name='in_time' defaultValue={selecteddata.in_time} disabled/>
                                                                            
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="time" className="form-control" name='out_time' defaultValue={selecteddata.out_time}  disabled />
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="time" className="form-control" name='BreakStartTime' defaultValue={selecteddata.breakStartTime}  disabled/>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="time" className="form-control" name='BreakEndTime' defaultValue={selecteddata.breakEndTime}  disabled/>
                                                                                    </td>
                                                                                    <td>
                                                                                            <select className="custom-select" name='type' defaultValue={selecteddata.duration} disabled>
                                                                                                <option>Select..</option>
                                                                                                <option value="Full Day">Full Day</option>
                                                                                                <option value="First Half">First Half</option>
                                                                                                <option value="Second Half">Second Half</option>
                                                                                            </select>
                                                                                    </td>
                                                                                    
                                                                                    </>
                                                                        ) : (
                                                                            <>
                                                                            <td>
                                                                                    {convert(selecteddata.date)}
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="time" className="form-control" name='in_time'
                                                                                        defaultValue={selecteddata.in_time}
                                                                                        onChange={(e) => onInTimeChange(index,e,selecteddata.date,selecteddata._id)} required/>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="time" className="form-control" name='out_time'
                                                                                        defaultValue={selecteddata.out_time}
                                                                                        onChange={(e) => onOutTimeChange(index,e)} required />
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="time" className="form-control" name='BreakStartTime'
                                                                                        defaultValue={selecteddata.breakStartTime}
                                                                                        onChange={(e) => onBreakStartTimeChange(index,e)} required/>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input type="time" className="form-control" 
                                                                                        defaultValue={selecteddata.breakEndTime}
                                                                                        name='BreakEndTime' onChange={(e) => onBreakEndTimeChange(index,e)} required />
                                                                                    </td>
                                                                                    <td>
                                                                                        <select className="custom-select" name='duration'
                                                                                            onChange={(e) => onDurationChange(index,e)} required defaultValue={selecteddata.duration}>
                                                                                                <option>Select..</option>
                                                                                                <option value="Full Day">Full Day</option>
                                                                                                <option value="First Half">First Half</option>
                                                                                                <option value="Second Half">Second Half</option>
                                                                                        </select>
                                                                                    </td>
                                                                                    <td>
                                                                                        <textarea type='text' rows="1"  className="form-control" name="comment" placeholder="Enter Comment" onChange={(e) => onCommentChange(index,e)} />
                                                                                    </td>
                                                                            </>
                                                                        ) 
                                                                            
                                                                        }
                                                                        </tr>
                                                                    ) ) 
                                                                    }
                                                                    </tbody>
                                                                    </table>
                                                                    {selectedData === undefined || selectedData === null || selectedData.length === 0 ?
                                                                            <div className="row mt-5">
                                                                                <div className="col-sm-3"> 
                                                                                    <button className="btn btn-secondary" onClick={handleTypeClose}>Close</button>
                                                                                </div>
                                                                            </div>
                                                                    : <div className="row mt-5 justify-content-end">
                                                                        <div className="col-sm-2">
                                                                            <button type="submit" className="btn btn-primary" >Submit</button>
                                                                        </div>
                                                                        <div className="col-sm-3">
                                                                            <button className="btn btn-secondary" onClick={handleTypeClose}>Close</button>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                </form>
                                                                </>
                                                                }
                                                                
                                                                </Modal.Body>
                                                            
                                                        </Modal>
 
                                                </div>
                                            </div>
                                            </div> : null
                                            }
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