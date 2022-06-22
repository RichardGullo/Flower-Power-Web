import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function Account(props) {
    const[cookies, setCookie, removeCookie] = useCookies([]);
    const location = useLocation();
    const navigate = useNavigate();

    function logout(event){
        event.preventDefault();
        console.log("hello");
        removeCookie('username',{path:'/'});
        removeCookie('email',{path:'/'});
        navigate("/");
    }

    useEffect(()=>{
        if(cookies['username'] == undefined)
            navigate("/");

        props.toggleNav(location.pathname);
    },[]);

    return (
        <div>
            <p>Account page.</p>
            <Link onClick={logout}class="hyperlink" to="/login">Logout</Link>
        </div>

    );
}

export default Account;