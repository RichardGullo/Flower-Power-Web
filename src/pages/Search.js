import React, { useState, useEffect } from 'react';
import styles from '../styles/search.module.css';
import PlantSearchCard from '../components/PlantSearchCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BrownButton from '../components/buttons/BrownButton';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppContext } from '../context/app-context';
import Modal from '../components/Modal';
import Api from '../constants/api';

function Search(props) {

    const [cookies, setCookie] = useCookies([]);
    const location = useLocation();
    const navigate = useNavigate();

    const { plantsArray } = React.useContext(AppContext);
    const [plants, setPlants] = plantsArray;

    const [filteredPlants, setFilteredPlants] = useState([]);
    const [term, setTerm] = useState("");

    const [error, setError] = useState("");
    
    const [visible, setVisible] = useState(false);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [selectedEntry, setSelectedEntry] = useState(null);

    // Change buttons to sortingButtons
    const [buttons, setButtons] = useState([
        { id: 0, name: 'Nickname', selected: true },
        { id: 1, name: 'Species', selected: false },
        { id: 2, name: 'Classification', selected: false },
        { id: 3, name: 'Date', selected: false }
    ]);

    const [prevButton, setPrevButton] = useState(0);

    // Function used to toggle between sorting buttons
    function selectedButton(obj) {
        let tempButtons = [...buttons];
        tempButtons[prevButton].selected = false;
        tempButtons[obj.id].selected = true;

        setButtons(tempButtons);
        setPrevButton(obj.id);

        let sortTerm = obj.name.toLowerCase();

        sortPlants(sortTerm);
    }

    function sortPlants(searchType) {
        if (searchType == "Date")
            searchType = 'date_acquired';

        let tempArray = filteredPlants.length > 0 ? [...filteredPlants] : [...plants];

        tempArray = tempArray.sort((a, b) => {
            if (a[searchType] > b[searchType])
                return 1;
            else
                return -1;
        });

        if (filteredPlants.length > 0)
            setFilteredPlants(tempArray);
        else
            setPlants(tempArray);
    }

    function searchPlants() {
        let filteredArray = [];

        for (let plant of plants) {
            let nickname = plant.nickname.toLowerCase();

            if (nickname.includes(term.toLowerCase()))
                filteredArray.push(plant);
        }

        setFilteredPlants(filteredArray);
    }

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

        populateData();
        props.toggleNav(location.pathname);

    }, []);

    useEffect(() => {

        searchPlants();
    }, [term]);


    useEffect(() => {
        setFilteredPlants([]);
        setTerm("");
        searchPlants();
    }, [plants]);

    function launchModal(checkbox, obj) {

        setSelectedCheckbox(checkbox);
        setSelectedEntry(obj);
        setVisible(true);
    }

    function confirmModal() {
        setVisible(false);
        selectedCheckbox.current.checked = false;
        deleteEntry();
    }

    function cancelModal() {
        selectedCheckbox.current.checked = false;
        setVisible(false);
    }

    function deleteEntry() {

        let formData = new FormData();
        formData.append('id', selectedEntry.id);
        formData.append('image', selectedEntry.image);

        fetch(`${Api.path}/deleteEntry.php`, {
            method: "POST",
            body: formData
        }).then((res) => {
            return res.text();
        }).then((res) => {
            console.log(res);
            populateData();
        }).catch(err => {
            console.log(err);
        });

    }

    function showPlants() {
        if (plants.length < 1) {

            return <>
                <img src="./images/plantSearch.png" />
                <p>You currently have no entries</p>
                <p><Link className={styles.hyperlink} to="/newentry">Click here</Link> to add a New Entry</p>
            </>
        }
        else {
            return plantData.map((element) => {

                return <PlantSearchCard onLaunch={launchModal} data={element} />
            });
        }
    }

    const plantData = filteredPlants;

    return (
        <div className={styles.columnsContainer}>
            <Modal visible={visible} onLaunch={launchModal} onConfirm={confirmModal} onCancel={cancelModal}actionButton="Delete" message="Delete the following entry?"/>

            <div className={styles.columnSection}>

                <div className={[styles.leftColumn]}>
                    <div className={styles.searchContainer}>
                        <p>Enter a phrase below to search through your saved plants. Plants with a nickname or species matching the search criteria will be shown.</p>
                        <input type="text" class="textInput" onChange={(e) => setTerm(e.target.value)} value={term} />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <SearchOutlinedIcon style={{ verticalAlign: 'middle' }} />
                            <span>Search</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className={styles.columnSection}>
                <div className={styles.rightColumn}>
                    <div className={styles.sortbuttonContainer} style={{}}>
                        <p style={{ verticalAlign: 'middle' }}>Sort results by:</p>
                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                            <BrownButton data={buttons[0]} onSelect={selectedButton} />
                            <BrownButton data={buttons[1]} onSelect={selectedButton} />
                            <BrownButton data={buttons[2]} onSelect={selectedButton} />
                            <BrownButton data={buttons[3]} onSelect={selectedButton} />
                        </div>

                    </div>

                    {term && <p class="text-section">Currently displaying search results for "{term}"</p>}
                    <div style={{marginTop:'20px'}}>
                        {showPlants()}
                    </div>
                    
                </div>
            </div>
        </div>

    );


}





export default Search;