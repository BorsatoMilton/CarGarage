import { Request, Response, NextFunction } from "express";
import { orm } from "../../shared/db/orm.js";
import { Marca } from "./marca.entity.js";

const em = orm.em;

function sanitizeModeloInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombreMarca: req.body.nombreMarca,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const marcas = await em.find(Marca, {});
    res.status(200).json(marcas);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const marca = await em.findOneOrFail(Marca, { id });
    res.status(200).json(marca);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function findOneByName(req: Request, res: Response) {
  try {
    const nombre = req.params.name.toUpperCase();
    const marca = await em.findOneOrFail(Marca, { nombreMarca: nombre });
    res.status(200).json(marca);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
      req.body.sanitizedInput.nombreMarca = req.body.sanitizedInput.nombreMarca.toUpperCase();
      const marcaExistente = await em.findOne(Marca, {
      nombreMarca: req.body.sanitizedInput.nombreMarca,
    });
    if (marcaExistente) {
      return res.status(400).json({ message: "La marca ya existe" });
    } else {
      const marca = em.create(Marca, req.body.sanitizedInput);
      await em.flush();
      res.status(201).json({ message: "Marca creada", data: marca });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Ocurrio un error al crear la marca" });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const marcaAactualizar = await em.findOneOrFail(Marca, { id });
    if (!marcaAactualizar) {
      return res.status(400).json({ message: "La marca no existe" });
    } else {
      em.assign(marcaAactualizar, req.body.sanitizedInput);
      await em.flush();
      res
        .status(200)
        .json({ message: "Marca actualizada", data: marcaAactualizar });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const marcaAeliminar = em.getReference(Marca, id);
    if (!marcaAeliminar) {
      return res.status(400).json({ message: "La marca no existe" });
    } else {
      await em.removeAndFlush(marcaAeliminar);
      res.status(200).json({ message: "Marca eliminada" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  findAll,
  findOne,
  add,
  update,
  remove,
  sanitizeModeloInput,
  findOneByName,
};
