// server.js

// Importar las "herramientas" que instalamos
const express = require('express'); // Nuestro "robot" para el servidor web
const mongoose = require('mongoose'); // Nuestro "libro de reglas" para MongoDB
const Item = require('./models/Item'); // ¡Importamos nuestro "Molde de Tesoro" que definimos!

// Configuración de la base de datos (¡La dirección de nuestra cajita de tesoros!)
// Asegúrate que tu servidor de MongoDB esté corriendo (ver mensajes anteriores)
const DB_URI = 'mongodb://localhost:27017/mi_buscador_db'; // Puedes cambiar 'mi_buscador_db' si quieres

// Conectar a MongoDB
mongoose.connect(DB_URI)
  .then(() => {
    console.log('¡Conexión exitosa a la cajita de tesoros (MongoDB)!');
  })
  .catch((err) => {
    console.error('¡Ups! No pudimos conectar a la cajita de tesoros:', err);
    process.exit(1); // Detiene la aplicación si no se puede conectar a la DB
  });

// Inicializar nuestro "robot" Express
const app = express();

// Middleware: Esto le dice a Express que entienda los mensajes en formato JSON
app.use(express.json());

// Middleware: Esto le dice a Express que sirva archivos estáticos desde la carpeta 'public'
// Cuando alguien visite http://localhost:3000/, automáticamente buscará 'index.html' en 'public'
app.use(express.static('public')); // <--- ¡Añade esta línea!


// --- Rutas de nuestro "robot" (API RESTful) ---

// 1. Ruta de bienvenida (GET /)
// Cuando alguien visite la dirección principal, el robot dirá un mensaje.
app.get('/', (req, res) => {
  res.send('<h1>¡Hola desde mi Buscador de Tesoros! El robot está funcionando.</h1>');
});

// 2. Ruta para GUARDAR un Tesoro (POST /items)
// Permite añadir un nuevo tesoro a la base de datos.
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body); // Crea un nuevo Tesoro usando nuestro "Molde" con la info recibida
    await newItem.save(); // ¡Guarda el nuevo Tesoro en la cajita!
    res.status(201).json(newItem); // Responde con el Tesoro creado y un estado 201 (Creado)
    console.log('Nuevo Tesoro guardado:', newItem.name);
  } catch (error) {
    if (error.code === 11000) { // Código 11000 indica un error de clave única (nombre duplicado)
      res.status(409).json({ message: 'Error: El nombre del tesoro ya existe.', details: error.message });
    } else if (error.name === 'ValidationError') { // Error si faltan campos requeridos o no cumplen el tipo
        res.status(400).json({ message: 'Error de validación: Asegúrate de que todos los campos requeridos estén correctos.', details: error.message });
    } else {
      res.status(400).json({ message: 'Error al guardar el tesoro', details: error.message });
    }
  }
});

// 3. Ruta para BUSCAR Tesoros (GET /items/search)
// Permite buscar tesoros por texto (q) y/o por etiqueta (tag), con paginación.
app.get('/items/search', async (req, res) => {
  try {
    // Extrae los parámetros de la URL: 'q' (consulta de texto), 'tag' (etiqueta), 'page' (página actual), 'limit' (elementos por página)
    const { q, tag, page = 1, limit = 10 } = req.query;
    let query = {}; // Objeto para construir la consulta a MongoDB

    if (q) {
      // Si hay un texto de búsqueda, usa el índice de texto de MongoDB
      query.$text = { $search: q };
    }

    if (tag) {
      // Si hay una etiqueta, la añade al filtro (busca ítems que contengan esa etiqueta)
      query.tags = { $in: [tag] };
    }

    // Calcula cuántos documentos saltar y cuántos mostrar para la paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const parsedLimit = parseInt(limit);

    // Cuenta el total de documentos que coinciden con la consulta (para saber cuántas páginas hay en total)
    const totalItems = await Item.countDocuments(query);

    // Busca los documentos aplicando la consulta, saltando y limitando según la paginación
    const foundItems = await Item.find(query)
                                 .skip(skip)
                                 .limit(parsedLimit);
    
    // Responde con los datos encontrados y la información de paginación
    res.status(200).json({
      data: foundItems,
      currentPage: parseInt(page),
      perPage: parsedLimit,
      totalPages: Math.ceil(totalItems / parsedLimit), // Calcula el número total de páginas
      totalItems: totalItems
    });
    console.log(`Búsqueda realizada con query: ${JSON.stringify(req.query)} - Encontrados: ${foundItems.length} (Pág ${page} de ${Math.ceil(totalItems / parsedLimit)})`);

  } catch (error) {
    console.error('Error al buscar tesoros:', error);
    res.status(500).json({ message: 'Error interno del servidor al buscar tesoros', details: error.message });
  }
});

