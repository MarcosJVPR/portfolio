export default {
  codigo: 'es',
  meta: {
    titulo: 'Marcos Pérez · Fullstack Developer',
    descripcion:
      'Fullstack developer en Madrid. React, TypeScript, Node y Python. Transparencia parlamentaria con datos abiertos, apps publicadas y sistemas de IA con fuentes verificables.'
  },
  saltar: 'Saltar al contenido',
  nav: {
    abrir: 'Abrir menú',
    cerrar: 'Cerrar menú',
    secciones: 'Secciones',
    proyectos: 'Proyectos',
    casos: 'Cómo trabajo',
    trayectoria: 'Trayectoria',
    sobre: 'Sobre mí',
    contacto: 'Contacto'
  },
  idioma: {
    etiqueta: 'Cambiar idioma',
    otro: 'English'
  },
  hero: {
    nombre: 'Marcos Pérez',
    rol: 'Fullstack developer en Madrid',
    titulo: 'Tecnología que deja el sitio mejor de como lo encontró.',
    entrada:
      'Construyo producto con React, TypeScript y Node: transparencia parlamentaria a partir de datos abiertos, una app publicada en Google Play y sistemas de IA que citan sus fuentes.',
    ctaProyectos: 'Ver proyectos',
    ctaCv: 'Descargar CV',
    disponibilidad: 'Disponible para posiciones fullstack en Madrid o en remoto',
    marcadores: [
      { cifra: '4', texto: 'productos en producción con dominio propio' },
      { cifra: '3+', texto: 'años construyendo web con React y Node' },
      { cifra: '2', texto: 'idiomas de trabajo: español nativo, inglés C2' }
    ]
  },
  proyectos: {
    titulo: 'Cuatro productos, no cuatro maquetas',
    entrada:
      'Todo lo que hay aquí está desplegado y se puede abrir ahora mismo. Debajo de cada uno está la decisión técnica que costó más pensar.',
    verSitio: 'Abrir el sitio',
    verCodigo: 'Ver el código',
    destacado: 'Proyecto principal',
    rol: 'Mi rol',
    verDetalle: 'Ver el caso completo'
  },
  casos: {
    titulo: 'Cómo trabajo cuando se complica',
    entrada:
      'Tres decisiones reales de estos proyectos, con el problema que las provocó y lo que pasó después.',
    etiquetas: {
      problema: 'El problema',
      restriccion: 'La restricción',
      decision: 'La decisión',
      resultado: 'El resultado'
    }
  },
  caja: {
    titulo: 'Cómo trabajo cuando se complica',
    entrada: 'Tres decisiones reales de estos proyectos. Están guardadas en la caja.',
    pulsar: 'Púlsame',
    pista: 'Arrastra las cartas por el prado. Pulsa una para leerla entera.',
    recoger: 'Volver a guardarlas',
    cerrar: 'Cerrar carta'
  },
  detalle: {
    volver: 'Volver a proyectos',
    porQue: 'Por qué existe',
    arquitectura: 'Cómo está construido',
    decisiones: 'Las decisiones difíciles',
    aprendido: 'Qué me llevo',
    galeria: 'Capturas',
    siguiente: 'Siguiente proyecto'
  },
  noEncontrado: {
    titulo: 'Esta página no existe',
    entrada: 'El enlace está roto o la página cambió de sitio. Los cuatro proyectos siguen en la portada.',
    volver: 'Ir a la portada'
  },
  sobre: {
    titulo: 'Vengo del branding y acabé escribiendo el código',
    retratoAlt: 'Retrato de Marcos Pérez',
    parrafos: [
      'Estudié un máster en Marketing y Branding antes de hacer un bootcamp intensivo de 400 horas, y esa mezcla se nota en cómo trabajo: me importa que la consulta sea rápida y me importa igual que la persona al otro lado entienda lo que está viendo.',
      'Ahora soy fullstack developer y coordinador en City Voice. Antes administré la infraestructura de red y los servidores de alta concurrencia de Zero Latency Madrid, donde aprendí que un servidor caído a las ocho de la tarde no acepta explicaciones largas.',
      'Busco un equipo donde el producto le importe a alguien. Si estás construyendo algo que la gente usa de verdad, hablemos.'
    ],
    habilidadesTitulo: 'Con lo que trabajo',
    habilidades: [
      { grupo: 'Frontend', items: 'React, TypeScript, Vite, Tailwind, Framer Motion, Vue 3, Redux' },
      { grupo: 'Backend y datos', items: 'Node.js, Python, Flask, PostgreSQL, Supabase, MongoDB, SQL, REST' },
      { grupo: 'Infraestructura', items: 'Vercel, Docker, Azure CI/CD, Git, GitHub, Bash, Agile/Scrum' },
      { grupo: 'También he tocado', items: 'Java con JUnit, Three.js y shaders GLSL, Vitest y Testing Library' }
    ]
  },
  trayectoria: {
    titulo: 'Dónde he trabajado',
    entrada: 'Tres años y medio en cuatro equipos, del frontend puro a la infraestructura de red.',
    actual: 'Actual',
    formacionTitulo: 'Formación',
    puestos: [
      {
        empresa: 'City Voice',
        puesto: 'Fullstack Developer y Coordinador',
        periodo: '06/2025 — hoy',
        lugar: 'Madrid',
        resumen:
          'Desarrollo de funcionalidades con React, TypeScript y Tailwind, con una reducción del 25% en los tiempos de carga. Coordino el flujo entre diseño y desarrollo.',
        stack: ['React', 'TypeScript', 'Tailwind']
      },
      {
        empresa: 'Zero Latency Madrid',
        puesto: 'Software Engineer · Backend y Automatización',
        periodo: '03/2024 — 05/2025',
        lugar: 'Madrid',
        resumen:
          'Scripts propios de automatización en Python y Bash para la infraestructura de red, con un 30% menos de tiempo de inactividad. Administración de servidores y redes VR de alta concurrencia con 99%+ de disponibilidad.',
        stack: ['Python', 'Bash', 'Linux', 'Redes']
      },
      {
        empresa: 'UClinic Center',
        puesto: 'Fullstack Web Developer',
        periodo: '07/2023 — 02/2024',
        lugar: 'Madrid',
        resumen:
          'Aplicaciones de cara a cliente con integraciones propias para automatizar el procesamiento de leads y la sincronización de datos en tiempo real. Mejora del 35% en visibilidad de búsqueda.',
        stack: ['JavaScript', 'REST', 'SEO técnico']
      },
      {
        empresa: 'Construcciones Acacias',
        puesto: 'Frontend Developer',
        periodo: '01/2023 — 06/2023',
        lugar: 'Remoto',
        resumen:
          'Componentes de interfaz modulares y optimización de consultas a base de datos, con un 20% de mejora en la velocidad de renderizado.',
        stack: ['JavaScript', 'CSS', 'SQL']
      }
    ],
    formacion: [
      {
        centro: '4Geeks Academy',
        titulo: 'Full-Stack Developer, 400+ horas intensivas',
        periodo: '2024',
        lugar: 'Madrid'
      },
      {
        centro: 'Universidad del Rosario · UCM',
        titulo: 'Máster en Marketing y Branding',
        periodo: '2022 — 2024',
        lugar: 'Bogotá y Madrid'
      }
    ]
  },
  contacto: {
    titulo: 'Escríbeme',
    entrada:
      'Respondo el mismo día. Si prefieres ver código antes de escribir, el repositorio de este sitio también está abierto.',
    email: 'perezmarcosjulio@gmail.com',
    telefono: '+34 672 059 796',
    ciudad: 'Madrid, España',
    enlaces: [
      { etiqueta: 'LinkedIn', url: 'https://linkedin.com/in/marcosjvpr' },
      { etiqueta: 'GitHub', url: 'https://github.com/MarcosJVPR' }
    ],
    cv: 'Descargar CV en PDF',
    pie: 'Hecho con React, Vite y Three.js. Sin plantillas.'
  },
  pie: {
    lema: 'Fullstack developer en Madrid. Disponible para nuevos proyectos.',
    navegacion: 'Secciones',
    contactoTitulo: 'Contacto',
    hecho: 'Hecho a mano con React, Vite, Tailwind y Three.js. Sin plantillas ni componentes de terceros.',
    privacidad: 'Este sitio no usa cookies ni analítica de terceros.',
    derechos: 'Marcos Pérez'
  }
}