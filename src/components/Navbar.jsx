import '../scss/styles.scss';

export default function Navbar({isDarkTheme, username} ){
    return (

        
           
            <div className= {isDarkTheme? "Navbar -dark" : "Navbar"}>

              
        
              <p className="Navbar-header"> Todo App </p>
             { username?.length>0 && <p> Welcome <span className = "Navbar-username"> {localStorage.getItem('username')}!</span> </p>}
             
            </div>
    )
}


