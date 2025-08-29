import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";
import productoModel from "../producto/producto.model.js";

// Validación para crear
export const validateProducto = [
    body("numeroSerie", "El número de serie no puede estar vacío")
        .notEmpty()
        .isString().withMessage("El número de serie debe ser una cadena de texto"),
    body("numeroSerie").custom(async (value) => {
        const producto = await productoModel.findOne({ numeroSerie: value });
        if (producto) {
            throw new Error("El número de serie ya está registrado");
        }
        return true;
    }),

    body("numeroPlaca", "El número de placa no puede estar vacío")
        .notEmpty()
        .isString().withMessage("El número de placa debe ser una cadena de texto")
        .matches(/^(GT|G0)-\d{5}$/).withMessage("El número de placa debe tener el formato GT-00000 o G0-00000"),
    body("numeroPlaca").custom(async (value) => {
        const producto = await productoModel.findOne({ numeroPlaca: value });
        if (producto) {
            throw new Error("El número de placa ya está registrado");
        }
        return true;
    }),

    validateErrors
];

// Validación para editar
export const validateProductoEditar = [
    body("numeroSerie", "El número de serie no puede estar vacío")
        .notEmpty()
        .isString().withMessage("El número de serie debe ser una cadena de texto"),
    body("numeroSerie").custom(async (value, { req }) => {
        const producto = await productoModel.findOne({ numeroSerie: value });
        if (producto && producto._id.toString() !== req.params.id) {
            throw new Error("El número de serie ya está registrado");
        }
        return true;
    }),

    body("numeroPlaca", "El número de placa no puede estar vacío")
        .notEmpty()
        .isString().withMessage("El número de placa debe ser una cadena de texto")
        .matches(/^(GT|G0)-\d{5}$/).withMessage("El número de placa debe tener el formato GT-00000 o G0-00000"),
    body("numeroPlaca").custom(async (value, { req }) => {
        const producto = await productoModel.findOne({ numeroPlaca: value });
        if (producto && producto._id.toString() !== req.params.id) {
            throw new Error("El número de placa ya está registrado");
        }
        return true;
    }),

    validateErrors
];
