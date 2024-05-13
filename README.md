# Documentación del Backend de Agora

## Descripción del Proyecto

Este backend proporciona la funcion de gestionar el contenido y los datos en el clon del sitio web Agora2023. Incluye servicios para la gestión de artículos y suscriptores, utilizando una base de datos MongoDB para almacenar la información.

## Infraestructura y URLs de Acceso

- **Alojado en**: Railway
- **URL Base**: https://backagora.up.railway.app/
- **Endpoint de Artículos**: https://backagora.up.railway.app/api/articles
- **Endpoint de Suscriptores**: https://backagora.up.railway.app/api/subscribers

## Tecnologías Utilizadas

- **Node.js y Express**: Frameworks de servidor para manejar las solicitudes HTTP y la lógica del backend.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar datos de artículos y suscriptores.
- **Cloudinary**: Servicio de nube para almacenar y gestionar imágenes.
- **Cors**: Middleware para habilitar CORS y gestionar la seguridad en las solicitudes entre dominios.
- **Dotenv**: Utilizado para manejar variables de entorno.
- **Multer**: Middleware para manejar la carga de archivos.
- **Body-parser**: Middleware para analizar el cuerpo de las solicitudes HTTP.

## Buenas Prácticas Implementadas

- **Arquitectura de software limpia**: Utilización de una estructura de carpetas dividida en modelos, rutas y controladores para separar responsabilidades y mejorar la mantenibilidad.
- **Gestión de dependencias**: Uso cuidadoso de las dependencias para reducir la carga y mejorar la eficiencia.
- **Seguridad**: Implementación de CORS y manejo seguro de las imágenes mediante Cloudinary para proteger contra vulnerabilidades comunes en aplicaciones web.


## URLs de Acceso Detalladas

Este backend es accesible a través de los siguientes endpoints:

- **Artículos**:
  - Crear: POST a /api/articles
  - Leer todos: GET a /api/articles
  - Leer uno específico: GET a /api/articles/{id}
  - Actualizar: PUT a /api/articles/{id}
  - Eliminar: DELETE a /api/articles/{id}

- **Suscriptores**:
  - Crear : POST a /api/subscribers

