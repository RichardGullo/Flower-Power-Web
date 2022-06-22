import {Link} from "react-router-dom";
import Api from '../constants/api';
import React,{useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useCookies} from 'react-cookie';

function Login(props){
  
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[error,setError] = useState("");
  const[cookies, setCookie] = useCookies([]);

  const navigation = useNavigate();
  const location = useLocation();
  
  // Function used to do login
  async function doLogin(event) {
    event.preventDefault();
    setError("");
  
    let formData = new FormData();
    formData.append("username",username);
    formData.append("password",password);
  
    const response = await fetch(`${Api.path}/login.php`,{
      method:"POST",
      body:formData
    });
  
    const result = await response.json();

    if(result.error.length > 0)
      setError(result.error);
    else{
      console.log(result.data);
      setCookie('username',result.data[0].username, {path:'/'});
      setCookie('email', result.data[0].email, {path:'/'});
      props.toggleNav();
      navigation("/home");
    }
  }

  useEffect(()=>{
    props.toggleNav(location.pathname);
  },[]);
  

  return (
    <div className="columns-container">
      <div className="column-section">
        <div className="top-background-container"></div>
        <div className="column-content">
          <h1 style={{textAlign:'center'}}>Welcome to <br /> Flower Power!</h1>
          <h2>Sign in below or create an account to <br /> get started tracking your graden today!</h2>
          {error.length > 0 && <p style={{color:'red', paddingBottom:'5px'}}>{error}</p>}
          <form>
            <input class="textInput" type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} /> <br />
            <input class="textInput" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          
            <button class="action-button" onClick={doLogin}>LOG IN</button>
          </form>
          <div style={{textAlign:'center'}}>
            <p>Don't have an account? <Link class="hyperlink" to="/register">Sign up here.</Link></p>
            <Link class="hyperlink" style={{fontSize:'24px',textAlign:'center'}} to="/forgotpassword">Forgot your password?</Link>
          </div>
          <div>
            <p>By continuing, you're accepting our <br /> <Link to="/terms" class="hyperlink">Terms of service</Link> and <Link to="/privacy" class="hyperlink">Privacy policy</Link></p>
          </div>

        </div>
        <div class="bottom-background-container"></div>
      </div>
      
    </div>

  );
}

export default Login;
