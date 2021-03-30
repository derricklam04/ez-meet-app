import TableDragSelect from 'react-table-drag-select';
import React from 'react';

import '../DragTable.scss';

class DragSelect extends React.Component {
    state = {
      cells: Array.from({length: this.props.table.length}, 
        e => Array.from({length:8}, e => false )),
    };



    renderTableData() {
      const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const daysSelected = this.props.daysOfWeek;
      const toDisable = new Set();

      return this.props.table.map((week, index) => {
        if (index === 0){
          return <tr>
                    <td disabled={true}> </td>
                    {week.slice(1).map((day, index)=>{
                      let dayofweek = days[new Date(day.date).getDay()]
                      if (!daysSelected[dayofweek]) { toDisable.add(index+1); }
                      return <td disabled={true}> {dayofweek} </td>
                    })}
                  </tr>
        } else {
          return <tr>
                  {week.map((day, index)=>{
                    if (index === 0){
                      return <td disabled={true}>{day.time}</td>
                    }else{
                      return <td disabled={toDisable.has(index) ? true : false}>{index}</td>
                    }
                  })}
                </tr>
        }
      })
    }
  
    render(){
      return(
      <div> 
         <TableDragSelect value={this.state.cells} onChange={this.handleChange}>
         {this.renderTableData()}

         </TableDragSelect>
        
        <button onClick={this.handleClick}>Reset</button>
      </div>
    )}
  
    handleChange = cells => this.setState({ cells });
  
    handleClick = () => {
      const cells = Array.from({length: this.props.table.length}, 
        e => Array.from({length:8}, e => false ));

      this.setState({ cells });
    };
  }

  export default DragSelect;