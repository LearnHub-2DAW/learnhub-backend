# LearnHub Backend

API REST del proyecto LearnHub, una plataforma de gestión de alumnos, cursos y tareas estilo Moodle simplificado.

## Tecnologías

- **Node.js** v22
- **Express** v5
- **MariaDB** (en VPS compartido)
- **JWT** para autenticación
- **Zod** para validación de datos
- **bcryptjs** para hash de contraseñas

## Requisitos previos

- [NVM](https://github.com/nvm-sh/nvm) instalado
- Acceso a las credenciales del VPS (pedir al equipo)

## Puesta en marcha

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd learnhub-backend

# 2. Usar la versión correcta de Node
nvm use

# 3. Instalar dependencias
npm install

# 4. Configurar variables de entorno
cp .env.example .env
# Editar .env con las credenciales del VPS
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (por defecto 3000) |
| `DB_HOST` | IP del VPS donde corre MariaDB |
| `DB_PORT` | Puerto de MariaDB (por defecto 3306) |
| `DB_USER` | Usuario de la base de datos |
| `DB_PASSWORD` | Contraseña de la base de datos |
| `DB_NAME` | Nombre de la base de datos |
| `JWT_SECRET` | Clave secreta para firmar los tokens JWT (pedir al equipo) |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token (por defecto 8h) |
| `FRONTEND_URL` | URL del frontend React (por defecto http://localhost:5173) |

## Scripts

```bash
npm run dev   # Desarrollo: arranca con nodemon (reinicio automático)
npm start     # Producción: arranca con node
```

## Estructura del proyecto

```
src/
├── config/
│   └── db.js              # Conexión a MariaDB (pool de conexiones)
├── controllers/
│   └── auth.controller.js # Lógica de registro y login
├── middlewares/
│   ├── auth.middleware.js  # Verificación de JWT y roles
│   └── validate.middleware.js # Validación de body con Zod
├── models/
│   └── usuario.model.js   # Consultas SQL de usuarios
├── routes/
│   └── auth.routes.js     # Rutas de autenticación
├── schemas/
│   └── auth.schema.js     # Esquemas de validación de auth
├── app.js                 # Configuración de Express
└── server.js              # Arranque del servidor
```

## Endpoints

### Autenticación

#### `POST /api/auth/register`
Registra un nuevo usuario con rol **alumno** por defecto.

**Body:**
```json
{
  "nombre_usuario": "string (3-100 caracteres)",
  "correo_electronico": "string (formato email)",
  "contrasena": "string (mínimo 8 caracteres)",
  "nombre_completo": "string (2-150 caracteres)"
}
```

**Respuesta 201:**
```json
{
  "message": "Usuario registrado correctamente"
}
```

---

#### `POST /api/auth/login`
Inicia sesión y devuelve un token JWT.

**Body:**
```json
{
  "correo_electronico": "string",
  "contrasena": "string"
}
```

**Respuesta 200:**
```json
{
  "token": "eyJ...",
  "usuario": {
    "id": 1,
    "nombre_usuario": "string",
    "nombre_completo": "string",
    "correo_electronico": "string",
    "roles": ["alumno"]
  }
}
```

---

### Uso del token JWT

Para acceder a rutas protegidas, incluir el token en la cabecera de la petición:

```
Authorization: Bearer <token>
```

## Roles

| ID | Rol |
|---|---|
| 1 | admin |
| 2 | profesor |
| 3 | alumno |
