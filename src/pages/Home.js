import React, { useState, useEffect } from 'react';
import styles from '../styles/home.module.css';
import PlantReminderCard from '../components/PlantReminderCard';
import Color from '../constants/colors';
import { AppContext } from '../context/app-context';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Api from '../constants/api';
import Modal from '../components/Modal';

function Home(props) {

  const [cookies, setCookie] = useCookies([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { plantsArray } = React.useContext(AppContext);
  const [plants, setPlants] = plantsArray;

  const [visible, setVisible] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);

  async function populateData() {
    setError("");

    let formData = new FormData();
    formData.append("username", cookies['username']);
    formData.append("email", cookies['email']);

    const response = await fetch(`${Api.path}/populate.php`, {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    let temp = [...result];

    for (let i = 0; i < temp.length; i++)
      temp[i].classification = JSON.parse(temp[i].classification);


    setPlants(temp);

    console.log(result);

  }

  useEffect(() => {
    if (cookies['username'] == undefined)
      navigate("/");

    props.toggleNav(location.pathname);
    populateData();
  }, []);


  function printPlants() {
    if (plants.length < 1) {
      return <div className={styles.emptyPlantContainer}>
        <img src='./images/emptyPlant.png' style={{ border: 'none' }} />
        <p>You currently have no entries.</p>
        <p><Link to="/newentry" className={styles.hyperlink}>Click here</Link> to add a new plant.</p>
      </div>;
    }
    else {
      return plants.map((element) => {
        return <img src={`${Api.path}/plant-images/${element.image}`} style={{ objectFit: 'contain', height: '150px', width: '150px', cursor: 'pointer' }} onClick={() => {
          navigate('/viewentry', { state: { data: element } })
        }} />
      })

    }
  }

  function launchModal(checkbox, obj) {

    setSelectedCheckbox(checkbox);
    setSelectedEntry(obj);
    setVisible(true);
  }

  function confirmModal() {
    setVisible(false);
    selectedCheckbox.current.checked = false;
    confirmEntry();

  }

  function cancelModal() {
    selectedCheckbox.current.checked = false;
    setVisible(false);
  }

  function confirmEntry(){
        let formData = new FormData();
               
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate()+parseInt(selectedEntry.water));
        expireDate = `${expireDate.getFullYear()}-${expireDate.getMonth()+1}-${expireDate.getDate()}`;

        formData.append('id', selectedEntry.id);
        formData.append('expireDate',expireDate);

        fetch(`${Api.path}/updateCompletedTask.php`,{
            method:"POST",
            body:formData
          }).then((res)=>{
              return res.text();
          }).then((res)=>{
              console.log(res);
              populateData();
          }).catch(err=>{
              console.log(err);
          });
  }

  return (
    <div className={styles.columnsContainer}>
      <Modal visible={visible} onLaunch={launchModal} onConfirm={confirmModal} onCancel={cancelModal} actionButton="Confirm" message="Confirm the following entry?"/>

      <div className={styles.columnSection}>

        <div className={styles.leftColumn}>

          <div className={styles.plantContainer}>

            <div className={styles.greetingContainer}>
              <div style={{ paddingRight: '10px' }}>
                <h2 style={{ color: Color.altDarkBrown, fontWeight: 'bold' }}>Good afternoon,<br />{cookies['username']}</h2>
                <p style={{ fontSize: '30px' }}>Ready for another day of gardening?<br /> Let Flower Power lend you a hand!</p>
              </div>

              <img src="./images/flower-pot.png" style={{ objectFit: 'contain', height: 150 }} />
            </div>

            <div className={styles.homePlantContainer}>
              {printPlants()}

            </div>
          </div>

        </div>
      </div>
      <div className={styles.columnSection}>
        <div className={styles.rightColumn}>

          {plants.length > 0 && <h2 style={{ marginBottom: '10px' }}>You have upcoming reminders for the following plants....</h2>}

          {plants.map((element) => {
            return <PlantReminderCard onLaunch={launchModal} data={element} />
          })}

        </div>
      </div>
    </div>

  );


}





export default Home;








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