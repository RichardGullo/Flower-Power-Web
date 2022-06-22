import styles from '../../styles/search.module.css';
import Color from '../../constants/colors';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';

function RoundButton(props){

    const backgroundColor = props.data.selected ? Color.darkGreen : Color.lightGreen;

    function toggleButton(){
        if(props.clickable == false)
            return;
        
        props.onSelected(props.data);
    }

    const togglePointer = props.clickable ? {cursor:'pointer'} : {cursor:'default'};

    return(
        <div style={{backgroundColor:backgroundColor, color:'white', verticalAlign:'middle', padding:'1px 15px', borderRadius:15, width:100, textAlign:'center',alignItems:'center', marginTop:10, marginRight:3, display:'flex', ...togglePointer} } onClick={toggleButton}>
            <AddCircleOutlineSharpIcon style={{fontSize:20,verticalAlign:'middle', marginRight:3}}/>
            <p>{props.data.name}</p>
        </div>
    );
}


export default RoundButton;