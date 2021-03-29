import {useLocation, Link} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';

import DragSelect from '../Components/DragSelect';

export default function ViewGrid() {
    const [plan, setPlan] = useState(null);
    const [address,setAddress] = useState(useLocation());
    const [id, setId] = useState(address.pathname.substring(address.pathname.lastIndexOf('/')+1));


    useEffect(()=>{
        console.log(id);
        axios.get(`http://localhost:5000/plans/${id}`)
            .then(res => {
                setPlan(res.data);
                console.log(res.data);
            })
            .catch( err => console.log(err));
    }, []);
    
    
    if (plan === null){
        return(
            <h2>Error: {id} not found</h2>
        )
    }else{
        return (
            <div className="viewPlan">
                <h1>View Plan</h1>
                <div>{plan._id}</div>      
                <DragSelect className="DragTable" />
             </div> 
            
        )
    }
}