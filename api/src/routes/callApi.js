const axios = require('axios');
const { apikey } = process.env
const { Dog, Temperament}= require('../db')

const list = async () => {

    let apiCall = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apikey}`)
    let dogListApi = apiCall.data.map(e =>{
        let arr = e.temperament && e.temperament.split(',').map(e => e.trim())
    
        let convertW = e.weight.metric.split(' ')
        let resultW = parseInt(convertW)
        if(convertW.length !== 1){
         resultW = parseInt(convertW[0]) + parseInt(convertW[2]) / 2
         resultW = isNaN(resultW)? 0 : resultW;
        }
        resultW = isNaN(resultW)? 0 : resultW;

        let convertH = e.height.metric.split(' ')
        let resultH = parseInt(convertH)
        if(convertH.length !== 1){
            resultH = parseInt(convertH[0]) + parseInt(convertH[2]) / 2
        }
        let convertL = e.life_span.split(' ')
        let resultL = convertL[0]
        
        // Dog.findOrCreate({
        //   where:{
        //       name: e.name,
        //       height: resultH,
        //       weight: resultW,
        //       life_span: resultL,
        //       image: e.image.url
        //   }  
        // })
        return { name: e.name,  temperaments: arr , image: e.image.url, id: e.id ,weight: resultW, height: resultH}
        
    })
    
    let dogListDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: [ 'name' ],
            through: { attributes: [] }
        }
    })


    let dogList = [...dogListDB,...dogListApi ];

    return dogList
}

const namesFilter= async (parameter) =>{

    let dogListDB = await list()  
    dogListDB = dogListDB.filter((objeto) =>
        objeto.name.toLowerCase().includes(parameter.toLowerCase())
    );
    
    return dogListDB
}

const  shearchId= async (parameter) => {

    let arr = {}

    let apiCall = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apikey}`)
    let dogListApi = await apiCall.data
    dogListApi = dogListApi.forEach((objeto) =>{
        if(objeto.id.toString() === parameter){ 
            let save = objeto.temperament && objeto.temperament.split(',').map(e => e.trim())
            
            let convertW = objeto.weight.metric.split(' ')
            let resultW = parseInt(convertW[0]) + parseInt(convertW[2]) / 2

            let convertH = objeto.height.metric.split(' ')
            let resultH = parseInt(convertH[0]) + parseInt(convertH[2]) / 2  
            
            let convertL = objeto.life_span.split(' ')
            let resultL = parseInt(convertL[0]) + parseInt(convertH[2]) / 2 
            arr = {
                name: objeto.name,
                id: objeto.id,
                height: resultH,
                weight: resultW,
                life_span: resultL,
                temperaments: save,
                image: objeto.image.url
            }
        }
    });

    let dogListDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: [ 'name' ],
            through: { attributes: [] }
        }
    })   
    dogListDB.map((objeto) =>{
        if(objeto.id.toString() === parameter){
            arr = {
                name: objeto.name,
                id: objeto.id,
                height: objeto.height,
                weight: objeto.weight,
                life_span: objeto.life_span,
                temperaments: objeto.temperaments.map(e => {
                    return e.name + ' '
                }),
            }
        }
    });

    return arr
}

const  temperaments= async() => {
    let tempApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apikey}`)
    let tempMap = tempApi.data.map(el => el.temperament)
    let infoapi = [];
    for (let i = 0; i < tempMap.length; i++) {
        if (tempMap[i]) {
            infoapi.push(tempMap[i].split(', '))
        }
    }
    return infoapi.flat()
}

const setTemperament = async() => {
    let list = await temperaments()
    
    let save = list.map((e) => { 
        if(e){    
            Temperament.create({name: e})  
        }    
    })
}
module.exports = { list,shearchId,namesFilter, setTemperament, temperaments, setTemperament }