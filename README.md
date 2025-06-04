Mi Buscador de Tesoros es una aplicación web full-stack sencilla diseñada para gestionar una colección de ítems, simulando "tesoros", a través de una API RESTful robusta. El backend, construido con Node.js y Express.js, interactúa con una base de datos MongoDB (utilizando Mongoose para la modelación de datos). La aplicación proporciona todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y una potente funcionalidad de búsqueda de texto completo con paginación.

La interfaz de usuario es una aplicación de una sola página (SPA) desarrollada con HTML, CSS y JavaScript vainilla. Permite a los usuarios añadir nuevos tesoros, ver la lista completa con paginación, buscar tesoros por palabras clave o etiquetas, y editar o eliminar ítems existentes de forma interactiva.

Este proyecto es ideal para comprender los fundamentos del desarrollo de APIs RESTful con el stack MERN (MongoDB, Express.js, React/Angular/Vue - aunque aquí se usa JS vainilla en el frontend) y cómo conectar una aplicación Node.js a una base de datos NoSQL.

# Mi Buscador de Tesoros: API RESTful y Gestor de Colecciones

## Descripción del Proyecto

**Mi Buscador de Tesoros** es una aplicación web full-stack sencilla que te permite gestionar una colección de "tesoros" (ítems) a través de una API RESTful. El proyecto está diseñado para ilustrar cómo construir un backend con **Node.js** y **Express.js** que se conecta a una base de datos **MongoDB** (utilizando Mongoose para la modelación de datos).

La aplicación ofrece todas las operaciones esenciales para la gestión de datos (CRUD):
- **Crear (Create):** Añadir nuevos tesoros a la colección.
- **Leer (Read):** Obtener tesoros individuales, todos los tesoros con paginación, o buscar tesoros por texto completo y etiquetas.
- **Actualizar (Update):** Modificar los detalles de un tesoro existente.
- **Eliminar (Delete):** Borrar tesoros de la colección.

Además, cuenta con una interfaz de usuario básica, construida con HTML, CSS y JavaScript vainilla, que permite interactuar con la API directamente desde el navegador.

## Características

- **Backend RESTful:** Desarrollado con Node.js y Express.js.
- **Base de Datos MongoDB:** Persistencia de datos mediante Mongoose ORM.
- **Modelo de Datos `Item`:** Definición clara de la estructura de los tesoros (nombre, descripción, etiquetas).
- **Operaciones CRUD Completas:** Rutas de API para `POST`, `GET`, `PUT`, `DELETE`.
- **Búsqueda Avanzada:** Funcionalidad de búsqueda de texto completo (`$text`) y filtrado por etiquetas.
- **Paginación:** Manejo eficiente de grandes conjuntos de datos, mostrando los resultados en páginas.
- **Validación de Datos:** Asegura la integridad de los datos al guardar y actualizar tesoros.
- **Interfaz de Usuario (Frontend):** Sencilla SPA (Single Page Application) en HTML, CSS y JavaScript para interacción básica.

## Tecnologías Utilizadas

- **Node.js:** Entorno de ejecución JavaScript.
- **Express.js:** Framework web para Node.js.
- **MongoDB:** Base de datos NoSQL.
- **Mongoose:** ODM (Object Data Modeling) para MongoDB en Node.js.
- **HTML5:** Estructura de la interfaz de usuario.
- **CSS3:** Estilos básicos para la interfaz.
- **JavaScript (vainilla):** Lógica del lado del cliente para interactuar con la API.

## Cómo Ejecutar el Proyecto Localmente

Sigue estos pasos para poner en marcha el "Buscador de Tesoros" en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:

