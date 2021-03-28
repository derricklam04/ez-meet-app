import {BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Form, FormControl, Button, Row, Col} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';

export default function Home() {
    const [code, setCode] = useState("");
    // const [planFound, setPlan] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();

        axios.get(`http://localhost:5000/plans/${code}`)
            .then(res => {
                console.log(res.data);
                window.location=`/plans/${code}`;
                // setPlan(res.data);
                
            })
            .catch( err => console.log(err));
         
    }
    const handleChange = (event) => {
        setCode(event.target.value);
    }

    // if (planFound !== null){
    //     return(
    //         < Redirect to={{pathname:`/plans/${code}`, state: {plan: planFound}}} />
    //     );
    // }
    // else{
        return (
            <div className="Home">
                <h1>Home</h1>
                <Row>
                    <Col>
                    <Link to="/create">Create new</Link>
                    </Col>
                    <Col>
                    <Form onSubmit={handleSearch}>
                        <Form.Control type="text" placeholder="Search" value={code} onChange={handleChange}/>
                        <Button type="submit" variant="outline-success">Search</Button>
                    </Form>
                    </Col>
                </Row>

                
                
            </div>
        );
    
};