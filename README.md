# PerfumeHud - Frontend 

¡Bienvenido a **PerfumeHud**! Esta es la interfaz de usuario para nuestra plataforma exclusiva de alta perfumería. Una aplicación web moderna, fluida y con un diseño premium asimétrico, desarrollada sobre el ecosistema de **Angular** utilizando las últimas características reactivas del framework (`Signals` y `Computed`).

El proyecto se conecta a un backend desarrollado en Spring Boot para gestionar el catálogo de firmas de lujo y sus fragancias asociadas en tiempo real.

---

## ✨ Características Principales

* **Diseño Premium y Minimalista:** Interfaz de usuario limpia, sofisticada y de alta gama con una paleta de colores cuidada (tonos pizarra, blanco puro y detalles dorados).
* **Arquitectura Reactiva con Signals:** Implementación de Angular Signals para una gestión del estado eficiente, libre de sobrecarga de suscripciones y con renderizado en tiempo real.
* **Sistema de Filtros Múltiples:** * *Búsqueda Predictiva:* Filtrado dinámico instantáneo por el nombre de la firma de perfumes.
    * *Ordenación Alfabética:* Selector premium para ordenar el catálogo de la **A a la Z** y de la **Z a la A**.
* **Operaciones CRUD Fluidas:**
    * Visualización de colecciones bajo demanda (menús desplegables integrados en las tarjetas).
    * Formularios de edición en línea (*inline*) para modificar nombres y precios de fragancias sin recargar la página.
    * Eliminación segura con confirmación integrada de firmas y perfumes.
* **Paginación Inteligente:** Control de navegación por páginas integrado con el backend, adaptándose automáticamente cuando se aplican búsquedas de texto.
* **Sistema de Toasts Premium:** Notificaciones flotantes animadas en la parte inferior de la pantalla que informan al usuario del éxito (`verde`) o error (`rojo`) de cada acción realizada, desapareciendo automáticamente tras 3 segundos.

---

## 🛠️ Tecnologías Utilizadas

* **Angular 17+** (Estructura Standalone, Flujo de control `@for`, `@if`, `@empty`).
* **TypeScript** para la lógica estructurada.
* **HTML5 & CSS3 Avanzado** (Flexbox, CSS Grid, Animaciones `@keyframes` nativas, variables personalizadas).
* **RxJS** para la comunicación asíncrona mediante `HttpClient`.

---

## 📂 Estructura del Módulo del Catálogo

El núcleo de la aplicación se encuentra organizado de la siguiente manera dentro del directorio `src/app/components/lista-marcas/`:

* `lista-marcas.html`: Estructura semántica que renderiza el panel de filtros, la cuadrícula responsiva de tarjetas de lujo y el contenedor de notificaciones flotantes.
* `lista-marcas.ts`: Controlador TypeScript que gestiona el estado reactivo mediante `signal()`, combina los filtros con `computed()` y coordina las llamadas al `ApiService`.
* `lista-marcas.css`: Hoja de estilos con enfoque de diseño limpio, sombras suaves, efectos hover interactivos y el diseño del Toast flotante.

---

## 🚀 Instalación y Despliegue Local

### Requisitos Previos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) y el [Angular CLI](https://angular.dev/tools/cli) en tu sistema.

1. **Clonar el repositorio:**
   ```bash
   git clone <https://github.com/accordi-gioele/perfumeHub>