# Portafolio · Marcos Pérez

Sitio personal bilingüe (ES/EN) con dirección de arte Solarpunk + Yoshi's Island.
React 18 + Vite + Tailwind 4 + Three.js + React Router 6, sin plantillas ni
componentes de terceros.

## Arrancar

```bash
npm install
npm run dev
npm run build
npm test
```

## Rutas

- `/` portada con hero, proyectos, decisiones difíciles, sobre mí y contacto.
- `/proyectos/:slug` caso completo de cada proyecto. Los slugs son
  `lente-democratica`, `zolarium`, `pyme-copilot` y `travel-to-spain`.
- Cualquier otra ruta cae en la página 404.

`vercel.json` reescribe todas las rutas a `index.html`, que es lo que evita el 404
del servidor cuando alguien recarga estando en una página de detalle.

## Lo que tienes que reemplazar antes de publicar

1. **Capturas de los proyectos** en `public/projects/`. Ahora mismo hay marcadores
   generados. Cada proyecto necesita cinco imágenes de 1600×1100:
   - `<id>.jpg` captura real del sitio, la que se ve en reposo en la tarjeta.
   - `<id>-arte.jpg` ilustración Solarpunk que revela el efecto obturador al hover.
   - `<id>-1.jpg`, `<id>-2.jpg`, `<id>-3.jpg` galería de la página de detalle.

   Los `<id>` son `lente`, `zolarium`, `copilot` y `travel`.
2. **Los enlaces a repositorios** en `src/data/projects.js`. Sólo Zolarium tiene
   uno puesto; los demás están en `null` y el botón de código no se renderiza hasta
   que los rellenes. Si un repo es privado, déjalo en `null`.
3. **`public/og.png`**, imagen de 1200×630 para cuando compartas el enlace.
4. **`public/cv/Marcos_Perez_CV.pdf`** contiene tu CV actual. Sustitúyelo cuando lo
   actualices y los botones de descarga seguirán funcionando.

## Rendimiento

El presupuesto está en la ruta crítica, no en el total:

| Recurso | Tamaño gzip | Cuándo se descarga |
|---|---|---|
| JS de aplicación | ~71 kB | siempre |
| CSS | ~6 kB | siempre |
| Three.js + escena | ~222 kB | sólo escritorio, tras `requestIdleCallback` |

La escena WebGL no se carga si el usuario tiene `prefers-reduced-motion`, si la
pantalla mide menos de 720 px, si el dispositivo declara menos de 4 GB de memoria
o menos de 4 núcleos. En esos casos se ve `.respaldo-estatico`, un degradado CSS
con la misma paleta. El texto del hero es HTML plano y no espera a nada, así que
el LCP no depende de Three.js.

## Dirección de arte

El efecto de dibujo sobre imagen se compone en tres capas:

- Fotografía o render de fondo.
- Trazos SVG con los filtros `trazoIrregular` y `lavadoAcuarela`, que aplican
  `feTurbulence` + `feDisplacementMap` para romper la línea perfecta del vector.
- Grano de papel fijo a pantalla completa en `mix-blend-mode: multiply`.

Tipografía: Fraunces con los ejes `SOFT` y `WONK` activados para los titulares,
Karla para el resto.

## Despliegue en Vercel

Framework preset Vite, build `npm run build`, directorio de salida `dist`.
Sin variables de entorno.