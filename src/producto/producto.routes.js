import express from "express";
import {
    agregarProducto,
    editarProducto,
    eliminarProducto,
    obtenerProductoPorId,
    listarProductos
} from "../producto/producto.controller.js";

import { validateProducto, validateProductoEditar } from "../middlewares/validator.js";

const router = express.Router();

router.post("/", validateProducto, agregarProducto);

router.put("/editar/:id", validateProductoEditar, editarProducto);

router.delete("/eliminar/:id", eliminarProducto);

router.get("/buscar/:id", obtenerProductoPorId);

router.get("/listar", listarProductos);

export default router;
