export const proyectos = [
  {
    id: 'lente',
    slug: 'lente-democratica',
    nombre: 'Lente Democrática',
    url: 'https://lente-democratica.vercel.app',
    repo: null,
    destacado: true,
    acento: 'var(--color-cobre)',
    imagen: '/projects/lente.jpg',
    ilustracion: '/projects/lente-arte.jpg',
    capturas: ['/projects/lente-1.jpg', '/projects/lente-2.jpg', '/projects/lente-3.jpg'],
    stack: ['React 18', 'Vite', 'Supabase', 'Python', 'PostgreSQL'],
    es: {
      tagline: 'Qué prometió tu partido y qué votó después.',
      descripcion:
        'Una web que cruza los programas electorales con las votaciones nominales reales del Congreso, las declaraciones de bienes de cada diputado y sus intervenciones. Todo en lenguaje llano, sin jerga parlamentaria, para alguien que no sigue la política a diario.',
      rol: 'Diseño del modelo de datos, pipeline de ingesta, clasificación y front completo.',
      metricaCifra: '5',
      metricaTexto:
        'fuentes oficiales distintas normalizadas en un solo esquema: votaciones, votos individuales, mandatos, intervenciones e iniciativas.',
      porQue:
        'La información ya es pública, pero está repartida en PDFs, hojas de cálculo y JSON con formatos distintos, y escrita para gente que conoce el reglamento del Congreso. Si quieres saber si tu diputado votó lo que prometió, hoy tienes que dedicarle una tarde. Ese es el problema que ataca Lente Democrática.',
      arquitectura: [
        'Ingesta en Python de cinco fuentes oficiales hacia un esquema único en PostgreSQL, con la normalización hecha en la carga y no en la consulta.',
        'Resolución de identidad en cascada para atribuir cada voto a un diputado concreto, con registro de qué escalón resolvió cada caso.',
        'Front en React 18 con Vite, datos servidos desde Supabase y vistas materializadas para los agregados que se consultan en cada carga.',
        'Capa editorial de resúmenes en lenguaje llano encima de los datos crudos, separada del pipeline para poder corregirla sin reprocesar nada.'
      ],
      aprendido:
        'Que el trabajo difícil de un producto de datos no está en la visualización sino en decidir qué números tienen derecho a mostrarse. Pasé más tiempo poniendo puertas que dibujando gráficos.'
    },
    en: {
      tagline: 'What your party promised, and how it actually voted.',
      descripcion:
        'A site that cross-references electoral manifestos against real roll-call votes in the Spanish Congress, each MP\u2019s asset declarations and their floor speeches. All in plain language, no parliamentary jargon, for someone who does not follow politics daily.',
      rol: 'Data model, ingestion pipeline, classification system and the entire frontend.',
      metricaCifra: '5',
      metricaTexto:
        'separate official sources normalised into one schema: votes, individual ballots, terms, speeches and bills.',
      porQue:
        'The information is already public, but it is scattered across PDFs, spreadsheets and JSON in different shapes, and written for people who know the rules of Congress. If you want to know whether your MP voted for what they promised, today that costs you an afternoon. That is the problem Lente Democrática attacks.',
      arquitectura: [
        'Python ingestion from five official sources into a single PostgreSQL schema, with normalisation done at load time rather than at query time.',
        'Cascading identity resolution to attribute each ballot to a specific MP, recording which rung resolved each case.',
        'React 18 frontend on Vite, data served from Supabase, with materialised views for the aggregates queried on every load.',
        'An editorial layer of plain-language summaries on top of the raw data, kept separate from the pipeline so it can be corrected without reprocessing anything.'
      ],
      aprendido:
        'That the hard work in a data product is not the visualisation but deciding which numbers have earned the right to be shown. I spent more time building gates than drawing charts.'
    }
  },
  {
    id: 'zolarium',
    slug: 'zolarium',
    nombre: 'Zolarium',
    url: 'https://zolariumapp.com',
    repo: 'https://github.com/MarcosJVPR/Zolarium',
    destacado: false,
    acento: 'var(--color-cielo)',
    imagen: '/projects/zolarium.jpg',
    ilustracion: '/projects/zolarium-arte.jpg',
    capturas: ['/projects/zolarium-1.jpg', '/projects/zolarium-2.jpg', '/projects/zolarium-3.jpg'],
    stack: ['React 19', 'Vite', 'Supabase', 'Leaflet', 'PWA / TWA'],
    es: {
      tagline: 'App de arquetipos que funciona sin conexión y está publicada en Google Play.',
      descripcion:
        'PWA offline-first empaquetada como aplicación Android. Motor propio de recomendación con regresión logística en línea, sistema de 48 arquetipos, test de 36 preguntas, minijuegos diarios con rachas y tarjetas compartibles generadas en canvas.',
      rol: 'Producto completo: motor, panel de administración, seguridad y publicación.',
      metricaCifra: '259 kB',
      metricaTexto: 'de bundle inicial, bajando desde 426 kB con code splitting por ruta.',
      porQue:
        'Quería construir un producto entero de punta a punta, no una demo: con panel de administración, control de acceso, empaquetado para tienda y un motor que mejorase con el uso. Zolarium es el proyecto donde aprendí lo que cuesta todo lo que viene después de que el código funciona.',
      arquitectura: [
        'PWA offline-first con service worker propio, empaquetada como Trusted Web Activity para Android.',
        'Motor de recomendación con regresión logística en línea que se ajusta con las respuestas del usuario en el dispositivo.',
        'Supabase para persistencia y autenticación, con políticas de acceso por fila y el panel de administración fuera del bundle público.',
        'Tarjetas compartibles renderizadas en canvas en el cliente, sin pasar por un servicio de imágenes.'
      ],
      aprendido:
        'Que publicar en una tienda te obliga a tomar en serio cosas que en web puedes ir posponiendo: arranque en frío, permisos, política de privacidad y qué pasa cuando el usuario abre la app en el metro sin cobertura.'
    },
    en: {
      tagline: 'An archetype app that works offline and ships on Google Play.',
      descripcion:
        'An offline-first PWA packaged as an Android app. Custom recommendation engine with online logistic regression, a 48-archetype system, a 36-question test, daily mini-games with streaks, and shareable cards rendered on canvas.',
      rol: 'Whole product: engine, admin panel, security hardening and release.',
      metricaCifra: '259 kB',
      metricaTexto: 'initial bundle, down from 426 kB through route-level code splitting.',
      porQue:
        'I wanted to build an entire product end to end, not a demo: with an admin panel, access control, store packaging and an engine that improves with use. Zolarium is the project where I learned what everything after "the code works" actually costs.',
      arquitectura: [
        'Offline-first PWA with a hand-written service worker, packaged as a Trusted Web Activity for Android.',
        'Recommendation engine using online logistic regression that adapts to user answers on the device.',
        'Supabase for persistence and auth, with row-level access policies and the admin panel kept out of the public bundle.',
        'Shareable cards rendered on canvas client-side, with no image service in the loop.'
      ],
      aprendido:
        'That shipping to a store forces you to take seriously what you can keep postponing on the web: cold start, permissions, privacy policy, and what happens when someone opens the app underground with no signal.'
    }
  },
  {
    id: 'copilot',
    slug: 'pyme-copilot',
    nombre: 'PYME Copilot',
    url: 'https://ai-for-small-businesses.vercel.app',
    repo: null,
    destacado: false,
    acento: 'var(--color-musgo)',
    imagen: '/projects/copilot.jpg',
    ilustracion: '/projects/copilot-arte.jpg',
    capturas: ['/projects/copilot-1.jpg', '/projects/copilot-2.jpg', '/projects/copilot-3.jpg'],
    stack: ['React', 'Vite', 'pgvector', 'Supabase', 'Serverless'],
    es: {
      tagline: 'Sube los documentos de tu empresa y pregunta. Cada respuesta cita su fuente.',
      descripcion:
        'Sistema RAG completo: trocea y vectoriza los documentos que subes, hace búsqueda semántica sobre pgvector y devuelve respuestas ancladas al texto original con citas en línea. Si no está en tus documentos, lo dice en lugar de inventarlo.',
      rol: 'Arquitectura de recuperación, chunking, prompt de anclaje y front.',
      metricaCifra: '0',
      metricaTexto: 'respuestas sin fuente: cada afirmación enlaza al fragmento que la sostiene.',
      porQue:
        'Una pyme tiene su conocimiento repartido en contratos, manuales y correos, y el problema no es que falte información sino que nadie la encuentra a tiempo. Un asistente que responde bien pero inventa no sirve en ese contexto: la respuesta tiene que poder comprobarse en un clic.',
      arquitectura: [
        'Troceado de documentos con solapamiento para no cortar una idea por la mitad entre fragmentos.',
        'Embeddings almacenados en pgvector dentro de Postgres, sin añadir una base de datos vectorial aparte.',
        'Prompt de anclaje que obliga al modelo a responder sólo desde los fragmentos recuperados y a declarar cuando no hay material suficiente.',
        'Función serverless como única puerta hacia el proveedor del modelo, con la clave fuera del cliente.'
      ],
      aprendido:
        'Que la calidad de un RAG se decide en el troceado y en la recuperación, no en el prompt. Cuando la respuesta es mala, casi siempre es que el fragmento correcto nunca llegó al modelo.'
    },
    en: {
      tagline: 'Upload your company documents and ask. Every answer cites its source.',
      descripcion:
        'A full RAG system: it chunks and embeds the documents you upload, runs semantic search over pgvector and returns answers grounded in the original text with inline citations. If it is not in your documents, it says so instead of inventing it.',
      rol: 'Retrieval architecture, chunking strategy, grounding prompt and frontend.',
      metricaCifra: '0',
      metricaTexto: 'unsourced answers: every claim links to the passage behind it.',
      porQue:
        'A small business keeps its knowledge spread across contracts, manuals and email, and the problem is not missing information but nobody finding it in time. An assistant that answers well but invents is useless there: the answer has to be checkable in one click.',
      arquitectura: [
        'Document chunking with overlap so an idea is never cut in half between fragments.',
        'Embeddings stored in pgvector inside Postgres, without adding a separate vector database.',
        'A grounding prompt that forces the model to answer only from retrieved fragments and to say when there is not enough material.',
        'A serverless function as the only door to the model provider, keeping the key out of the client.'
      ],
      aprendido:
        'That RAG quality is decided in chunking and retrieval, not in the prompt. When the answer is bad, almost always the right fragment never reached the model.'
    }
  },
  {
    id: 'travel',
    slug: 'travel-to-spain',
    nombre: 'Travel to Spain',
    url: 'https://travel-to-spain.vercel.app',
    repo: null,
    destacado: false,
    acento: 'var(--color-sol)',
    imagen: '/projects/travel.jpg',
    ilustracion: '/projects/travel-arte.jpg',
    capturas: ['/projects/travel-1.jpg', '/projects/travel-2.jpg', '/projects/travel-3.jpg'],
    stack: ['React', 'React Router 6', 'Recharts', 'SheetJS', 'Serverless'],
    es: {
      tagline: 'Datos turísticos oficiales del Gobierno, navegables por fin.',
      descripcion:
        'La API pública de Dataestur devuelve hojas de Excel, no JSON. La app las parsea en el cliente con SheetJS a través de un proxy serverless que resuelve el CORS, y las convierte en gráficos por destino con tematización de color por comunidad.',
      rol: 'Gateway serverless, parseo de datos y visualización.',
      metricaCifra: '43.768',
      metricaTexto: 'filas de datos oficiales servidas sin que el usuario espere a un backend propio.',
      porQue:
        'Dataestur publica datos turísticos buenos y actualizados, pero los entrega como si fueran para un analista con Excel abierto. Quería comprobar cuánto se puede construir encima de una fuente pública incómoda sin montar un backend ni una base de datos.',
      arquitectura: [
        'Proxy serverless que resuelve el CORS y actúa como única puerta hacia la API pública.',
        'Parseo de las hojas de cálculo en el navegador con SheetJS, sin capa de almacenamiento intermedia.',
        'Visualización con Recharts y tematización de color por comunidad autónoma.',
        'Navegación por destino con React Router y estado derivado de la URL, para que cada vista sea enlazable.'
      ],
      aprendido:
        'Que el dato abierto casi nunca llega en el formato que necesitas, y que buena parte del trabajo de front consiste en absorber esa incomodidad para que el usuario no la vea.'
    },
    en: {
      tagline: 'Official government tourism data, finally browsable.',
      descripcion:
        'The public Dataestur API returns Excel sheets, not JSON. The app parses them client-side with SheetJS through a serverless proxy that solves the CORS problem, then turns them into per-destination charts with colour theming by region.',
      rol: 'Serverless gateway, data parsing and visualisation.',
      metricaCifra: '43,768',
      metricaTexto: 'rows of official data served without the user waiting on a backend of my own.',
      porQue:
        'Dataestur publishes good, current tourism data, but hands it over as if you were an analyst with Excel open. I wanted to see how much you can build on top of an awkward public source without standing up a backend or a database.',
      arquitectura: [
        'A serverless proxy that solves CORS and acts as the single door to the public API.',
        'Spreadsheet parsing in the browser with SheetJS, with no intermediate storage layer.',
        'Visualisation with Recharts and colour theming by autonomous community.',
        'Per-destination navigation with React Router and state derived from the URL, so every view is linkable.'
      ],
      aprendido:
        'That open data almost never arrives in the format you need, and that a good part of frontend work is absorbing that awkwardness so the user never sees it.'
    }
  }
]

