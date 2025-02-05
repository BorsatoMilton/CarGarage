import cron from "node-cron";
import { Alquiler } from "../components/alquiler/alquiler.entity.js";
import { orm } from "../shared/db/orm.js";

cron.schedule("*/10 * * * *", async () => {
  console.log("Revisando estados de alquiler...");

  const ahora = new Date();
  const em = orm.em.fork();

  try {
    const alquileresNoConfirmados = await em.find(Alquiler, {
      estadoAlquiler: "PENDIENTE",
      tiempoConfirmacion: { $lt: ahora }, //lt = less than en mongo
    });

    const alquileresEnCurso = await em.find(Alquiler, {
      estadoAlquiler: "CONFIRMADO",
      fechaHoraInicioAlquiler: { $lt: ahora },
    });

    const alquileresFinalizados = await em.find(Alquiler, {
      estadoAlquiler: "EN CURSO",
      fechaHoraDevolucion: { $lt: ahora },
    });

    if (alquileresNoConfirmados.length > 0) {
      console.log(
        `${alquileresNoConfirmados.length} alquiler(es) no fueron confirmados a tiempo.`
      );
      for (const alquiler of alquileresNoConfirmados) {
        alquiler.estadoAlquiler = "NO CONFIRMADO";
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
      }
    }

    await em.flush();
    console.log("Estados de alquiler actualizados correctamente.");
  } catch (error) {
    console.error("Error actualizando estados de alquiler:", error);
  }
});
