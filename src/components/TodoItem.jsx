import React, {useState ,useRef} from 'react'
import '../scss/styles.scss';
import axios from 'axios'


function TodoItem({item,apiURL,data,setData, synching, setSynching, handleSynchFail }) {



const [displayEditMenu,setDisplayEditMenu]= useState(false)
const [pending,setPending] = useState(false)
const [serverError,setServerError] = useState(false)
const [threeCharError, setThreeCharError]= useState(false)


const editedContent = useRef()

let handleServerError=() => {
console.log('i am triggered')
setPending(false);
setServerError(true);
}

let handleComplete=async(id)=>{
    setServerError(false)
    let chosenId= data?.filter(item => item.id === id)
    let unchangedData= data?.filter(item => item.id !== id)
    let currentStatus = chosenId[0].isCompleted
   
   // setData([{...chosenId[0] ,isCompleted: !currentStatus}, ...unchangedData].sort((a, b) => b.time - a.time))
   //localStorage.setItem( "todos" ,  JSON.stringify([{...chosenId[0] ,isCompleted: !currentStatus},...unchangedData].sort((a, b) => b.time - a.time)) )
   
   setSynching(true)
   setPending(true)


   await axios.put(`${apiURL}/${id}`, {...chosenId[0] ,isCompleted: !currentStatus})
   .then(()=> setData([{...chosenId[0] ,isCompleted: !currentStatus}, ...unchangedData].sort((a, b) => b.id - a.id) ))
   .then(() => setPending(false))
   .catch(()=> handleServerError())


   setSynching(false)
   
   }
   
   let handleEdit= async(id) => {

    setServerError(false)
    let unchangedData= data?.filter(item => item.id !== id)
   
    setSynching(true)
    setPending(true)

   let editedTodoContent = editedContent.current.value

   if (editedTodoContent?.length>3){
       
await axios.put(`${apiURL}/${id}`, { ...item, content:editedTodoContent}).then((response) => setData([...unchangedData, response.data ].sort((a,b)=> b.id-a.id))).then(()=> setPending(false)).then(()=> setSynching(false)).then(()=>setDisplayEditMenu(false)).catch(()=>handleServerError())

   }else{
    setThreeCharError(true)
   }
   
   }
   
   let handleDelete = async(id) =>{
    setServerError(false)
     let unchangedData= data.filter(item => item.id !== id)
   
   //localStorage.setItem( "todos" , JSON.stringify([...unchangedData].sort((a, b) => b.time - a.time)) )
   
   setSynching(true)
   setPending(true)
   
   await axios.delete(`${apiURL}/${id}`)
   .then(()=>setData([...unchangedData].sort((a, b) => b.id - a.id)))
   .then(()=> setPending(false))
   .catch(()=> handleServerError())
   setSynching(false)
   
   }


    return (
        <div className= 'Todo-item'>

        {
        
        !displayEditMenu ?
        ( <>
        <p style={item.isCompleted ? {textDecoration:'line-through',color:'grey',fontSize:'16px'}:{fontWeight: '600', fontSize:'16px'}}> {item.content} </p>
        

         {pending ?  <p className='Info-message'> Processing the Data </p>:
         serverError? <p className='Error-message'>Failed to Update</p>:null
         
         }

        <div className= "Button-group">
        <button className="Complete-button" onClick={() => handleComplete(item.id)}> Complete </button>
        <button className="Edit-button" onClick={()=> setDisplayEditMenu(true)}> Edit </button>
        <button className="Delete-button" onClick={() => handleDelete(item.id)}> Delete </button>
        
        
        </div> 
        </>
        ):
        (
          <>
        <input placeholder={item.content} ref={editedContent} /> 

                
        {
        threeCharError ?  <p className='Info-message'> Please write more than 3 characters </p>:
        pending ?  <p className='Info-message'> Processing the Data </p>:
        serverError? <p className='Error-message'>Failed to Update</p>:null
         
         }

<div className= "Button-group">
        <button className='Confirm-button' onClick={()=> handleEdit(item.id)}> Confirm</button>
        <button className='Cancel-button' onClick={()=> setDisplayEditMenu(false)}>Cancel</button>
        </div>

       
        
        </>
        )
        
        
        }     
        </div>
    )
}

export default TodoItem
