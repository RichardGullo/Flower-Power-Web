import Color from '../constants/colors';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import styles from '../styles/nav.module.css';
import Drawer from './Drawer';
import { useCookies } from 'react-cookie';
import {useNavigate, useLocation} from 'react-router-dom';

function LoggedInNavbar() {

    const [windowDimension, setWindowDimension] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight
    });

    const[cookies, setCookie, removeCookie] = useCookies([]);
    const location = useLocation();
    const navigate = useNavigate();

    const [openNav, setOpenNav] = useState(false);
    const [toggleDrawer, setToggleDrawer] = useState(false);


    function detectSize() {
        setWindowDimension({ winWidth: window.innerWidth, winHeight: window.innerHeight });
    }

    function toggleNavbar() {
        setOpenNav(!openNav);
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        console.log(window.innerWidth);

        if (window.innerWidth > 690)
            setOpenNav(false);

        return () => {
            window.removeEventListener('resize', detectSize);
        }

    }, [windowDimension]);


    function createNav() {

        let navStyle = {};

        if (windowDimension.winWidth <= 863) {
            navStyle.icon = { display: 'block' };
            navStyle.navItems = { display: 'none' }
        }

        else {
            navStyle.icon = { display: 'none' };
            navStyle.navItems = { display: 'flex' };
        }

        if (openNav) {
            navStyle.navbar = { paddingBottom: '50px', flexDirection: 'column' };
            navStyle.navItems = { display: 'flex', flexDirection: 'column', paddingLeft: '10px', paddingTop: '5px' }
            navStyle.item = { paddingBottom: '10px' }
        }

        return navStyle;
    }

    const navStyle = createNav();


    function closeDrawer(){
        setToggleDrawer(false);
    }

    function openDrawer(){
        setToggleDrawer(true);
    }

    function logout(){
        removeCookie('username',{path:'/'});
        removeCookie('email',{path:'/'});
        setToggleDrawer(false);
        navigate("/");
    }


    return (
        <nav class="nav" style={navStyle.navbar}>
            <Drawer visible ={toggleDrawer} onLogout={logout} onClose={closeDrawer} name={cookies['username']}/>
            <Link to="/home" class="logo"><FilterVintageIcon className="icon-logo" />Flower Power<FilterVintageIcon className="icon-logo" /></Link>
            <div className={styles.navItemsContainer}>
                <MenuSharpIcon className={styles.mobileIcon} style={{ ...navStyle.icon }} onClick={toggleNavbar} />
                <div style={{ display: 'flex', flexDirection: 'row', ...navStyle.navItems }}>
                    <Link style={navStyle.item} to="/home">Home</Link>
                    <Link style={navStyle.item} to="/newentry">New Entry</Link>
                    <Link style={navStyle.item} to="/search">Search</Link>
                    <Link style={navStyle.item} to="#" onClick={()=>openDrawer()}>Account</Link>
                </div>

            </div>
        </nav>

    );
}

export default LoggedInNavbar;



// import Color from '../constants/colors';

// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
// import FilterVintageIcon from '@mui/icons-material/FilterVintage';
// import {Link} from "react-router-dom";


// function Navbar() {
//     return (
//         <nav class="nav">
//             <Link to="/" class="logo"><FilterVintageIcon className="icon-logo" />Flower Power<FilterVintageIcon className="icon-logo" /></Link>
//             <div class="nav-items">
//             <Link class="nav-link" to="/">Log in</Link>
//                 <Link class="nav-link" to="/about">About</Link>
//                 <Link class="nav-link" to="/register">Register</Link>
//             </div>
//         </nav>

//     );
// }

// export default Navbar;
