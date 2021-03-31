import TableDragSelect from 'react-table-drag-select';
import React from 'react';
import {Form, Button} from 'react-bootstrap';


import '../DragTable.scss';

class DragSelect extends React.Component {
    state = {
      username: "",
      loggedin: false,
      cells: Array.from({length: this.props.table.length}, 
        e => Array.from({length:8}, e => false )),
    };

    renderTableData() {
      const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const daysSelected = this.props.daysOfWeek;
      const toDisable = new Set();

      return this.props.table.map((week, index) => {
        if (index === 0){
          return <tr key={index}>
                    <td disabled={true}> </td>
                    {week.slice(1).map((day, index)=>{
                      let dayofweek = days[new Date(day.date).getDay()]
                      if (!daysSelected[dayofweek]) { toDisable.add(index+1); }
                      return <td disabled={true} key={index}> {dayofweek} </td>
                    })}
                  </tr>
        } else {
          return <tr key={index}>
                  {week.map((day, index)=>{
                    if (index === 0){
                      return <td disabled={true}>{day.time}</td>
                    }else{
                      return <td  key={index} disabled={toDisable.has(index) ? true : false}>{index}</td>
                    }
                  })}
                </tr>
        }
      })
    }
  
    render(){
      if (this.state.loggedin){
        return(
          <div> 
             <TableDragSelect value={this.state.cells} onChange={this.handleChange}>
             {this.renderTableData()}
    
             </TableDragSelect>
            
            <button onClick={this.handleClick}>Reset</button>

          </div>

        )
      } else {
        return (
          <div>
            <Form onSubmit={this.handleUserSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Sign in or continue as guest</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={this.state.username} onChange={this.handleUserChange} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit"> Submit </Button>
            </Form>

          </div>
        )
      } 

    }
  
    handleChange = cells => {
      // console.log(cells);
      this.setState({ cells });

      let coords = [];
      for (let row = 1; row < cells.length ; row++){
        for (let col = 1; col < 8 ; col++){
          if (cells[row][col]) coords.push([row, col]);
        }
      }

      this.props.onTableEdit(coords, this.state.username, cells);
    }
  
    handleClick = () => {
      const cells = Array.from({length: this.props.table.length}, 
        e => Array.from({length:8}, e => false ));

      this.setState({ cells });
    };

    handleUserChange = (event) => {
      this.setState({ username : event.target.value});
    }

    handleUserSubmit = () => {
      this.setState({ loggedin : true});
    }
  }

  export default DragSelect;