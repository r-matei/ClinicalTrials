module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    index: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    sex: DataTypes.STRING,
    status: DataTypes.STRING,
    screeningDate: DataTypes.DATEONLY,
    lastAppointmentId: DataTypes.NUMBER,
    nextAppointmentId: DataTypes.NUMBER,
    medicationCode: DataTypes.STRING
  })

  return Subject
}