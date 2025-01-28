import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { createUsersTable } from './models/index.js'; 
import { syncSessionsTable } from './models/session.js';
import { userRouter } from "./routes/index.js"; 
import { ormDriver } from './models/ORM.js';
import { authenticate } from './Middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/user', userRouter); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const sequelize = ormDriver();

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return createUsersTable();
  })
  .then(() => {
    return syncSessionsTable();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });