import { Link } from "react-router-dom";
import styles from "./Landing.module.css";


const Landing = () => {
  return (
    <section className={`${styles.containerLanding} containerBackground`}>
      <div className="footprints"></div>
      <div className={styles.containerInfo}>
        <img src="../../src/assets/perrito-landing.png" alt="dog"  className={styles.imgDog}/>
        <div className={styles.contentInfo}>
          <h1 className={styles.title}>Bienvenido a mi proyecto de Dogs.</h1>
         
          <Link to="/home" className={styles.btnStart}>
            START HOME
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
