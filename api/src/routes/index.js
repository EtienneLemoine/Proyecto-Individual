const { Router, application } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogRouts')
const temp = require('./temperamnt')
const post = require('./post')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dog', post) //Post
router.use('/dogs', dogs); //RouteDog
router.use('/temperament', temp) //Temperamento


module.exports = router;
