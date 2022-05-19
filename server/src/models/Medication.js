module.exports = (sequelize, DataTypes) => {
  const Medication = sequelize.define('Medication', {
    type: DataTypes.STRING,
    status: DataTypes.STRING
  })

  return Medication
}