import cron from "node-cron";
import { Alquiler } from "../components/alquiler/alquiler.entity.js";
import { orm } from "../shared/db/orm.js";
import { avisoPuntuarAlquiler } from "../components/correo/correo.controller.js";
import { Compra } from "../components/compra/compra.entity.js";
import { Vehiculo } from "../components/vehiculo/vehiculo.entity.js";

cron.schedule("*/1 * * * *", async () => {
  console.log("Revisando estados de alquiler...");

  const ahora = new Date();
  const em = orm.em.fork();

  try {
    const alquileresNoConfirmados = await em.find(Alquiler, {
      estadoAlquiler: "PENDIENTE",
      tiempoConfirmacion: { $lt: ahora },
    });

    const alquileresNoConfirmadosAborrar = await em.find(Alquiler, {
      estadoAlquiler: "NO CONFIRMADO",
    });

    const alquileresEnCurso = await em.find(Alquiler, {
      estadoAlquiler: "CONFIRMADO",
      fechaHoraInicioAlquiler: { $lt: ahora },
    });

    const alquileresFinalizados = await em.find(Alquiler, {
      estadoAlquiler: "EN CURSO",
      fechaHoraDevolucion: { $lt: ahora },
    }, { populate: ['locatario', 'vehiculo', 'vehiculo.propietario', 'vehiculo.marca'] });

    const comprasSinConfirmar = await em.find(Compra, {
      estadoCompra: "PENDIENTE",
      fechaLimiteConfirmacion: { $lt: ahora },
    });

    const comprasSinConfirmarABorrar = await em.find(Compra, {
      estadoCompra: "NO CONFIRMADA",
      fechaLimiteConfirmacion: { $lt: ahora },
    })

    if (alquileresNoConfirmados.length > 0) {
      console.log(
        `${alquileresNoConfirmados.length} alquiler(es) no fueron confirmados a tiempo.`
      );
      for (const alquiler of alquileresNoConfirmados) {
        alquiler.estadoAlquiler = "NO CONFIRMADO";
      }
    }

    if (alquileresNoConfirmadosAborrar.length > 0) {
      for (const alquiler of alquileresNoConfirmadosAborrar) {
        console.log(`${alquileresNoConfirmadosAborrar.length} alquiler(es) no confirmados fueron borrados`)
        const diferenciaTiempo = Date.now() - new Date(alquiler.tiempoConfirmacion).getTime();
        const sieteDiasEnMs = 7 * 24 * 60 * 60 * 1000;
        if (diferenciaTiempo >= sieteDiasEnMs) {
          await em.removeAndFlush(alquiler);
        }
      }
    }
    
    if (alquileresEnCurso.length > 0) {
      console.log(
        `${alquileresEnCurso.length} alquiler(es) han comenzado y están en curso.`
      );
      for (const alquiler of alquileresEnCurso) {
        alquiler.estadoAlquiler = "EN CURSO";
      }
    }

    if (alquileresFinalizados.length > 0) {
      console.log(
        `${alquileresFinalizados.length} alquiler(es) han sido finalizados.`
      );
      for (const alquiler of alquileresFinalizados) {
        alquiler.estadoAlquiler = "FINALIZADO";
        await avisoPuntuarAlquiler(alquiler.locatario.id, alquiler.vehiculo.propietario.id ,alquiler);
      }
    }
    
    if (comprasSinConfirmar.length > 0) {
      console.log(`${comprasSinConfirmar.length} compra(as) han quedado sin confirmar.`)
      for (const compra of comprasSinConfirmar) {
        compra.estadoCompra = "NO CONFIRMADA";
      }
    }

    if (comprasSinConfirmarABorrar.length > 0) {
      console.log(`${comprasSinConfirmarABorrar.length} compra(as) no confirmadas fueron borradas`)
      for (const compra of comprasSinConfirmarABorrar) {
        const diferenciaTiempo = Date.now() - new Date(compra.fechaLimiteConfirmacion).getTime();
        const sieteDiasEnMs = 7 * 24 * 60 * 60 * 1000;
        if (diferenciaTiempo >= sieteDiasEnMs) {
          await em.removeAndFlush(compra);
        }
      }
    }
      
    await em.flush();
    console.log("Estados de alquiler actualizados correctamente.");
  } catch (error) {
    console.error("Error actualizando estados de alquiler:", error);
  }
});
