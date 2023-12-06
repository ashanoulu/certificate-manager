const { validationResult } = require('express-validator');
const Certifications  = require('../models/certifications');

exports.createCertificate = async (req, res) => {
    const {name, description, email, issuer, expire_date, issuer_code} = req.body;

    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            console.log("Error occurred")
            console.log(errors.array())
            return res.status(422).json({errors: errors.array()});
        }
    } catch (e) {
        console.log(e)
    }

    let isUnique = false
    let generatedKey = ''
    while (!isUnique) {
        generatedKey = generateUniqueKey() + '-' + issuer_code;
        isUnique = await Certifications.isUnique(generatedKey);
    }

    try {
        console.log("Requested certification - ", name, description, email, issuer, expire_date, issuer_code )
        const newCertification = await Certifications.create({
            certificate_id: generatedKey,
            name,
            description,
            email,
            issuer,
            expire_date
        });
        console.log('Certification created successfully', newCertification)
        res.status(201).json({message: 'Certification created successfully', certification: newCertification});
    } catch (error) {
        console.error('Error creating certification:', error);
        res.status(500).json({error: 'Internal Server Error, Please try again'});
    }
};

exports.listCertificates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const offset = (page - 1) * pageSize;

        const certificates = await Certifications.findAll({
            offset,
            limit: pageSize
        });
        console.log("Certificates requested - ", certificates, page, pageSize)
        res.status(200).json({ certificates });
    } catch (error) {
        console.error('Error fetching certificates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCertificateById = async (req, res) => {
    const { id } = req.params;

    try {
        const foundCertificate = await Certifications.findOne({
            where: { certificate_id: id }
        });

        if (foundCertificate) {
            console.log("Certificate retrieved - ", foundCertificate)
            res.status(200).json({ certificate: foundCertificate });
        } else {
            console.log('Certificate not found')
            res.status(404).json({ error: 'Certificate not found' });
        }
    } catch (error) {
        console.error('Error fetching certificate:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteCertificate = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedRows = await Certifications.destroy({
            where: {certificate_id: id}
        });

        if (deletedRows > 0) {
            console.log('Certificate deleted - ', id)
            res.status(204).json({message: 'Certificate deleted successfully'});
        } else {
            console.log('Certificate not found', id)
            res.status(404).json({error: 'Certificate not found'});
        }
    } catch (error) {
        console.error('Error deleting certificate:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

function generateUniqueKey() {
    const characters = 'ABCDEFGHIJKLMN0123456789OPQRSTUVWXYZ';

    let uniqueKey = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueKey += characters.charAt(randomIndex);
    }

    return uniqueKey;
}
