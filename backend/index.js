const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./db/index.js');
const { app } = require('./app.js');

const startServer = async () => {
    try {
        console.log('Attempting to connect to the database...');
        await connectDB();
        console.log('Database connection successful. Starting server...');
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MONGO DB CONNECTION FAILED (src/index.js): ", error);
        process.exit(1);
    }
};

startServer();