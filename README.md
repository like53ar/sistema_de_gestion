# SABIA - Sistema de Gestión ERP

![SABIA Logo](https://raw.githubusercontent.com/placeholder/logo.png) <!-- Reemplazar con logo real si existe -->

**SABIA** es una solución integral de planificación de recursos empresariales (ERP) diseñada para optimizar los procesos de negocio a través de una arquitectura moderna, modular y escalable.

Desarrollado y creado por **Fabian A. Correa**.

---

## 🚀 Características Principales

El sistema está organizado en módulos funcionales independientes que cubren las áreas críticas de la gestión empresarial:

- **⚙️ Parámetros Generales**: Padrón centralizado de datos maestros del sistema, incluyendo tablas oficiales de **Provincias**, **Países**, **Bancos**, **Monedas**, **Códigos de IVA**, **Tipos de Comprobantes** y **Tipos de Documento**. Además, incorpora validaciones dinámicas con formato inteligente para códigos alfanuméricos. Junto con esto, cuenta con la sección de **Parámetros de Módulos** (*Ventas, Compras, Tesorería, Contabilidad, Sueldos y Stock*). El módulo de **Compras** ha sido refactorizado integralmente hacia un sistema de **Ventana Emergente (Pop-up XL)** con navegación por solapas horizontales, permitiendo una configuración granular de impuestos, retenciones y controles sin perder el contexto de trabajo.
- **📈 Ventas**: Gestión completa de facturación, clientes (con ID automático), informes exportables, productos, vendedores, listas de precios y zonas de distribución. Destaca por su configuración ultra-granular mediante pestañas y validaciones en tiempo real.
- **🛒 Compras**: Control de órdenes de compra, registro de facturas y recepción de mercadería. **Gestión Avanzada de Proveedores** con un árbol de configuración multidimensional. El submódulo de **Archivos (Configuración)** ahora utiliza una interfaz de **Modales Premium (ZEN Design)** con sub-solapas para Comprobantes (Generales, Solicitudes, Órdenes, Pagos, Ajustes), validación algorítmica de CBU (BCRA), gestión de regímenes de retención (IVA/Ganancias/IIBB) y auditoría de cambios mediante un sistema centralizado de **Logs**.
- **💰 Tesorería**: Administración de arqueo de caja, bancos, cobros y pagos, conciliaciones bancarias, flujo proyectado y movimientos en efectivo. Cuenta con una configuración de **Parámetros de Tesorería** basada en solapas horizontales ZEN:
  - *Principal*: Configuración exhaustiva de Comprobantes (Fechas límite de ingreso/reversión, reglas de control futuras, cotización, auditorías automáticas de lote) y opciones integradas de hardware para Cheques (uso de lectora y búsquedas algorítmicas o manuales).
  - *Administración de Tarjetas*: Modelado integral para cupones manuales/automatizados, conectividad de dispositivos (lector de banda/NFC), liquidaciones secuenciales con bases de retención configurables de IIBB, y opciones para manejo avanzado de Terminales POS y control de lotes.
  - *Clasificación de Comprobantes*: Motor global que fuerza al usuario a tipificar Cobros, Pagos, Depósitos y Rechazos mediante jerarquías preestablecidas, garantizando un orden estructurado para análisis financiero.
- **📑 Contabilidad**: Registro de plan de cuentas jerárquico, asientos contables, libro mayor, balances y estados de resultados. Los **Parámetros de Contabilidad** están regidos por un sistema de cuadros modales avanzados:
  - *Principal*: Gestiona automatizaciones fundamentales divididas en 4 grandes grupos: Cuentas (Asignación automática basada en jerarquía principal "PLANCTAS"), Asientos (Control de días hábiles, agrupación en asientos resumen, edición de apropiaciones sin anular el asiento original y apertura a nivel auxiliar), Cierre de Ejercicio (Pasaje automático a cuentas de resultado y control de consistencia de asientos pendientes), y Leyendas aduaneras/reportes impresos para los libros diarios.
  - *Cuentas para procesos automáticos* (En Desarrollo).
  - *Tipo de Asientos para procesos automáticos* (En Desarrollo).
- **📦 Inventario**: Gestión integral de artículos, control de stock min/max y tracking de movimientos. (Módulo en Construcción).
- **👥 Sueldos**: Administración de recursos humanos, control de legajos y liquidación de haberes. (Módulo en Construcción).

---

## ✨ UI/UX y Mejoras de Usabilidad

- **Breadcrumbs Contextuales**: Navegación guiada adaptativa según la ruta que indica la posición actual en el ecosistema.
- **Micro-interacciones completas**: Uso de **Tooltips** direccionales anti-desbordamiento, animaciones sutiles (*Fade In*, *Zoom In*) e indicadores de carga y progreso.
- **Diseño ZEN (Premium)**: Estética minimalista con **Glassmorphism**, fondos translúcidos, **Modal Overlay con Blur** (desenfoque de fondo) y una paleta de colores coherente con bordes dorados reactivos.
- **Skeletons (*Shimmer Effect*)**: Barras y bloques de carga en múltiples formatos (`list`, `text`, `table`, `card`) para mejorar la percepción de velocidad en llamadas asíncronas.
- **Notificaciones (Toast Alerts) & Confirmaciones**: Sistema centralizado de avisos (Success, Warning, Info, Error) y diálogos modales para prevenir borrado o pérdida accidental de información.

---

## 🔒 Seguridad y Autenticación

El sistema cuenta con un modelo de seguridad robusto a nivel de frontend diseñado para consumir APIs modernas:
- **Autenticación con JWT**: Manejo seguro del *Access Token* y *Refresh Token*.
- **Renovación Silenciosa (Refresh)**: El **Interceptor HTTP** intercepta respuestas `401 Unauthorized`, solicita automáticamente un nuevo par de tokens detrás de escena y reintenta la solicitud fallida (sin interrumpir el flujo de usuario).
- **Control de Acceso (Guards)**: 
  - `authGuard`: Protege todo el ERP verificando la sesión activa y redirigiendo a la pantalla de `/login` nativa (con `returnUrl` para que al ingresar retorne a la sección deseada).
  - `roleGuard`: Restricción granular y escalable protegida por rutas. Valida activamente que el usuario contenga los permisos (ej. `ADMIN`, `COMPRAS`, `VENTAS`) para poder acceder a los módulos de negocio configurados mediante *Lazy Loading*.

---

## 🛠️ Arquitectura Técnica

El sistema utiliza las últimas tecnologías y patrones de diseño para asegurar un rendimiento óptimo y facilidad de mantenimiento:

### Frontend
- **Framework**: [Angular](https://angular.io/) (Arquitectura Standalone).
- **Gestión de Estado**: [NgRx](https://ngrx.io/) (Flujo de datos reactivo y predecible).
- **Asincronía**: [RxJS](https://rxjs.dev/) (Programación reactiva).
- **Estilos**: Vanilla CSS con variables modernas y diseño premium (Glassmorphism / Dark Mode).

### Organización del Proyecto
Siguiendo el patrón de modularización por funcionalidad:
- `/src/app/core`: Servicios globales, guards e interceptores (Singletons).
- `/src/app/shared`: Componentes UI, directivas y pipes reutilizables.
- `/src/app/features`: Módulos de negocio cargados mediante **Lazy Loading**.
- `/src/app/layout`: Estructura global (NavBar, Sidebar, MainLayout).
- `/src/app/models`: Definiciones de tipos e interfaces TypeScript centralizadas.

---

## ⚡ Instalación y Arranque

### Pre-requisitos
- [Node.js](https://nodejs.org/) (versión LTS recomendada).
- [Angular CLI](https://angular.io/cli) instalado globalmente (`npm install -g @angular/cli`).

### Instrucciones de Inicio
Para un inicio profesional y simplificado, el sistema cuenta con un motor de arranque estático ultrarrápido:

1. Clona el repositorio.
2. Ejecuta `npm install` (y asegúrate de instalar local o globalmente el paquete estático, ej. `npm install serve`).
3. Ejecuta `npm run build` para pre-compilar el proyecto en modo producción (`dist/`).
4. Usa el acceso directo apuntado a **`iniciar_silencioso.vbs`** en tu escritorio.

> [!NOTE]
> El arranque silencioso levanta un micro-servidor de producción en segundo plano matando cualquier otra instancia vieja e inicializa tu navegador velozmente hacia `http://localhost:4201` casi de inmediato y completamente sin consolas (modo "fantasma").

---

## ✒️ Autor
* **Fabian A. Correa** - *Creador y Desarrollador Principal*

---

## 📄 Licencia
Este proyecto es propiedad privada. Todos los derechos reservados.
