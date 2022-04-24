const { Router } = require('express');
const { Dog, Temperament } = require('../db')
const router = Router();
const { list, temperaments }  = require('./callApi')

router.get('/', async(req, res)=> {

    let temperamentos = await temperaments()
    Temperament.bulkCreate(temperamentos)
    return res.status(200).send(temperamentos)
})
module.exports= router;