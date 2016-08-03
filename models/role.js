module.exports = function (sequelize, DataTypes) {
  return sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    title: {
      type: DataTypes.STRING,
      field: 'role',
      unique: true
    }
  })
}
