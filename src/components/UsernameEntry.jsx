import '../scss/styles.scss';


const UsernameEntry = ({handleUsername, usernameInput, loginImage, usernameError}) => {

    return (
        <div className='Username-entry'>
        <img alt='Please login by entering your username' src={loginImage} style={{width:'100px', height:'100px', marginBottom:'12px'}} />
      <p>Please enter your username </p> 
      <div><input ref={usernameInput}/> <button onClick={()=>handleUsername(usernameInput.current.value)}> Send </button> </div>
     
     {usernameError && <p > Blank username is not accepted</p>}
    
    
    </div> 
    )
}

export default UsernameEntry
