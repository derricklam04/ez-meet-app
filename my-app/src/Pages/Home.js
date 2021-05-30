import {BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';


export default function Home() {
    


    return (
        <div className="Home">
            <div className="subtitle">
                Easily find the best date and time with..
            </div>
            <div className="title">
                EZ Meet    
            </div> 
            
            
            <Link className="create-button" to="/create">Create New Event</Link>
            
        </div>
    );
    
};