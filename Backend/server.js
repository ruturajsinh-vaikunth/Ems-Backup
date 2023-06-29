import path from 'path'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import stocksRoutes from './routes/stocksRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import users from './routes/api/users.js';
import stocks from './routes/api/stocks.js';
import employee from './routes/api/employee.js'
import attendance from './routes/api/attendance.js'
import holiday from './routes/api/holidays.js'
import leavesperyear from './routes/api/leavesperyear.js'
import leaves from './routes/api/leaves.js'
import assets from './routes/api/assets.js'
import ticket from './routes/api/ticket.js'
import policiesDocument from './routes/api/policiesDocuments.js'
import greetings from './routes/api/greetings.js'
import expenses from './routes/api/expense.js'
import events from './routes/api/events.js'
import project from './routes/api/project.js'

const __dirname = path.resolve()

// Deployment configuration
//configure env file in dev mode
dotenv.config()

// configure env file in production
if (process.env.NODE_ENV === undefined) {
  dotenv.config({ path: './.env' })
}

connectDB()

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set("view engine","ejs");
app.use(cors());

app.use(
  cors({
    origin: '*',
  })
)

app.use('/api/user', userRoutes);
app.use('/api/users', users);
app.use('/api/employee', employee);
app.use('/api/attendance', attendance);
app.use('/api/holidays', holiday);
app.use('/api/leavesperyear', leavesperyear);
app.use('/api/leaves',leaves);
app.use('/api/stocks',stocksRoutes);
app.use('/api/stock',stocks);
app.use('/api/assets', assets);
app.use('/api/ticket', ticket);
app.use('/api/policies-documents', policiesDocument);
app.use('/api/greetings', greetings);
app.use('/api/expenses', expenses);
app.use('/api/events', events)
app.use('/api/project', project)

app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}

// Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
