const { Router } = require('express');
const router = Router();
const { list, namesFilter, shearchId }  = require('./tryApi')

router.get('/', async(req, res, next) => {
    try{
        const {name} = req.query  
    
        if(name){
            let lista2 = await namesFilter(name)

            if(lista2.length < 1){
                return res.status(400).send("No existe")
            }
            return res.status(200).send(lista2)
        }
        
        let lista = await list()
        
        return res.status(200).send(lista)
    }
    catch(err) {

        return next(err)
    }
})

router.get('/:idRaza', async (req, res) => {

    try{
        const {idRaza} = req.params

        let lista = await shearchId(idRaza)

        
        if(lista === {}){
            return res.status(404).send("No existe")
        }
        return res.status(200).send(lista) 
    }
    catch{
        return res.status(401).send("Error")
    }

})

module.exports = router;