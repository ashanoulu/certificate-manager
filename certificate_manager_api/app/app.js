const express = require('express');
const bodyParser = require('body-parser');
const certificateRoutes = require('./routes/certificateRoutes');
const { swaggerUi, specs } = require('./swagger/swagger');

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();

app.use(bodyParser.json());

app.use('/api', certificateRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
