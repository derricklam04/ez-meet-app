import TableDragSelect from 'react-table-drag-select';
import React from 'react';

import '../ViewTable.scss';

class ViewTable extends React.Component {
    state = {
      cells: Array.from({length: this.props.table.length}, 
        e => Array.from({length:8}, e => false )),
      
    };
    

    getUsers(row,col){
        const tables = this.props.table;
        let user = Object.keys(tables[row][col])
            .filter( function(k){ 
                return tables[row][col][k];
            })

        return user;
    }


    renderTableData() {
      const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const daysSelected = this.props.daysOfWeek;
      const toDisable = new Set();

      return this.props.table.map((week, weekIndex) => {
        if (weekIndex === 0){
          return <tr  key={weekIndex}>
                    <td style={{height: "0.1rem"}} disabled={true}> </td>
                    {week.slice(1).map((day, dayIndex)=>{
                      let dayofweek = days[new Date(day.date).getDay()]
                      if (!daysSelected[dayofweek]) { toDisable.add(dayIndex+1); }
                      return <td style={{height: "0.1rem"}} disabled={true} key={dayIndex}>{dayofweek}</td>
                    })}
                  </tr>
        } else {
          return <tr key={weekIndex}>
                  {week.map((day, dayIndex)=>{
                    var users = this.getUsers(weekIndex,dayIndex)
                    if (dayIndex === 0){
                      return <td key={dayIndex} disabled={true}>{day.time}</td>
                    }else{
                      return <td key={this.props.scale[users.length]} disabled={true}
                       style={{backgroundColor: this.props.scale[users.length]}}></td>
                    }
                  })}
                </tr>
        }
      })
    }
  
    render(){
        return(
          <div> 
             <TableDragSelect className="ViewTable" value={this.state.cells} onChange={this.handleChange}>
             {this.renderTableData()}
    
             </TableDragSelect>
            
            <button onClick={this.handleClick}>Reset</button>
          </div>
        )
    }
    
  
    handleChange = cells => {
      console.log(cells);
      this.setState({ cells });
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

  export default ViewTable;