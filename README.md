# SABIA - Sistema de Gestión ERP

![SABIA Logo](https://raw.githubusercontent.com/placeholder/logo.png) <!-- Reemplazar con logo real si existe -->

**SABIA** es una solución integral de planificación de recursos empresariales (ERP) diseñada para optimizar los procesos de negocio a través de una arquitectura moderna, modular y escalable.

Desarrollado y creado por **Fabian A. Correa**.

---

## 🚀 Características Principales

El sistema está organizado en módulos funcionales independientes que cubren las áreas críticas de la gestión empresarial:

- **⚙️ Parámetros Generales**: Padrón centralizado de datos maestros del sistema, incluyendo tablas oficiales de **Provincias**, **Países**, **Bancos** y **Monedas**. Además, incorpora la nueva sección de **Parámetros de Módulos** (*Ventas, Compras, Tesorería, Contables, Inventario y Sueldos*) con ventanas emergentes (Pop-ups XL adaptativos) y almacenamiento temporal en servicios de datos en frontend vinculados al formulario real con *Two-way Binding*.
- **📈 Ventas**: Gestión completa de facturación, clientes (con ID automático), informes exportables, productos, vendedores, listas de precios y zonas de distribución.
- **🛒 Compras**: Control de órdenes de compra, registro de facturas, recepción de mercadería, gestión de proveedores y seguimiento de pagos.
- **💰 Tesorería**: Administración de arqueo de caja, bancos, cobros y pagos, conciliaciones bancarias, flujo proyectado y movimientos en efectivo.
- **📑 Contabilidad**: Registro de plan de cuentas jerárquico, asientos contables, libro mayor, balances y estados de resultados, organizados por periodos.
- **📦 Inventario**: Gestión integral de artículos, control de stock min/max, tracking de movimientos, ajustes por merma/sobrante, valorización y alertas de reposición.
- **👥 Sueldos**: Administración de recursos humanos con control de legajos, cálculo y liquidación de haberes, seguimiento de asistencias, obligaciones legales (Aportes/Retenciones) y su integración final al módulo contable.

---

## ✨ UI/UX y Mejoras de Usabilidad

- **Breadcrumbs Contextuales**: Navegación guiada adaptativa según la ruta que indica la posición actual en el ecosistema.
- **Micro-interacciones completas**: Uso de **Tooltips** direccionales anti-desbordamiento, animaciones sutiles (*Fade In*) e indicadores de carga y progreso.
- **Skeletons (*Shimmer Effect*)**: Barras y bloques de carga en múltiples formatos (`list`, `text`, `table`, `card`) para mejorar la percepción de velocidad en llamadas asíncronas.
- **Notificaciones (Toast Alerts) & Confirmaciones**: Sistema centralizado de avisos (Success, Warning, Info, Error) y diálogos modales para prevenir borrado o pérdida accidental de información (Ej. limpiar formulario de clientes).

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
Para un inicio profesional y simplificado, el sistema cuenta con un sistema de arranque silencioso:

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Haz doble clic en **`iniciar_sistema.bat`**.

> [!NOTE]
> El arranque silencioso iniciará el servidor en segundo plano, mostrará un **Splash Screen** con branding y abrirá automáticamente tu navegador en `http://localhost:4200` una vez que el sistema esté listo.

---

## ✒️ Autor
* **Fabian A. Correa** - *Creador y Desarrollador Principal*

---

## 📄 Licencia
Este proyecto es propiedad privada. Todos los derechos reservados.
