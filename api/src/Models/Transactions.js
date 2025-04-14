const db = require('./db');
const { DataTypes } = require('sequelize');
const Accounts = require('./Accounts');

const Transactions = db.define('Transactions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    origin: {
        type: DataTypes.INTEGER
    },
    destiny: {
        type: DataTypes.INTEGER
    },
    value: {
        type: DataTypes.DECIMAL(15,2)
    },
    date: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(10),
        isIn: [['Pendente', 'Concluida', 'Cancelada']],
        defaultValue: 'Concluida'
    }
})

Transactions.belongsTo(Accounts, { foreignKey: 'origin', as: 'OriginAccount' });
Transactions.belongsTo(Accounts, { foreignKey: 'destiny', as: 'DestinyAccount' });

module.exports = Transactions;