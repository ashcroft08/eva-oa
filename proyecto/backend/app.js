import express from 'express'
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';

import authRoutes from "./routes/auth.routes.js"
import institucionRoutes from './routes/institucion.routes.js';
import userRoutes from "./routes/user.routes.js"
import cursoRoutes from "./routes/curso.routes.js"
import materiaRoutes from './routes/materia.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use("/api", authRoutes);
app.use('/api', institucionRoutes);
app.use("/api", userRoutes);
app.use("/api", cursoRoutes);
app.use("/api", materiaRoutes);

//app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

export default app;