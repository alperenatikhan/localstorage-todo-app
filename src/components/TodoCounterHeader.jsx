import React from 'react'
import '../scss/styles.scss'

const TodoCounterHeader = ({completedCount, dataLength }) => {
    return (
        <div className='Todo-counter-header'>
  <h4>Todo List</h4>
    <p className="Completed-count"> There {dataLength>1 ? 'are' : 'is'} {dataLength} task{dataLength>1 ? 's' : null} </p>
    <p className="Completed-count"> Pending : {dataLength-completedCount} task{dataLength-completedCount>1 ? 's' : null} </p>
    <p className="Completed-count"> Completed : {completedCount} task{completedCount>1 ? 's' : null} </p>
    

    </div>

    )
}

export default TodoCounterHeader
