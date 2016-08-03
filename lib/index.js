const User = require('../models').user
const Role = require('../models').role

function UserRegister (user) {
  return new Promise((resolve, reject) => {
    User.sync().then(() => {
      var data = {
        roleId: user.role,
        photo: user.image,
        username: user.username,
        email: user.email,
        password: user.password
      }
      User.create(data)
        .then((data) => {
          resolve(`success, user created, ${data}`)
        })
        .catch((err) => {
          reject(`this is the error ${err}`)
        })
    })
  })
}

function RoleRegister (role) {
  return new Promise((resolve, reject) => {
    Role.sync().then(() => {
      var data = {
        title: role.title
      }
      Role.create(data)
        .then((message) => {
          resolve(`success, user created, ${message}`)
        })
        .catch((err) => {
          reject(`this is the error ${err.message}`)
        })
    })
  })
}

function getUsers () {
  return new Promise((resolve, reject) => {
    User.findAll({include: [ { model: Role, as: 'role' } ]})
      .then((data) => {
        resolve(data)
      })
      .catch((arr) => {
        reject('this is the error ${err}')
      })
  })
}

function getRoles () {
  return new Promise((resolve, reject) => {
    Role.findAll()
      .then((data) => {
        resolve(data)
      })
      .catch((arr) => {
        reject('this is the error ${err}')
      })
  })
}

function getRoleId (id) {
  return new Promise((resolve, reject) => {
    Role.findOne({ where: { roleId: id } })
      .then((data) => {
        resolve(data)
      })
      .catch((arr) => {
        reject('this is the error ${err}')
      })
  })
}

module.exports.UserRegister = UserRegister
module.exports.getRoles = getRoles
module.exports.RoleRegister = RoleRegister
module.exports.getUsers = getUsers
module.exports.getRoleId = getRoleId
