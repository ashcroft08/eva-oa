import { Institucion } from "../models/Institucion.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, 'logo_institucion' + path.extname(file.originalname)); // Nombre fijo para el archivo
    }
});

// Configuración de multer con validación de tipo de archivo
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: El archivo debe ser una imagen válida.'));
    }
});

// Controlador para obtener la institución
export const getInstitucion = async (req, res) => {
    try {
        const institucion = await Institucion.findOne(); // Obtener la única institución

        if (!institucion) {
            return res.status(404).json({ message: 'Institución no encontrada.' });
        }

        res.json(institucion);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la institución.', error });
    }
};

// Controlador para crear una institución
export const createInstitucion = async (req, res) => {
    try {
        const existingInstitucion = await Institucion.findOne(); // Verificar si ya existe una institución
        if (existingInstitucion) {
            return res.status(400).json({ message: 'Ya existe una institución registrada.' });
        }

        const { nombre_institucion } = req.body;
        const logo_institucion = req.file ? req.file.path : null; // Ruta del logo

        const nuevaInstitucion = await Institucion.create({
            nombre_institucion,
            logo_institucion
        });

        res.status(201).json(nuevaInstitucion);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la institución.', error });
    }
};

// Controlador para eliminar una institución
export const deletedInstitucion = async (req, res) => {
    try {
        const institucion = await Institucion.findOne();
        if (!institucion) {
            return res.status(404).json({ message: 'Institución no encontrada.' });
        }

        // Eliminar el archivo del logo si existe
        if (institucion.logo_institucion) {
            fs.unlinkSync(institucion.logo_institucion);
        }

        await institucion.destroy();
        res.json({ message: 'Institución eliminada.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la institución.', error });
    }
};

// Controlador para actualizar una institución
export const updateInstitucion = async (req, res) => {
    try {
        const institucion = await Institucion.findOne();
        if (!institucion) {
            return res.status(404).json({ message: 'Institución no encontrada.' });
        }

        const { nombre_institucion } = req.body;

        // Si se sube un nuevo logo, se actualiza la ruta
        if (req.file) {
            // Eliminar el archivo anterior si existe
            if (institucion.logo_institucion) {
                fs.unlinkSync(institucion.logo_institucion);
            }
            institucion.logo_institucion = req.file.path;
        }

        institucion.nombre_institucion = nombre_institucion || institucion.nombre_institucion;
        await institucion.save();

        res.json(institucion);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la institución.', error });
    }
};

// Exportar el middleware de multer para usarlo en las rutas
export const uploadLogo = upload.single('logo_institucion');