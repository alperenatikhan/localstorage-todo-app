const AddTodoPanel = ({isDarkTheme, formContent, handleAdd, synching, formError, connectionError}) => {
    return (
        <div className={isDarkTheme ? 'Addtodo-panel -dark' :'Addtodo-panel'}>
        <p className= 'Addtodo-header'> Add Todo</p>
        <div>
        <input ref={formContent}/> 
        <button onClick={handleAdd} disabled={synching} style={synching?{visibility:'hidden'}: null}> Send </button>
        </div>
        {formError ? <p> Please write more than 3 characters</p> : 
        
        synching? <p> Sending Data to Server </p>:
        
        connectionError ? <p style={{color: 'orangered'}}> Can not send to server</p> : null}
                </div>
    )
}

export default AddTodoPanel
