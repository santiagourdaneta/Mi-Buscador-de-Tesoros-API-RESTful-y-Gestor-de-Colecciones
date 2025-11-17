# 💎 Mi Buscador de Tesoros: API RESTful y Gestor de Colecciones (Node.js & MongoDB)

**Mi Buscador de Tesoros** es una aplicación web full-stack diseñada para la gestión robusta de colecciones de ítems. Su principal propósito es demostrar la implementación de un backend **API RESTful** completo utilizando el stack **Node.js, Express.js y MongoDB/Mongoose**, junto con una interfaz de usuario básica en JavaScript vanilla para la interacción.

Este proyecto es ideal para comprender los fundamentos de las arquitecturas basadas en recursos, el modelado de datos NoSQL y la optimización de consultas de búsqueda.

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Backend (Server)** | **Node.js** | Entorno de ejecución asíncrono y de alto rendimiento. |
| **Framework Web** | **Express.js** | Capa mínima y flexible para definir rutas de API y middlewares. |
| **Base de Datos** | **MongoDB** | Base de datos NoSQL, flexible y escalable. |
| **ODM (Modelado)** | **Mongoose** | Mapeo de Documentos Objeto (ODM) para la modelación y validación de esquemas en MongoDB. |
| **Frontend (UI)** | **HTML5, CSS3, Vanilla JS** | Interfaz de usuario básica (SPA) para consumir la API. |

## ✨ Características Principales de la API

El servidor implementa todos los principios de la arquitectura RESTful para la gestión del recurso `/items`:

* **Operaciones CRUD Completas:** Rutas **POST**, **GET**, **PUT**, y **DELETE** para el ciclo de vida completo de un ítem.
* **Búsqueda Avanzada:** Implementación de consultas **Full-Text Search (`$text`)** en MongoDB, permitiendo búsquedas rápidas por palabras clave en múltiples campos.
* **Paginación Eficiente:** Manejo de parámetros `page` y `limit` en las rutas `GET` para optimizar la transferencia de datos y mejorar la escalabilidad.
* **Conexión Robusta:** Configuración de Mongoose para asegurar una conexión estable y manejo de errores con la instancia de MongoDB.

## 🚀 Instalación y Ejecución Local

### Prerrequisitos

Asegúrate de tener instalados:
1.  **Node.js y npm** (o yarn).
2.  **MongoDB Community Server** corriendo localmente (por defecto en el puerto `27017`).

### Pasos

#### 1. Clonar el Repositorio

```bash
git clone [https://github.com/santiagourdaneta/Mi-Buscador-de-Tesoros-API-RESTful-y-Gestor-de-Colecciones.git](https://github.com/santiagourdaneta/Mi-Buscador-de-Tesoros-API-RESTful-y-Gestor-de-Colecciones.git)
cd Mi-Buscador-de-Tesoros-API-RESTful-y-Gestor-de-Colecciones

2. Instalar Dependencias del Backend

npm install

3. Ejecutar el Servidor
Asegúrate de que tu servidor de MongoDB esté activo antes de ejecutar este paso.

node server.js

El servidor estará escuchando en http://localhost:3000.

📌 Documentación de Endpoints
Para interactuar con la API (usando Postman o Insomnia):

POST /items Crea un nuevo ítem (tesoro).
GET /items Obtiene todos los ítems con paginación (?page=1&limit=10).
GET  /items/:id Obtiene un ítem específico por ID.
GET /items/search Búsqueda por texto y/o etiquetas (?q=texto&tag=joya).
PUT /items/:id Actualiza un ítem existente por ID.
DELETE /items/:id Elimina un ítem por ID.

La interfaz de usuario simple para demostración está disponible en: http://localhost:3000/.




