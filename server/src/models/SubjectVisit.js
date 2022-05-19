module.exports = (sequelize, DataTypes) => {
  const SubjectVisit = sequelize.define('SubjectVisit', {
    name: DataTypes.STRING,
    subjectId: DataTypes.NUMBER,
    date: DataTypes.DATEONLY,
    visitIndex: DataTypes.NUMBER,
    medicationId: DataTypes.NUMBER
  })

  return SubjectVisit
}