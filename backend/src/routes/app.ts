import express from 'express';
import cors from 'cors';
import router from '../routes/product';

const app = express();

app.use(cors());

app.use('/api', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
