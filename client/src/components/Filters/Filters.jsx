import { useSelector, useDispatch } from "react-redux";
import {
  filterDogs,
  filterByTemperament,
  orderByName,
  orderByWeight,
} from "../../redux/actions";
import styles from "./Filters.module.css";
import "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);

  //Ordenar por nombre
  const handleOrderName = (event) => {
    dispatch(orderByName(event.target.value));
  };

  //Ordenar por peso
  const handleOrderWeight = (event) => {
    dispatch(orderByWeight(event.target.value));
  };

  //Filtrar perros de Api, Bd ó todos
  const handleFilterDogs = (event) => {
    dispatch(filterDogs(event.target.id));
  };

  //Filtrar por temperamentos
  const handleFilterTemperaments = (event) => {
    dispatch(filterByTemperament(event.target.value));
  };

  return (
    <div className={`${styles.containerFilters} container`}>
      <div className={styles.contentTitle}>
        <span className={styles.textAll}>ALL OUR DOGS</span>
        <h2 className={styles.title}>Our Breeds</h2>
      </div>
      <div className={styles.contentFilters}>
        <h3 className={styles.titleFilter}>ORDERING</h3>
        <div className={styles.buttonFilters}>
          <select onChange={handleOrderName} defaultValue="name">
            <option value="name" disabled>
              Name
            </option>
            <option value="ascName">Ascending</option>
            <option value="desName">Descending</option>
          </select>
          <select onChange={handleOrderWeight} defaultValue="weight">
            <option value="weight" disabled>
              Weight
            </option>
            <option value="desWeight">100 - 0Kg</option>
            <option value="ascWeight">0 - 100Kg</option>
          </select>
        </div>
      </div>
      <div className={styles.contentFilters}>
        <h3 className={styles.titleFilter}>FILTERS</h3>
        <div className={styles.buttonFilters}>
          <button
            onClick={handleFilterDogs}
            id="all"
            className={`${styles.btnFilter} btn`}
          >
            ALL
          </button>
          <button
            onClick={handleFilterDogs}
            id="api"
            className={`${styles.btnFilter} btn`}
          >
            API
          </button>
          <button
            onClick={handleFilterDogs}
            id="bd"
            className={`${styles.btnFilter} btn`}
          >
            MY DOGS
          </button>
          <select
            onChange={handleFilterTemperaments}
            defaultValue="temperaments"
          >
            <option value="temperaments" disabled>
              Temperaments
            </option>
            <option value="all">All</option>
            {allTemperaments.map((temp) => (
              <option value={temp.name} key={temp.id}>
                {temp.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
