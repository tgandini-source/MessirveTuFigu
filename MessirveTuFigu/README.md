# MessirveTuFigu

## Descripción del problema

MessirveTuFigu es una aplicación móvil de experiencia Expo/React Native que busca resolver la falta de un espacio ágil para que coleccionistas de figuritas de fútbol puedan encontrar sus cartas faltantes y cambiar sus repetidas. El objetivo es simular un entorno de intercambio cercano con sugerencias de coincidencias, perfiles de coleccionistas y un feed de stickers estilo "Pitch Side Trading".

## Alcance implementado

- Interfaz principal con acceso a funciones de exploración y subida de repetidas.
- Feed de sugerencias de intercambio generado desde metadatos de equipos de fútbol.
- Estado de "vacío" para simular pantalla sin coleccionistas disponibles.
- Soporte para datos enriquecidos de equipos desde la API de `football-data.org` con fallback local cuando no hay API key o falla la petición.
- Páginas de detalle, deck, chat y carga/éxito basadas en el flujo de la aplicación.
- Estilos y navegación con `expo-router` y componentes personalizados.

## Stack tecnológico

- Expo SDK 56
- React 19
- React Native 0.85
- TypeScript
- Expo Router
- `expo-image`, `expo-constants`, `expo-linking`, `expo-web-browser`, `expo-status-bar`

## Pasos de ejecución

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Iniciar la app:

   ```bash
   npx expo start
   ```

3. Abrir la app en Android, iOS o web desde el panel de Expo.

4. Para correr en plataformas específicas:

   ```bash
   npm run android
   npm run ios
   npm run web
   ```

## API utilizada

- `football-data.org` v4
- Endpoint principal: `GET https://api.football-data.org/v4/competitions/{competitionCode}/teams`
- Autenticación: header `X-Auth-Token`
- Configuración por defecto en `app.config.ts`:
  - `footballDataBaseUrl`: `https://api.football-data.org/v4`
  - `footballDataCompetition`: `WC`

### Uso de la API en el proyecto

El archivo `src/config/football-data.ts` obtiene la API key y las variables de entorno desde:

- `EXPO_PUBLIC_FOOTBALL_DATA_API_KEY`
- `EXPO_PUBLIC_FOOTBALL_DATA_BASE_URL`
- `EXPO_PUBLIC_FOOTBALL_DATA_COMPETITION`

Si no se encuentra la API key, la aplicación utiliza un conjunto de equipos de respaldo y continúa con una experiencia local.

## Configuración de entorno recomendada

Agregar en el entorno de desarrollo:

```bash
EXPO_PUBLIC_FOOTBALL_DATA_API_KEY=tu_api_key_aqui
EXPO_PUBLIC_FOOTBALL_DATA_BASE_URL=https://api.football-data.org/v4
EXPO_PUBLIC_FOOTBALL_DATA_COMPETITION=WC
```

O configurarlo en `app.config.ts` mediante `extra`.

## Integrantes

Alumnos de la catedra DISEÑO DE SOFTWARE EN DISPOSITIVOS MOVILES de la Tecnicatura Universitaria en Diseño de Software

- Yonatan Ahumada, MU N°: 220
- Tiago Gandini, MU N°: 191
- Cristian Godoy, MU N°: 286
- Mario Carreño, MU N°: 129

## Limitaciones conocidas

- No hay backend propio: la lógica de intercambio es simulada y basada en datos locales.
- No existe persistencia de usuarios ni autenticación real.
- El flujo de "subir repetidas" y "buscar coincidencias" están representados como experiencia de interfaz más que como intercambio real.
- El uso de la API de `football-data.org` depende de una API key válida; sin ella, se usan datos de respaldo estáticos.
- No hay pruebas automatizadas incluidas en el proyecto actual.
- No hay manejo avanzado de errores de red ni reconexión para peticiones a la API.

## Estructura básica del proyecto

- `app/`: rutas y pantallas de la aplicación.
- `src/config/football-data.ts`: configuración y consumo de `football-data.org`.
- `src/data/pitch-side.ts`: generación del feed de intercambio y datos de respaldo.
- `app.config.ts`: variables `extra` y configuración de Expo.
- `package.json`: dependencias y scripts de ejecución.
