import styles from '../styles/modal.module.css';

function Modal(props) {

    const visible = props.visible ? {display:'flex'} : {display:'none'};

    return (

        <div>
            <div className={styles.modalContainer} style={visible}>
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>{props.message}</p>
                    
                        <p>This action cannot be undone.</p>
                    </div>

                    <div className={styles.buttonContainer}>
                        <button onClick={props.onCancel} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
                        <button onClick={props.onConfirm} className={`${styles.button} ${styles.deleteButton}`}>{props.actionButton}</button>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Modal;