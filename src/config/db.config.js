const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_UNAME, process.env.DB_PAS, {
    host: process.env.HOST,
    dialect: 'mysql',
    operatorAliases: false
});
// const sequelize = new Sequelize('freedbtech_gmDataBase', 'freedbtech_gmDb', 'pass123',{host:'freedb.tech',dialect:'mysql', operatorAliases: false});

module.exports = sequelize;

global.sequelize = sequelize;
global.Op = Sequelize.Op;