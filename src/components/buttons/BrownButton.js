import styles from '../../styles/search.module.css';
import Color from '../../constants/colors';

function BrownButton(props){
    const{data} = props;

    const buttonStyle = data.selected ? {color:Color.background, backgroundColor:Color.darkBrown} : {color:Color.darkBrown, backgroundColor:Color.background};

    return(
        <div style={{backgroundColor:buttonStyle.backgroundColor, color:buttonStyle.color, verticalAlign:'middle', padding:'2px 11px', border:'1px solid #907979', cursor:'pointer'}} onClick={()=>{props.onSelect(data)}}>
            <p>{data.name}</p>
        </div>
    );
}


export default BrownButton;