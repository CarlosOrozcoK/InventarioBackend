    'use strict';
    import 'dotenv/config';
    import express from 'express';
    import cors from 'cors';
    import helmet from 'helmet';
    import morgan from 'morgan';
    import { dbConnection } from './mongo.js';
    import productoRoutes from '../src/producto/producto.routes.js';



    const middlewares = (app) => {
        app.use(express.urlencoded({ extended: false }));
        app.use(cors());
        app.use(express.json());
        app.use(helmet());
        app.use(morgan('dev'));
    }

    const routes = (app) => {
        app.use('/InventarioCIA/v1/productos', productoRoutes);


    }

    const conectarDB = async () => {
        try {
            await dbConnection();
            console.log('Successful connection to database!');
        } catch (error) {
            console.log('Error connecting to database!', error);
            process.exit(1);
        }
    }

    export const initServer = async () => {
        const app = express();
        const port = process.env.PORT || 3000;

        try {
            middlewares(app);
            await conectarDB(); 
            routes(app);
            app.listen(port);
            console.log(`Server running on port ${port}!`);
        } catch (err) {
            console.log(`Server init failed: ${err}!`);
        }
    }