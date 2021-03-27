import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateGrid from '../Pages/CreateGrid.component';

export function NavBar(){
    return(
        <div className="Navbar">
            <Router>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">EZ Meet</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Link exact to="/">Home</Link>
                        <Link to="/create">Create New</Link>
                        <NavDropdown title="Login" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Sign Up</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Login</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Guest</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route path="/create">
                        <CreateGrid></CreateGrid>
                    </Route>
                </Switch>
            </Router>
            
        </div>
    )
}