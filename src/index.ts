import 'reflect-metadata';
import express from 'express';
import { orm } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { modeloRouter } from './producto/modelo.routes.js';
import { productoRouter } from './producto/producto.routes.js';
import { marcaRouter } from './producto/marca.routes.js';
import { categoriaRouter } from './producto/categoria.routes.js';
import { usuarioRouter } from './usuario/usuario.routes.js';
import { tarjetaRouter } from './usuario/tarjeta.routes.js';
import { calificacionRouter } from './usuario/calificacion.routes.js';
<<<<<<< HEAD
import { subastaRouter } from './subasta/subasta.routes.js';
import { pujaRouter } from './subasta/puja.routes.js';
=======
import { pedidoRouter } from './pedido/pedido.routes.js';
import { lineacompraRouter } from './pedido/lineacompra.routes.js';
>>>>>>> parent of 1946c22 (Revert "Linea Compra y Pedido creado")

const app = express();
app.use(express.json());
  
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

app.use('/api/categorias', categoriaRouter)
app.use('/api/marcas', marcaRouter)
app.use('/api/modelos', modeloRouter )
app.use('/api/productos', productoRouter )
app.use('/api/usuarios', usuarioRouter )
app.use('/api/tarjetas', tarjetaRouter)
app.use ('/api/calificaciones', calificacionRouter)
<<<<<<< HEAD
app.use('/api/subastas', subastaRouter)
app.use('/api/pujas', pujaRouter)
=======
app.use('/api/pedido', pedidoRouter)
app.use('/api/lineacompra', lineacompraRouter)

>>>>>>> parent of 1946c22 (Revert "Linea Compra y Pedido creado")

app.use((_, res) => {
    return res.status(404).json({ message: "Resource not found" }); //el use sirve para cuando no se encuentra la ruta, es como un catch, monta un middleware que se ejecuta cuando no se encuentra la ruta
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});