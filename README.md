# Social Media · Laboratorio 06

Aplicación de publicaciones construida con Node.js, Express, EJS, MongoDB y Mongoose. Permite listar publicaciones de todos los usuarios, crearlas, editarlas y eliminarlas con confirmación.

## Requisitos

- Node.js 20 o superior
- MongoDB local o una instancia compatible

## Instalación

```bash
npm install
```

Crea un archivo `.env` en la raíz:

```env
MONGO_URI=mongodb://127.0.0.1:27017/social-media
PORT=3001
```

Ajusta la URI según tu instalación. Después ejecuta:

```bash
npm run seed
npm run dev
```

Si `nodemon` no puede iniciarse en tu entorno, usa `npm start`. Abre `http://localhost:3001`.

## Rutas

| Ruta | Acción |
| --- | --- |
| `GET /` | Portada y publicaciones recientes |
| `GET /posts` | Lista de todas las publicaciones |
| `GET /posts/new` | Formulario de creación |
| `POST /posts` | Crear publicación |
| `GET /posts/:id/edit` | Formulario de edición |
| `PUT /posts/:id` | Actualizar publicación |
| `DELETE /posts/:id` | Eliminar publicación |
| `GET /users` | Lista de usuarios |
| `POST /users` | Crear usuario |

Los formularios HTML envían las acciones `PUT` y `DELETE` mediante `method-override`.

## Datos de demostración

`npm run seed` crea tres usuarios ficticios y cuatro publicaciones con distintos hashtags; hay publicaciones con y sin imagen. Se puede repetir sin duplicar esos registros. Los datos se guardan en la base indicada por `MONGO_URI`.

## Comprobación del CRUD

1. Entra en `/posts` y verifica el listado.
2. Crea una publicación en `/posts/new`.
3. Regresa al listado, edítala y comprueba el cambio.
4. Elimínala después de confirmar en el diálogo.
5. Comprueba las colecciones `users` y `posts` en MongoDB Compass o mongosh.

Para la entrega del laboratorio, captura la portada, el listado, el formulario, la confirmación de eliminación y las colecciones de MongoDB.
