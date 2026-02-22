# Canelas Bakery — Backend API

Backend de un e-commerce personalizado para una tienda de repostería canina. Construido con **NestJS**, arquitectura **hexagonal (ports & adapters)**, y base de datos **PostgreSQL**.

---

## Tech Stack

| Tecnología | Uso |
|---|---|
| **NestJS** | Framework principal |
| **PostgreSQL** | Base de datos relacional |
| **TypeORM** | ORM |
| **JWT** | Autenticación |
| **Docker** | Entorno de desarrollo |

---

## Arquitectura Hexagonal

El proyecto sigue el patrón **Hexagonal Architecture (Ports & Adapters)**, separando el dominio del negocio de los detalles de infraestructura.

```
src/
├── modules/
│   └── [module]/
│       ├── domain/               # Entidades y lógica de negocio pura
│       │   ├── entities/
│       │   └── repositories/
│       ├── application/          # Casos de uso
│       │   └── use-cases/
│       └── infrastructure/       # Adaptadores (DB, HTTP, externos)
│           ├── persistence/      # Repositorios concretos
│           └── controllers/      # Controladores y DTOs
└── shared/                       # Código compartido entre módulos
```

**Capas:**

- **Domain** — Entidades y reglas de negocio sin dependencias externas.
- **Application** — Orquesta los casos de uso usando los puertos definidos.
- **Infrastructure** — Implementa los puertos: controladores HTTP, repositorios de DB, servicios externos.

---

## Autenticación

El sistema soporta dos métodos de login, ambos implementados como **adaptadores** siguiendo los principios de la arquitectura hexagonal.

### Flujo 1 — Login por Email + Código OTP

```
[Cliente]
    │
    ▼
POST /auth/send-code  { email }
    │
    ▼
[Application Layer - SendLoginCodeUseCase]
    │
    ├── UserRepository (interfaz) ──► [Adapter: UserRepository]
    │                                  Busca si el usuario existe en DB, si existe persiste
    │                                  el código OTP en BD.
    |
    └── EmailAdapter (interfaz)   ──► [Adapter: IEmailAdapter]
                                       Envía por email el código generado.
    ▼
POST /auth/verify-code  { email, code }
    │
    ▼
[Application Layer - VerifyLoginCodeUseCase]
    │
    ├── UserRepository (interfaz) ──► [Adapter: UserRepository]
    │                                  Busca usuario y valida el código OTP
    │                                  con su expiración en DB
    │
    └── JwtAdapter (interfaz)     ──► [Adapter: IJwtAdapter]
                                       Genera y retorna el JWT
    ▼
{ access_token }
```

### Flujo 2 — Login con Google OAuth

```
[Cliente]
    │
    ▼
POST /auth/google  { id_token }
    │
    ▼
[Application Layer - GoogleLoginUseCase]
    │
    ├── OAuthAdapter (interfaz)   ──► [Adapter: IOAuthAdapter]
    │                                  Verifica id_token con Google API
    │                                  Retorna perfil { email, name, picture }
    │
    ├── UserRepository (interfaz) ──► [Adapter: UserRepository]
    │                                  Busca usuario por email
    │                                  Si no existe → lo crea automáticamente
    │
    └── JwtAdapter (interfaz)     ──► [Adapter: IJwtAdapter]
                                       Genera y retorna el JWT
    ▼
{ access_token }
```

## Módulos del Sistema

### Productos
Gestión del catálogo de la tienda. Los productos pertenecen a una **categoría** y pueden tener **personalizaciones** (sabor, tamaño, glaseado, toppings, etc.), organizadas en categorías de personalización con opciones y precios adicionales.

Los productos también soportan **bundles**: un producto puede contener otros productos hijos como parte de un paquete.

### Carrito
Cada usuario tiene un carrito activo (`carts`). El carrito contiene items (`carts_items`) con sus respectivas personalizaciones seleccionadas (`cart_item_customization_options`) y notas especiales.

### Órdenes
Al finalizar la compra, el carrito se convierte en una orden (`orders`). Cada orden registra:
- Items con snapshot de nombre y precio (`order_items`)
- Personalizaciones elegidas (`order_item_customization_options`)
- Método de pago y franja horaria de entrega
- Descuentos y deducciones aplicadas (`order_deductions`)

### Pagos
Los pagos se registran en `payments` y pueden incluir comprobantes (capturas de pantalla) en `payment_proofs`. Soporta pagos anticipados (`is_advance`).

