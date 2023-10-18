/* eslint-disable no-case-declarations */
import {
  GET_DOGS,
  GET_DOG_NAME,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENT,
  FILTER_DOGS,
  UPDATE_STATE_MODAL,
} from "./actionsTypes";

const initialState = {
  allDogs: [],
  allDogsBackup: [],
  temperaments: [],
  filters: [],
  modal: {
    show: false,
    message: "",
    resultado: "",
  },
};

const rootReducer = (state = initialState, { type, payload }) => {
  const filterState =
    state.filters.length !== 0 ? state.filters : state.allDogsBackup;

  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: payload,
        allDogsBackup: payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload,
      };
    case GET_DOG_NAME:
      return {
        ...state,
        allDogs: payload,
      };
    case FILTER_DOGS:
      if (payload === "api") {
        const filterApi = state.allDogsBackup.filter(
          (dog) => typeof dog.id === "number"
        );
        return {
          ...state,
          allDogs: filterApi,
          filters: filterApi,
        };
      }
      if (payload === "bd") {
        const filterBd = state.allDogsBackup.filter(
          (dog) => typeof dog.id === "string"
        );
        return {
          ...state,
          allDogs: filterBd,
          filters: filterBd,
        };
      }
      return {
        ...state,
        allDogs: state.allDogsBackup,
        filters: [],
      };
    case ORDER_BY_NAME:
      const orderName = [...state.allDogsBackup].sort((prev, next) => {
        if (payload === "ascName") {
          if (prev.name.toLowerCase() > next.name.toLowerCase()) return 1;
          if (prev.name.toLowerCase() < next.name.toLowerCase()) return -1;
        } else if (payload === "desName") {
          if (prev.name.toLowerCase() > next.name.toLowerCase()) return -1;
          if (prev.name.toLowerCase() < next.name.toLowerCase()) return 1;
        }
        return 0;
      });

      return {
        ...state,
        allDogs: orderName,
      };
    case ORDER_BY_WEIGHT:
      const orderWeight = [...state.allDogsBackup].sort((prev, next) => {
        if (payload === "desWeight") return next.maxWeight - prev.maxWeight;
        return prev.maxWeight - next.maxWeight;
      });
      return {
        ...state,
        allDogs: orderWeight,
      };
    case FILTER_BY_TEMPERAMENT:
      if (payload === "all") {
        return {
          ...state,
          allDogs: state.allDogsBackup,
        };
      }
      const filterTemperaments = [...filterState].filter((dog) => {
        if (dog.temperaments) return dog.temperaments.includes(payload);
        return false;
      });

      if (filterTemperaments.length === 0) {
        return {
          ...state,
          allDogs: [],
        };
      }
      return {
        ...state,
        allDogs: filterTemperaments,
      };
    case UPDATE_STATE_MODAL:
      return {
        ...state,
        modal: {
          show: payload.show,
          message: payload.message,
          resultado: payload.resultado,
        },
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
