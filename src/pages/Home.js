import React, { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import PlantReminderCard from "../components/PlantReminderCard";
import Color from "../constants/colors";
import { AppContext } from "../context/app-context";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Api from "../constants/api";
import Modal from "../components/Modal";

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

    // console.log(result);
    let userId = cookies["user"]._id;
    let token = cookies["token"];

    let response = await fetch(`${Api.path}/api/v1/auth/${userId}/flowers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set the request headers
      },
    });
  
    let result = await response.json();
    console.log(result.data);
  
    if (result["success"] == false) {
      console.log("Could not fetch Flowers");
      return;
    }

    setPlants(result.data);



  }

  useEffect(() => {
    if (cookies["token"] == undefined) {
      navigate("/");
      return;
    }
    
    console.log(cookies["user"].username);

    props.toggleNav(location.pathname);
    populateData();
  }, []);

  function printPlants() {
    if (plants.length < 1) {
      return (
        <div className={styles.emptyPlantContainer}>
          <img src="./images/emptyPlant.png" style={{ border: "none" }} />
          <p>You currently have no entries.</p>
          <p>
            <Link to="/newentry" className={styles.hyperlink}>
              Click here
            </Link>{" "}
            to add a new plant.
          </p>
        </div>
      );
    } else {
      return plants.map((element) => {
        return (
          <img
            src={`${Api.path}/uploads/${element.photo}`}
            style={{
              objectFit: "contain",
              height: "150px",
              width: "150px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/viewentry", { state: { data: element } });
            }}
          />
        );
      });
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

  function confirmEntry() {
    let formData = new FormData();

    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + parseInt(selectedEntry.water));
    expireDate = `${expireDate.getFullYear()}-${
      expireDate.getMonth() + 1
    }-${expireDate.getDate()}`;

    formData.append("id", selectedEntry.id);
    formData.append("expireDate", expireDate);

    fetch(`${Api.path}/updateCompletedTask.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        console.log(res);
        populateData();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    
    
    
    <div className={styles.columnsContainer}>

      <Modal
        visible={visible}
        onLaunch={launchModal}
        onConfirm={confirmModal}
        onCancel={cancelModal}
        actionButton="Confirm"
        message="Confirm the following entry?"
      />
      
      <div className={styles.columnSection}>
        <div className={styles.leftColumn}>
          <div className={styles.plantContainer}>
            <div className={styles.greetingContainer}>
              <div style={{ paddingRight: "10px" }}>
                <h2 style={{ color: Color.altDarkBrown, fontWeight: "bold" }}>
                  Good afternoon,
                  <br />
                  {cookies["user"] && cookies["user"].username}
                </h2>
                <p style={{ fontSize: "30px" }}>
                  Ready for another day of gardening?
                  <br /> Let Flower Power lend you a hand!
                </p>
              </div>

              <img
                src="./images/flower-pot.png"
                style={{ objectFit: "contain", height: 150 }}
              />
            </div>

            <div className={styles.homePlantContainer}>{printPlants()}</div>
          </div>
        </div>
      </div>
      <div className={styles.columnSection}>
        <div className={styles.rightColumn}>
          {plants.length > 0 && (
            <h2 style={{ marginBottom: "10px" }}>
              You have upcoming reminders for the following plants....
            </h2>
          )}

          {plants.map((element) => {
            return <PlantReminderCard onLaunch={launchModal} data={element} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