### Descuentos y Cupones
Los descuentos (`discounts`) pueden aplicarse a productos individuales o categorías enteras. Los cupones (`coupons`) tienen código único, límite de uso y fecha de expiración. Los canjes se registran en `coupon_redemptions`.

### Entregas
La disponibilidad de entregas se gestiona con:
- `delivery_weekly_schedule` — Días habilitados de la semana
- `delivery_time_slots` — Franjas horarias con capacidad máxima por día
- `delivery_blackout_days` — Días bloqueados con motivo
- `delivery_day_capacity` — Capacidad global de entregas por día

### Costos de Producción
Cada item de una orden puede tener asociado un costo de producción (`production_costs`) con su detalle desglosado (`production_cost_detail`), permitiendo calcular la utilidad real por orden.

### Mascotas de Usuarios
Los usuarios pueden registrar sus mascotas (`user_pets`) con nombre, raza y fecha de nacimiento, pensado para personalización de productos.

### Calificaciones
Se pueden calificar tanto la orden completa (`order_ratings`) como productos individuales (`product_ratings`) vinculados al item específico de la orden.

---

## Diagrama de Base de Datos

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          USUARIOS & ROLES                               │
│                                                                         │
│  roles ──────────────────── users ─────────────────── user_addresses   │
│  (id, name, slug)     (id, names, role_id)         (address, city...)  │
│       │                      │                                          │
│  role_menus                user_pets                                    │
│       │                 (name, breed...)                                │
│  menus                                                                  │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                          CATÁLOGO DE PRODUCTOS                          │
│                                                                         │
│  product_categories                                                     │
│       │ ↓                                                               │
│  products ◄──────── product_bundles (bundle ↔ child)                   │
│       │                                                                 │
│  product_category_customizations                                        │
│       │                                                                 │
│  product_customization_categories                                       │
│       │ ↓                                                               │
│  product_customization_options                                          │
│       │                                                                 │
│  product_recipes ◄── product_recipe_items ──► ingredients              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                          CARRITO & ÓRDENES                              │
│                                                                         │
│  users                                                                  │
│   └─► carts                                                             │
│         └─► carts_items                                                 │
│               └─► cart_item_customization_options                       │
│                         │                                               │
│                         ▼                                               │
│                       orders ◄──── payment_methods                     │
│                         │    ◄──── delivery_time_slots                  │
│                         ├─► order_items                                 │
│                         │     └─► order_item_customization_options      │
│                         │     └─► production_costs                      │
│                         │           └─► production_cost_detail          │
│                         ├─► order_deductions                            │
│                         ├─► order_ratings                               │
│                         └─► payments                                    │
│                               └─► payment_proofs                       │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                        DESCUENTOS & CUPONES                             │
│                                                                         │
│  discounts                                                              │
│   ├─► discount_products      (descuento por producto)                  │
│   ├─► discount_product_categories (descuento por categoría)            │
│   └─── coupons                                                          │
│           └─► coupon_redemptions (user ↔ coupon ↔ order)              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                          ENTREGAS                                       │
│                                                                         │
│  delivery_weekly_schedule                                               │
│   └─► delivery_time_slots ──────────────────────────► orders           │
│                                                                         │
│  delivery_blackout_days    (días bloqueados)                            │
│  delivery_day_capacity     (capacidad global diaria)                    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Entidades Principales

| Tabla | Descripción |
|---|---|
| `users` | Usuarios del sistema con rol asignado |
| `products` | Productos del catálogo con precio base |
| `product_customization_categories` | Grupos de personalización (tamaño, sabor, glaseado…) |
| `product_customization_options` | Opciones dentro de cada grupo con precio extra |
| `carts` / `carts_items` | Carrito activo por usuario |
| `orders` / `order_items` | Órdenes generadas al confirmar compra |
| `payments` | Pagos registrados por orden |
| `discounts` / `coupons` | Descuentos y cupones con reglas de aplicación |
| `delivery_time_slots` | Franjas horarias de entrega con capacidad |
| `production_costs` | Costos reales de producción por item |
| `ingredients` | Ingredientes usados en recetas de productos |

---

## Instalación

```bash
# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env

# Iniciar en desarrollo
npm run start:dev
```

---

## Variables de Entorno

```env
NODE_ENV=

JWT_SECRET=
JWT_EXPIRES_IN=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
```
