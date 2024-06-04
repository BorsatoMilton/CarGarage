import express from 'express';
import { usuarioRouter } from './usuario/usuario.routes.js';
import { productoRouter } from './producto/producto.routes.js';

const app = express();
app.use(express.json());

app.use('/api/usuarios', usuarioRouter )
app.use('/api/productos', productoRouter )

app.use((_, res) => {
    return res.status(404).json({ message: "Resource not found" }); //el use sirve para cuando no se encuentra la ruta, es como un catch, monta un middleware que se ejecuta cuando no se encuentra la ruta
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});