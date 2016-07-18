# Vhoster

## Propósito

Permite correr diferentes aplicaciones ExpressJS en una sola instancia en un mismo servidor bajo diferentes dominios utilizando [expressjs/vhost](https://github.com/expressjs/vhost).

## Requerimientos

### General
- node.js
- npm 

## Instalación

### 1) Instalar dependencias
    npm install

### 2) Configuración

   Configurar config.js:

    config.applicationsPath = '/home/gabriel/dvlp/projects/expressjs_applications';

Directorio donde están las diferentes aplicaciones. Es necesario que cada aplicacion tenga un archivo manifest especificando el dominio y el punto de entrada a la aplicación. 
Ejemplo:

```
{
  "domain": "app1.domain.com",
  "application": "app/myapp"
}
```

Tener en cuenta que cada aplicación debe exportarse y no escuchar por si misma.

Ejemplo:

```
    module.exports = app;
```

    config.port = 80;

Puerto donde se levantaran los diferentes dominios.

### 3) Iniciar frontend

    node vhost_listener.js

## Para tener en cuenta
Existen diferentes opciones para correr aplicaciones node en un mismo servidor. Por ejemplo por proxy o implementando vhost en la aplicación, esta última es la que elegimos para vhoster. Esta opción tiene algunas contras, ver el siguiente link *Vhost in ExpressJS*.

- Vhost in ExpressJS

http://www.hacksparrow.com/vhost-in-express-js.html

*Great! Now can I host hundreds of websites like this? Yes, you can. But, should you?*

- Virtual host on nginx

https://gist.github.com/soheilhy/8b94347ff8336d971ad0

- HARDENING NODE.JS FOR PRODUCTION PART 2: USING NGINX TO AVOID NODE.JS LOAD

http://blog.argteam.com/coding/hardening-node-js-for-production-part-2-using-nginx-to-avoid-node-js-load/