import Color from '../constants/colors';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import styles from '../styles/nav.module.css';

function Navbar() {

    const [windowDimension, setWindowDimension] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight
    });

    const[openNav, setOpenNav] = useState(false);


    function detectSize() {
        setWindowDimension({ winWidth: window.innerWidth, winHeight: window.innerHeight });
    }

    function toggleNavbar(){
        setOpenNav(!openNav);
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        console.log(window.innerWidth);

        if(window.innerWidth > 690)
            setOpenNav(false);

        return () => {
            window.removeEventListener('resize', detectSize);
        }

    }, [windowDimension]);


    function createNav(){

        let navStyle = {};
        
        if(windowDimension.winWidth <= 690){
            navStyle.icon = {display:'block'};
            navStyle.navItems = {display:'none'}
        }
            
        else{
            navStyle.icon = {display:'none'};
            navStyle.navItems = {display:'flex'};
        }

        if(openNav){
           navStyle.navbar = {flexDirection:'column'};
           navStyle.navItems = {display:'flex', flexDirection:'column', paddingLeft:'10px', paddingTop:'5px'}
           navStyle.item = {paddingBottom:'10px'}
        }
           
        return navStyle;
    }

    const navStyle = createNav();

    return (
        <nav class="nav" style={{...navStyle.navbar}}>
            <Link to="/" class="logo"><FilterVintageIcon className="icon-logo" />Flower Power<FilterVintageIcon className="icon-logo" /></Link>
            <div className={styles.navItemsContainer}>
                <MenuSharpIcon className={styles.mobileIcon} style={{...navStyle.icon}} onClick={toggleNavbar}/>
                <div style= {{display:'flex', flexDirection:'row', ...navStyle.navItems}}>
                    <Link style={navStyle.item} to="/">Log in</Link>
                    <Link style={navStyle.item} to="/about">About</Link>
                    <Link style={navStyle.item} to="/register">Register</Link>
                </div>

            </div>
        </nav>

    );
}

export default Navbar;



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
