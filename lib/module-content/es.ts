import type { ModuleContentMap } from "./types";

export const MODULE_CONTENT_ES: ModuleContentMap = {
  bienvenida: [
    {
      type: "material",
      blocks: [
        {
          type: "paragraph",
          text: "¡Hola, viajero! Soy el zorro, y voy a acompañarte en esta aventura entre planetas y palabras.",
        },
        {
          type: "paragraph",
          text: 'Hace muchos años, un aviador cayó con su avión en medio del desierto del Sahara. Estaba solo, lejos de todo, tratando de reparar su motor... hasta que una voz muy pequeña le pidió: "¡Dibújame un cordero!". Así comenzó una de las historias más queridas del mundo: El Principito, escrita por Antoine de Saint-Exupéry en 1943.',
        },
        {
          type: "paragraph",
          text: "En este viaje no solo conocerás esa historia. También aprenderás a reconocer los géneros literarios —las distintas formas en que se cuentan las historias— y descubrirás por qué El Principito es considerado una novela.",
        },
        {
          type: "paragraph",
          text: "Cada planeta que visites te dejará una palabra nueva, una pregunta para pensar y una pista para leer mejor, con el corazón. Como dice mi secreto más importante:",
        },
        {
          type: "quote",
          text: "Lo esencial es invisible a los ojos.",
        },
        {
          type: "paragraph",
          text: "¿Listo para despegar?",
          emphasis: true,
        },
      ],
    },
    {
      type: "task",
      blocks: [
        {
          type: "paragraph",
          text: "Antes de subir al avión, cuéntame un poco sobre ti como lector o lectora. Responde con sinceridad, no hay respuestas malas:",
        },
        {
          type: "questions",
          questions: [
            "¿Cuál fue el último libro o historia que leíste por gusto (no por tarea)?",
            "Cuando lees, ¿prefieres historias de aventuras, historias que te hacen reír, historias que te hacen pensar, o historias de misterio?",
            "¿Sabías algo sobre El Principito antes de hoy? Si es así, ¿qué?",
            "En una palabra, ¿cómo te sientes al empezar este viaje? (curioso, nervioso, emocionado, con pereza... ¡todo vale!)",
            "Si pudieras viajar a un planeta inventado por ti, ¿cómo se llamaría?",
          ],
          placeholder: "Escribe tu respuesta aquí...",
        },
      ],
    },
  ],

  "modulo-2-el-principito": [
    {
      type: "material",
      blocks: [
        {
          type: "paragraph",
          text: "Guion sugerido para ilustrar panel a panel:",
        },
        {
          type: "panels",
          panels: [
            {
              label: "Panel 1",
              text: "Un pequeño planeta, casi del tamaño de una casa. En él vive un niño con una bufanda y el cabello dorado como el trigo.",
            },
            {
              label: "Panel 2",
              text: "El niño riega tres pequeños volcanes (dos activos, uno apagado) y arranca, todos los días, los brotes de un árbol peligroso: el baobab. Si no lo hace a tiempo, las raíces pueden partir el planeta en pedazos.",
            },
            {
              label: "Panel 3",
              text: "Un día, brota una flor distinta a todas las demás: una rosa hermosa, orgullosa y un poco quejumbrosa, que pide un fanal de cristal para protegerse del frío y del viento.",
            },
            {
              label: "Panel 4",
              text: "El principito la cuida con dedicación... pero también se cansa de sus caprichos. Un día decide partir a conocer el universo, dejando atrás a su rosa.",
            },
          ],
          footer:
            "Así comienza el viaje del principito por distintos planetas, hasta llegar a la Tierra, donde conocerá a un aviador... y a un zorro.",
        },
      ],
    },
    {
      type: "activity",
      blocks: [
        {
          type: "paragraph",
          text: "¿Qué recuerdas del asteroide B-612? Responde:",
        },
        {
          type: "questions",
          questions: [
            "¿Cuántos volcanes tiene el planeta del principito?",
            "¿Por qué es tan importante arrancar los baobabs a tiempo?",
            "¿Qué pide la rosa para protegerse?",
            "¿Por qué crees que el principito decide dejar su planeta?",
          ],
        },
      ],
    },
    {
      type: "exploration",
      blocks: [
        {
          type: "paragraph",
          text: "Haz clic en cada elemento del asteroide y descubre lo que significa:",
        },
        {
          type: "exploration",
          items: [
            {
              emoji: "🌋",
              title: "Los volcanes",
              text: "El principito los limpia cada mañana, como quien cuida una rutina importante. Representan el cuidado constante de lo que amamos.",
            },
            {
              emoji: "🌳",
              title: "El baobab",
              text: "Si se descuida, puede crecer tanto que destruye el planeta. Representa los problemas pequeños que, si no se atienden a tiempo, se vuelven enormes.",
            },
            {
              emoji: "🌹",
              title: "La rosa",
              text: "Única para el principito, aunque parezca una flor común. Representa el valor que le damos a quienes cuidamos, más allá de su apariencia.",
            },
          ],
        },
      ],
    },
    {
      type: "reflection",
      blocks: [
        {
          type: "paragraph",
          text: 'Todos tenemos algo o alguien que, aunque parezca "una flor más" para el resto del mundo, es único para nosotros porque le hemos dedicado tiempo y cuidado.',
        },
        {
          type: "heading",
          text: "Escribe:",
          level: 4,
        },
        {
          type: "questions",
          questions: [
            '¿Cuál es tu "rosa"? Puede ser una persona, una mascota, un lugar o incluso una afición. ¿Qué haces tú, como el principito, para cuidarla?',
          ],
        },
      ],
    },
    {
      type: "bonus",
      blocks: [
        {
          type: "paragraph",
          text: "Cuando el principito llega a la Tierra, conoce a un zorro que le pide que lo domestique, es decir, que cree un vínculo con él. El zorro le explica que, una vez eso ocurre, cada uno se vuelve único para el otro. Antes de despedirse, le regala su secreto más importante: lo esencial es invisible a los ojos.",
        },
        {
          type: "questions",
          questions: [
            '¿Qué crees que significa "crear vínculos", según lo que el zorro le explica al principito?',
            "¿Por qué la rosa del principito se vuelve única para él, si en el jardín hay miles de rosas iguales?",
            'Con tus propias palabras, ¿qué quiere decir el zorro con "lo esencial es invisible a los ojos"?',
            '¿Alguna vez has "domesticado" —creado un vínculo especial— con una mascota, una amistad o un lugar? Cuéntalo.',
            "Después de hablar con el zorro, ¿qué responsabilidad tiene ahora el principito con su rosa?",
            "Si tú fueras el zorro, ¿qué otro secreto le habrías compartido al principito antes de despedirse?",
          ],
        },
      ],
    },
  ],

  "modulo-3-conceptos": [
    {
      type: "material",
      blocks: [
        {
          type: "paragraph",
          text: "La literatura es el arte de contar historias, expresar sentimientos o representar la vida usando las palabras. No todos los libros cuentan sus historias de la misma manera: algunos narran aventuras, otros expresan emociones en forma de poema, y otros están escritos para representarse en un escenario.",
        },
        {
          type: "paragraph",
          text: 'A esas tres grandes formas las llamamos géneros literarios: la "familia" a la que pertenece cada obra, según cómo está escrita y para qué fue creada.',
        },
        {
          type: "table",
          headers: ["Género", "¿De qué se trata?", "¿Cómo lo reconoces?"],
          rows: [
            [
              "🗺️ Narrativo",
              "Cuenta hechos, reales o inventados, que le pasan a unos personajes en un lugar y un tiempo.",
              "Hay un narrador que cuenta la historia. Está escrito en prosa. Incluye la novela, el cuento y la fábula.",
            ],
            [
              "🎵 Lírico",
              "Expresa sentimientos, emociones y reflexiones muy personales.",
              "Predomina el verso, el ritmo y la rima. Es el género de los poemas.",
            ],
            [
              "🎭 Dramático",
              "Presenta una historia a través del diálogo directo de los personajes.",
              "Está pensado para representarse en un escenario. Se organiza en actos y escenas. Incluye la tragedia y la comedia.",
            ],
          ],
        },
        {
          type: "heading",
          text: "El género narrativo en profundidad",
          level: 3,
        },
        {
          type: "paragraph",
          text: "El Principito pertenece al género narrativo. Toda historia narrativa tiene estos elementos:",
        },
        {
          type: "list",
          items: [
            "Narrador 🎙️ — la voz que cuenta lo que pasa.",
            "Personajes 👥 — quienes viven la historia: principales y secundarios.",
            "Tiempo ⏳ — el momento y la duración en que ocurre todo.",
            "Espacio 🏜️ — el lugar o los lugares donde pasa la historia.",
            "Trama 🧩 — el orden de los hechos: planteamiento, nudo y desenlace.",
          ],
        },
        {
          type: "heading",
          text: "La novela",
          level: 3,
        },
        {
          type: "paragraph",
          text: "Dentro del género narrativo existen distintas formas: el cuento, la fábula, el mito, la leyenda... y la novela: una historia larga, en prosa, dividida en capítulos, con personajes que evolucionan y varios temas o conflictos entrelazados.",
        },
        {
          type: "heading",
          text: "¿Por qué El Principito es una novela?",
          level: 3,
        },
        {
          type: "list",
          items: [
            "Narrador: un aviador que cuenta, en primera persona, su encuentro con el principito.",
            "Personajes: el principito, el aviador, el zorro, la rosa, el rey, el vanidoso... cada uno representa algo del mundo de los adultos.",
            "Tiempo y espacio: ocurre en el desierto del Sahara y en los recuerdos del viaje del principito por distintos asteroides.",
            "Trama: capítulos breves que forman un viaje de aprendizaje sobre el amor, la amistad y lo esencial de la vida.",
            "Tema central: la diferencia entre la mirada superficial de los adultos y la sensibilidad de la infancia.",
          ],
        },
      ],
    },
    {
      type: "activity",
      blocks: [
        {
          type: "paragraph",
          text: "Arrastra cada título a su constelación correcta: Narrativo 🗺️, Lírico 🎵 o Dramático 🎭.",
        },
        {
          type: "classification",
          items: [
            { title: "El Principito (novela)", genre: "Narrativo" },
            { title: "Un poema sobre las estrellas", genre: "Lírico" },
            {
              title: "Una obra de teatro con diálogos y acotaciones",
              genre: "Dramático",
            },
            { title: "Una fábula sobre un zorro y un cuervo", genre: "Narrativo" },
            { title: "Una canción que expresa nostalgia", genre: "Lírico" },
            {
              title: "Un guion de comedia para representar en el colegio",
              genre: "Dramático",
            },
          ],
        },
        {
          type: "questions",
          questions: [
            '¿Por qué crees que El Principito se lee "como una aventura" y no "como un poema", aunque tenga frases muy poéticas?',
          ],
        },
      ],
    },
  ],

  "modulo-4-glosario": [
    {
      type: "material",
      blocks: [
        {
          type: "paragraph",
          text: "Cada flor de este jardín guarda una palabra. Tócala para descubrir su significado:",
        },
        {
          type: "glossary",
          items: [
            {
              emoji: "🌹",
              term: "Género literario",
              definition:
                "Familia a la que pertenece una obra según su forma y su propósito.",
            },
            {
              emoji: "🌻",
              term: "Narrador",
              definition:
                "Voz que cuenta la historia. Puede ser quien vive la historia, quien la observa, o quien lo sabe todo.",
            },
            {
              emoji: "🌼",
              term: "Prosa",
              definition:
                "Forma de escribir en párrafos, sin rima ni verso (a diferencia de la poesía).",
            },
            {
              emoji: "🌷",
              term: "Trama",
              definition:
                "Orden de los sucesos de una historia: cómo empieza, qué problema aparece y cómo se resuelve.",
            },
            {
              emoji: "🪻",
              term: "Personaje",
              definition: "Quien vive y protagoniza los hechos de una historia.",
            },
            {
              emoji: "🌸",
              term: "Novela",
              definition:
                "Narración larga, en prosa, dividida en capítulos, con personajes que cambian a lo largo de la historia.",
            },
            {
              emoji: "🌺",
              term: "Domesticar",
              definition:
                "Crear un vínculo único con alguien o algo, dedicándole tiempo y cuidado.",
            },
            {
              emoji: "🌾",
              term: "Esencial",
              definition:
                "Lo más importante de algo, aunque a veces no se pueda ver a simple vista.",
            },
          ],
        },
      ],
    },
    {
      type: "activity",
      blocks: [
        {
          type: "paragraph",
          text: "Une cada palabra con su flor (definición) correspondiente:",
        },
        {
          type: "matching",
          pairs: [
            { id: 1, term: "Narrador", definition: "La voz que cuenta la historia" },
            {
              id: 2,
              term: "Trama",
              definition: "El orden de los sucesos de una historia",
            },
            {
              id: 3,
              term: "Domesticar",
              definition: "Crear un vínculo especial con alguien",
            },
            {
              id: 4,
              term: "Novela",
              definition: "Historia larga dividida en capítulos",
            },
            {
              id: 5,
              term: "Prosa",
              definition: "Forma de escribir sin rima ni verso",
            },
          ],
        },
      ],
    },
    {
      type: "activity",
      blocks: [
        {
          type: "paragraph",
          text: "Escribe un texto breve (5 a 8 líneas) usando al menos 4 palabras del glosario (narrador, trama, domesticar, personaje, esencial, novela, prosa). Puedes contar una historia inventada, o escribir sobre algo que hayas \"domesticado\" en tu propia vida.",
        },
        {
          type: "questions",
          questions: ["Tu texto:"],
          placeholder: "Escribe tu historia aquí...",
        },
      ],
    },
    {
      type: "wordsearch",
      blocks: [
        {
          type: "paragraph",
          text: "Busca las siguientes 10 palabras en la sopa de letras estelar (horizontal, vertical y diagonal):",
        },
        {
          type: "wordsearch",
          words: [
            "PRINCIPITO",
            "ZORRO",
            "ROSA",
            "AVIADOR",
            "ASTEROIDE",
            "BAOBAB",
            "DESIERTO",
          ],
        },
      ],
    },
  ],

  "modulo-5-retos": [
    {
      type: "game",
      blocks: [
        {
          type: "paragraph",
          text: "Antes de llegar a la Tierra, el principito visitó seis planetas, cada uno habitado por un adulto con un defecto muy particular. En este juego de carrera, avanza adivinando a qué personaje corresponde cada planeta:",
        },
        {
          type: "planets",
          items: [
            {
              number: 1,
              character: "El Rey",
              defect: "Poder sin nadie a quien mandar",
            },
            {
              number: 2,
              character: "El Vanidoso",
              defect: "Necesidad de ser admirado siempre",
            },
            {
              number: 3,
              character: "El Bebedor",
              defect: "Bebe para olvidar que le da vergüenza beber",
            },
            {
              number: 4,
              character: "El Hombre de negocios",
              defect: "Obsesión por contar y poseer las estrellas",
            },
            {
              number: 5,
              character: "El Farolero",
              defect: "Cumple una orden sin sentido, una y otra vez",
            },
            {
              number: 6,
              character: "El Geógrafo",
              defect:
                "Sabe de todo el mundo, pero nunca ha salido a explorarlo",
            },
          ],
          hint: "Toca cada planeta para descubrir quién lo habita y qué defecto representa.",
        },
      ],
    },
    {
      type: "quiz",
      blocks: [
        {
          type: "paragraph",
          text: "Pon a prueba tu brújula lectora:",
        },
        {
          type: "quiz",
          questions: [
            {
              question: "¿Quién narra la historia de El Principito?",
              options: [
                { label: "a", text: "El zorro" },
                { label: "b", text: "El aviador" },
                { label: "c", text: "El rey" },
                { label: "d", text: "La rosa" },
              ],
              answer: "b",
            },
            {
              question:
                "¿Qué le pide el principito al aviador al comienzo de la historia?",
              options: [
                { label: "a", text: "Un mapa" },
                { label: "b", text: "Un cordero" },
                { label: "c", text: "Un avión" },
                { label: "d", text: "Una rosa" },
              ],
              answer: "b",
            },
            {
              question: '¿Qué significa "domesticar", según el zorro?',
              options: [
                { label: "a", text: "Adiestrar a un animal" },
                { label: "b", text: "Crear vínculos" },
                { label: "c", text: "Domar el miedo" },
                { label: "d", text: "Aprender una lección" },
              ],
              answer: "b",
            },
            {
              question: "¿A qué género literario pertenece El Principito?",
              options: [
                { label: "a", text: "Lírico" },
                { label: "b", text: "Dramático" },
                { label: "c", text: "Narrativo" },
                { label: "d", text: "Ensayo" },
              ],
              answer: "c",
            },
            {
              question:
                "¿Cuál de estos NO es un elemento del género narrativo?",
              options: [
                { label: "a", text: "Narrador" },
                { label: "b", text: "Rima" },
                { label: "c", text: "Personajes" },
                { label: "d", text: "Trama" },
              ],
              answer: "b",
            },
            {
              question:
                "¿Por qué se considera que El Principito es una novela y no solo un cuento?",
              options: [
                { label: "a", text: "Porque tiene dibujos" },
                {
                  label: "b",
                  text: "Porque está dividido en capítulos y desarrolla varios temas con profundidad",
                },
                { label: "c", text: "Porque es muy famoso" },
                { label: "d", text: "Porque lo escribió un aviador" },
              ],
              answer: "b",
            },
          ],
        },
      ],
    },
  ],

  "modulo-6-proyecto": [
    {
      type: "material",
      blocks: [
        {
          type: "paragraph",
          text: "Ha llegado el momento de crear tu propio planeta, con tu propia historia. Sigue estos pasos:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Elige tu género literario: ¿tu historia será narrativa (una aventura), lírica (un poema) o dramática (una escena para representar)?",
            "Diseña tu planeta: ¿cómo se llama? ¿qué hay en él? ¿quién lo habita?",
            "Crea tu personaje principal: dale un nombre, una característica especial y un defecto o miedo (como los personajes que visitó el principito).",
            "Define el conflicto: ¿qué problema debe resolver tu personaje en ese planeta?",
            "Escribe tu narrador: ¿quién cuenta la historia? ¿en primera persona, como el aviador, o alguien que observa desde fuera?",
            "Cierra con una enseñanza: como el zorro, deja al lector un pequeño secreto o aprendizaje al final.",
          ],
        },
      ],
    },
    {
      type: "project",
      blocks: [
        {
          type: "paragraph",
          text: "Combina texto, dibujo y audio para presentar tu creación:",
        },
        {
          type: "list",
          items: [
            "Texto: escribe tu historia en al menos 3 párrafos, usando los elementos del género narrativo (narrador, personajes, tiempo, espacio, trama).",
            "Dibujo: ilustra tu planeta y a tu personaje principal.",
            "Audio (opcional): graba un audio de 1 minuto narrando tu historia, como si fueras el aviador contando su encuentro con el principito.",
          ],
        },
        {
          type: "heading",
          text: "Rúbrica de evaluación",
          level: 4,
        },
        {
          type: "rubric",
          headers: ["Criterio", "Alto (3)", "Medio (2)", "Bajo (1)"],
          rows: [
            ["Uso correcto de los elementos narrativos", "", "", ""],
            ["Originalidad del planeta y el personaje", "", "", ""],
            ["Coherencia entre texto, dibujo y (si aplica) audio", "", "", ""],
            ["Presencia de una enseñanza o cierre reflexivo", "", "", ""],
          ],
        },
        {
          type: "questions",
          questions: ["Escribe tu historia aquí:"],
          placeholder: "Tu planeta, tu personaje, tu aventura...",
        },
      ],
    },
  ],

  "modulo-7-cierre": [
    {
      type: "quiz",
      blocks: [
        {
          type: "paragraph",
          text: "El gran viaje — evaluación final:",
        },
        {
          type: "questions",
          questions: [
            "¿Qué es un género literario? Da un ejemplo de cada uno de los tres grandes géneros.",
            "Menciona tres elementos del género narrativo y explica brevemente cada uno.",
            "Explica, con tus propias palabras, por qué El Principito se clasifica como novela y no como cuento.",
            '¿Qué significa "domesticar" según el zorro, y qué relación tiene con la responsabilidad?',
            '¿Por qué crees que Saint-Exupéry eligió contar una historia "infantil" para transmitir críticas y reflexiones dirigidas también a los adultos?',
            "¿Qué relación encuentras entre la estructura de la novela (varios planetas, varios personajes) y el mensaje final de la obra?",
            "Comparado con el género lírico o el dramático, ¿de qué manera el género narrativo te permite conocer con más profundidad la psicología de un personaje como el principito?",
          ],
        },
      ],
    },
    {
      type: "reflection",
      blocks: [
        {
          type: "paragraph",
          text: "Escribe un texto breve (mínimo 5 líneas) respondiendo:",
        },
        {
          type: "questions",
          questions: [
            "¿Qué aprendiste sobre los géneros literarios y la novela en este viaje?",
            '¿Qué "vínculos" consideras que son los más importantes en tu propia vida, y qué responsabilidad implican, según lo que aprendiste del zorro?',
            "Si tuvieras que recomendarle El Principito a un amigo en una sola frase, ¿cuál sería?",
          ],
        },
      ],
    },
    {
      type: "gallery",
      blocks: [
        {
          type: "gallery",
          description:
            "Espacio para que cada estudiante suba una imagen de su proyecto del Módulo 6 (Mi Propio Planeta), junto con el nombre del planeta y una frase corta que resuma su historia. Los compañeros pueden explorar la galería como si recorrieran un nuevo sistema solar de historias creadas por el curso.",
        },
      ],
    },
  ],
};
