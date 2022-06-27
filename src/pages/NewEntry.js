import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/newEntry.module.css';
import PlantReminderCard from '../components/PlantReminderCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BrownButton from '../components/buttons/BrownButton';
import RoundButton from '../components/buttons/RoundButton';
import Color from '../constants/colors';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Api from '../constants/api';
import { AppContext } from '../context/app-context';


function NewEntry(props) {

    const [cookies, setCookie] = useCookies([]);
    const location = useLocation();
    const navigate = useNavigate();
    const inputRef = useRef();
    
    const { plantsArray } = React.useContext(AppContext);
    const [plants, setPlants] = plantsArray;

    const[nickname, setNickname] = useState("");
    const[species, setSpecies] = useState("");
    const[water, setWater] = useState("");
    const[notes,setNotes] = useState("");

    // Date Picker
    const [startDate, setStartDate] = useState(new Date());

    // Image Picker
    const[img, setImg] = useState(null);
    const[imgFile, setImgFile] = useState(null);

    
    const[imgBorder, setImgBorder] = useState(false);
    

    const onImageChange = (e) =>{
        const[file] = e.target.files;
        let fileName = e.target.files[0].name;
        console.log(file);

        let ext = fileName.split(".");
        ext = ext[ext.length-1];

        if(ext != 'png' && ext != 'jpg' && ext != 'jpeg'){
            console.log("Invalid file extension");
            setImgFile(null);
            setImg(null);
            return;
        }
           
        setImgFile(e.target.files[0]);
        setImg(URL.createObjectURL(file));
    }

 

    // Classification Buttons
    const [roundButtons, setRoundButtons] = useState([
        { id: 0, name: 'Algae', selected: false },
        { id: 1, name: 'Flower', selected: false },
        { id: 2, name: 'Fruit', selected: false },
        { id: 3, name: 'Grass', selected: false },
        { id: 4, name: 'Herb', selected: false },
        { id: 5, name: 'Moss', selected: false },
        { id: 6, name: 'Orchid', selected: false },
        { id: 7, name: 'Root', selected: false },
        { id: 8, name: 'Other', selected: false }

    ]);

    const [buttonSet, setButtonSet] = useState([]);

    function buttonSelect(obj) {

        // Make copy of our button list and button set
        let tempRoundButtons = [...roundButtons];
        let tempButtonSet = [...buttonSet];

        // Selected button is false
        if (!obj.selected) {

            if (tempButtonSet.length == 3) {
                let tempButton = tempButtonSet.pop();
                tempRoundButtons[tempButton.id].selected = false;
            }

            tempRoundButtons[obj.id].selected = true;
            tempButtonSet.push({ ...tempRoundButtons[obj.id] })
        }
        // Selected button is true
        else {
            tempRoundButtons[obj.id].selected = false;

            tempButtonSet = tempButtonSet.filter((element) => {
                if (element.id != obj.id)
                    return element;
            });
        }

        setRoundButtons(tempRoundButtons);
        setButtonSet(tempButtonSet);

    }

    async function createEntry(){
        let formData = new FormData();
        let acquiredDate = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`;
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate()+parseInt(water));
        expireDate = `${expireDate.getFullYear()}-${expireDate.getMonth()+1}-${expireDate.getDate()}`;

        let json = JSON.stringify(buttonSet);
        console.log(json);

        formData.append('nickname',nickname);
        formData.append('species',species);
        formData.append('acquiredDate', acquiredDate);
        formData.append('expireDate',expireDate);
        formData.append('class', json);
        formData.append('notes', notes);
        formData.append('water', parseInt(water));
        formData.append('email', cookies['email']);
        formData.append("file",imgFile);

        try{
            const response = await fetch(`${Api.path}/addEntryReact.php`,{
                method:"POST",
                body:formData
              });
            
            const result = await response.text();
            populateData();
            
            console.log(result);
        }
        catch(err){
            console.log("Error in adding entry to database");
            console.log(err);
        }

                  
    }

    async function populateData() {
    


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
        navigate('/home');
        console.log(result);

    }

    function dragOver(e){
        e.preventDefault();
        setImgBorder(true);
    }

    function dragOff(e){
        console.log(e.target);
        setImgBorder(false);
    }

    function drop(e){
        e.preventDefault();
        console.log("hello");
        
        
        console.log(e.dataTransfer.files[0]);

        const file = e.dataTransfer.files[0];
        let fileName = e.dataTransfer.files[0].name;

        let ext = fileName.split(".");
        ext = ext[ext.length-1];

        if(ext != 'png' && ext != 'jpg' && ext != 'jpeg'){
            console.log("Invalid file extension");
            setImgFile(null);
            setImg(null);
            setImgBorder(false);
            return;
        }
        setImgBorder(true);
        setImgFile(e.dataTransfer.files[0]);
        setImg(URL.createObjectURL(file));

    }

    const imgBorderStyle = imgBorder ? {border:'4px solid #907979'} : {border: '4px dashed #907979'};

    useEffect(() => {
        if (cookies['username'] == undefined)
            navigate("/");

        props.toggleNav(location.pathname);
    }, []);

    return (
        <div className={styles.columnsContainer}>

            <div className={styles.columnSection}>

                <div className={styles.leftColumn}>
                    <div className={styles.imageContainer} style={imgBorderStyle} onClick={()=>{
                        inputRef.current.click();
                    }} onDragOver={dragOver} onDragLeave={dragOff} onDragEnd={dragOff} onDrop={drop}>
                        {img != null ? <img src={img} style={{objectFit:'contain', height:'350px',width:'350px'}}alt="" /> :
                        <div><img src="./images/image-block.png" style={{ objectFit: 'contain', height: 50 }}/>
                        <p>Click this panel to upload an image of your plant</p></div>
                }
                
                    </div>
                    <input onChange={onImageChange} className={styles.fileInput}ref={inputRef} type="file" name="myFile" id="file-input"/>
                </div>
            </div>


            <div className={styles.columnSection}>
                <div className={styles.middleColumn}>
                    <h2 style={{ color: Color.altDarkBrown }}>Plant Nickname</h2>
                    <input type="text" className={styles.textInput} onChange={(e)=>setNickname(e.target.value)} />
                    <h2 style={{ color: Color.altDarkBrown }} >Plant Species</h2>
                    <input type="text" className={styles.textInput} onChange={(e)=>setSpecies(e.target.value)} />
                    <h2 style={{ color: Color.altDarkBrown }}>Date Acquired</h2>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <h2 style={{ color: Color.altDarkBrown }}>Reminders</h2>
                    <p>This plants needs to be watered every {<input class="small-text-input" type="text" onChange={(e)=>setWater(e.target.value)}/>} day</p>
                </div>

            </div>



            <div className={styles.columnSection}>
                <div className={styles.rightColumn}>
                    <h2 style={{ color: Color.altDarkBrown }}>Plant Classification (select up to 3.)</h2>
                    <div className={styles.roundbuttonContainer}>
                        <RoundButton data={roundButtons[0]} onSelected={buttonSelect} clickable={true} />
                        <RoundButton data={roundButtons[1]} onSelected={buttonSelect} clickable={true} />
                        <RoundButton data={roundButtons[2]} onSelected={buttonSelect} clickable={true} />
                        <RoundButton data={roundButtons[3]} onSelected={buttonSelect} clickable={true} />
                        <RoundButton data={roundButtons[4]} onSelected={buttonSelect} clickable={true} />
                        <RoundButton data={roundButtons[5]} onSelected={buttonSelect} clickable={true} />
                        <RoundButton data={roundButtons[6]} onSelected={buttonSelect} clickable={true} />
                        <RoundButton data={roundButtons[7]} onSelected={buttonSelect} clickable={true} />
                        <RoundButton data={roundButtons[8]} onSelected={buttonSelect} clickable={true} />
                    </div>

                    <h2 style={{ color: Color.altDarkBrown }}>Additional Notes</h2>

                    <textarea className={styles.textarea} placeholder="Write any additional notes you'd like to keep about your plant here." cols="50" rows="5" onChange={(e)=>setNotes(e.target.value)} />

                    <div className={styles.actionButtonSet}>
                        <button onClick={createEntry} className={styles.button}>Create Entry</button>
                        <button onClick={()=>navigate('/home')}className={styles.button}>Cancel</button>
                    </div>




                </div>
            </div>
        </div>

    );


}





export default NewEntry;




