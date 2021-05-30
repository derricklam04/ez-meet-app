import './App.scss';
import { NavBar } from "./Components/NavBar";
import BackGround from "./Photos/background.jpg";


function App(){

  var background = {
    backgroundImage: `url(${BackGround})`
  };
  

  return(
    <div className="App" style={background} >
      <NavBar/>
      {/* <Navbar style={{height:18}} fixed="bottom" expand="lg" variant="light" bg="light" >
        
        <Nav className="ml-auto"><Nav.Link style={{fontSize:15}} >Developed by Derrick Lam - B.S. Computer Science - Stony Brook University Class of 2021</Nav.Link></Nav>
      </Navbar> */}
    </div>
  )
}

export default App;
