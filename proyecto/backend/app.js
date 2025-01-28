import express from 'express'
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import cursoRoutes from "./routes/curso.routes.js"

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", cursoRoutes);

export default app;