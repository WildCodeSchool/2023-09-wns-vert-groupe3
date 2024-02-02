import express from 'express';
import ProductService from '../services/product.service';

const router = express.Router();
const productService = new ProductService(); 

router.get('/products', async (_req, res) => {
  try {
    const products = await productService.getAllProducts();

    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

export default router;
