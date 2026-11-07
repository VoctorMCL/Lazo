export type ColorKey =
  | 'jade' | 'gold' | 'slate' | 'moss' | 'teal' | 'indigo'
  | 'plum' | 'clay' | 'berry' | 'olive' | 'alert';

export interface Category {
  id: string;
  label: string;
  color: ColorKey;
}

export interface Scenario {
  id: string;
  catId: string;
  title: string;
  text: string;
  contexto: string;
  personaje: string;
  personajeEstado: string;
  apertura: string;
  objetivo: string;
}

export interface CategoryColors {
  main: string;
  soft: string;
  hex: string;
}

export const CATEGORIES: Category[] = [
  { id: "comunicacion", label: "Comunicación digital", color: "jade" },
  { id: "origen", label: "Origen y pertenencia", color: "gold" },
  { id: "equipo", label: "Tensión en equipo", color: "slate" },
  { id: "espacio", label: "Espacio y competencia", color: "moss" },
  { id: "consentimiento", label: "Consentimiento digital", color: "teal" },
  { id: "opinion", label: "Diferencias de opinión", color: "indigo" },
  { id: "exclusion", label: "Presión de grupo y exclusión", color: "plum" },
  { id: "ira", label: "Manejo de la ira", color: "clay" },
  { id: "justicia", label: "Justicia y trato desigual", color: "berry" },
  { id: "familiar", label: "Contexto personal y familiar", color: "olive" }
];

