import axios from 'axios'
import {
    GET_DOGS,
    GET_DOG_NAME,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENT,
    FILTER_DOGS,
    UPDATE_STATE_MODAL
} from './actionsTypes'

const URL_BASE = 'http://localhost:3001'

//Listar todos los perros
export const getDogs = ()=>{
    return async (dispatch) => {
        try {
            const {data} = await axios(`${URL_BASE}/dogs`);
            return dispatch({
                type: GET_DOGS ,
                payload: data
            });
        } catch (error) {
            alert(error.response.data.error);
        }
    }
}

//Listar perros según nombre
export const getDogByName = (name)=>{
    return async(dispatch) =>{
        try {
            const {data} = await axios(`${URL_BASE}/dogs/?name=${name}`);
            return dispatch({
                type: GET_DOG_NAME,
                payload: data
            });
        } catch (error) {
            dispatch(showModal(true, error.response.data.error, 'error'));
        }
    }
}

//Ordenar por nombre
export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

//Ordenar por peso
export const orderByWeight = (payload) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

//Filtrar los perros por API, BD ó todos
export const filterDogs = (payload) =>{
    return (dispatch) =>{
        dispatch({
            type: FILTER_DOGS,
            payload
        })
    }

}

//Listar temperamentos
export const getTemperaments = ()=>{
    return async (dispatch)=>{
        try {
            const {data} = await axios(`${URL_BASE}/temperaments`);
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: data
            })
        } catch (error) {
            alert(error.response.data.error);
        }
    }
}


//Filtrar por temperamentos
export const filterByTemperament = (payload) =>{
    return{
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
};

//Crear un perro
export const postDog = (newDog) => {
    return async (dispatch) => {
        try {
            await axios.post(`${URL_BASE}/dogs`, newDog);
            dispatch(showModal(true, "The new dog was added successfully", 'exito'));
        } catch (error) {
            dispatch(showModal(true, error.response.data.error, 'error'));
        }
    }
}

//Modal
export const showModal = (show, message, resultado) =>{
    return{
        type: UPDATE_STATE_MODAL,
        payload: { 
            show, 
            message,
            resultado
        }
    }
}