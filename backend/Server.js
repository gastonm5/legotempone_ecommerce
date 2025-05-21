import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { getProducts } from './controllers/productController.js';

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

const allowedOrigins = ['https://ecommerce-legotempone.onrender.com'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // permite herramientas tipo Postman o curl
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'El CORS policy no permite este origen: ' + origin;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  });

// Rutas
app.get('/api/products', getProducts);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
