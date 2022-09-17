import React, {useEffect,useState,useRef } from 'react';
import loginImage from './undraw_unlock_re_a558.svg';
import './scss/styles.scss';
import axios from 'axios';
import TodoItem from './components/TodoItem';
import Navbar from './components/Navbar'
import UsernameEntry from './components/UsernameEntry';
import AddTodoPanel from './components/AddTodoPanel';
import TodoCounterHeader from './components/TodoCounterHeader';
import Footer from './components/Footer';

function App() {
   
const [username,setUsername] = useState(localStorage.getItem('username')?.length? localStorage.getItem('username') :'')
const [loading,setLoading]= useState(true)  
const [data,setData]= useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [])
const [formError, setFormError]= useState(false)
const [connectionError,setConnectionError]= useState(false)
const [synching,setSynching] = useState(false)
const [isDarkTheme,setIsDarkTheme] = useState(localStorage.getItem('darkThemePreference')==="true"? true:localStorage.getItem('darkThemePreference')==="false"? false :false)
const [usernameError,setUsernameError] = useState(false)
const formContent = useRef()
const usernameInput = useRef()
/*
Due to security reasons I am not providing the apiURL, please replace the value accordingly.
*/
const apiURL= process.env.REACT_APP_API_URL
let dataStringified = JSON.stringify(data)






const [completedCount, setCompletedCount] = useState(0)

let handleConnectionError=()=>{
  setLoading(false)
  setConnectionError(true)
}

useEffect(

()=>{

 

  axios.get(apiURL)
  .then(response => response.data)
  .then(json => setData(json.sort((a, b) => b.id - a.id)))
  .then(() => setLoading(false))
  .catch(()=>  handleConnectionError())
  


}, [apiURL]

)


useEffect(

()=>{

setCompletedCount((data?.filter(item=> item.isCompleted===true)).length)

}

,[dataStringified,data]


)

let handleThemeChange=(themeParam)=>{

  setIsDarkTheme(!isDarkTheme);
  localStorage.setItem('darkThemePreference', (!isDarkTheme).toString())



}

let handleUsername=(name)=>{

  if (name?.length> 0){
  localStorage.setItem('username', name.toString())
  setUsername(localStorage.getItem('username'))
}else{
setUsernameError(true)

}

}
 
let handleSynchFail=()=>{

  setSynching(false);
  setConnectionError(true);
  
    }

let handleAdd= async(e) => {
  setFormError(false)
  e.preventDefault();

if ((formContent.current.value)?.length > 3 && !(connectionError)){
  let addedData = {isCompleted:false, content: formContent.current.value}
  setSynching(true);
  //localStorage.setItem( 'todos',JSON.stringify([addedData, ...data].sort((a,b)=> b.time-a.time)) )
   await axios.post(apiURL, addedData).then(response=> response.data).then((response) => setData([response, ...data ].sort((a,b)=> b.id-a.id))).then(()=>setSynching(false)).catch(()=> handleSynchFail());
  }else if(!((formContent.current.value)?.length > 3)) {
    setFormError(true)
  }



}
  
  return (
    <>

             
<div className={isDarkTheme? 'Dark-theme': 'Light-theme'}>
        <button onClick={()=> handleThemeChange(isDarkTheme)}> Dark/Light Theme</button>    
             
                

   <Navbar isDarkTheme={isDarkTheme} username={username}/>

  {

      (!localStorage.getItem('username')?.length)?
      
      (<UsernameEntry handleUsername={handleUsername} usernameInput={usernameInput} loginImage={loginImage} usernameError={usernameError} />)
      :loading ? <div className="Loading-screen"> <p> Loading </p> </div>
      :connectionError?<div className="Loading-screen"> <p style={{color:'orangered'}}> Error: Check your connection and refresh the page </p> <code style={{color:'salmon'}}> Or : Edit the "const apiURL" in "src/App.js" </code></div>
      :localStorage.getItem('username')?.length && (<>

     <AddTodoPanel isDarkTheme={isDarkTheme} formContent={formContent} handleAdd={handleAdd} synching={synching} formError={formError} connectionError={connectionError}/>
    
    <div className={isDarkTheme?'Todo-list -dark' :'Todo-list'}> 

     <TodoCounterHeader completedCount={completedCount} dataLength={data?.length}/>


    {
      data.map(item => <TodoItem key={item.id} item={item} apiURL={apiURL} setData={setData} data={data} synching= {synching} setSynching={setSynching} handleSynchFail={handleSynchFail} />)
    }
    
    </div>
    </>)
}

<Footer/>

</div>


    </>
  );
}

export default App;
