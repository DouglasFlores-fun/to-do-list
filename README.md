# to-do-list

## Despliegue rapido para pruebas
Requerimientos:
- Docker
- Docker compose

Puertos por defecto:
- 8002 backend, debe estar disponible
- 8001 frontend, debe estar disponible
- 3306 MariaDb, de momento deshabilitado la exposición del puerto.

> [!IMPORTANT]  
> Los archivos del proyecto son copiados directament al contenedor, y utilice el archivo .env.default como configuración base, para fines de prueba únicamente se debe cumplir requisitos, tener los puertos libros y ejecutar el comando.

Comando a ejecutar, funcional en winfos
```
docker-compose -f docker-compose-db.yml up -d --build ; docker-compose -f docker-compose.yml up -d --build ; docker exec -it todo-backend php artisan migrate
```
**Ahora puede acceder a la app [http://localhost:8001](http://localhost:8001)

> [!WARNING]  
> Contenedores y aplicación no esta optimizados para despliegue en servidores