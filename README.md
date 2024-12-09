# MUBISearch TFG - UOC 2024/2025

## Índice
1. [Estructura](#estructura)
2. [Configuración](#configuración)
3. [Instalación](#instalación)

## Estructura
El proyecto consta de cuatro microservicios:
- **Content Service**: Servicio encargado de gestionar la información de las películas y series.
- **User Service**: Servicio encargado de gestionar la información de los usuarios.
- **Notification Service**: Servicio encargado de gestionar las notificaciones de los usuarios.
- **Gateway Service**: Servicio encargado de gestionar las peticiones a los distintos microservicios.

Además, el proyecto cuenta con una aplicación web desarrollada en React+Vite que se encarga de mostrar la información de las películas y series.

Las bases de datos son MySQL para los servicios de contenido, usuarios y notificaciones, y Redis para almacenar las películas de la pantalla inicial y las preferencias de los usuarios sobre las notificaciones de los contenidos.

Para gestionar las notificaciones, se ha utilizado RabbitMQ como cola de mensajes y MailHog para gestionar los correos electrónicos.

Por último, se ha utilizado Auth0 para gestionar los usuarios y sus roles.

## Configuración
Los servicios se encuentran configurados en los siguientes puertos:

### Servicios de Bases de Datos
- **Content Service**: localhost:54508
- **User Service**: localhost:54509
- **Notification Service**: localhost:54510
- **Adminer**: localhost:18080
- **Redis**: localhost:6379
- **Redis Insight**: localhost:5540

### APIs de Microservicios
- **Gateway**: localhost:8080

Todas las peticiones a los microservicios se realizan a través de este servicio. Los puertos donde mapean los microservicios Content Service, User Service y Notification Service están restringidos y todas las peticiones a estos se enrutan a través del puerto del API Gateway.

### Otros servicios
- **RabbitMQ**: localhost:15672

Puerto de la interfaz gráfica de RabbitMQ. Iniciar sesión con las credenciales por defecto: guest/guest.

- **MailHog**: localhost:8025
- **Web**: localhost:5173

### Gestión de Usuarios

La aplicación gestiona el registro de usuarios mediante Auth0. El sistema de usuarios tiene, por el momento, los siguientes roles:
- **Admin**: Solo puede gestionar los usuarios, desde editar su información (email y password) hasta eliminarlos.
- **User**: Solo puede hacer uso de las funcionalidades de la plataforma: favoritos, críticas, notificaciones, búsqueda, etc.

Por el momento, en la aplicación existen tres usuarios de prueba, dos de ellos con el rol de usuario y uno con el rol de administrador:
- **user**:
    - **Email**: user@gmail.com
    - **Password**: User111$
    - **Role**: USER
- **user2**:
    - **Email**: user2@gmail.com
    - **Password**: User111$
    - **Role**: USER
- **admin**:
    - **Email**: admin@gmail.com
    - **Password**: Admin11$
    - **Role**: ADMIN

Para acceder a las funcionalidades de la aplicación web, es necesario iniciar sesión con uno de estos usuarios o registrarse con uno nuevo.

## Instalación
Para instalar el proyecto, es suficiente con lanzar el siguiente comando en la raíz del proyecto:
```bash
docker-compose up --build
```

Docker se encarga de instalar todas las dependencias necesarias para el proyecto. Este consta de varios servicios:
- **contentdb**: Base de datos de las películas y series.
- **userdb**: Base de datos de los usuarios.
- **notificationdb**: Base de datos de las notificaciones.
- **adminerdb**: Herramienta para gestionar las bases de datos.
- **web**: Aplicación web desarrollada en React+Vite.
- **redis**: Base de datos en memoria para almacenar las películas de la pantalla inicial y las preferencias de los usuarios sobre las notificaciones de los contenidos.
- **redis-insight**: Herramienta para gestionar la base de datos en memoria.
- **rabbitmq**: Cola de mensajes para gestionar las notificaciones.
- **mailhog**: Herramienta para gestionar los correos electrónicos de las notificaciones.

Una vez lanzado el comando, se puede acceder a la aplicación web en la dirección `http://localhost:5173`.
