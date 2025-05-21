import mongoose from "mongoose";

// Este es mi esquema para los productos que van a estar en la base de datos de mongodb
// la base de datos cuando la creo tiene que coincidir id img description y price, si hay discrepancias
// no va a funcionar.
const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
},
{
  collection: 'LegoProducts' 
});

// con esta linea creo el esquema.
const Product = mongoose.model("Product", productSchema);

export default Product;
