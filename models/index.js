const Sequelize = require('sequelize')
const configDB = require('../config')
const pg = require('pg')
const pghstore = require('pg-hstore')

const sequelize = new Sequelize(configDB.url)

const User = sequelize.import('./user.js')
const Role = sequelize.import('./role.js')

Role.hasMany(User)
User.belongsTo(Role, {as: 'role', foreignKey: 'roleId'})

module.exports.user = User
module.exports.role = Role
