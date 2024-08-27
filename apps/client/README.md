# Template React + TypeScript + Vite + MUI to dashboard

##### Iniciar a trabajar en desarrollo
1. cd/client
2. npm run dev
3. sesionStorage:
    1. accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ
    2. idroles: 1


*** Iconos ***
```ts
https://react-icons.github.io/react-icons/
```

*** Components ***
```ts
https://mui.com/material-ui/getting-started/
```

*** sidebar-pro ***
```ts
https://www.npmjs.com/package/react-pro-sidebar

https://azouaoui-med.github.io/react-pro-sidebar/?path=/docs/submenu--basic
```

### LINKS PARA TRABAJAR Y DESARROLLAR
[Minimal ui theme](https://minimals.cc/dashboard)
[Minimal free](https://minimal-kit-react.vercel.app/)
[Apex chart](https://apexcharts.com/docs/installation/)
[Material UI](https://mui.com/x/react-data-grid/editing/)
[React Icons](https://react-icons.github.io/react-icons/)

### Rutas Pages
**src/routes/index.tsx**
En esta ruta esta el archivo con todas las rutas a las paginas, las configuraciones de privacidad y middlewares usados para cada grupo de rutas
**src/components/config/SesionSettings.ts**
En este archivo se definen los roles y se cruza con el rol en el sesionStorage en "idroles", la funcion que valida el rol es **validateHasRoleAllowed**

### Crear listas en Sidebar
**src/modules/Dashboard/config/configSidebar.tsx**
en esta ruta se encuentra el archivo donde se configura la cantidad de items en el sidebar

### Agregar temas de colores
**src/theme/palette.ts** - agregar un nuevo tema de color [Material UI Theming Mezclar colores](https://mui.com/material-ui/customization/color/)
**src/theme/theme.interface.ts** - y agregar el nombre a los tipados
**src/components/config/SessionSettings.ts** - aqui se encuentra la variable settings que es la que tiene los valores predefinidos
**src/theme/useModeTheme** - en la funcion **memoizedValue - palette** - definir el tema por defecto que tendra
**src/modules/Dashboard/components/navbar/PaletteColorPopover.tsx** en la constante **COLORS** - definir el objeto con el nuevo color a asignar

### Agregar idioma
Dentro de cada modulo su carpeta interna tendra una carpeta **lang** y este tendra un archivo .json con la estructura de cada uno de sus contenidos por idioma EJP
```json
{
  "en":{
    "title": "Message title",
    "content": "Message content"
  },
  "por": {
    "title": "",
    "content":"",
  },
  "fre": {
    "title": "",
    "content":"",
  },
  "es": {
    "title":"Mensaje de titulo",
    "content":"Mensaje de contenido"
  }
}
```

















## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
