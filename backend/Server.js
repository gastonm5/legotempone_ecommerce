// import express from 'express'; //voy a usar este framework para levantar el servidor y manejar rutas
// import mongoose from 'mongoose';
// import Product from './models/productModel.js'; //aca importo el esquema que cree para mi servidor
// import localProducts from './data/products.js'; //inporto los productos de manera local por si falla el server
// import cors from 'cors'; //este es el middleware que permite que el front se comunique con el backend aunque estén en puertos distintos.

// const app = express();
// const port = 5000;

// // aca utilizo el middleware
// app.use(cors());
// app.use(express.json()); //con esto permito que el servidor entienda json en las solicitudes

// // parametros para conectarme a mi server en mongo
// mongoose
//   .connect('mongodb+srv://fedetempone:<db_password>@cluster0.zbapqva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//   .then(() => console.log('Conectado a la base de datos'))
//   .catch((err) => console.error('Error al conectar a la base de datos:', err));
// //↓↓↓↓
// // aca establecí una conexion con mongo db, esta conexion es global entre mongo y mi servidor y queda
// // viva y abierta mientras el servidor este corriendo.


// // esta es la ruta para obtener los productos
// // aca le decimos que haga una peticion get y ejecute una funcion q abajo detallo
// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await Product.find(); // la funcion va a tratar de hacer un product.find() y mongoose sabe q dicha peticion la tiene q hacer a la base de datos que acabo de conectar.
//     if (products.length > 0) {
//       return res.status(200).json(products); //si hay respuesta muestro los productos de mongo
//     } else {
//       console.warn("No hay productos en Mongo, devolviendo locales.");
//       return res.status(200).json(localProducts); //si no hay respuesta muestro los productos locales.
//     }
//   } catch (error) {
//     console.error("Error al consultar MongoDB, devolviendo locales.");
//     return res.status(200).json(localProducts);
//   }
// });

// app.listen(port, () => {
//   console.log(`Servidor corriendo en el puerto ${port}`);
// });

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { getProducts } from './controllers/productController.js';

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
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
