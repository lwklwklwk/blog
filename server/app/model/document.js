module.exports = app => {
  const { STRING,INTEGER,DATE} = app.Sequelize;
  const User = app.model.define('document', {
    title:STRING,
    content: STRING,
    lastTime:DATE
  },{
    timestamps: false
});
  return User;
};