export const SCENARIOS: Scenario[] = [
  {
    id: "chat-salon", catId: "comunicacion", title: `El chat del salón`,
    text: `En el grupo de WhatsApp del curso circula un audio burlándose de Valentina por su forma de vestir. Varios lo reenvían entre risas. Ahora Valentina se enteró y te escribe directamente a ti, porque saben que ustedes son cercanos.`,
    contexto: `El audio apareció anoche en el grupo de WhatsApp del curso. Dura menos de un minuto, pero alcanzó para que varios lo reenviaran con stickers y risas. Valentina se enteró esta mañana porque una compañera le mostró la conversación. Cuando te escribe, está temblando: no entiende por qué nadie la avisó antes y le duele pensar que tú también lo escuchaste sin decirle nada. En el salón el tema sigue vivo, y ella no sabe si enfrentar al grupo o callarse.`,
    personaje: `Valentina`, personajeEstado: `dolida y sorprendida de que nadie le avisó antes de que el audio circulara`,
    apertura: `¿Tú también lo escuchaste y no me dijiste nada? Me enteré por otra persona...`,
    objetivo: `Sostener la conversación sin ponerte a la defensiva y ayudarle a decidir qué hacer.`
  },
  {
    id: "captura-privada", catId: "comunicacion", title: `La captura de pantalla`,
    text: `Un compañero tomó captura de una conversación privada de Instagram entre dos estudiantes y la compartió fuera de contexto en una historia. Uno de ellos, Andrés, cree que fuiste tú quien la compartió.`,
    contexto: `La captura salió de un chat privado de Instagram entre Andrés y otra persona. En la imagen aparece una frase que, fuera de contexto, parece mucho más grave de lo que era. La historia ya la vieron varios compañeros y algunos comentaron sin saber la historia completa. Andrés está convencido de que tú la compartiste porque fuiste una de las pocas personas que vio esa conversación. Te busca molesto, con la sensación de que alguien en quien confiaba lo expuso.`,
    personaje: `Andrés`, personajeEstado: `molesto, sintiéndose traicionado`,
    apertura: `¿Por qué compartiste eso? Eso era privado, ni siquiera lo hablé contigo.`,
    objetivo: `Aclarar lo que pasó sin escalar la acusación y proponer cómo arreglarlo.`
  },
  {
    id: "grupo-sacada", catId: "comunicacion", title: `El grupo que la sacaron`,
    text: `Sin explicación, sacaron a Camila del grupo de estudio de matemáticas en WhatsApp. Ella cree que fue una decisión tuya, porque tú administras el grupo.`,
    contexto: `El grupo de estudio de matemáticas lleva meses funcionando y Camila era una de las más activas. Ayer, sin previo aviso, apareció fuera del chat y ya no puede ver los mensajes. Ella sabe que tú administras el grupo, así que asumió que la decisión fue tuya. No entiende si hizo algo mal o si hay una razón que nadie le explicó. Te escribe confundida, pero también con miedo de que la respuesta confirme que la dejaron por fuera a propósito.`,
    personaje: `Camila`, personajeEstado: `confundida y un poco herida`,
    apertura: `Oye, ¿por qué me sacaron del grupo? ¿Hice algo?`,
    objetivo: `Explicar la situación con honestidad y decidir junto a ella qué hacer.`
  },
  {
    id: "comentarios-foto", catId: "comunicacion", title: `Comentarios en la publicación`,
    text: `Publicaste una foto del paseo de curso y varios compañeros dejaron comentarios burlándose del peso de Juliana en la imagen. Ella te escribe pidiéndote que la bajes.`,
    contexto: `La foto era del paseo de curso y en el momento parecía inofensiva. Pero los comentarios empezaron a llenarse de burlas sobre el cuerpo de Juliana, y varios compañeros les dieron «me gusta» y respondieron. Ella vio todo desde su casa y lleva un rato pensando si pedirte que la bajes o no. Finalmente te escribe, avergonzada, porque no quiere parecer exagerada pero los comentarios ya le están afectando.`,
    personaje: `Juliana`, personajeEstado: `avergonzada e incómoda`,
    apertura: `¿Puedes bajar esa foto? Los comentarios me están doliendo bastante.`,
    objetivo: `Responder con empatía y decidir qué hacer con la publicación y los comentarios.`
  },
  {
    id: "cadena-mensajes", catId: "comunicacion", title: `La cadena de mensajes`,
    text: `Empezó a circular en el chat del curso una cadena de mensajes especulando por qué Simón faltó dos semanas seguidas a clase. Simón se enteró y te busca porque sabe que tú no participaste.`,
    contexto: `Simón faltó dos semanas seguidas y nunca explicó por qué. En el chat del curso empezaron las especulaciones: unos decían que estaba enfermo, otros inventaron problemas familiares, y la cadena creció hasta convertirse en el tema del día. Simón se enteró por un primo que está en otro curso. Te busca porque sabe que tú no participaste, pero le preocupa que la gente siga hablando de su vida sin permiso.`,
    personaje: `Simón`, personajeEstado: `incómodo, no quiere que sigan hablando de su vida privada`,
    apertura: `¿Tú sabes qué están diciendo de mí en el chat? Preferiría que la gente no especule.`,
    objetivo: `Apoyarlo sin presionarlo a contar algo que no quiere compartir.`
  },

  {
    id: "nuevo-pueblo", catId: "origen", title: `El que llegó de otro pueblo`,
    text: `Santiago llegó este semestre a tu colegio en Medellín. Su familia tuvo que salir de su pueblo en el oriente antioqueño por la situación de orden público. Algunos compañeros imitan su acento y se ríen cuando participa en clase. Hoy quedaron en el mismo grupo de ciencias.`,
    contexto: `Santiago llegó a mitad de semestre, después de que su familia saliera del oriente antioqueño por la situación de orden público. Desde el primer día algunos compañeros imitaron su acento y se rieron cuando participa. Él empezó a hablar menos y a sentarse solo. Hoy el profesor los puso en el mismo grupo de ciencias, y Santiago llega con la guardia alta, esperando que la burla empiece otra vez.`,
    personaje: `Santiago`, personajeEstado: `a la defensiva, cansado de que se burlen de su acento`,
    apertura: `Ya sé que se van a reír, así que si quieres hago la parte yo solo y ya.`,
    objetivo: `Hacerlo sentir parte del grupo sin minimizar lo que le ha pasado.`
  },
  {
    id: "uniforme-distinto", catId: "origen", title: `El uniforme distinto`,
    text: `Manuela empezó el año con el uniforme de su colegio anterior porque su familia no tenía cómo comprar el nuevo todavía. Algunos compañeros se lo recuerdan cada tanto como burla.`,
    contexto: `Manuela empezó el año con el uniforme de su colegio anterior porque en su casa no alcanzó para comprar el nuevo. Al principio nadie dijo nada, pero con las semanas algunos compañeros empezaron a hacer comentarios cada vez que ella pasa: «¿y ese uniforme?», «¿no te dieron el bueno?». Ella intenta responder con calma, pero le duele que lo digan delante de otros. Hoy uno de esos comentarios volvió a aparecer en el descanso, y Manuela llega a hablar contigo con la voz baja y la mirada en el piso.`,
    personaje: `Manuela`, personajeEstado: `incómoda por la situación económica de su familia`,
    apertura: `Sé que se nota que el uniforme es distinto, no hace falta que lo digan cada rato.`,
    objetivo: `Mostrarle apoyo sin hacerla sentir que le tienes lástima.`
  },
  {
    id: "almuerzo-diferente", catId: "origen", title: `El almuerzo diferente`,
    text: `Iván trae siempre el mismo almuerzo sencillo y unos compañeros comentan en voz alta que "eso no es almuerzo de verdad". Iván se sienta cada vez más lejos del grupo a la hora de comer.`,
    contexto: `Iván trae todos los días un almuerzo sencillo que prepara en su casa. Un grupo empezó a comentar en voz alta que «eso no es almuerzo de verdad» y a mirar su plato con burla. Él se ríe para disimular, pero cada vez se sienta más lejos, hasta que terminó comiendo solo en una banca del patio. Hoy te lo encuentras ahí, con la comida a medio abrir y la excusa de que «aquí se está más tranquilo».`,
    personaje: `Iván`, personajeEstado: `apenado, prefiere comer solo antes que ser el centro de burlas`,
    apertura: `Tranquilo, prefiero comer aquí. No es gran cosa.`,
    objetivo: `Acercarte sin forzar la situación ni hacerla más incómoda.`
  },
  {
    id: "familia-otro-pais", catId: "origen", title: `La familia que llegó de otro país`,
    text: `Estefanía y su familia llegaron de Venezuela hace un año. En un trabajo de historia, un compañero del grupo dijo en broma que ella "no tiene por qué opinar de la historia de Colombia".`,
    contexto: `Estefanía nació en Venezuela y llegó a Colombia hace un año. En el trabajo de historia sobre la Independencia, ella hizo un aporte y un compañero respondió en broma que «no tiene por qué opinar de la historia de Colombia». Varios se rieron y ella se quedó callada el resto de la clase. Después, en el descanso, te busca dolida: siente que le están diciendo que su voz no cuenta igual que la de los demás.`,
    personaje: `Estefanía`, personajeEstado: `dolida, siente que no la dejan participar igual que a los demás`,
    apertura: `¿En serio creen que no puedo opinar solo porque no nací aquí?`,
    objetivo: `Reconocer lo que pasó y ayudar a que su punto de vista cuente en el trabajo.`
  },
  {
    id: "apodo-pelo", catId: "origen", title: `El apodo por el pelo`,
    text: `A Tatiana le pusieron un apodo relacionado con su pelo afro que ella no eligió y que no le gusta. Algunos lo siguen usando como si fuera normal, incluso frente a los profesores.`,
    contexto: `A Tatiana le pusieron un apodo por su pelo afro cuando entró al colegio. Ella pidió varias veces que no se lo dijeran, pero el apodo se volvió costumbre: lo usan en el salón, en el chat y hasta algunos profesores lo repiten sin darse cuenta. Tatiana ya está cansada de explicar por qué le molesta. Hoy, después de que alguien lo volvió a usar en clase, te dice que ya no sabe qué más hacer para que la escuchen.`,
    personaje: `Tatiana`, personajeEstado: `cansada de tener que explicar por qué le molesta`,
    apertura: `Ya dije varias veces que no me gusta ese apodo, no sé por qué lo siguen usando.`,
    objetivo: `Tomar en serio lo que pide sin minimizarlo ni justificar a quienes lo usan.`
  },

  {
    id: "trabajo-nadie-entrega", catId: "equipo", title: `El trabajo que nadie entrega`,
    text: `Llevan tres semanas con el trabajo de sociales en grupo. Mateo dice en el chat que Laura no ha hecho nada. Laura te escribe a ti, el tercer integrante, para darte su versión antes de que el trabajo se entregue mañana.`,
    contexto: `El trabajo de sociales es en grupo y la entrega es mañana. Mateo escribió en el chat que Laura no ha hecho nada, y varios integrantes empezaron a quejarse. Pero Laura asegura que mandó su parte hace días y que nadie la revisó ni le respondió. Ahora el grupo está dividido y ella te busca antes de la entrega porque siente que la están culpando sin escucharla.`,
    personaje: `Laura`, personajeEstado: `frustrada porque siente que su parte sí la mandó y nadie la vio`,
    apertura: `Yo sí mandé mi parte al chat hace días, nadie contestó. No es justo que digan que no hice nada.`,
    objetivo: `Escuchar su versión y ayudar a armar una solución antes de la entrega.`
  },
  {
    id: "credito-ajeno", catId: "equipo", title: `El que se lleva el crédito`,
    text: `En la exposición de biología, Felipe presentó como si fuera suyo un análisis que en realidad hizo Daniela sola un fin de semana. Daniela te lo cuenta molesta después de clase.`,
    contexto: `El análisis de biología lo hizo Daniela sola durante un fin de semana entero. Cuando llegó la exposición, Felipe lo presentó como si fuera un trabajo conjunto y ni siquiera mencionó su nombre. Varios compañeros felicitaron a Felipe, y Daniela se quedó mirando desde su puesto. Después de clase te cuenta lo ocurrido, indignada y con la sensación de que su esfuerzo desapareció.`,
    personaje: `Daniela`, personajeEstado: `indignada porque su esfuerzo no se reconoció`,
    apertura: `Yo hice ese análisis sola y él lo presentó como si fuera de los dos. Eso no se sintió bien.`,
    objetivo: `Validar lo que siente y pensar juntos cómo plantearlo sin que se vuelva un pleito.`
  },
  {
    id: "cambio-sin-avisar", catId: "equipo", title: `El grupo que decide sin avisar`,
    text: `El grupo de emprendimiento cambió la idea completa sin avisarle a Ricardo, que llevaba dos semanas trabajando en la propuesta original. Se enteró cuando ya estaba todo decidido.`,
    contexto: `Ricardo llevaba dos semanas investigando y armando la propuesta original del grupo de emprendimiento. Mientras él no estaba, los demás se reunieron, cambiaron la idea completa y decidieron la nueva ruta. Se enteró cuando abrió el documento compartido y vio otro proyecto. Ahora se siente fuera de su propio grupo y no sabe si lo hicieron por olvido o porque no lo consideraron.`,
    personaje: `Ricardo`, personajeEstado: `sorprendido y algo dolido de haber quedado por fuera de la decisión`,
    apertura: `¿Cambiaron todo el proyecto y nadie me avisó? Yo llevaba semanas en la otra idea.`,
    objetivo: `Reconocer el error de comunicación y buscar cómo incluirlo de verdad ahora.`
  },
  {
    id: "nota-bajo-uno", catId: "equipo", title: `La nota que bajó por uno solo`,
    text: `El grupo de química sacó una nota más baja porque Cristian llegó tarde el día de la entrega y faltó una parte. Los demás están molestos, y Cristian llega a hablar contigo porque tú organizas al grupo.`,
    contexto: `El grupo de química había preparado todo con tiempo, pero Cristian llegó tarde el día de la entrega y faltó una parte del informe. La nota bajó para todos. En el chat varios escribieron cosas duras, y Cristian se enteró de que lo estaban culpando. Ahora llega a hablar contigo, apenado y a la defensiva, porque sabe que se equivocó pero siente que lo están tratando como si hubiera hecho todo a propósito.`,
    personaje: `Cristian`, personajeEstado: `apenado y a la defensiva por la situación que causó`,
    apertura: `Sé que la regué con la entrega, pero tampoco es que lo haya hecho a propósito.`,
    objetivo: `Hablar del error sin humillarlo, y pensar en cómo evitar que se repita.`
  },
  {
    id: "no-lo-dejan-hablar", catId: "equipo", title: `El que no lo dejan hablar`,
    text: `Cada vez que Rafael propone una idea en el grupo de proyecto, dos compañeros lo interrumpen o dicen "mejor hagámoslo como yo digo". Rafael ya casi no participa en las reuniones del grupo.`,
    contexto: `En el grupo de proyecto, Rafael propone ideas cada reunión, pero dos compañeros lo interrumpen o responden con «mejor hagámoslo como yo digo». Al principio insistía; ahora casi no habla y se dedica a tomar notas. Hoy, cuando intentó explicar una idea, lo volvieron a cortar y el resto siguió como si nada. Rafael te busca desanimado, sin saber si vale la pena seguir participando.`,
    personaje: `Rafael`, personajeEstado: `desanimado, siente que sus ideas no cuentan`,
    apertura: `Para qué propongo algo si ya sé que lo van a descartar sin escucharlo.`,
    objetivo: `Hacer espacio real para que su idea se escuche esta vez.`
  },

  {
    id: "partido-miercoles", catId: "espacio", title: `El partido de los miércoles`,
    text: `En el microfútbol del descanso, un gol dudoso hace que las voces suban. Julián empuja a Kevin por el hombro. Después del recreo, Kevin te busca para contarte su versión, porque sabe que ustedes son amigos de ambos.`,
    contexto: `En el partido del descanso hubo un gol dudoso y la discusión subió de tono. Julián empujó a Kevin por el hombro, y varios corrieron a separarlos. El profesor no alcanzó a ver el empujón. Kevin lleva todo el recreo con la adrenalina alta y quiere que alguien le dé la razón. Te busca porque sabe que ustedes son amigos de los dos, pero también espera que le digas que Julián se pasó.`,
    personaje: `Kevin`, personajeEstado: `todavía alterado por el empujón, mezcla de rabia y ganas de que alguien le dé la razón`,
    apertura: `¿Viste cómo me empujó? Y encima dicen que yo empecé todo.`,
    objetivo: `Escuchar sin tomar partido de inmediato y ayudarlo a pensar en el siguiente paso.`
  },
  {
    id: "ultimo-equipo", catId: "espacio", title: `El que siempre queda de último`,
    text: `A la hora de armar los equipos de voleibol, Samuel queda de último casi siempre y los capitanes lo reciben con caras de fastidio. Hoy se sentó en la banca en vez de jugar.`,
    contexto: `A la hora de armar equipos de voleibol, Samuel siempre queda de último. Los capitanes lo eligen porque no hay más opción y algunos lo reciben con caras de fastidio o comentarios como «bueno, que juegue». Hoy, cuando le tocó otra vez, se quedó sentado en la banca y dijo que no quería jugar. Algunos se rieron; otros ni se dieron cuenta. Él te mira desde lejos, resignado.`,
    personaje: `Samuel`, personajeEstado: `resignado, cansado de sentirse "el peso" del equipo`,
    apertura: `Prefiero no jugar hoy. Igual siempre me reciben como si fuera un problema.`,
    objetivo: `Invitarlo a participar sin forzarlo, y pensar cómo cambiar la dinámica de los equipos.`
  },
  {
    id: "cancha-pelea", catId: "espacio", title: `La cancha que se pelean`,
    text: `Dos cursos llegan al mismo tiempo a la única cancha disponible en el recreo. Tomás, de noveno, empieza a decir que la cancha "es de ellos siempre" y sube el tono.`,
    contexto: `La cancha del recreo es una sola y dos cursos llegaron al mismo tiempo. Tomás, de noveno, empezó a decir que la cancha «es de ellos siempre» y subió el tono. Los demás respondieron igual y en segundos se armó un corrillo. El profesor está lejos y la discusión sigue creciendo. Tomás te habla convencido de que tiene razón, pero también mira de reojo para ver si los otros se acercan.`,
    personaje: `Tomás`, personajeEstado: `territorial, cree que tiene más derecho a la cancha`,
    apertura: `Nosotros llegamos primero toda la semana, la cancha es nuestra hoy.`,
    objetivo: `Buscar un acuerdo justo sin que la discusión escale.`
  },
  {
    id: "juego-mesa", catId: "espacio", title: `El juego de mesa que terminó mal`,
    text: `Durante un juego de mesa en proyecto de vida, Salomé acusó a Nicolás de hacer trampa. Nicolás lo niega y casi no se hablan, aunque siguen en el mismo grupo de trabajo.`,
    contexto: `Durante el juego de mesa en proyecto de vida, Salomé acusó a Nicolás de hacer trampa frente a todo el grupo. Nicolás lo negó, pero la acusación quedó flotando y algunos empezaron a mirarlo con desconfianza. Desde entonces casi no se hablan, aunque siguen en el mismo equipo de trabajo. Hoy Nicolás te busca ofendido: no tiene pruebas de que Salomé lo haya dicho por mala intención, pero le duele que lo traten como culpable.`,
    personaje: `Nicolás`, personajeEstado: `ofendido porque siente que lo acusaron sin pruebas`,
    apertura: `Yo no hice trampa, y me molesta que lo diga como si fuera un hecho.`,
    objetivo: `Aclarar lo que pasó sin que ninguno quede como el culpable de entrada.`
  },
  {
    id: "ensayo-porra", catId: "espacio", title: `El que no lo dejan entrenar tranquilo`,
    text: `En los ensayos de la porra para el festival deportivo, un grupo se burla cada vez que Gabriela se equivoca en un paso. Ella sigue intentando, pero cada vez participa con menos ganas.`,
    contexto: `Gabriela entró a la porra con muchas ganas, pero cada vez que se equivoca en un paso, un grupo se ríe y repite el error en voz alta. Ella intenta seguir, pero ya participa con menos ganas y llega tarde a los ensayos. Hoy, después de otro error, alguien dijo «mejor que no venga». Gabriela te cuenta que está pensando en salirse, aunque en realidad le gustaría seguir.`,
    personaje: `Gabriela`, personajeEstado: `frustrada, empezando a dudar si vale la pena seguir en la porra`,
    apertura: `Cada vez que me equivoco se ríen, ya ni sé si quiero seguir en esto.`,
    objetivo: `Animarla de una forma genuina y pensar cómo cambiar el ambiente del ensayo.`
  },

  {
    id: "foto-sin-permiso", catId: "consentimiento", title: `La foto que no pidieron compartir`,
    text: `Alguien tomó una foto de Camila en un mal momento durante educación física y la subió a una historia con un comentario burlón. Un amigo te la reenvía "para que veas", y minutos después Camila te escribe porque sabe que la viste.`,
    contexto: `La foto la tomaron en educación física, en un momento en el que Camila se estaba acomodando la ropa. Alguien la subió a una historia con un comentario burlón y en minutos ya la habían visto varios. Un amigo te la reenvió «para que veas», y poco después Camila te escribe porque sabe que la viste. Está avergonzada y molesta, y lo primero que quiere saber es quién más la tiene.`,
    personaje: `Camila`, personajeEstado: `avergonzada y molesta de que la foto siga circulando`,
    apertura: `Ya viste la foto, ¿cierto? ¿Tú sabes quién más la tiene?`,
    objetivo: `Apoyarla y pensar juntos qué hacer para que deje de circular.`
  },
  {
    id: "video-sin-permiso", catId: "consentimiento", title: `El video sin permiso`,
    text: `En un ensayo de teatro, alguien grabó a Adriana cayéndose durante un paso de baile y lo subió como video gracioso. Adriana no sabía que la estaban grabando.`,
    contexto: `En el ensayo de teatro, Adriana se cayó mientras practicaba un paso de baile. Alguien la grabó sin avisarle y subió el video como «contenido gracioso». Ella se enteró porque una compañera le mandó el enlace. No sabe quién lo grabó ni cuántas personas lo han visto. Ahora te busca incómoda, sintiendo que se rieron de ella sin darle la oportunidad de decidir.`,
    personaje: `Adriana`, personajeEstado: `incómoda, siente que se rieron de ella sin su permiso`,
    apertura: `Ni siquiera sabía que me estaban grabando. ¿Por qué lo subieron sin preguntarme?`,
    objetivo: `Reconocer que fue un límite que no se respetó y ayudar a resolverlo.`
  },
  {
    id: "ubicacion-compartida", catId: "consentimiento", title: `La ubicación compartida`,
    text: `Un compañero compartió en el chat del curso, como broma, la ubicación en tiempo real de Miguel, después de que él dijera que estaba en un lugar "vergonzoso" para él.`,
    contexto: `Miguel comentó en el chat que estaba en un lugar que le daba vergüenza. Un compañero, como broma, compartió su ubicación en tiempo real con todo el grupo. Durante un rato estuvieron haciendo comentarios y adivinando dónde estaba. Miguel se enteró al ver las notificaciones. Ahora está molesto y con la sensación de que jugaron con algo que para él no tenía ninguna gracia.`,
    personaje: `Miguel`, personajeEstado: `violado en su privacidad, molesto de que jugaran con eso`,
    apertura: `¿Por qué compartieron dónde estaba? Ni siquiera me preguntaron.`,
    objetivo: `Validar que fue un límite cruzado y pensar cómo evitar que se repita.`
  },
  {
    id: "chisme-relacion", catId: "consentimiento", title: `El chisme sobre la relación`,
    text: `Empezaron a circular capturas privadas de una conversación entre Lorena y su pareja, sacadas de contexto y comentadas en el chat del curso. Lorena está evitando ir a clase por la vergüenza.`,
    contexto: `Las capturas eran de una conversación privada entre Lorena y su pareja. Alguien las sacó de contexto y las compartió en el chat del curso, donde empezaron a circular comentarios y burlas. Lorena se enteró por una amiga y desde entonces evita ir a clase. Hoy te escribe desde su casa, avergonzada, diciendo que no sabe si quiere volver mañana.`,
    personaje: `Lorena`, personajeEstado: `avergonzada, evitando el colegio por lo que están diciendo`,
    apertura: `No sé si quiero ir mañana, todo el mundo debe estar hablando de eso.`,
    objetivo: `Apoyarla sin juzgar y pensar en un paso concreto para que no se sienta sola.`
  },
  {
    id: "perfil-falso", catId: "consentimiento", title: `El perfil falso`,
    text: `Alguien creó un perfil falso usando fotos reales de David para hacer comentarios pesados a su nombre. David se enteró porque un profesor le preguntó por un comentario que "él" supuestamente hizo.`,
    contexto: `Alguien creó un perfil falso con fotos reales de David y empezó a escribir comentarios pesados a su nombre. David no sabía nada hasta que un profesor le preguntó por uno de esos comentarios. Ahora está preocupado porque la situación se le está saliendo de las manos y no sabe cuánta gente cree que es él. Te busca indignado, pero también con miedo de que lo culpen.`,
    personaje: `David`, personajeEstado: `indignado y preocupado de que lo culpen por algo que no hizo`,
    apertura: `Ni siquiera es mi cuenta, pero ya un profesor me preguntó por eso. Esto se me está saliendo de las manos.`,
    objetivo: `Ayudarlo a pensar en cómo aclarar la situación con calma.`
  },

  {
    id: "elecciones-estudiantiles", catId: "opinion", title: `La discusión por el personero`,
    text: `En proyecto de vida discuten sobre por quién votar para personero. Sebastián y otro compañero suben el tono defendiendo candidatos distintos, y la discusión se está saliendo del tema.`,
    contexto: `En proyecto de vida están discutiendo por quién votar para personero. Sebastián defiende a un candidato y otro compañero defiende a otro; la conversación empezó bien, pero subió de tono. Varias veces Sebastián intentó explicar su punto y lo interrumpieron. Ahora está acalorado y siente que no lo dejan terminar una idea antes de decirle que está equivocado.`,
    personaje: `Sebastián`, personajeEstado: `acalorado, siente que no lo dejan explicar su punto completo`,
    apertura: `Es que no me dejan ni terminar la idea antes de decir que estoy equivocado.`,
    objetivo: `Bajar el tono de la conversación sin invalidar lo que piensa cada uno.`
  },
  {
    id: "opinion-religion", catId: "opinion", title: `La opinión sobre la religión`,
    text: `En un trabajo sobre ética, Paula comenta su punto de vista religioso y otro compañero se ríe diciendo que "eso ya nadie lo cree". Paula se queda callada el resto de la clase.`,
    contexto: `En un trabajo sobre ética, Paula compartió su punto de vista religioso con el grupo. Un compañero se rió y dijo que «eso ya nadie lo cree». Varios siguieron la broma y Paula se quedó callada el resto de la clase. No quiere convertir el tema en un problema, pero le dolió que se burlaran de algo importante para ella. Hoy te lo cuenta con la voz baja.`,
    personaje: `Paula`, personajeEstado: `incómoda, siente que se burlaron de algo importante para ella`,
    apertura: `No tenía que reírse así solo porque pienso distinto.`,
    objetivo: `Mostrar respeto por su punto de vista sin tener que compartirlo para hacerlo.`
  },
  {
    id: "debate-uniforme", catId: "opinion", title: `El debate sobre el uniforme`,
    text: `El curso discute si pedir que se flexibilice el uso del uniforme. Natalia defiende con fuerza mantenerlo igual, y algunos la acusan de "no entender a los demás" solo por opinar distinto.`,
    contexto: `El curso está discutiendo si pedir que se flexibilice el uso del uniforme. Natalia defendió con fuerza mantenerlo igual, y algunos empezaron a acusarla de «no entender a los demás» solo por opinar distinto. La discusión se volvió personal y ya casi no se habla de la propuesta. Natalia llega a ti a la defensiva, cansada de que la ataquen por su opinión y no por sus argumentos.`,
    personaje: `Natalia`, personajeEstado: `a la defensiva, siente que la atacan por su opinión, no que debaten la idea`,
    apertura: `Puedo pensar distinto sin que eso signifique que no entiendo a nadie.`,
    objetivo: `Debatir la idea sin desacreditar a la persona.`
  },
  {
    id: "reunirse-en-persona", catId: "opinion", title: `La discusión por cómo organizarse`,
    text: `El grupo de trabajo no se pone de acuerdo en algo simple: si organizarse por WhatsApp o reunirse en persona. Lo que empezó como una diferencia práctica terminó en mensajes cortantes entre Alejandro y otro integrante.`,
    contexto: `El grupo de trabajo necesitaba decidir algo simple: organizarse por WhatsApp o reunirse en persona. Alejandro propuso reunirse porque siente que así avanzan más. Otro integrante respondió con mensajes cortantes y la conversación terminó en un intercambio tenso. Ahora Alejandro está molesto y siente que sus razones no se están teniendo en cuenta. Te busca para hablar antes de que el grupo se enfríe.`,
    personaje: `Alejandro`, personajeEstado: `molesto, siente que sus razones no se están teniendo en cuenta`,
    apertura: `No es capricho, para mí reunirnos en persona sí hace diferencia, y siento que ni lo consideran.`,
    objetivo: `Encontrar un punto medio sin que la diferencia se vuelva pelea personal.`
  },
  {
    id: "gusto-musical", catId: "opinion", title: `El comentario sobre la música`,
    text: `Un compañero se burla del género de música que le gusta a Melany frente a todo el salón, diciendo que "eso ni es música de verdad". Melany deja de comentar sus gustos desde entonces.`,
    contexto: `Melany comentó en clase el género de música que le gusta. Un compañero se burló frente a todos diciendo que «eso ni es música de verdad». Varios se rieron y ella no volvió a hablar del tema. Desde entonces evita compartir sus gustos, incluso con amigos. Hoy te cuenta que ya ni pone música en el chat del grupo porque siempre alguien tiene algo que decir.`,
    personaje: `Melany`, personajeEstado: `cohibida, ya no comparte lo que le gusta por miedo a la burla`,
    apertura: `Ya ni cuento lo que escucho porque siempre alguien tiene algo que decir.`,
    objetivo: `Mostrar interés genuino sin necesidad de compartir el mismo gusto.`
  },

  {
    id: "cumpleanos-sin-invitar", catId: "exclusion", title: `El que dejaron por fuera del cumpleaños`,
    text: `Todo el salón fue invitado a un cumpleaños, excepto Esteban. Cuando pregunta si va a haber algo el fin de semana, algunos evaden la pregunta o cambian de tema.`,
    contexto: `El sábado hay un cumpleaños y todo el salón está invitado, excepto Esteban. Él se enteró por las conversaciones cruzadas y por una historia que vio en redes. Cuando pregunta si va a haber algo, algunos cambian de tema o dicen que no saben. Esteban sospecha que lo dejaron por fuera a propósito, pero no quiere preguntar directamente. Hoy te busca con la duda dando vueltas.`,
    personaje: `Esteban`, personajeEstado: `dolido, sospecha que lo dejaron por fuera a propósito`,
    apertura: `¿Va a haber algo el sábado? Como que todo el mundo anda raro cuando pregunto.`,
    objetivo: `Ser honesto sin hacerlo sentir peor, y pensar cómo incluirlo de ahora en adelante.`
  },
  {
    id: "almuerza-solo", catId: "exclusion", title: `El que se sienta solo`,
    text: `Desde hace un mes, Juan Pablo almuerza solo porque el grupo con el que se sentaba dejó de invitarlo sin decirle por qué. Nadie ha hablado con él directamente sobre lo que pasó.`,
    contexto: `Desde hace un mes, Juan Pablo almuerza solo. El grupo con el que se sentaba dejó de invitarlo sin decirle por qué, y nadie ha hablado con él directamente. Él pensó que era algo temporal, pero ya van varias semanas. Hoy se sentó en una mesa aparte y te mira desde lejos. Cuando te acercas, pregunta si hizo algo mal, porque no entiende qué cambió.`,
    personaje: `Juan Pablo`, personajeEstado: `confundido y triste, no entiende qué hizo mal`,
    apertura: `¿Hice algo? Nadie me ha dicho nada, simplemente dejaron de sentarse conmigo.`,
    objetivo: `Averiguar qué pasó realmente y ayudar a reconstruir el grupo o encontrar apoyo.`
  },
  {
    id: "burla-costumbre", catId: "exclusion", title: `La burla que se volvió costumbre`,
    text: `A Antonia le pusieron un apodo burlón hace meses y ya se volvió tan normal en el salón que hasta los profesores lo usan sin darse cuenta. Antonia dejó de corregir a la gente porque siente que no sirve de nada.`,
    contexto: `A Antonia le pusieron un apodo burlón hace meses. Con el tiempo se volvió tan normal que hasta los profesores lo usan sin darse cuenta. Ella al principio corrigió a la gente, pero dejó de hacerlo porque siente que no sirve de nada. Hoy, después de que alguien lo usara otra vez en clase, te dice que ya no cree que valga la pena pedir que paren.`,
    personaje: `Antonia`, personajeEstado: `resignada, ya no cree que valga la pena pedir que paren`,
    apertura: `Ya ni digo nada, para qué, si de todas formas lo siguen usando.`,
    objetivo: `Mostrarle que sí vale la pena decir algo, y acompañarla a hacerlo.`
  },
  {
    id: "presion-molestar", catId: "exclusion", title: `El grupo que presiona a molestar a alguien`,
    text: `Un grupo de compañeros le insiste a Diego que se burle de un estudiante nuevo "para que se integre al grupo". Diego no quiere hacerlo, pero le preocupa quedar por fuera si se niega.`,
    contexto: `Un grupo de compañeros le insiste a Diego que se burle de un estudiante nuevo «para que se integre al grupo». Diego no quiere hacerlo, pero le preocupa quedar por fuera si se niega. Ya lo han presionado varias veces y hoy volvieron a insistir frente a otros. Diego te busca dividido: sabe que está mal, pero también tiene miedo de ser el siguiente al que dejen solo.`,
    personaje: `Diego`, personajeEstado: `dividido entre lo que sabe que está bien y el miedo a quedar excluido`,
    apertura: `No quiero hacerlo, pero si no me uno capaz me dejan a mí por fuera después.`,
    objetivo: `Ayudarlo a encontrar una forma de decir que no sin quedar aislado.`
  },
  {
    id: "culpan-de-todo", catId: "exclusion", title: `El que lo culpan de todo`,
    text: `Cada vez que algo sale mal en el salón, media clase mira primero hacia Pablo, aunque muchas veces él ni tuvo que ver. Hoy volvió a pasar con un desorden que hicieron entre varios.`,
    contexto: `Cada vez que algo sale mal en el salón, media clase mira primero a Pablo, aunque muchas veces él ni tuvo que ver. Hoy volvió a pasar con un desorden que hicieron entre varios. Alguien dijo su nombre y otros repitieron la acusación sin pruebas. Pablo está cansado de cargar con la culpa de cosas que no hizo y te busca para contar su versión antes de que el rumor siga creciendo.`,
    personaje: `Pablo`, personajeEstado: `cansado de cargar con la culpa de cosas que no hizo`,
    apertura: `Otra vez me están mirando a mí, y ni siquiera estaba cerca cuando pasó.`,
    objetivo: `Escuchar su versión y ayudar a que la responsabilidad se reparta de verdad.`
  },

  {
    id: "grito-en-clase", catId: "ira", title: `El grito en plena clase`,
    text: `Durante un trabajo en parejas, Vanessa le gritó a su compañero frente a todo el salón después de que él borrara sin querer parte de lo que llevaban. El profesor los separó, pero el ambiente sigue tenso.`,
    contexto: `Durante un trabajo en parejas, Vanessa le gritó a su compañero frente a todo el salón después de que él borrara sin querer parte de lo que llevaban. El profesor los separó y la clase quedó en silencio. Vanessa sabe que se pasó, pero también siente que él fue descuidado. Ahora está todavía alterada y un poco avergonzada. Te busca en el descanso para hablar de lo que pasó.`,
    personaje: `Vanessa`, personajeEstado: `todavía alterada, un poco avergonzada de haber gritado`,
    apertura: `Sé que grité, pero es que llevábamos una hora en eso y lo borró sin cuidado.`,
    objetivo: `Ayudarla a bajar la tensión y pensar cómo seguir trabajando juntos.`
  },
  {
    id: "empujon-fila", catId: "ira", title: `El empujón en la fila`,
    text: `En la fila de la cafetería, Jorge empujó a un compañero que se coló, y casi se arma una pelea. Un profesor los separó a tiempo, pero Jorge sigue con el pulso acelerado cuando te busca.`,
    contexto: `En la fila de la cafetería, alguien se coló delante de Jorge. Jorge le dijo algo, el otro respondió, y Jorge terminó empujándolo. Un profesor los separó a tiempo y casi se arma una pelea. Ahora Jorge sigue con el pulso acelerado y defiende que tenía razón en molestarse. Te busca todavía con adrenalina, esperando que alguien reconozca que no fue solo culpa suya.`,
    personaje: `Jorge`, personajeEstado: `todavía con adrenalina, defendiendo que tenía razón en molestarse`,
    apertura: `Se coló, eso no es justo, por eso reaccioné así.`,
    objetivo: `Reconocer que tenía razón en molestarse, sin justificar el empujón.`
  },
  {
    id: "portazo", catId: "ira", title: `El portazo`,
    text: `Camilo salió del salón dando un portazo después de que el profesor le llamara la atención frente a todos por llegar tarde otra vez. Ahora está afuera, todavía molesto, y tú saliste a ver cómo está.`,
    contexto: `El profesor le llamó la atención a Camilo frente a todos por llegar tarde otra vez. Camilo no dijo nada, pero salió del salón y dio un portazo que se escuchó en el pasillo. Ahora está afuera, todavía molesto, y tú saliste a ver cómo está. Él siente que la humillación fue pública y está más enojado consigo mismo que con el profesor, aunque no lo diga.`,
    personaje: `Camilo`, personajeEstado: `humillado, más enojado consigo mismo que con el profesor`,
    apertura: `No tenía que decirlo así, delante de todos. Ya sé que llegué tarde.`,
    objetivo: `Ayudarlo a calmarse antes de que decida qué hacer después.`
  },
  {
    id: "insulto-partido", catId: "ira", title: `El insulto que se le salió`,
    text: `En medio de una discusión por una jugada en el partido de baloncesto del colegio, a Ivonne se le salió un insulto fuerte contra una compañera de otro curso. Ahora se siente mal por lo que dijo.`,
    contexto: `En medio de una discusión por una jugada en el partido de baloncesto, a Ivonne se le salió un insulto fuerte contra una compañera de otro curso. El árbitro la sacó del juego y varios escucharon lo que dijo. Ahora Ivonne se siente mal por lo que dijo, pero también sigue sensible por la discusión. Te busca arrepentida, aunque no quiere cargar con toda la culpa de lo que pasó antes.`,
    personaje: `Ivonne`, personajeEstado: `arrepentida, pero también todavía sensible por la discusión`,
    apertura: `No debí decir eso, se me salió sin pensar. Pero tampoco fue solo culpa mía lo que pasó antes.`,
    objetivo: `Ayudarla a asumir su parte sin que se sienta como el único punto de la historia.`
  },
  {
    id: "cuadernos-al-piso", catId: "ira", title: `El que rompe algo con rabia`,
    text: `Después de perder por poco un examen de matemáticas por un punto, Sara tiró sus cuadernos al piso con rabia frente al salón. Algunos se ríen, lo que la hace enojar todavía más.`,
    contexto: `Sara perdió por un punto un examen de matemáticas para el que estudió semanas. Cuando vio la nota, tiró sus cuadernos al piso con rabia frente al salón. Algunos se rieron, y eso la hizo enojar todavía más. Ahora está recogiendo sus cosas con la cara roja. Te acercas y ella te dice que no es solo por el examen: es que siente que su esfuerzo nunca alcanza.`,
    personaje: `Sara`, personajeEstado: `frustrada consigo misma y avergonzada de que la vieran así`,
    apertura: `No es por el examen, es que llevo semanas estudiando y aun así no me alcanza.`,
    objetivo: `Ayudarla a bajar la frustración y pensar en un paso siguiente concreto.`
  },

  {
    id: "castigo-todo-salon", catId: "justicia", title: `El castigo para todo el salón`,
    text: `Por el desorden de unos pocos estudiantes, el profesor quitó el descanso a todo el salón. Varios están molestos porque sienten que pagan por algo que no hicieron, y culpan directamente a Fabián, uno de los que sí causó el desorden.`,
    contexto: `Por el desorden de unos pocos, el profesor quitó el descanso a todo el salón. Varios estudiantes están molestos porque sienten que pagan por algo que no hicieron, y culpan directamente a Fabián, uno de los que sí causó el desorden. En el chat del curso ya hay mensajes señalándolo. Fabián está avergonzado, pero también molesto porque siente que otros también tuvieron culpa y nadie los nombra.`,
    personaje: `Fabián`, personajeEstado: `avergonzado, pero también molesto porque siente que otros también tuvieron culpa`,
    apertura: `Sé que la regué, pero no fui solo yo, y ahora todos me están mirando feo.`,
    objetivo: `Ayudarlo a asumir su parte sin cargar con toda la responsabilidad del grupo.`
  },
  {
    id: "favoritismo", catId: "justicia", title: `El favoritismo que se nota`,
    text: `Varios estudiantes sienten que un profesor siempre le da el beneficio de la duda a los mismos compañeros y es más estricto con otros. Carolina, que suele salir perjudicada, quiere hablar contigo antes de decidir si dice algo.`,
    contexto: `Varios estudiantes sienten que un profesor siempre le da el beneficio de la duda a los mismos compañeros y es más estricto con otros. Carolina suele salir perjudicada y ha acumulado varios episodios que le parecen injustos. Hoy volvió a pasar algo parecido y ella quiere hablar contigo antes de decidir si dice algo. Le preocupa que quejarse le traiga problemas en vez de soluciones.`,
    personaje: `Carolina`, personajeEstado: `frustrada, no sabe si hablar va a servir de algo o solo le va a traer problemas`,
    apertura: `Siempre es igual, a ellos se les pasa todo y a mí me llaman la atención por lo mismo.`,
    objetivo: `Ayudarla a pensar cómo plantear la situación de forma justa y sin miedo.`
  },
  {
    id: "acusacion-sin-pruebas", catId: "justicia", title: `La acusación sin pruebas`,
    text: `Desapareció dinero de la caja del comité del salón, y varios compañeros empezaron a señalar a Melissa sin ninguna prueba, solo porque ella la tuvo en sus manos por última vez visible. Melissa está muy afectada por los señalamientos.`,
    contexto: `Desapareció dinero de la caja del comité del salón. Melissa fue la última persona a la que vieron con la caja en las manos, y varios compañeros empezaron a señalarla sin ninguna prueba. El rumor creció rápido y ya hay quienes la miran con desconfianza. Melissa está muy afectada: no solo por la acusación, sino porque siente que la están juzgando antes de saber qué pasó.`,
    personaje: `Melissa`, personajeEstado: `indignada y dolida por sentirse juzgada sin pruebas`,
    apertura: `Todo el mundo ya me está viendo como la ladrona y ni siquiera saben qué pasó de verdad.`,
    objetivo: `Mantener una posición justa: ni asumir que es culpable ni ignorar la situación.`
  },
  {
    id: "reconocimiento-perdido", catId: "justicia", title: `El reconocimiento que no llegó`,
    text: `En la izada de bandera, reconocieron el trabajo de un grupo de proyecto ambiental, pero olvidaron mencionar a Andrea, quien había propuesto la idea original meses atrás. Andrea no dijo nada en el momento, pero después te lo cuenta.`,
    contexto: `En la izada de bandera reconocieron el trabajo de un grupo de proyecto ambiental. Mencionaron a varios integrantes, pero olvidaron a Andrea, quien había propuesto la idea original meses atrás. Ella no dijo nada en el momento, aunque se quedó con la sensación de que su aporte no contó. Después te lo cuenta, dolida, pero insegura de si vale la pena decir algo o si parecerá que quiere protagonismo.`,
    personaje: `Andrea`, personajeEstado: `dolida por no ser reconocida, pero insegura de si vale la pena decir algo`,
    apertura: `No dije nada porque no quería hacer show, pero sí me dolió que ni me nombraran.`,
    objetivo: `Ayudarla a decidir si y cómo comunicar lo que siente.`
  },
  {
    id: "regla-desigual", catId: "justicia", title: `La regla que solo aplica para algunos`,
    text: `El colegio permite que algunos estudiantes usen el celular en el descanso "porque tienen buen comportamiento", mientras a otros, como Emiliano, se lo quitan por cualquier motivo. Emiliano siente que la regla no se aplica igual para todos.`,
    contexto: `El colegio permite que algunos estudiantes usen el celular en el descanso «porque tienen buen comportamiento», mientras a otros, como Emiliano, se lo quitan por cualquier motivo. Él ha visto varias veces que a los mismos compañeros no les dicen nada. Hoy le quitaron el celular otra vez y siente que la regla no se aplica igual para todos. Te busca frustrado, con ejemplos acumulados.`,
    personaje: `Emiliano`, personajeEstado: `frustrado por lo que percibe como trato desigual`,
    apertura: `A ellos nunca les dicen nada y a mí me lo quitan por cualquier cosa. Eso no es parejo.`,
    objetivo: `Escuchar su punto sin necesariamente estar de acuerdo con cada detalle, y pensar en un canal para plantearlo.`
  },

  {
    id: "mudanza-nadie-sabe", catId: "familiar", title: `La mudanza que nadie sabe`,
    text: `La familia de Isabella se va a mudar de barrio por temas económicos, y ella tendrá que cambiarse de colegio a mitad de año. No se lo ha contado a casi nadie, pero hoy te lo dice a ti.`,
    contexto: `La familia de Isabella se va a mudar de barrio por temas económicos, y ella tendrá que cambiarse de colegio a mitad de año. No se lo ha contado a casi nadie porque todavía está procesando la noticia. Hoy te lo dice a ti, con la voz entrecortada. No sabe cómo despedirse del grupo ni cómo explicar algo que ella misma no termina de aceptar.`,
    personaje: `Isabella`, personajeEstado: `triste, todavía procesando la noticia ella misma`,
    apertura: `Nos vamos a mudar, y me toca cambiarme de colegio. No sé cómo decirle a los demás.`,
    objetivo: `Acompañarla en la conversación sin minimizar lo que está sintiendo.`
  },
  {
    id: "cuida-hermanos", catId: "familiar", title: `El que cuida a los hermanos`,
    text: `Desde que sus papás empezaron a trabajar en turnos distintos, a Sebastián le toca recoger a sus hermanos menores del colegio todos los días, lo que lo hace faltar a los entrenamientos de fútbol.`,
    contexto: `Desde que sus papás empezaron a trabajar en turnos distintos, Sebastián tiene que recoger a sus hermanos menores del colegio todos los días. Eso lo ha hecho faltar a los entrenamientos de fútbol, y el equipo empezó a comentar que ya no está comprometido. Él no ha explicado bien la situación porque le incomoda hablar de su casa. Hoy te busca cansado, sintiendo que no puede cumplir con todo.`,
    personaje: `Sebastián`, personajeEstado: `cansado, sintiendo que no puede explicarle bien al equipo por qué falta tanto`,
    apertura: `No es que no quiera entrenar, es que me toca recoger a mis hermanos todos los días.`,
    objetivo: `Entender su situación real antes de sacar conclusiones sobre su compromiso.`
  },
  {
    id: "ausencia-sin-explicar", catId: "familiar", title: `La ausencia que nadie explicó`,
    text: `Luciana faltó una semana entera al colegio sin que nadie supiera bien por qué. Cuando vuelve, algunos compañeros hacen comentarios como si se hubiera estado "escapando de clase".`,
    contexto: `Luciana faltó una semana entera al colegio sin que nadie supiera bien por qué. Cuando volvió, algunos compañeros empezaron a hacer comentarios como si se hubiera estado «escapando de clase». Ella no ha dado explicaciones y evita el tema. Hoy te busca agotada, con la sensación de que la están juzgando sin saber lo que está pasando en su casa.`,
    personaje: `Luciana`, personajeEstado: `agotada, no tiene ganas de dar explicaciones sobre algo difícil en su casa`,
    apertura: `No falté porque quise, prefiero no entrar en detalles, pero no fue lo que están pensando.`,
    objetivo: `Respetar su espacio sin dejar que los rumores sigan circulando sin más.`
  },
  {
    id: "materiales-proyecto", catId: "familiar", title: `El que no tiene para las cosas del proyecto`,
    text: `Para el proyecto final de arte piden materiales costosos, y Camilo no se ha animado a decirle al grupo que en su casa no hay para comprarlos esta semana. Prefiere decir que "se le olvidó".`,
    contexto: `Para el proyecto final de arte piden materiales costosos, y Camilo no se ha animado a decirle al grupo que en su casa no hay para comprarlos esta semana. Ha dicho que «se le olvidó» y que mañana los trae, pero ya van varios días. Hoy el grupo volvió a preguntar y él se quedó callado. Te busca apenado, prefiriendo una mentira antes que admitir la situación económica.`,
    personaje: `Camilo`, personajeEstado: `apenado, prefiriendo mentir antes que admitir la situación económica`,
    apertura: `Se me olvidó traer los materiales... en realidad no es que se me olvidó.`,
    objetivo: `Crear un espacio donde pueda decir la verdad sin sentir vergüenza.`
  },
  {
    id: "duelo-abuelo", catId: "familiar", title: `El duelo que no ha contado`,
    text: `Hace dos semanas murió el abuelo de Renata, con quien vivía. Ha vuelto al colegio, pero se queda callada casi toda la clase y evita hablar del tema cuando alguien pregunta si está bien.`,
    contexto: `Hace dos semanas murió el abuelo de Renata, con quien vivía. Ella volvió al colegio a los pocos días, pero se queda callada casi toda la clase y evita hablar del tema cuando alguien pregunta si está bien. Algunos compañeros no saben qué pasó; otros prefieren no preguntar. Hoy se quedó sola en el salón después de la clase, y tú te acercas a ver cómo está.`,
    personaje: `Renata`, personajeEstado: `en duelo, no tiene ganas de hablar del tema todavía pero tampoco quiere estar completamente sola`,
    apertura: `Estoy bien, en serio. No hace falta que todos me pregunten a cada rato.`,
    objetivo: `Estar presente sin presionarla a hablar de algo para lo que no está lista.`
  }
];

