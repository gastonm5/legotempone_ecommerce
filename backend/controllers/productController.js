import Product from '../models/productModel.js';
import localProducts from '../data/products.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length > 0) {
      console.log("✅ Productos obtenidos desde MongoDB");
      return res.status(200).json({ source: "mongo", products });
    } else {
      console.warn("⚠️ MongoDB está vacía, devolviendo productos locales.");
      console.log("✅ Productos obtenidos Localmente");
      return res.status(200).json({ source: "local", products: localProducts });
    }
  } catch (error) {
    console.error("❌ Error al consultar MongoDB:", error);
    return res.status(200).json({ source: "fallback", products: localProducts });
  }
};
