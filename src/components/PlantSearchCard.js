import styles from '../styles/home.module.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Api from '../constants/api';
import RoundButton from './buttons/RoundButton';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function PlantSearchCard(props) {

    const { data} = props;
    const checkboxRef = useRef();
    const navigate = useNavigate();

    function doOnchange(){
        props.onLaunch(checkboxRef, data);
    }

    return (
        <div className={styles.plantReminderContainer}>
            <img src={`${Api.path}/plant-images/${data.image}`} style={{ height: '150px', width: '150px', objectFit: 'contain',alignSelf:'center', minWidth:'150px' }} />
            <div style={{ border: '1px solid black', width: '100%', padding: '0px 8px' }}>
                <p><span className={styles.hyperlink}>Nickname</span>: {data.nickname}</p>
                <p><span className={styles.hyperlink}>Species:</span> {data.species}</p>
                <p><span className={styles.hyperlink}>Reminder:</span> Water in {data.water} days</p>
                <div>
                        <p><span className={styles.hyperlink}>Plant Classification:</span></p>

                        <div style={{ flexWrap: 'wrap', flexDirection: 'row', display: 'flex' }}>
                            {data.classification.map((element) => {
                                return <RoundButton data={{ selected: false, name: element.name }} clickable={false} />
                            })}
                        </div>
                    </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', marginBottom:'10px' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                        <input type="checkbox" className={styles.checkbox} onChange={doOnchange} ref={checkboxRef}/>
                        <label>Delete Entry</label>
                    </div>

                    <div onClick={()=>navigate('/viewentry', {state:{data:data}})} style={{ display: 'flex', flexDirection: 'row', cursor:'pointer' }}>
                        <ArrowRightAltIcon />
                        <p>View Entry</p>
                    </div>

                </div>

            </div>
        </div>

    );



}

export default PlantSearchCard;