- **Node.js y npm:** [Descargar Node.js](https://nodejs.org/) (npm se instala junto con Node.js).
- **MongoDB Community Server:** [Descargar MongoDB](https://www.mongodb.com/try/download/community).
- Una herramienta de terminal (CMD, PowerShell, Git Bash, etc.).
- Un editor de código.

### Pasos de Instalación y Ejecución

1.  **Clona o Descarga el Proyecto:**
    Si estás usando Git, puedes clonar el repositorio:
    
    git clone https://github.com/santiagourdaneta/Mi-Buscador-de-Tesoros-API-RESTful-y-Gestor-de-Colecciones/
    cd Mi-Buscador-de-Tesoros-API-RESTful-y-Gestor-de-Colecciones/
    
    Si lo descargaste como ZIP, descomprime la carpeta y navega a ella.

2.  **Instala las Dependencias del Backend:**
    Desde la raíz de la carpeta `Mi-Buscador-de-Tesoros-API-RESTful-y-Gestor-de-Colecciones` en tu terminal, ejecuta:
    
    npm install
   
    Esto instalará `express` y `mongoose`.

3.  **Configura y Ejecuta MongoDB:**
    - **Crea el directorio de datos:** Si no existe, crea una carpeta para los datos de MongoDB. Por defecto, es `C:\data\db`.
      
      # En tu terminal (como Administrador)
      mkdir C:\data\db
     
    - **Inicia el servidor de MongoDB:** Abre una **nueva ventana de terminal (como Administrador)**. Navega al directorio `bin` de tu instalación de MongoDB y ejecuta `mongod.exe`:
      
      cd "C:\Program Files\MongoDB\Server\8.0\bin" # Ajusta la versión si es diferente
      .\mongod.exe --dbpath C:\data\db
     
      Mantén esta ventana de terminal abierta; es donde se ejecuta tu base de datos. Verás mensajes como `waiting for connections on port 27017`.

4.  **Ejecuta el Servidor de Node.js:**
    Vuelve a la terminal principal de tu proyecto (`Mi-Buscador-de-Tesoros-API-RESTful-y-Gestor-de-Colecciones`). 
    
    node server.js
    
    Verás mensajes como `¡Conexión exitosa a la cajita de tesoros (MongoDB)!` y `El robot buscador está escuchando en el puerto 3000`.

5.  **Accede a la Interfaz de Usuario:**
    Abre tu navegador web y ve a:
    
    http://localhost:3000/
   
    Deberías ver la interfaz de "Mi Buscador de Tesoros".

## Uso de la API (para pruebas directas)

Puedes interactuar con la API usando herramientas como **Postman**, **Insomnia**, o la extensión **Thunder Client** en VS Code.

-   **`POST /items`**
    -   Guarda un nuevo tesoro.
    -   `Body` (raw JSON):
       
        {
          "name": "Collar de Perlas Brillante",
          "description": "Un collar antiguo encontrado en un galeón hundido.",
          "tags": ["joya", "marino", "antiguo", "brillante"]
        }
       
-   **`GET /items`**
    -   Obtiene todos los tesoros con paginación.
    -   Ejemplo: `http://localhost:3000/items?page=1&limit=5`
-   **`GET /items/search?q=<texto>&tag=<etiqueta>&page=<num>&limit=<num>`**
    -   Busca tesoros por texto y/o etiqueta, con paginación.
    -   Ejemplos:
        - `http://localhost:3000/items/search?q=galeón`
        - `http://localhost:3000/items/search?tag=antiguo`
        - `http://localhost:3000/items/search?q=collar&tag=joya&page=1&limit=3`
-   **`GET /items/:id`**
    -   Obtiene un tesoro específico por su ID.
    -   Ejemplo: `http://localhost:3000/items/60c72b2f9f1b2c001c8e4d5f` (reemplaza con un ID real)
-   **`PUT /items/:id`**
    -   Actualiza un tesoro existente por su ID.
    -   `Body` (raw JSON - solo los campos a actualizar):
        
        {
          "description": "Collar antiguo restaurado, ahora más brillante.",
          "tags": ["joya", "restaurado", "brillante"]
        }
       
-   **`DELETE /items/:id`**
    -   Elimina un tesoro por su ID.
    -   Ejemplo: `http://localhost:3000/items/60c72b2f9f1b2c001c8e4d5f`
