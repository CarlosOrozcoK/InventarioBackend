import Producto from "../producto/producto.model.js";

export const agregarProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json({ message: "Producto creado", producto });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Número de placa o serie ya existe" });
        }
        res.status(500).json({ message: "Error al crear producto", error });
    }
};

export const editarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto actualizado", producto });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Número de placa o serie duplicado" });
        }
        res.status(500).json({ message: "Error al actualizar producto", error });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByIdAndDelete(id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado", producto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar producto", error });
    }
};


export const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener producto", error });
    }
};

export const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al listar productos", error });
    }
};
