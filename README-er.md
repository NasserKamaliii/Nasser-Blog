# Nasser Blog Platform

<div align="center">

**A full-stack, modern blog application built with enterprise-grade architecture and developer-friendly tooling.**

[![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0-6DB33F?logo=spring)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Backend Details](#backend-details)
- [Frontend Details](#frontend-details)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Nasser Blog Platform** is a feature-rich blogging system that empowers authors to create, edit, and publish content with full taxonomy support. Built on a decoupled architecture, it combines a robust Spring Boot REST API with a responsive React SPA, delivering a smooth, secure, and scalable experience for both readers and content creators.

Whether you're browsing published posts, managing drafts, or organizing content with categories and tags—this platform handles it all with clean APIs, JWT-based authentication, and a polished UI.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **User Authentication** | Secure registration and login with JWT tokens; stateless, session-free auth |
| **Post Management** | Create, read, update, and delete posts with draft/published status workflow |
| **Taxonomy System** | Categories and tags for content organization and filtering |
| **Filtering & Search** | Filter posts by category or tag via query parameters |
| **Draft Management** | Personal draft workspace for authenticated authors |
| **Protected Routes** | Route guards for create/edit/draft/category-tag management |
| **Responsive UI** | Tailwind-powered layout with Framer Motion animations |
| **RESTful API** | Versioned, consistent REST endpoints (`/api/v1/`) |
| **Database Flexibility** | H2 for development, PostgreSQL (e.g., Supabase) for production |

---

## Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| **Java 21** | Runtime and language features |
| **Spring Boot 4.0.1** | Application framework |
| **Spring Web MVC** | REST API layer |
| **Spring Data JPA** | Data access and ORM |
| **Spring Security** | Authentication and authorization |
| **Hibernate** | JPA implementation |
| **PostgreSQL** | Production database (Supabase) |
| **H2** | Development/in-memory database |
| **JJWT (0.11.5)** | JWT generation and validation |
| **MapStruct 1.6.3** | DTO/entity mapping |
| **Lombok 1.18.36** | Boilerplate reduction |
| **Maven** | Build and dependency management |

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **TypeScript 5.7** | Type safety and tooling |
| **Vite 6** | Build tool and dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Zustand 5** | State management |
| **React Router 7** | Client-side routing |
| **Axios** | HTTP client with interceptors |
| **Framer Motion 12** | Animations and transitions |
| **React Icons 5** | Icon library |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React + Vite)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Zustand    │  │ React Router │  │ Axios API    │  │ Tailwind +   │ │
│  │   Stores     │  │ (Routes)     │  │ Client       │  │ Framer       │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
└────────────────────────────────────────┬────────────────────────────────┘
                                         │ HTTP + JWT (Bearer)
                                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        BACKEND (Spring Boot)                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Controllers  │──│   Services   │──│  Repositories│──│  Entities    │ │
│  │ (REST API)   │  │ (Business)   │  │ (JPA)        │  │ (JPA)        │ │
│  └──────┬───────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
│         │                                                               │
│  ┌──────┴───────┐  ┌──────────────┐                                     │
│  │ JWT Filter   │  │ CORS Config  │                                     │
│  │ + Security   │  │              │                                     │
│  └──────────────┘  └──────────────┘                                     │
└────────────────────────────────────────┬────────────────────────────────┘
                                         │ JDBC
                                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     DATABASE (PostgreSQL / H2)                           │
│  users | posts | categories | tags | post_tags                           │
└─────────────────────────────────────────────────────────────────────────┘
```

**Data Model Overview**

- **User**: Authors with email, password, first/last name; one-to-many with posts
- **Post**: Title, content, status (DRAFT/PUBLISHED), reading time, category, tags, timestamps
- **Category**: Name and description for content grouping
- **Tag**: Name; many-to-many with posts via `post_tags` join table

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- **Java 21** (OpenJDK recommended)
- **Maven** 3.6+
- **PostgreSQL** (or use H2 by switching datasource config)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nasser-blog
```

### 2. Backend Setup

```bash
cd Backend/blog-platform
```

Create or update `src/main/resources/application.properties` with your configuration. Use environment variables for sensitive data:

```properties
# Database (example for local PostgreSQL)
spring.datasource.url=jdbc:postgresql://localhost:5432/blog_db
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:your_password}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update

# JWT (use a long, random secret in production)
jwt.secret=${JWT_SECRET:your-256-bit-secret-key-at-least-32-bytes-long}
```

For local development with H2, you can use:

```properties
spring.datasource.url=jdbc:h2:mem:blogdb
spring.datasource.driver-class-name=org.h2.Driver
spring.h2.console.enabled=true
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

Run the backend:

```bash
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173` (default Vite port).

**Configure API base URL:** The frontend uses `http://localhost:8080` by default (see `src/api/axiosInstance.ts`). Adjust `BASE_URL` if your backend runs elsewhere.

### 4. CORS

The backend allows `http://localhost:5173` by default. If your frontend uses a different origin, update `CorsSecurityConfig.java` accordingly.

---

## Backend Details

### Project Structure

```
Backend/blog-platform/
├── src/main/java/com/nasser/blog/blog_platform/
│   ├── BlogPlatformApplication.java
│   ├── config/
│   │   ├── CorsSecurityConfig.java      # CORS configuration
│   │   └── SecurityConfig.java          # Security filter chain, JWT filter
│   ├── controllers/
│   │   ├── AuthController.java          # /api/v1/auth (login, register)
│   │   ├── CategoryController.java      # /api/v1/categories
│   │   ├── ErrorController.java         # Global error handling
│   │   ├── PostController.java          # /api/v1/posts
│   │   └── TagController.java           # /api/v1/tags
│   ├── domain/
│   │   ├── entities/                    # JPA entities (Post, User, Category, Tag)
│   │   ├── dtos/                        # Data transfer objects
│   │   └── PostStatus.java              # DRAFT, PUBLISHED enum
│   ├── mappers/                         # MapStruct mappers
│   ├── repositories/                    # Spring Data JPA repositories
│   ├── security/
│   │   ├── BlogUserDetailsService.java
│   │   └── JwtAuthenticationFilter.java
│   └── services/                        # Business logic layer
└── src/main/resources/
    └── application.properties
```

### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/login` | No | Authenticate user, return JWT |
| POST | `/api/v1/auth/register` | No | Register new user, return JWT |
| GET | `/api/v1/posts` | No | List posts (optional `?categoryId=`, `?tagId=`) |
| GET | `/api/v1/posts/{id}` | No | Get single post |
| GET | `/api/v1/posts/drafts` | Yes | List current user's drafts |
| POST | `/api/v1/posts` | Yes | Create post |
| PUT | `/api/v1/posts/{id}` | Yes | Update post |
| DELETE | `/api/v1/posts/{id}` | Yes | Delete post |
| GET | `/api/v1/categories` | No | List categories |
| POST | `/api/v1/categories` | Yes | Create category |
| DELETE | `/api/v1/categories/{id}` | Yes | Delete category |
| GET | `/api/v1/tags` | No | List tags |
| POST | `/api/v1/tags` | Yes | Create tags (bulk) |
| DELETE | `/api/v1/tags/{id}` | Yes | Delete tag |

**Authentication:** For protected endpoints, include `Authorization: Bearer <token>` in the request headers.

### Security Model

- Stateless JWT authentication
- Public: auth endpoints, GET posts/categories/tags
- Authenticated: create/update/delete posts, drafts, categories, tags
- `JwtAuthenticationFilter` validates tokens and sets `userId` for request-scoped use

---

## Frontend Details

### Project Structure

```
Frontend/
├── src/
│   ├── api/                    # API client layer
│   │   ├── axiosInstance.ts    # Axios + JWT interceptor
│   │   ├── authApi.ts
│   │   ├── categoryApi.ts
│   │   ├── postApi.ts
│   │   ├── responseType.ts
│   │   └── tagApi.ts
│   ├── components/
│   │   ├── CreateCategoryCard.tsx
│   │   ├── CreateTagsCard.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── LoginFormCard.tsx
│   │   ├── PostCard.tsx
│   │   └── RegisterFormCard.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PostDetails.tsx
│   │   ├── LoginRegisterPage.tsx
│   │   ├── CreatePost.tsx
│   │   ├── UpdatePost.tsx
│   │   ├── MyDraft.tsx
│   │   ├── CategoriesAndTagsPage.tsx
│   │   └── NotFound.tsx
│   ├── routes/
│   │   ├── AppRoutes.tsx       # Route definitions
│   │   ├── ProtectedRoute.tsx  # Auth-required wrapper
│   │   └── PublicRoute.tsx     # Guest-only (e.g. login)
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── homeStore.ts
│   │   ├── PostDetailsStore.ts
│   │   ├── postFormStore.ts
│   │   ├── taxonomyStore.ts
│   │   └── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.ts
```

### Routes

| Path | Access | Page |
|------|--------|------|
| `/` | Public | Home (post list) |
| `/posts/:id` | Public | Post details |
| `/login` | Guest only | Login / Register |
| `/create-post` | Authenticated | Create post |
| `/update-post/:id` | Authenticated | Edit post |
| `/my-drafts` | Authenticated | Draft list |
| `/categories-tags` | Authenticated | Manage categories & tags |
| `*` | Public | 404 Not Found |

### State Management (Zustand)

- **authStore**: Token, user ID, login/register/logout/hydrate from `localStorage`
- **homeStore**: Home page posts and filters
- **PostDetailsStore**: Single post view
- **postFormStore**: Create/update form state
- **taxonomyStore**: Categories and tags

### Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Vite dev server |
| `build` | `npm run build` | TypeScript build + Vite production build |
| `preview` | `npm run preview` | Preview production build |
| `lint` | `npm run lint` | Run ESLint |

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Ensure code passes existing tests and lint checks before submitting.

---

## License

This project is available under the terms of the project's chosen license. See the repository for the applicable license file.

---

<div align="center">

**Nasser Blog Platform** — Built with Spring Boot & React

</div>
