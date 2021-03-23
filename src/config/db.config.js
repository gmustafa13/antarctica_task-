const Sequelize = require('sequelize');
const sequelize = new Sequelize('antarctica_task', 'root', '',{host:'localhost',dialect:'mysql', operatorAliases: false});
module.exports = sequelize;

global.sequelize = sequelize;
global.Op = Sequelize.Op;