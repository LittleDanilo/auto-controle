const db = require('./db');
const { DataTypes } = require('sequelize');

const Accounts = db.define('Accounts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING(50),
        validate: {
            isIn: [['Interna', 'Externa']]
        }
    },
    status: {
        type: DataTypes.STRING(10),
        validate: {
            isIn: [['Ativa', 'Inativa', 'Suspensa']]
        }
    }
});

module.exports = Accounts;