
# Frontend Reto-UTP


## Descripcion del proyecto
Este es la aplicacion frontend de un sistema de registro de solicitudes de 
cambio de notas, aqui se visualizara las UI para los docente y coordinadores


## Requerimientos
1. Nodejs v18.20.2
4. Docker



## Instalación de dependencias
***

```
$ npm install
```
## Ejecucion por container

```
$ docker build -t app-utp-frontend .
$ docker run -d -p 3000:3000 --name utp-container-frontend app-utp-frontend
```


## Desplegar aplicacion
```
$ npm run build
$ npm run start
```
