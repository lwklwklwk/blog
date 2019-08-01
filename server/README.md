#js版的egg-sequelize脚手架
#sequelize导入导出命令：
npx sequelize db:migrate
npx sequelize db:migrate:undo
#创建种子文件：
sequelize seed:create --name create_users
#创建模型文件：
sequelize model:create --name User --attributes first_name:string,last_name:string,bio:text
