import styles from '../styles/home.module.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Api from '../constants/api';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Color from '../constants/colors';

function PlantReminderCard(props) {
    const { data } = props;
    const navigate = useNavigate();

    const checkboxRef = useRef();


    function doOnChange(){
        props.onLaunch(checkboxRef, data);
    }


    return (
        <div className={styles.plantReminderContainer}>
            <img src={`${Api.path}/plant-images/${data.image}`} style={{ height: '150px', width: '150px', objectFit: 'contain' , minWidth:'150px'}} />
            <div style={{ border: '1px solid black', width: '100%', padding: '0px 8px' }}>
                <p><span className={styles.hyperlink}>Nickname</span>: {data.nickname}</p>
                <p><span className={styles.hyperlink}>Species:</span> {data.species} </p>
                <p><span className={styles.hyperlink}>Reminder:</span> Water in {data.water} days</p>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                        <input type="checkbox" ref={checkboxRef} className={styles.checkbox} onChange={doOnChange}/>
                        <label>I completed this task</label>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <ArrowRightAltIcon style={{verticalAlign:'middle'}} />
                        <Link style={{ color: 'black', textDecoration:'none'}} to="/viewentry" state={{ data: data }}>View Entry</Link>
                    </div>

                </div>

            </div>
        </div>

    );



}

export default PlantReminderCard;