export const CATEGORY_COLORS: Record<ColorKey, CategoryColors> = {
  jade: { main: "jade", soft: "jade-soft", hex: "#2F6E5B" },
  gold: { main: "gold", soft: "gold-soft", hex: "#A8763A" },
  slate: { main: "slate", soft: "slate-soft", hex: "#48626B" },
  moss: { main: "moss", soft: "moss-soft", hex: "#6B7A3E" },
  teal: { main: "teal", soft: "teal-soft", hex: "#2E7E82" },
  indigo: { main: "indigo", soft: "indigo-soft", hex: "#4A5A8A" },
  plum: { main: "plum", soft: "plum-soft", hex: "#6B4A6B" },
  clay: { main: "clay", soft: "clay-soft", hex: "#8A5A3E" },
  berry: { main: "berry", soft: "berry-soft", hex: "#8A3E5A" },
  olive: { main: "olive", soft: "olive-soft", hex: "#7A7A3E" },
  alert: { main: "alert", soft: "alert-soft", hex: "#A8472A" }
};

export function catOf(catId: string | null | undefined): Category {
  return CATEGORIES.find((c) => c.id === catId) ?? CATEGORIES[0];
}

export function colorsOf(catId: string | null | undefined): CategoryColors {
  return CATEGORY_COLORS[catOf(catId).color];
}

export function colorsOfCat(cat: Category): CategoryColors {
  return CATEGORY_COLORS[cat.color];
}
