import { Nav } from 'react-bootstrap';
import './App.scss';
import { NavBar } from "./Components/NavBar"
import BackGround from "./Photos/background.jpg"
import {Navbar} from "react-bootstrap"

function App(){
  return(
    <div className="App" style={{backgroundImage: `url(${BackGround})`}} >
      <NavBar/>
      {/* <Navbar style={{height:18}} fixed="bottom" expand="lg" variant="light" bg="light" >
        
        <Nav className="ml-auto"><Nav.Link style={{fontSize:15}} >Developed by Derrick Lam - B.S. Computer Science - Stony Brook University Class of 2021</Nav.Link></Nav>
      </Navbar> */}
    </div>
  )
}

export default App;
