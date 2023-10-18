import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../redux/actions";
import styles from "./Home.module.css";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={`${styles.containerDogs} containerBackground`}>
      <div className={`${styles.fondoHuellas} footprints`}></div>
      {loading ? <Loading /> : <CardsContainer allDogs={allDogs} />}
    </div>
  );
};

export default Home;
