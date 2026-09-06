# 🎬 Showflix Frontend

Plataforma de streaming con catálogo de películas, autenticación por roles (JWT), favoritos y panel de administración completo (CRUD de películas y usuarios con soft delete).

**Demo en vivo:** https://showflix-3n9.pages.dev

> La demo corre **sin backend** usando un **interceptor mock**: toda la funcionalidad (login admin, catálogo, favoritos, panel de administración) funciona con datos de ejemplo para que puedas probarla al instante.

---
🔑 Credenciales de la demo

| Rol | Email | Contraseña |
|---|---|---|
| **Admin** | `admin@email.com` | cualquier clave |
| **Usuario** | `maria@email.com` | cualquier clave |

Con el email de admin obtienes `ROLE_ADMIN` y acceso al dashboard.

---

## ✨ Features

- 🎞️ **Catálogo de películas** con búsqueda por título, filtro por género y ordenamiento.
- 👑 **Autenticación JWT** con roles `USER` y `ADMIN` (login + registro).
- ❤️ **Favoritos** por usuario (agregar / quitar).
- 🛠️ **Panel de administración** protegido por guards:
  - CRUD de películas (listado, edición, soft delete con modal de confirmación).
  - Gestión de usuarios (listado paginado, filtro por estado, soft delete y restauración).
- 🔒 **Guards de ruta**: `authGuard` para áreas privadas, `adminGuard` para el panel.
- 📱 **Responsive** con menú móvil.
- 🧪 **Modo demo**: interceptor HTTP que simula la API cuando no hay backend disponible.

---

## 🛠️ Stack

| Capa | Tecnología |
|---|---|
| Frontend | **Angular 21** (standalone components, signals) |
| Estilos | **Tailwind CSS v4** (tema cinema custom) |
| Backend | **Spring boot** (jwt,rol,crud,validadores,API REST) |
| Deploy | Cloudflare Pages (CI: build automático en cada push) |

---

## 📸 Screenshots

*(Agrega aquí capturas: home, catálogo, detalle, panel admin users/movies)*

| | |
|---|---|
| Home | Catálogo |
| Detalle película | Admin usuarios |

---

## 🚀 Correr en local

### Requisitos
- Node.js 20+
- npm

### Con backend real (desarrollo)

```bash
npm install
npm run start        # http://localhost:4200
```

El backend debe estar corriendo en `http://localhost:8080/api/v1` (Spring Boot). En `localhost` la app **siempre** usa la API real; el mock solo se activa en dominios desplegados.


src/
├── app/
│   ├── core/                 # guards, interceptors, services, mocks
│   ├── features/             # páginas por dominio: auth, home, movies, admin, favorites
│   ├── layouts/              # MainLayout (navbar + footer)
│   ├── shared/               # componentes y modelos compartidos
│   └── app.routes.ts         # rutas (admin protegido por adminGuard)
└── enviroment.ts             # config: apiUrl + mockApi
```

## 🏗️ Arquitectura destacada

- **Signals** para estado reactivo (listas, paginación, filtros, modales).
- **Interceptores funcionales** para auth (`Bearer token`) y manejo de errores `401`.
- **Guards canActivate** para proteger rutas por autenticación y rol.
- **Soft delete** de usuarios y películas con modal de confirmación.

---
