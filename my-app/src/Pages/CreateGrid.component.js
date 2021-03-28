import React, {useState, useEffect, useReducer} from 'react';
import { ToggleButton } from 'react-bootstrap';
import { Form, Row, Col, Button, ToggleButtonGroup } from 'react-bootstrap';

import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import TimeSelect from '../Components/TimeSelect';
import DaySelect from '../Components/DaySelect';

import axios from 'axios';

export default function CreateGrid() {
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state,  ...newState}),
        {
            // accessCode: '',
            calenderType: 7,
            timeZone: 'Eastern Time',
            daysOfWeek: {
                sun: false,
                mon: true,
                tues: true,
                weds: true,
                thur: true,
                fri: true,
                sat: false
            },
            timeInterval: 30,
            startTime: '09:00:00 AM',
            endTime: '05:00:00 PM',
        }
    )

    const handleChange = (event) => {
        console.log(event);
        const {name, value} = event.target;
        setUserInput({[name]:value})
    }

    const handleTypeChange = (event) => {
        // console.log(event);
        setUserInput({"calenderType":event});
    }
    const handleZoneChange = (event) => {
        // console.log(event);
        setUserInput({"timeZone":event});
    }
    const handleDaysChange = (days) => {
        // console.log(days);
        setUserInput({"daysOfWeek": days});
    }
    const handleIntervalChange = (event) =>{
        // console.log(event);
        setUserInput({"timeInterval":event});
    }
    const handleTimeChange = (selectedInterval) =>{
        
        let start = selectedInterval[0].toLocaleTimeString();
        let end = selectedInterval[1].toLocaleTimeString();

        // console.log(start,end);

        setUserInput({"startTime":start});
        setUserInput({"endTime":end});
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(userInput);

        axios.post('http://localhost:5000/plans/add', userInput)
            .then(res => {
                console.log(res.data)
                window.location=`/plans/${res.data}`
            })
            .catch(err => console.log(err));
    }

    
    return (
        <div>
            <h1>Create Grid</h1>
            <Form onSubmit={handleSubmit}>
                
                <Form.Control size="lg" placeholder="Enter Event Title"/>
                
                <Row>
                    <Col>
                        <Form.Label>Calender Type:</Form.Label>
                        <ToggleButtonGroup name="calenderType" type="radio" value={userInput.calenderType} onChange={handleTypeChange} >
                            <ToggleButton value={7}>Weekly</ToggleButton>
                            <ToggleButton value={30}>Monthly</ToggleButton>
                            {/* <ToggleButton value={}>Custom</ToggleButton> */}
                        </ToggleButtonGroup>
                    </Col>
                    <Col>
                    <Form.Label>Time Zone:</Form.Label>
                        <TimezonePicker
                        name = "timeZone"
                        absolute      = {true}
                        defaultValue  = "Eastern Time"
                        placeholder   = "Select timezone..."
                        onChange = {handleZoneChange}
                        value = {userInput.timeZone}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Label>Select Days of week:</Form.Label>
                    <DaySelect onDaysChange={handleDaysChange}></DaySelect>
                    </Col>

                    <Col>
                    <Form.Label>Select Time Intervals:</Form.Label>
                        <ToggleButtonGroup name="timeInterval" type="radio" value={userInput.timeInterval} onChange={handleIntervalChange} >
                            <ToggleButton value={15}>15 mins</ToggleButton>
                            <ToggleButton value={30}>30 mins</ToggleButton>
                            <ToggleButton value={60}>1 hr</ToggleButton>
                        </ToggleButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <Form.Label>Select Time Range:</Form.Label>
                        <TimeSelect onTimeChange={handleTimeChange}/>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" >Create</Button>
            </Form>
        </div> 
    )
}