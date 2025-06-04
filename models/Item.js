// models/Item.js

const mongoose = require('mongoose'); // Necesitamos Mongoose para definir el esquema

// Definimos la "forma" de nuestro Tesoro
// Imagina que queremos guardar cosas con un 'nombre' y una 'descripcion'
const itemSchema = new mongoose.Schema({
  name: { // El nombre del tesoro
    type: String, // Será un texto
    required: true, // Es obligatorio, no puede estar vacío
    unique: true // Cada tesoro debe tener un nombre único (para que no haya dos iguales)
  },
  description: { // Una pequeña descripción del tesoro
    type: String, // También será un texto
    required: false // No es obligatorio, puede estar vacío si quieres
  },
  tags: { // Palabras clave para ayudar a buscar
    type: [String], // Será una lista de textos (por ejemplo, ["antiguo", "brillante"])
    default: [] // Si no pones nada, estará vacío
  }
}, {
  timestamps: true // Esto añade automáticamente 'createdAt' y 'updatedAt' (cuándo se creó y cuándo se modificó)
});

// Opcional pero útil: Crear un índice para búsquedas rápidas
// Esto le dice a MongoDB que cree un "índice" en los campos 'name' y 'description'
// para que la búsqueda sea muy, muy rápida, como un índice de un libro.
// El 'text' significa que lo usaremos para buscar por texto.
itemSchema.index({ name: 'text', description: 'text', tags: 'text' });


// Creamos el "Modelo" de Tesoro
// Este es el "Molde" que usaremos para crear, guardar y encontrar Tesoros en la base de datos
const Item = mongoose.model('Item', itemSchema);

module.exports = Item; // Exportamos el molde para poder usarlo en nuestro 'server.js'