import { useDispatch } from 'react-redux';
import { BsFillXSquareFill, BsFillCheckCircleFill, BsFillExclamationCircleFill } from "react-icons/bs";
import { useSelector } from 'react-redux';

import styles from './Modal.module.css'
import {showModal} from '../../redux/actions'

const Modal = () =>{
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);

    const buttonClose = ()=>{
        dispatch(showModal(false,''))
    }

    return (
        <div className={styles.containerModal}>
            <div className={styles.contentModal}>
                <button className={styles.btnClose} onClick={buttonClose}><BsFillXSquareFill/></button>
                { modal.resultado ==='exito' 
                    ? <span className={`${styles.icon} ${styles.success}`}><BsFillCheckCircleFill/></span>
                    : <span className={`${styles.icon} ${styles.error}`}><BsFillExclamationCircleFill/></span>
                }
                <p className={styles.textModal}>{modal.message}</p>
            </div>
        </div>
    )
}

export default Modal;