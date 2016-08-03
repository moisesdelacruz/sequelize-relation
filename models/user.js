module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    roleId: {
      type: DataTypes.INTEGER,
      model: 'role', // <<< Note, its table's name, not object name
      key: 'id' // <<< Note, its a column name
    },
    photo: {
      type: DataTypes.STRING,
      file: 'photo'
    },
    username: {
      type: DataTypes.STRING,
      field: 'username',
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      field: 'password'
    }
  })
}
