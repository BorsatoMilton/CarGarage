import { Router } from 'express';
import { sanitizeRolInput, findAll, findOneByName, findOneById, add, update, remove } from './rol.controler.js';

export const rolRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Rol:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador único del rol
 *         nombreRol:
 *           type: string
 *           description: Nombre del rol
 *       required:
 *         - nombreRol
 */

/**
 * @swagger
 * /api/rol:
 *   get:
 *     summary: Obtiene una lista de todos los roles
 *     tags: [Rol]
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rol'
 *       500:
 *         description: Error al obtener los roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener los roles
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
rolRouter.get('/', findAll);

/**
 * @swagger
 * /api/rol/byname/{name}:
 *   get:
 *     summary: Obtiene un rol por su nombre
 *     tags: [Rol]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del rol
 *     responses:
 *       200:
 *         description: Rol encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       404:
 *         description: Rol no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rol no encontrado
 *       500:
 *         description: Error al obtener el rol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener el rol
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
rolRouter.get('/byname/:name', findOneByName);

/**
 * @swagger
 * /api/rol/{id}:
 *   get:
 *     summary: Obtiene un rol por su ID
 *     tags: [Rol]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       404:
 *         description: Rol no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rol no encontrado
 *       500:
 *         description: Error al obtener el rol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener el rol
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
rolRouter.get('/:id', findOneById);

/**
 * @swagger
 * /api/rol:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags: [Rol]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       201:
 *         description: Rol creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       500:
 *         description: Error al crear el rol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear el rol
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
rolRouter.post('/', sanitizeRolInput, add);

/**
 * @swagger
 * /api/rol/{id}:
 *   put:
 *     summary: Actualiza un rol existente
 *     tags: [Rol]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       200:
 *         description: Rol actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       404:
 *         description: Rol no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rol no encontrado
 *       500:
 *         description: Error al actualizar el rol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al actualizar el rol
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
rolRouter.put('/:id', sanitizeRolInput, update);

/**
 * @swagger
 * /api/rol/{id}:
 *   patch:
 *     summary: Actualiza parcialmente un rol existente
 *     tags: [Rol]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       200:
 *         description: Rol actualizado parcialmente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       404:
 *         description: Rol no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rol no encontrado
 *       500:
 *         description: Error al actualizar parcialmente el rol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al actualizar parcialmente el rol
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
rolRouter.patch('/:id', sanitizeRolInput, update);

/**
 * @swagger
 * /api/rol/{id}:
 *   delete:
 *     summary: Elimina un rol existente
 *     tags: [Rol]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       404:
 *         description: Rol no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rol no encontrado
 *       500:
 *         description: Error al eliminar el rol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al eliminar el rol
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
rolRouter.delete('/:id', remove);

//Por el momento dejar put, patch y remove. Creo que el rolComponent lo hacemos fleco