// 4. Ruta para OBTENER UN SOLO Tesoro por ID (GET /items/:id)
// Permite obtener los detalles de un tesoro específico usando su ID único.
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id); // Busca el tesoro por su ID
        if (!item) {
            return res.status(404).json({ message: 'Tesoro no encontrado.' }); // Si no lo encuentra, devuelve 404
        }
        res.status(200).json(item); // Si lo encuentra, lo devuelve
        console.log(`Tesoro "${item.name}" obtenido por ID.`);
    } catch (error) {
        console.error('Error al obtener tesoro por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener tesoro.', details: error.message });
    }
});

// 5. Ruta para OBTENER TODOS los Tesoros (GET /items)
// Permite ver todos los tesoros almacenados, también con paginación.
app.get('/items', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Obtener 'page' y 'limit' de la URL
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const parsedLimit = parseInt(limit);

        const totalItems = await Item.countDocuments({}); // Contar todos los documentos
        const allItems = await Item.find({})
                                   .skip(skip)
                                   .limit(parsedLimit); // Aplicar paginación

        res.status(200).json({
            data: allItems,
            currentPage: parseInt(page),
            perPage: parsedLimit,
            totalPages: Math.ceil(totalItems / parsedLimit),
            totalItems: totalItems
        });
        console.log(`Mostrando todos los tesoros. Pág ${page} de ${Math.ceil(totalItems / parsedLimit)}`);
    } catch (error) {
        console.error('Error al obtener todos los tesoros:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener todos los tesoros', details: error.message });
    }
});


// 6. Ruta para ACTUALIZAR un Tesoro (PUT /items/:id)
// Permite modificar los datos de un tesoro existente usando su ID.
app.put('/items/:id', async (req, res) => {
    try {
        // Busca el tesoro por ID y lo actualiza con los datos del cuerpo de la solicitud
        // { new: true } asegura que devuelve el documento actualizado, no el antiguo
        // { runValidators: true } ejecuta las validaciones del esquema (ej. 'required') al actualizar
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Tesoro no encontrado para actualizar.' });
        }
        res.status(200).json(updatedItem); // Responde con el tesoro actualizado
        console.log(`Tesoro "${updatedItem.name}" (ID: ${updatedItem._id}) actualizado.`);
    } catch (error) {
        if (error.code === 11000) { // Error si el nombre ya existe (unique: true)
            res.status(409).json({ message: 'Error: El nombre del tesoro ya existe para otro ítem.', details: error.message });
        } else if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Error de validación al actualizar: Asegúrate de que los datos sean correctos.', details: error.message });
        } else {
            console.error('Error al actualizar tesoro:', error);
            res.status(400).json({ message: 'Error al actualizar el tesoro.', details: error.message });
        }
    }
});

// CÓDIGO FALTANTE:
app.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id); // Busca y elimina por ID

        if (!deletedItem) {
            return res.status(404).json({ message: 'Tesoro no encontrado para eliminar.' });
        }
        // Responde con un estado 200 (OK) y un mensaje de confirmación
        res.status(200).json({ message: 'Tesoro eliminado exitosamente.', deletedItem: deletedItem });
        console.log(`Tesoro "${deletedItem.name}" (ID: ${deletedItem._id}) eliminado.`);
    } catch (error) {
        console.error('Error al eliminar tesoro:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar tesoro.', details: error.message });
    }
}); // <--- ¡Esta llave de cierre '}' estaba faltando!

// 8. ¡Hacer que el robot escuche! (Iniciar el servidor)
const PORT = process.env.PORT || 3000; // Si no hay un puerto definido en el entorno, usa el 3000

app.listen(PORT, () => {
  console.log(`El robot buscador está escuchando en el puerto ${PORT}`);
  console.log(`¡Puedes visitar la página de bienvenida en http://localhost:${PORT}`);
  console.log(`--- Rutas de la API ---`);
  console.log(`POST /items          : Guardar un nuevo tesoro`);
  console.log(`GET /items/search?q=<texto>&tag=<etiqueta>&page=<num>&limit=<num> : Buscar tesoros con filtros y paginación`);
  console.log(`GET /items           : Ver todos los tesoros con paginación`);
  console.log(`GET /items/:id       : Obtener un tesoro por su ID`);
  console.log(`PUT /items/:id       : Actualizar un tesoro por su ID`);
  console.log(`DELETE /items/:id    : Eliminar un tesoro por su ID`);
});