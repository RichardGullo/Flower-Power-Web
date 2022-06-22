import React, { useState, useEffect } from 'react';
import styles from '../styles/viewEntry.module.css';
import RoundButton from '../components/buttons/RoundButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Api from '../constants/api';

function ViewEntry(props) {

    const [cookies, setCookie] = useCookies([]);
    const location = useLocation();
    const { data } = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies['username'] == undefined)
            navigate("/");

        props.toggleNav(location.pathname);
    }, []);

    return (
        <div className={styles.columnsContainer}>


            <div className={styles.columnSection}>

                <div className={styles.leftColumn}>

                    <div className={styles.imageContainer}>
                        <img src={`${Api.path}/plant-images/${data.image}`} style={{ height: 300, objectFit: 'contain' }} />
                    </div>

                </div>
            </div>
            <div className={styles.columnSection}>
                <div className={styles.middleColumn}>

                    <p><span class="hyperlink">Plant Nickname:</span> {data.nickname} </p>

                    <p><span class="hyperlink">Plant Species:</span> {data.species} </p>

                    <p><span class="hyperlink">Date Acquired:</span> {data.date_acquired} </p>

                    <p class="hyperlink">Reminders:</p>
                    <p>This plant needs to be watered every {data.water} days.</p>

                </div>

            </div>

            <div className={styles.columnSection}>
                <div className={styles.rightColumn}>

                    <h2>Plant Classification</h2>

                    <div style={{ flexWrap: 'wrap', flexDirection: 'row', display: 'flex' }}>
                        {data.classification.map((element) => {
                            return <RoundButton data={{ selected: false, name: element.name }} clickable={false} />
                        })}
                    </div>

                    <h2>Additional Notes</h2>
                    <textarea className={styles.textarea} placeholder="Write any additional notes you'd like to keep about your plant here." cols="50" rows="5" value={data.notes} readOnly />


                    <div className={styles.actionButtonSet}>
                        <button className={styles.button} onClick={()=>{
                            navigate('/modifyentry', {state:{data:data}});
                        }}>Modify Entry</button>
                        <button onClick={()=>{navigate(-1)}} className={styles.button}>Go Back</button>
                    </div>

                </div>
            </div>
        </div>

    );


}





export default ViewEntry;








// import React, { useState, useEffect } from 'react';
// import {AppContext} from '../context/app-context';
// import {useCookies} from 'react-cookie';


// function Home(){

//   const{plantArray} = React.useContext(AppContext);
//   const [plants, setPlants] = plantArray;

//   const[cookies, setCookie] = useCookies([]);

//     return(
//       <p>{cookies['username']}</p>
//     );


// }

// export default Home;