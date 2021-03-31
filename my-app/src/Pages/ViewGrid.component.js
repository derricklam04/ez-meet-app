import {useLocation, Link} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';

import DragSelect from '../Components/DragSelect';
import ViewTable from '../Components/ViewTable';

export default function ViewGrid() {
    const [plan, setPlan] = useState(null);
    const [cells, setCells] = useState(null);

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


    const handleTableEdit = (coords , username, cells) => {
        // console.log(row,col,username);
        var tempPlan = plan;
        // coords.forEach(coord => {
        //     tempPlan.table[coord[0]][coord[1]]['users'] = username;
        // })
        // setPlan(tempPlan);

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
        setCells(cells);
    }
    
    
    if (plan === null){
        return(
            <h2>Error: {id} not found</h2>
        )
    }else{
        return (
            <div className="viewPlan">
                <h1>View Plan</h1>
                <div>{plan._id}</div>      
                <Row>
                    <Col>
                    <DragSelect daysOfWeek={plan.daysOfWeek} table={plan.table} 
                        onTableEdit={handleTableEdit} className="DragTable" />

                    </Col>
                    <Col>
                    {/* <DragSelect className="DragTable" /> */}
                    <ViewTable daysOfWeek={plan.daysOfWeek} table={plan.table}
                         className="ViewTable" />
                    </Col>
                </Row>
             </div> 
            
        )
    }
}