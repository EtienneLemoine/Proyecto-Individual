import { GET_DOGS, GET_ID_DOGS, GET_TEMPERAMENT, GET_NAME_DOGS, 
    PAGE, FILTER_ZA, FILTER_AZ, ORDER_HEIGHT_MAX, ORDER_HEIGHT_MIN, 
    ORDER_WEIGHT_MAX, ORDER_WEIGHT_MIN, FILTER_TEMP } from './constantes'
import { URL_DOG, URL_TEMPERAMENT } from '../Constantes'
import axios from 'axios'

export function getDogs(){
    return async function(dispatch) {

        let algo=  await axios.get('http://localhost:3001/dogs')
        return dispatch({type: GET_DOGS, payload: algo.data})
    }
}

export  function getIdDogs(id){
    return async function(dispatch) {

        let algo=  await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({type: GET_ID_DOGS, payload: algo.data})
    }
}

export function getNameDogs(name){
    return async (dispatch) => {
        try{
            let algo =  await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({type: GET_NAME_DOGS, payload: algo.data})  
        }
        catch(err){
            alert(err)
        }   
    }
}

export function getTemperament(){     
    return async function(dispatch) {

        let algo=  await axios.get(URL_TEMPERAMENT)
        return dispatch({type: GET_TEMPERAMENT, payload: algo.data})
    }
}

export function sendDogs(dog){ 
    return async function() {
        try{
            let algo=  await axios.post(URL_DOG, dog)
        }
        catch(err){
            console.error(err)
        }
    }
   
}

export function filterZA(){
    return {type:FILTER_ZA}
}
export function filterAZ(){
    return {type:FILTER_AZ}
}
export function orderHeightMax(){
    return{type:ORDER_HEIGHT_MAX}
}
export function orderHeightMim(){
    return{type:ORDER_HEIGHT_MIN}
}
export function orderWeightMax(){
    return{type:ORDER_WEIGHT_MAX}
}
export function orderWeightMim(){
    return{type:ORDER_WEIGHT_MIN}
}

export function filterTemp(payload){
    return{type: FILTER_TEMP, payload}
}

export function getpage(payload){
    return {type:PAGE, payload}
}