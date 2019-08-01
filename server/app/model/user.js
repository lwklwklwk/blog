module.exports = app => {
  const { STRING,INTEGER } = app.Sequelize;
  const User = app.model.define('user', {
    name:STRING,
    phone: INTEGER,
  },{
    timestamps: false
});
  return User;
};
