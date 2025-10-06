# AplicacionesInternet-Lab3
Pagina Web "Planificador de tareas", con front end y back end separados.

Esta aplicación web permite gestionar tareas con autenticación de usuarios. El frontend está desarrollado con React y el backend con Node.js/Express y MongoDB.

---

## Instalación

### Backend
1. Desde la raiz, levantar una instancia local de MongoDB en Docker, usando el docker-compose del proyecto:

docker-compose up -d

2. Ir a la carpeta backend e instalar las dependencias con:

npm install

3. Crear archivo `.env` con las siguientes variables:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/gestor-tareas
JWT_SECRET= ***

4. Ejecutar backend con:

npm run dev

---

### Frontend

1. Ir a la carpeta frontend e instalar las dependencias con :

npm install

2. Ejecutar frontend con:

npm start

---

Finalmente, acceder a la pagina en `http://localhost:3000`.

---

## Variables de entorno
| Variable     | Descripción
|--------------|-------------------------------------
| PORT         | Puerto donde corre el backend
| MONGODB_URI  | URL para conexión con MongoDB
| JWT_SECRET   | Clave secreta para firmar tokens JWT
---


## Endpoints principales

Base URL: `http://localhost:5000/api`

| Método | Endpoint           | Descripción                     
|--------|--------------------|---------------------------------
| POST   | `/auth/register`   | Registrar nuevo usuario
| POST   | `/auth/login`      | Iniciar sesión y recibir token
| GET    | `/tasks`           | Obtener tareas del usuario
| POST   | `/tasks`           | Crear nueva tarea
| PUT    | `/tasks/:id`       | Actualizar tarea (ej: estado)
| DELETE | `/tasks/:id`       | Eliminar tarea por ID

---