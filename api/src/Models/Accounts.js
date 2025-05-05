const db = require('./db');
const { DataTypes } = require('sequelize');
const Users = require('./Users');

const Accounts = db.define('Accounts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createBy: {
        type: DataTypes.INTEGER
    },
    updateBy: {
        type: DataTypes.INTEGER
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

Accounts.belongsTo(Users, { foreignKey: 'createbBy', as: 'UserCreator' });
Accounts.belongsTo(Users, { foreignKey: 'updatedBy', as: 'UserUpdater' });

module.exports = Accounts;