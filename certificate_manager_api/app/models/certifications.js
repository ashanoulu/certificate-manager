const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Certifications = sequelize.define('certifications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    certificate_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    issuer: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    expire_date: {
        type: DataTypes.DATE(),
        allowNull: false
    }
});

Certifications.isUnique = async function (certificate_id) {
    try {
        const existingCertificate = await Certifications.findOne({
            where: {
                certificate_id: certificate_id
            },
        });

        return !existingCertificate;
    } catch (error) {
        console.error('Error checking uniqueness:', error);
        throw error;
    }
};

module.exports = Certifications;

