import { app } from './server/app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Web Server is running on port ${PORT}`);
});
