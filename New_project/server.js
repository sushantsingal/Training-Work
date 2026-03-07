const express = require("express");
const { connectDB } = require('./src/config/db.config');
const bodyParser = require('body-parser');
const { authRouter } = require('./src/route');
// const { StudentRouter } = require('./src/route/student');
// const { TeacherRouter } = require('./src/route/teacher');
const { AdminCollegeRoute, AdminDepartmentRoute, AdminResultRoute, AdminUserRoute } = require('./src/route/admin');

connectDB();

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT;


app.get('/', (req, res) => {
  
  res.send('Hello, World!');
});


app.use('/api/auth', authRouter);

// Routes acc. to roles
app.use('/api/admin',
  AdminUserRoute,
  AdminCollegeRoute,
  AdminDepartmentRoute,
);


// app.use('/api/student', );
// app.use('/api/teacher', );

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log("Server Is Live...");
});