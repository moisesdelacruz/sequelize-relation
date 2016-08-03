const express = require('express')
const fs = require('fs')
const getRoles = require('../lib').getRoles
const getUsers = require('../lib').getUsers
const getRoleId = require('../lib').getRoleId
const UserRegister = require('../lib').UserRegister
const router = express.Router()

// Exportar estaticos..
router.use(express.static('public'))
router.use('/static', express.static('static'));

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/users', (req, res) => {
  res.render('users', { path: '/static' })
})

router.get('/api/roles', (req, res) => {
  getRoles()
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.send(err.message)
    })
})

router.get('/api/users', (req, res) => {
  getUsers()
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.send(err.message)
    })
})

router.post('/api/role', (req, res) => {
  var id = req.query.id
  console.log(id);
  getRoleId(id)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.send(err.message)
    })
})

router.post('/upload', (req, res) => {
  var path = req.files.image

  if (path.type.indexOf('image')==-1){
    res.send('El fichero que deseas subir no es una imagen');
  }
  else {
    var newPath = `photos/${path.name}`
    var is = fs.createReadStream(path.path)
    var os = fs.createWriteStream(`static/${newPath}`)
    is.pipe(os)
    is.on('end', function() {
      var user = {
        role: req.body.role,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        image: newPath
      }
      // Registrar usuario en la base de datos
      UserRegister(user).then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })

      //eliminamos el archivo temporal
      fs.unlinkSync(path.path)
    })
    res.send('¡archivo subido!')
  }
})

module.exports = router
