const chai = require('chai');
const supertest = require('supertest');
const app = require('../app/app');

const expect = chai.expect;
const request = supertest(app);

describe('Certificates API', () => {

    // Test the POST /certificates route
    describe('POST /certificates', () => {
        it('should create a new certificate', async () => {
            const response = await request
                .post('/api/certificates')
                .send({
                    name: 'Certificate Name',
                    description: 'Test Description',
                    email: 'asd@asd.df',
                    issuer: 'Google',
                    expire_date: '2025-01-03',
                    issuer_code: 'ABC',
                });

            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Certification created successfully');
            expect(response.body.certification).to.be.an('object');
        });

        it('should throw an error message -> validation failure', async () => {
            const response = await request
                .post('/api/certificates')
                .send({
                    name: '',
                    description: 'Test Description',
                    email: 'asd@asd.df',
                    issuer: 'Google',
                    expire_date: '2025-01-03',
                    issuer_code: 'ABC',
                });

            expect(response.status).to.equal(422);
            expect(response.body.errors[0].msg).to.equal('Name is required');
        });
    });

    // Test the GET /certificates route
    describe('GET /certificates', () => {
        it('should retrieve all certificates', async () => {
            const response = await request.get('/api/certificates');

            expect(response.status).to.equal(200);
            expect(response.body.certificates).to.be.an('array');
        });
    });


    // Test the GET /certificates/:id route
    describe('GET /certificates/:id', () => {
        it('should retrieve a certificate by ID', async () => {
            const certificateId = 'FL4ZAK-MEE';

            const response = await request.get(`/api/certificates/${certificateId}`);

            expect(response.status).to.equal(200);
            expect(response.body.certification).to.be.an('object');
        });

        it('should return a 404 status for a non-existing certificate ID', async () => {
            const nonExistingCertificateId = 'FL4ZAK';

            const response = await request.get(`/api/certificates/${nonExistingCertificateId}`);

            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('Certificate not found');
        });
    });

    // Test the DELETE /certificates/:id route
    describe('DELETE /certificates/:id', () => {
        it('should delete a certificate by ID', async () => {

            const certificateId = 'RWMTAK-MEE';

            const response = await request.delete(`/api/certificates/${certificateId}`);

            expect(response.status).to.equal(204);
        });

        it('should return a 404 status for deleting a non-existing certificate ID', async () => {
            const nonExistingCertificateId = 'RWMTAK-MEE';

            const response = await request.delete(`/api/certificates/${nonExistingCertificateId}`);

            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('Certificate not found');
        });

    });
});