export const casos = [
  {
    id: 'cascada',
    proyectoId: 'lente',
    proyecto: 'Lente Democrática',
    acento: 'var(--color-cobre)',
    es: {
      titulo: 'Los votos del Congreso no traen identificador',
      problema:
        'Los JSON de votaciones identifican a cada diputado sólo por su nombre escrito. Acentos, apellidos compuestos, orden invertido y el Grupo Mixto rompiendo la adscripción de partido dejaban miles de votos huérfanos, sin poder atribuirse a nadie.',
      restriccion:
        'Resolverlos uno a uno con un modelo de lenguaje era la vía rápida y también la peor: coste por voto, latencia y ninguna forma de auditar por qué el sistema decidió lo que decidió.',
      decision:
        'Monté una cascada. Primero alias exactos, luego coincidencia por trigramas sobre el censo de diputados, luego el campo FORMACIONELECTORAL para desenredar el Grupo Mixto, y sólo lo que sobrevivía a los tres pasos llegaba al modelo. Lo que el modelo tampoco resolvía iba a una cola de revisión manual.',
      resultado:
        'Los huérfanos quedaron resueltos con un número de llamadas al modelo casi nulo, y cada voto guarda por qué escalón de la cascada se resolvió. Si mañana alguien cuestiona una atribución, puedo enseñarle el camino exacto.'
    },
    en: {
      titulo: 'Congress votes come with no identifier',
      problema:
        'The vote JSONs identify each MP by written name only. Accents, compound surnames, reversed order and the Mixed Group breaking party attribution left thousands of votes orphaned, attributable to nobody.',
      restriccion:
        'Resolving them one by one with a language model was the fast route and also the worst one: cost per vote, latency, and no way to audit why the system decided what it decided.',
      decision:
        'I built a cascade. Exact aliases first, then trigram matching against the MP census, then the FORMACIONELECTORAL field to untangle the Mixed Group, and only what survived all three reached the model. Whatever the model could not resolve either went to a manual review queue.',
      resultado:
        'The orphans were resolved with a near-zero number of model calls, and every vote records which rung of the cascade resolved it. If someone questions an attribution tomorrow, I can show them the exact path.'
    }
  },
  {
    id: 'umbral',
    proyectoId: 'lente',
    proyecto: 'Lente Democrática',
    acento: 'var(--color-musgo)',
    es: {
      titulo: 'El hallazgo que decidí no publicar',
      problema:
        'El mapa de posicionamiento ideológico ya funcionaba y el análisis de coherencia entre promesas y votos era la función más llamativa del producto. La cobertura de promesas verificadas estaba en el 16%.',
      restriccion:
        'Con esa cobertura, un titular del tipo "este partido incumple el 70% de lo que promete" habría sido técnicamente cierto sobre la muestra y profundamente engañoso sobre la realidad. Y el eje económico mostraba una correlación de 0,935 con la simple propensión a votar que sí, señal clásica de correlación espuria.',
      decision:
        'Puse una puerta en el código: los resultados de coherencia no se renderizan por debajo del 35% de cobertura. Y dejé el eje económico marcado como sospechoso en la documentación en lugar de venderlo como un hallazgo.',
      resultado:
        'La función más vistosa del proyecto lleva meses escrita y sin mostrarse. En un producto sobre transparencia política, publicar un número frágil habría costado más que no publicarlo.'
    },
    en: {
      titulo: 'The finding I decided not to publish',
      problema:
        'The ideological positioning map already worked, and promise-versus-vote coherence was the product\u2019s most striking feature. Verified promise coverage sat at 16%.',
      restriccion:
        'At that coverage, a headline like "this party breaks 70% of its promises" would have been technically true of the sample and deeply misleading about reality. And the economic axis correlated at 0.935 with plain propensity to vote yes, a textbook sign of spurious correlation.',
      decision:
        'I put a gate in the code: coherence results do not render below 35% coverage. And I flagged the economic axis as suspect in the documentation instead of selling it as a finding.',
      resultado:
        'The project\u2019s flashiest feature has been written and hidden for months. In a product about political transparency, shipping a fragile number would have cost more than not shipping it.'
    }
  },
  {
    id: 'bundle',
    proyectoId: 'zolarium',
    proyecto: 'Zolarium',
    acento: 'var(--color-cielo)',
    es: {
      titulo: 'De 426 kB a 259 kB sin quitar funciones',
      problema:
        'Zolarium se instala como app Android desde una PWA. El primer arranque cargaba de golpe el motor de recomendación, el mapa con Leaflet, los minijuegos y el panel de administración, aunque el usuario sólo quisiera hacer el test.',
      restriccion:
        'Nada podía desaparecer: el panel de administración lo uso yo, el mapa es una función central y los minijuegos sostienen el sistema de rachas.',
      decision:
        'Dividí por ruta con carga diferida, saqué el panel de administración del bundle público por completo y dejé el motor de recomendación fuera del arranque, cargándolo cuando el usuario termina el test y no antes.',
      resultado:
        'El bundle inicial bajó a 259 kB, el arranque en frío de la app empaquetada dejó de ser el cuello de botella, y la aplicación entró en fase de testing cerrado en Google Play con 12 probadores.'
    },
    en: {
      titulo: 'From 426 kB to 259 kB without dropping features',
      problema:
        'Zolarium installs as an Android app from a PWA. First launch loaded the recommendation engine, the Leaflet map, the mini-games and the admin panel all at once, even if the user only wanted to take the test.',
      restriccion:
        'Nothing could go: I use the admin panel myself, the map is a core feature, and the mini-games hold up the streak system.',
      decision:
        'I split by route with lazy loading, pulled the admin panel out of the public bundle entirely, and kept the recommendation engine off the boot path, loading it when the user finishes the test and not before.',
      resultado:
        'Initial bundle dropped to 259 kB, cold start on the packaged app stopped being the bottleneck, and the app entered closed testing on Google Play with 12 testers.'
    }
  }
]

export function proyectoPorSlug(slug) {
  return proyectos.find((proyecto) => proyecto.slug === slug)
}

export function casosDeProyecto(proyectoId) {
  return casos.filter((caso) => caso.proyectoId === proyectoId)
}

export function proyectoSiguiente(slug) {
  const indice = proyectos.findIndex((proyecto) => proyecto.slug === slug)
  if (indice === -1) return proyectos[0]
  return proyectos[(indice + 1) % proyectos.length]
}