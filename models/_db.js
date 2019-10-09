const Sequelize = require('sequelize');
const uri = process.env.DATABASE_URL;

const db = new Sequelize(uri, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
module.exports = db;