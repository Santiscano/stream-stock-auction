# stream-stock-auction


## DESARROLLO 
- configurar turbo para monorepos - https://turbo.build/repo/docs/getting-started/add-to-existing-repository
### Levantar el proyecto
1. npm install 
2. ejecutar en consola el comando de docker para levantar DB y phpmyadmin
```shell
docker compose --env-file .\apps\api\.env up -d
``` 
3. levantar servidores locales
```shell
npm run pre-dev
npm run dev 
```
4. despues de estar levantada la base de datos se puede insertar los roles por defecto que podrian ser *OPCIONAL*
```sql
INSERT INTO `roles`(`name`) VALUES ('Admin'), ('Super-Admin'), ('Developer'), ('User');
```



## PRODUCCION
- npm run build

### Instalar Nuevos Modules
en la raiz ejecutar
```bash
# ejemplo de nest serve-static
npm install --save @nestjs/serve-static --workspace name-in-package.json
npm install -D @nestjs/serve-static --workspace name-in-package.json
```

