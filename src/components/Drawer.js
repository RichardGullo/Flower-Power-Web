import Color from '../constants/colors';
import styles from '../styles/drawer.module.css';
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function Drawer(props){

    const drawerVisibility = props.visible ? {display:'block'} : {display:'none'};
    const[cookies, setCookie, removeCookie] = useCookies([]);
    const location = useLocation();
    const navigate = useNavigate();


    function logout(){
        removeCookie('token',{path:'/'});
        removeCookie('user',{path:'/'});
        navigate("/");
    }

return(
    <div className={styles.drawerContainer} style={drawerVisibility}>
    <p>Account Settings</p>
    <p>Username: {cookies['user'] && cookies['user'].username}</p>
    <p className={styles.hyperlink} style={{cursor:'pointer', "&:hover":{color:'red'}}} onClick={()=>{
        logout();
    }}>Logout</p>
    <CloseIcon className={styles.hyperlink} onClick={props.onClose} style={{position:'absolute', top:5, right:'5px', cursor:'pointer', fontSize:'30px'}}/>
</div>

);

}


export default Drawer;