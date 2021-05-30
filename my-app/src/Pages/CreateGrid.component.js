import React, {useState, useEffect, useReducer} from 'react';
import { ToggleButton } from 'react-bootstrap';
import { Form, Row, Col, Button, ToggleButtonGroup } from 'react-bootstrap';

import TimezonePicker from 'react-bootstrap-timezone-picker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import TimeSelect from '../Components/TimeSelect';
import DaySelect from '../Components/DaySelect';
import TextField from '@material-ui/core/TextField';


import axios from 'axios';

export default function CreateGrid() {
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state,  ...newState}),
        {
            title: "",
            startDate: new Date(),
            calenderType: 7,
            timeZone: 'Eastern Time',
            daysOfWeek: {
                Sun: false,
                Mon: true,
                Tue: true,
                Wed: true,
                Thu: true,
                Fri: true,
                Sat: false
            },
            timeInterval: 30,
            startTime: new Date(2000,1,1,6),
            endTime: new Date(2000,1,1,0),
            table: null
        }
    )

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserInput({[name]:value})
    }

    const handleTimeChange = (selectedInterval) =>{
        let start = selectedInterval[0]
        let end = selectedInterval[1]

        setUserInput({"startTime":start});
        setUserInput({"endTime":end});
    }

    useEffect(() => {
        console.log(userInput);

        if (userInput.table !== null){
        axios.post('http://localhost:5000/plans/add', userInput)
            .then(res => {
                console.log(res.data)
                window.location=`/plans/${res.data}`
            })
            .catch(err => console.log(err));
        }
    }, [userInput.table])

    const handleSubmit = (event) => {
        event.preventDefault();
        createTable();

    }

    const createTable = () => {
        let diff =((userInput.endTime).getTime() - (userInput.startTime).getTime()) / 1000 / 60;
        let timeDiff = Math.abs(Math.round(diff));
        let height = timeDiff / userInput.timeInterval;

        var table = Array.from({length: height+1}, 
            e => Array.from({length:8}, e => ({})));

        // For first row
        for (let i = 1; i < 8; i++){ 
            var next = new Date();
            next.setDate(userInput.startDate.getDate() + i);
            table[0][i]['date'] = next;


         }
         // For first Col
        for (let j = 0; j < height+1; j++){ 
            var increments = new Date();
            console.log(userInput.startTime);
            increments.setMinutes( userInput.startTime.getMinutes() + (j * 30) );
            console.log(increments);

            var localeSpecificTime = increments.toLocaleTimeString();
            console.log(localeSpecificTime);
            
            table[j][0]['time'] = localeSpecificTime.replace(/:\d+ /, ' ');
         }

        
        console.log(table);

        setUserInput({['table']:table});
        
    }
    
    return (
        <div className="create-page"> 
            <Form onSubmit={handleSubmit}>
                
                
                <Row>
                    <Col>
                        <div className="card" style={{marginBottom: '0.4rem'}}> 
                                <TextField fullWidth id="standard-basic" label="Event name" defaultValue={userInput.title} onChange={handleChange} />
                        </div>

                        <div className="card">
                            <div className="header">Starting Date</div>
                            <div className="body" style={{zIndex: 1}}>
                                <DatePicker
                                    selected={userInput.startDate}
                                    onChange={date => setUserInput({"startDate": date})}
                                    isClearable
                                    placeholderText="Enter Starting Date"
                                    popperPlacement="bottom"
                                    popperModifiers={{
                                        flip: {
                                            behavior: ["bottom"] // don't allow it to flip to be above
                                        },
                                        preventOverflow: {
                                            enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                                        },
                                        hide: {
                                            enabled: false // turn off since needs preventOverflow to be enabled
                                        }
                                    }}
                                />
                            </div>

                        </div>
                        
                        <div className="card">
                            <div className="header">Calender Type</div>
                            <div className="body">
                                <ToggleButtonGroup style={{zIndex:0}} name="calenderType" type="radio" value={userInput.calenderType} 
                                    onChange={event => setUserInput({"calenderType":event})}>
                                    <ToggleButton value={7}>Weekly</ToggleButton>
                                    <ToggleButton value={14}>Biweekly</ToggleButton>
                                    <ToggleButton value={30}>Monthly</ToggleButton>
                                </ToggleButtonGroup>
                            </div>

                        </div>
                        
                        
                        <div className="card">
                            <div className="header">Days Of Week</div>
                            <div className="body">
                                <DaySelect onDaysChange={event => setUserInput({"daysOfWeek":event})}></DaySelect>

                            </div>

                        </div>
                    </Col>
                    <Col>
                        <div className="card">
                            <div className="header">Time Zone</div>
                            <div className="body">
                                <TimezonePicker
                                    name = "timeZone"
                                    absolute      = {true}
                                    defaultValue  = "Eastern Time"
                                    placeholder   = "Select timezone..."
                                    onChange = {event => setUserInput({"timeZone":event})}
                                    value = {userInput.timeZone}
                                />
                            </div>

                        </div>
                        

                        <div className="card">  
                            <div className="header">Time Interval</div>
                            <div className="body">
                                <ToggleButtonGroup name="timeInterval" type="radio" value={userInput.timeInterval}
                                    onChange={event => setUserInput({"timeInterval":event})} >
                                    <ToggleButton value={15}>15 mins</ToggleButton>
                                    <ToggleButton value={30}>30 mins</ToggleButton>
                                    <ToggleButton value={60}>60 mins</ToggleButton>
                                </ToggleButtonGroup>
                            </div>

                        </div>
                        

                        <div className="card">
                            <div className="header">Time Range</div>
                            <div className="body">
                                <TimeSelect interval={userInput.timeInterval}
                                    onTimeChange={handleTimeChange}
                                />
                            </div>

                        </div>
                        

                        <Button className="create-button" variant="primary" type="submit" >Create</Button>

                    </Col>

                </Row>
                
            </Form>
        </div> 
    )
}