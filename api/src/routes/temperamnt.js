const { Router } = require('express');
const { Dog, Temperament } = require('../db')
const router = Router();
const { list, temperaments }  = require('./callApi')

router.get('/', async(req, res)=> {
    let tempTotal = await temperaments()
    const onEach = tempTotal.forEach(element => {
        Temperament.findOrCreate({
            where: { name: element }
        })
    });
    const allTemp = await Temperament.findAll()
    res.status(200).send(allTemp)
})

router.get('/lista', async(req,res)=>{
    res.send(await temperaments())
})
module.exports= router;