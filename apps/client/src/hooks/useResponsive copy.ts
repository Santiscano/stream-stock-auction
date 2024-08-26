import { useTheme } from '@mui/material/styles'; // Importa el hook useTheme desde Material-UI para acceder al tema actual de la aplicación
import useMediaQuery from '@mui/material/useMediaQuery'; // Importa el hook useMediaQuery desde Material-UI para realizar consultas de medios

export const useResponsive = (query:string, start:any, end:any = undefined) => { // Define la función useResponsive con tres parámetros: query, start y end (este último con un valor predeterminado de undefined)
  const theme = useTheme(); // Obtiene el tema actual de la aplicación utilizando el hook useTheme

  const mediaUp = useMediaQuery(theme.breakpoints.up(start)); // Realiza una consulta de medios para verificar si la pantalla está por encima del punto de ruptura especificado por start
  const mediaDown = useMediaQuery(theme.breakpoints.down(start)); // Realiza una consulta de medios para verificar si la pantalla está por debajo del punto de ruptura especificado por start
  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end || start)); // Realiza una consulta de medios para verificar si la pantalla está entre los puntos de ruptura especificados por start y end
  const mediaOnly = useMediaQuery(theme.breakpoints.only(start)); // Realiza una consulta de medios para verificar si la pantalla está en el punto de ruptura especificado por start

  switch (query) {
    case 'up': // Si el parámetro query es 'up'
      return mediaUp; // Devuelve el resultado de la consulta de medios para 'up'
    case 'down': // Si el parámetro query es 'down'
      return mediaDown; // Devuelve el resultado de la consulta de medios para 'down'
    case 'between': // Si el parámetro query es 'between'
      return mediaBetween; // Devuelve el resultado de la consulta de medios para 'between'
    default: // Si no se cumple ninguna de las condiciones anteriores
      return mediaOnly; // Devuelve el resultado de la consulta de medios para 'only' (por defecto)
  }
};


/**
 *  itera a través de las claves de los puntos de ruptura del tema (invertidas), realizando consultas de medios para determinar el ancho actual de la pantalla en función de los puntos de ruptura. Retorna la clave del punto de ruptura que coincide con el ancho actual de la pantalla o devuelve 'xs' si no se encuentra ninguna coincidencia.
 */
export const useWidth = () => { // Define la función useWidth
  const theme = useTheme(); // Obtiene el tema actual de la aplicación utilizando el hook useTheme
  // const keys = [...theme.breakpoints.keys].reverse(); // Obtiene las claves de los puntos de ruptura del tema y las invierte
  const breakpoints = theme.breakpoints.keys.reverse(); // Obtiene las claves de los puntos de ruptura del tema y las invierte

  // Llamamos a todos los hooks useMediaQuery de manera incondicional
  const matches = {
    xs: useMediaQuery(theme.breakpoints.up('xs')),
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    lg: useMediaQuery(theme.breakpoints.up('lg')),
    xl: useMediaQuery(theme.breakpoints.up('xl')),
  };

  // Iteramos sobre las claves de breakpoints y encontramos la primera que hace match
  const foundBreakpoint = breakpoints.find(key => matches[key]);

  return foundBreakpoint || 'xs'; // Devuelve la clave del punto de ruptura que coincide con el ancho actual de la pantalla o 'xs' si no se encuentra ninguna coincidencia
}

