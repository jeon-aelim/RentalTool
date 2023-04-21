'use strict';

const Sequelize = require('sequelize');
const path = require('path');

const env = process.env.NODE_ENV ? 'production' :'development';
const config = require(path.join(__dirname, '..', 'config', 'db.json'))[
    env
];

const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci'
        },
        logging: false
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

db.User = require('./user')(sequelize, Sequelize);
db.Tool = require('./tool')(sequelize, Sequelize);
db.Rental = require('./rental')(sequelize, Sequelize);
db.Repair = require('./repair')(sequelize, Sequelize);
db.University = require('./university')(sequelize, Sequelize);
db.Department = require('./department')(sequelize, Sequelize);
db.Log = require('./log')(sequelize, Sequelize);
db.Img = require('./img')(sequelize, Sequelize);

require('./user/foreignkey')(db);
require('./tool/foreignkey')(db);
require('./rental/foreignkey')(db);
require('./repair/foreignkey')(db);
require('./university/foreignkey')(db);
require('./department/foreignkey')(db);
require('./log/foreignkey')(db);
require('./img/foreignkey')(db);

module.exports = db;