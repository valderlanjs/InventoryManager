import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dashboardRoutes from "./routes/dashboardRoutes";
/* ROUTE IMPORTS */

/* CONFIGURAÇÕES */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginEmbedderPolicy({ policy: "require-corp"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


/* ROTAS */
app.use("/dashboard", dashboardRoutes) // http://localhost:8000/dashboard




/* SERVER */
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});