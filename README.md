# SABIA - Sistema de Gestión ERP

![SABIA Logo](https://raw.githubusercontent.com/placeholder/logo.png) <!-- Reemplazar con logo real si existe -->

**SABIA** es una solución integral de planificación de recursos empresariales (ERP) diseñada para optimizar los procesos de negocio a través de una arquitectura moderna, modular y escalable.

Desarrollado y creado por **Fabian A. Correa**.

---

## 🚀 Características Principales

El sistema está organizado en módulos funcionales independientes que cubren las áreas críticas de la gestión empresarial:

- **📈 Ventas**: Gestión completa de facturación, clientes, pedidos y seguimiento comercial.
- **🛒 Compras**: Control de proveedores, órdenes de compra y gestión de gastos.
- **💰 Tesorería**: Administración de flujo de caja, cuentas bancarias y movimientos financieros.
- **📑 Contabilidad**: Registro de asientos contables, balances y estados financieros automáticos.
- **📦 Inventario**: Gestión de stock, depósitos, movimientos de mercadería y valorización.
- **👥 Sueldos**: Liquidación de haberes y administración de recursos humanos.

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
