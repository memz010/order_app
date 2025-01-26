import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { createUsersTable } from './models/index.js'; 
import { authRouter } from "./routes/index.js"; 
import { ormDriver } from './models/ORM.js'; //
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/auth', authRouter);

const sequelize = ormDriver(); 


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    return createUsersTable(); // إنشاء الجداول
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });