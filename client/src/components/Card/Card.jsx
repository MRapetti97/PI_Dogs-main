import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, image, name, temperaments, minWeight, maxWeight }) => {
  return (
    <div className={styles.cardDog}>
      <img src={image} className={styles.imgDog} />
      <div className={styles.containerInfo}>
        <h2 className={styles.nameDog}>{name}</h2>
        <h2 className={styles.temperaments}>{temperaments}</h2>
      </div>
      <div className={styles.containerWeight}>
        <h2 className={styles.weight}>
          Weight: {minWeight} - {maxWeight} kg
        </h2>
      </div>
      <div className={styles.backgroundMore}>
        <div className={styles.contentMore}>
          <img
            src="../src/assets/huella.png"
            alt="huella"
            className={styles.huella}
          />
          <Link to={`/detail/${id}`} className={styles.more}>
            MÁS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
