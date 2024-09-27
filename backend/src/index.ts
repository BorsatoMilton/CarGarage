import 'reflect-metadata';
import express from 'express';
import { orm } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { vehiculoRouter } from './vehiculo/vehiculo.routes.js';
import { marcaRouter } from './vehiculo/marca.routes.js';
import { categoriaRouter } from './vehiculo/categoria.routes.js';
import { usuarioRouter } from './usuario/usuario.routes.js';
import { tarjetaRouter } from './usuario/tarjeta.routes.js';
import { calificacionRouter } from './usuario/calificacion.routes.js';
import { compraRouter } from './compra/compra.routes.js';
import { lineacompraRouter } from './compra/lineacompra.routes.js';
import { correoRouter } from './correo/correo.routes.js';
import cors from 'cors';
import { alquilerRouter } from './alquiler/alquiler.routes.js';
import { rolRouter } from './usuario/rol.routes.js';


const app = express();
app.use(cors(
  {origin: 'http://localhost:4200'}
));
app.use(express.json());
  
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

app.use('/api/categorias', categoriaRouter)
app.use('/api/marcas', marcaRouter)
app.use('/api/vehiculos', vehiculoRouter )
app.use('/api/usuarios', usuarioRouter )
app.use('/api/tarjetas', tarjetaRouter)
app.use ('/api/calificaciones', calificacionRouter)
app.use('/api/pedidos', compraRouter)
app.use('/api/lineacompras', lineacompraRouter)
app.use('/api/recuperacion', correoRouter);
app.use('/api/alquiler', alquilerRouter);
app.use('/api/rol', rolRouter);




app.use((_, res) => {
    return res.status(404).json({ message: "Resource not found" }); //el use sirve para cuando no se encuentra la ruta, es como un catch, monta un middleware que se ejecuta cuando no se encuentra la ruta
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});