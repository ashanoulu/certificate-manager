const express = require('express');
const { body } = require('express-validator');
const certificateController = require('../controllers/certificateController');

const router = express.Router();

/**
 * @swagger
 * /api/certificates:
 *   post:
 *     summary: Create a new certification
 *     description: Endpoint to create a new certification
 *     tags:
 *       - Certifications
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               email:
 *                 type: string
 *               issuer:
 *                 type: string
 *               expire_date:
 *                 type: string
 *                 format: date
 *               issuer_code:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Certification created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Certification created successfully
 *               certification:
 *                 id: 7
 *                 certificate_id: "U2J5YR-GCP"
 *                 name: "Certificate Name"
 *                 description: "Test Description"
 *                 email: "asd@asd.df"
 *                 issuer: "Google"
 *                 expire_date: "2025-01-03"
 *                 updatedAt: "2023-12-04T14:53:50.495Z"
 *                 createdAt: "2023-12-04T14:53:50.495Z"
 */
router.post('/certificates', [
    body('name')
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name must be at most 100 characters')
        .trim(),

    body('description')
        .isString().withMessage('Description must be a string')
        .isLength({ max: 255 }).withMessage('Description maximum length 255 characters'),

    body('email')
        .isEmail().withMessage('Invalid email format')
        .isLength({ max: 100 }).withMessage('Email must be at most 100 characters'),

    body('issuer')
        .isString().withMessage('Issuer must be a string')
        .notEmpty().withMessage('Issuer is required')
        .isLength({ max: 100 }).withMessage('Issuer must be at most 100 characters'),

    body('expire_date')
        .isISO8601().withMessage('Invalid date format'),
    body('issuer_code').optional().isLength({max: 3}).withMessage('Issuer code must be 3 characters').default('DEF'),
], certificateController.createCertificate);

/**
 * @swagger
 * /api/certificates:
 *   get:
 *     summary: Get all certifications
 *     description: Endpoint to retrieve all certifications
 *     tags:
 *       - Certifications
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       '200':
 *         description: Certifications retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Certifications retrieved successfully
 *               certifications:
 *                 - id: 7
 *                   certificate_id: "U2J5YR-GCP"
 *                   name: "Certificate Name"
 *                   description: "Test Description"
 *                   email: "asd@asd.df"
 *                   issuer: "Google"
 *                   expire_date: "2025-01-03"
 *                   updatedAt: "2023-12-04T14:53:50.495Z"
 *                   createdAt: "2023-12-04T14:53:50.495Z"
 *                 - id: 8
 *                   certificate_id: "ABC123-MIC"
 *                   name: "Another Certificate"
 *                   description: "Another Description"
 *                   email: "another@asd.df"
 *                   issuer: "Microsoft"
 *                   expire_date: "2024-06-15"
 *                   updatedAt: "2023-12-04T15:30:00.000Z"
 *                   createdAt: "2023-12-04T15:30:00.000Z"
 */
router.get('/certificates', certificateController.listCertificates);

/**
 * @swagger
 * /api/certificates/{id}:
 *   get:
 *     summary: Get a certification by ID
 *     description: Endpoint to retrieve a certification by its ID
 *     tags:
 *       - Certifications
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the certification to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Certification retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Certification retrieved successfully
 *               certification:
 *                 id: 7
 *                 certificate_id: "U2J5YR-GCP"
 *                 name: "Certificate Name"
 *                 description: "Test Description"
 *                 email: "asd@asd.df"
 *                 issuer: "Google"
 *                 expire_date: "2025-01-03"
 *                 updatedAt: "2023-12-04T14:53:50.495Z"
 *                 createdAt: "2023-12-04T14:53:50.495Z"
 *       '404':
 *         description: Certification not found
 *         content:
 *           application/json:
 *             example:
 *               message: Certification not found
 */
router.get('/certificates/:id', certificateController.getCertificateById);

/**
 * @swagger
 * /api/certificates/{id}:
 *   delete:
 *     summary: Delete a certification by ID
 *     description: Endpoint to delete a certification by its ID
 *     tags:
 *       - Certifications
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the certification to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Certification deleted successfully
 *       '404':
 *         description: Certification not found
 *         content:
 *           application/json:
 *             example:
 *               message: Certification not found
 */
router.delete('/certificates/:id', certificateController.deleteCertificate);

module.exports = router;
