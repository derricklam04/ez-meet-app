import {useLocation, Link} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';

import DragSelect from '../Components/DragSelect';
import ViewTable from '../Components/ViewTable';

export default function ViewGrid() {
    const [plan, setPlan] = useState(null);
    const [gradient, setGradient] = useState(['#ffffff','#e7f0f1','#d0e1e3','#b8d3d5','#a1c4c7', '#89b6ba',
        '#71a8ad','#579aa0','#3a8c93','#0d7e86']);
    const [useScale, setUseScale] = useState([]);
 
    const [address,setAddress] = useState(useLocation());
    const [id, setId] = useState(address.pathname.substring(address.pathname.lastIndexOf('/')+1));

    const [error,setError] = useState(false);

    useEffect(()=>{
        console.log(id);
        axios.get(`http://localhost:5000/plans/${id}`)
            .then(res => {    
                setPlan(res.data);
                getScale(Object.keys(res.data.table[1][1]).length);
                console.log(res.data);
            })
            .catch( err => {
                console.log(err);
                setError(true);
            });
    }, []);

    const getScale = (num) =>{
        let intervals = 10 / (num+1); 
        let scale = new Array();
        
        for (let i = 0 ; i < num+1; i ++ ){
            scale.push(gradient[Math.round(i * intervals)]);
        }
        setUseScale(scale);
    }

    const handleTableEdit = (username, cells) => {
        var tempPlan = plan;
        for (let row = 1; row < cells.length; row ++){
            for (let col = 1; col < 8 ; col ++){
                if (cells[row][col]){
                    tempPlan.table[row][col][username] = true
                }else{
                    tempPlan.table[row][col][username] = false
                }
            }
        }
        setPlan(tempPlan);
        getScale(Object.keys(tempPlan.table[1][1]).length);

        axios.post(`http://localhost:5000/plans/update/${id}`, tempPlan.table)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err));
        
    }
    
    if (error){
        return <h2>Error: {id} not found</h2>
    } else if (plan === null){
        return(
            <h2>Loading</h2>
        )
    }else{
        return (
            <div className="view-page">
                <div className="title">{plan.title}</div>
                <div className="timezone"><i>({plan.timeZone})</i></div>     

                <div className="share">Access Code: {plan._id}</div> 
                <Row>
                    <Col>
                    <DragSelect daysOfWeek={plan.daysOfWeek} table={plan.table} onTableEdit={handleTableEdit} />
                    </Col>
                    <Col>
                    <ViewTable scale={useScale} daysOfWeek={plan.daysOfWeek} table={plan.table} />
                    </Col>
                </Row>
             </div> 
            
        )
    }
}