import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateGrid from '../Pages/CreateGrid.component';
import ViewGrid from '../Pages/ViewGrid.component';
import Home from '../Pages/Home';

import {useState} from 'react';
import axios from 'axios';

export function NavBar(){
    const [code, setCode] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();

        axios.get(`http://localhost:5000/plans/${code}`)
            .then(res => {
                console.log(res.data);
                window.location=`/plans/${code}`;
            })
            .catch( err => console.log(err));
         
    }
    const handleChange = (event) => {
        setCode(event.target.value);
    }

    return(
        <div className="Navbar">
            <Router>
                <Navbar  expand="lg">
                    <Navbar.Brand><Link exact to="/">Home</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        
                            {/* <NavDropdown  title="Login" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Sign Up</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Login</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Guest</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        
                        <Nav>
                            <Form className="search-code" onSubmit={handleSearch}>
                                <Form.Control size="large" type="text" placeholder="Enter Access Code.." value={code} onChange={handleChange}/>
                                <Button type="submit">Search</Button>

                            </Form>

                        </Nav>
                        
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route path="/create">
                        <CreateGrid ></CreateGrid>
                    </Route>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <Route path="/plans/:id">
                        <ViewGrid></ViewGrid>
                    </Route>
                </Switch>
            </Router>
            
        </div>
    )
}