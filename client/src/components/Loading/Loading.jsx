import styles from './Loading.module.css'

const Loading = () =>{
    return(
        <div className={styles.containerLoading}>
            <img src="../src/assets/loading-thinking.gif" alt="" className={styles.loadingImage}/>
            <p className={styles.loadingText}>CARGANDO...</p>
        </div>
    )
}

export default Loading;