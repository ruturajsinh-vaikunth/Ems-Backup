
import Sidebar from "./Sidebar";
import  { useEffect, useState } from "react";
import {useDispatch } from 'react-redux'
import { refreshToken } from "../features/auth/authActions";
import { logout } from "../features/auth/authSlice";
import GreetingService from "../services/GreetingService";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DataTable from 'react-data-table-component';


export default function GreetingCardHistory(){


    const dispatch = useDispatch()
    const AccountInfo = localStorage.getItem('store')
    const userInfo = JSON.parse(AccountInfo);
    const [GreetingsSentData, setGreetingsSentData] = useState([])
    const [GreetingsReceivedData, setGreetingsReceivedData] = useState([])
    const [ReceivedData, setReceivedData] = useState([])

    const [Divshow, setDivshow] = useState(false)
    const [RecDivshow, setRecDivshow] = useState(false)

    const [SentData, setSentData] = useState([])
    const [showid, setshowid] = useState("")
    const [Recshowid, setRecshowid] = useState("")

    function convert(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }

    function sentGreetings(){
        GreetingService.findSentGreetings(userInfo.firstName)
        .then((response) => {
            if(response.status === 200){
                setGreetingsSentData(response.data)
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }

    function receivedGreetings(){
        GreetingService.findReceivedGreetings(userInfo.firstName)
        .then((response) => {
            if(response.status === 200){
                setGreetingsReceivedData(response.data)
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }


    

    const parseJwt = (id) => {
        dispatch(refreshToken({_id : id}))
    };

    const receivedgreetingscolumns = [
        {
            name: 'Received From',
            selector: row => row.sender,
            minWidth: '15%',
            maxWidth: '15%',
        },
        {
            name: 'Date',
            selector: row => convert(row.date),
            sortable: true,
            minWidth: '12%',
            maxWidth: '15%',

        },
        {
            name: 'Type',
            selector: row => row.type,
            minWidth: '15%',
            maxWidth: '17%',

        },
        {
            name: 'Greetings',
            selector: row => row.greetings,

        }
    ]

    const sentgreetingscolumns = [
        {
            name: 'Send To',
            selector: row => row.receiver,
            minWidth: '11%',
            maxWidth: '13%'
        },
        {
            name: 'Date',
            selector: row => convert(row.date),
            sortable: true,
            minWidth: '12%',
            maxWidth: '15%'
        },
        {
            name: 'Type',
            selector: row => row.type,
            minWidth: '15%',
            maxWidth: '17%'
        },
        {
            name: 'Greetings',
            selector: row => row.greetings,
        }
    ]

    function FindReceivedEntries(year){
        var startDate = new Date(`${year}-01-01`);
        var endDate = new Date(`${year}-12-31`);

        var resultYearData = GreetingsReceivedData.filter(a => {
            var date = new Date(a.date);
        return (date >= startDate && date <= endDate);
        });
        setReceivedData(resultYearData)
    }

    function FindSentEntries(year){
        var startDate = new Date(`${year}-01-01`);
        var endDate = new Date(`${year}-12-31`);

        var resultYearData = GreetingsSentData.filter(a => {
            var date = new Date(a.date);
        return (date >= startDate && date <= endDate);
        });
        setSentData(resultYearData)
    }


    function generateArrayOfYears() {
        var max = new Date().getFullYear()
        var min = max - 4
        var years = []
      
        for (var i = max; i >= min; i--) {
            var startDate = new Date(`${i}-01-01`);
            var endDate = new Date(`${i}-12-31`);

            //eslint-disable-next-line
            var resultYearData = GreetingsReceivedData.filter(a => {
                var date = new Date(a.date);
            return (date >= startDate && date <= endDate);
            });

          years.push({year : i, btnid: `btn${i}`, exeid: `exe${i}`, head: `head${i}`, length: resultYearData.length })
        }
        return years
    }

    const years = generateArrayOfYears()

    function generateArrayOfYearssent() {
        var max = new Date().getFullYear()
        var min = max - 4
        var years = []
      
        for (var i = max; i >= min; i--) {

            var startDate = new Date(`${i}-01-01`);
            var endDate = new Date(`${i}-12-31`);
            
            //eslint-disable-next-line
            var resultYearData = GreetingsSentData.filter(a => {
                var date = new Date(a.date);
            return (date >= startDate && date <= endDate);
            });


          years.push({year : i, sentbtnid: `sentbtn${i}`, sentexeid: `sentexe${i}`, senthead: `senthead${i}`, length: resultYearData.length })
        }
        return years
    }

    const yearssent = generateArrayOfYearssent()

    function handleShow(id){
        setshowid(id)
        setDivshow(!Divshow)
    }

    function handleRecShow(id){
        setRecshowid(id)
        setRecDivshow(!RecDivshow)
    }


    useEffect(() => {
        sentGreetings();
        receivedGreetings();

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

        return(
            <div>
            <Sidebar/>
                    <div className="app-admin-wrap layout-sidebar-large clearfix">
                        <main>
                            <div className="main-content-wrap d-flex flex-column flex-grow-1 sidenav-open">
                                    <div className="main-content">
                                        <div>
                                            <div className="breadcrumb">
                                                <h1>Greeting Card History</h1>
                                            </div>
                                            <div className="separator-breadcrumb border-top"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="card mb-30">
                                                <div className="card-body">

                                                <Tabs defaultActiveKey="ShowWishReceivedDetail" id="uncontrolled-tab-example" className="mb-3 mt-3 shadow-sm" transition={false}>
                                                        <Tab eventKey="ShowWishReceivedDetail" title="Wish Received">
                                                           
                                                            <div role="tablist">
                                                            {years.map((data, index) => (
                                                                <div className="card ul-card__border-radius" key={index}>
                                                                    
                                                                    <header role="tab" className="card-header p-1">
                                                                        <div className="d-flex">
                                                                            <div className="p-2">
                                                                            <span role="button" tabIndex={index}  className={Divshow ? "btn card-title mb-0 btn-transparent btn-block not-collapsed" : "btn card-title mb-0 btn-transparent btn-block collapsed"} aria-expanded={Divshow ? "true" : "false" } data-bs-target={`#${data.exeid}`} aria-controls={data.exeid} onClick={() => {{handleShow(data.exeid); FindReceivedEntries(data.year);}}}>
                                                                            {data.year}
                                                                                
                                                                            </span>
                                                                            </div>
                                                                            <div className="ml-auto p-2"><span className="badge badge-primary badge-square-primary lg m-1">{data.length}</span></div>
                                                                        </div>
                                                                        
                                                                    </header>
                                                                    {showid === data.exeid ? 
                                                                    <div id={data.exeid} role="tabpanel" className={Divshow ? "collapse show" : "collapse"}>
                                                                        <div className="card-body">
                                                                            
                                                                         <DataTable 
                                                                                columns={receivedgreetingscolumns}
                                                                                data={ReceivedData}
                                                                                responsive
                                                                                className="border border-1 table-rc-one"
                                                                            />
                                                                        </div>
                                                                    </div> : null }
                                                                    
                                                                </div>
                                                            ))}
                                                            </div>
                                                        </Tab>
                                                        <Tab eventKey="ShowWishSentDetail" title="Wish Sent">
                                                            <div role="tablist">
                                                            {yearssent.map((data, index) => (
                                                                <div className="card ul-card__border-radius" key={index}>
                                                                    
                                                                    <header role="tab" className="card-header p-1">
                                                                        <div className="d-flex">
                                                                            <div className="p-2">
                                                                                <span role="button" tabIndex={index}  className={RecDivshow ? "btn card-title mb-0 btn-transparent btn-block not-collapsed" : "btn card-title mb-0 btn-transparent btn-block collapsed"} aria-expanded={RecDivshow ? "true" : "false" } aria-controls={data.sentexeid} onClick={() => {{handleRecShow(data.sentexeid); FindSentEntries(data.year);}}}>    
                                                                                    {data.year}
                                                                                </span>
                                                                            </div>
                                                                            <div className="ml-auto p-2">
                                                                                <span  className="badge badge-primary badge-square-primary lg m-1">{data.length}</span>
                                                                            </div>
                                                                        </div>
                                                                    </header>
                                                                    {Recshowid === data.sentexeid ? 
                                                                    <div id={data.sentexeid} role="tabpanel" className={RecDivshow ? "collapse show" : "collapse"}>
                                                                        <div className="card-body">
                                                                            
                                                                        <DataTable 
                                                                                    columns={sentgreetingscolumns}
                                                                                    data={SentData}
                                                                                    className="border border-1 table-st-one"
                                                                                />
                                                                        </div>
                                                                    </div> : null}
                                                                    
                                                                </div>
                                                            ))}
                                                            </div>
                                                        </Tab>
                                                </Tabs>
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

