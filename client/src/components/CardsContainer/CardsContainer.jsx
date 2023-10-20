/* eslint-disable react/prop-types */
import styles from "./CardsContainer.module.css";
import { useState } from "react";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Filters from "../Filters/Filters";

const CardsContainer = ({ allDogs }) => {
  //Total de perros
  const totalDogs = allDogs.length;

  //Paginación
  const [currentPage, setCurrentPage] = useState(1);

  //Cantidad de perros por página
  const dogsByPage = 8;
  const lastIndex = currentPage * dogsByPage; // 8
  const firstIndex = lastIndex - dogsByPage; // 0

  return (
    <>
      <Filters />
      <div className="container">
        <div className={styles.cardDog}>
          {allDogs
            .map((dog) => {
              return (
                <Card
                  key={dog.id}
                  id={dog.id}
                  image={dog.image}
                  name={dog.name}
                  temperaments={dog.temperaments}
                  minWeight={dog.minWeight}
                  maxWeight={dog.maxWeight}
                />
              );
            })
            .slice(firstIndex, lastIndex)}
        </div>
      </div>
      <Pagination
        totalDogs={totalDogs}
        dogsByPage={dogsByPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default CardsContainer;
