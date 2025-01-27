import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { createUsersTable } from './models/index.js'; 
import { syncSessionsTable } from './models/session.js'; // استيراد دالة إنشاء جدول الجلسات
import { authRouter } from "./routes/index.js"; 
import { ormDriver } from './models/ORM.js';
import { authenticate } from './Middleware/auth.js'; // المسار النسبي الصحيح


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRouter);

// Protected Routes (مثال)
// app.use('/api/user', authenticate, userRouter); // استخدام middleware للتحقق من التوكن

// إدارة الأخطاء بشكل مركزي
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// الاتصال بقاعدة البيانات وإنشاء الجداول
const sequelize = ormDriver();

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // إنشاء جدول المستخدمين أولاً
    return createUsersTable();
  })
  .then(() => {
    // إنشاء جدول الجلسات بعد إنشاء جدول المستخدمين
    return syncSessionsTable();
  })
  .then(() => {
    // بدء تشغيل الخادم
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });