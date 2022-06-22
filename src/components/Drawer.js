import Color from '../constants/colors';
import styles from '../styles/drawer.module.css';
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

function Drawer(props){

    const drawerVisibility = props.visible ? {display:'block'} : {display:'none'};

return(
    <div className={styles.drawerContainer} style={drawerVisibility}>
    <p>Account Settings</p>
    <p>Username: {props.name}</p>
    <p className={styles.hyperlink} style={{cursor:'pointer', "&:hover":{color:'red'}}} onClick={()=>{
        props.onLogout();
    }}>Logout</p>
    <CloseIcon className={styles.hyperlink} onClick={props.onClose} style={{position:'absolute', top:5, right:'5px', cursor:'pointer', fontSize:'30px'}}/>
</div>

);

}


export default Drawer;