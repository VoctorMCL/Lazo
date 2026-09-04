export const CATEGORIES = [
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

export const SCENARIOS = [
  {
    id: "chat-salon", catId: "comunicacion", title: `El chat del salón`,
    text: `En el grupo de WhatsApp del curso circula un audio burlándose de Valentina por su forma de vestir. Varios lo reenvían entre risas. Ahora Valentina se enteró y te escribe directamente a ti, porque saben que ustedes son cercanos.`,
    personaje: `Valentina`, personajeEstado: `dolida y sorprendida de que nadie le avisó antes de que el audio circulara`,
    apertura: `¿Tú también lo escuchaste y no me dijiste nada? Me enteré por otra persona...`,
    objetivo: `Sostener la conversación sin ponerte a la defensiva y ayudarle a decidir qué hacer.`
  },
  {
    id: "captura-privada", catId: "comunicacion", title: `La captura de pantalla`,
    text: `Un compañero tomó captura de una conversación privada de Instagram entre dos estudiantes y la compartió fuera de contexto en una historia. Uno de ellos, Andrés, cree que fuiste tú quien la compartió.`,
    personaje: `Andrés`, personajeEstado: `molesto, sintiéndose traicionado`,
    apertura: `¿Por qué compartiste eso? Eso era privado, ni siquiera lo hablé contigo.`,
    objetivo: `Aclarar lo que pasó sin escalar la acusación y proponer cómo arreglarlo.`
  },
  {
    id: "grupo-sacada", catId: "comunicacion", title: `El grupo que la sacaron`,
    text: `Sin explicación, sacaron a Camila del grupo de estudio de matemáticas en WhatsApp. Ella cree que fue una decisión tuya, porque tú administras el grupo.`,
    personaje: `Camila`, personajeEstado: `confundida y un poco herida`,
    apertura: `Oye, ¿por qué me sacaron del grupo? ¿Hice algo?`,
    objetivo: `Explicar la situación con honestidad y decidir junto a ella qué hacer.`
  },
  {
    id: "comentarios-foto", catId: "comunicacion", title: `Comentarios en la publicación`,
    text: `Publicaste una foto del paseo de curso y varios compañeros dejaron comentarios burlándose del peso de Juliana en la imagen. Ella te escribe pidiéndote que la bajes.`,
    personaje: `Juliana`, personajeEstado: `avergonzada e incómoda`,
    apertura: `¿Puedes bajar esa foto? Los comentarios me están doliendo bastante.`,
    objetivo: `Responder con empatía y decidir qué hacer con la publicación y los comentarios.`
  },
  {
    id: "cadena-mensajes", catId: "comunicacion", title: `La cadena de mensajes`,
    text: `Empezó a circular en el chat del curso una cadena de mensajes especulando por qué Simón faltó dos semanas seguidas a clase. Simón se enteró y te busca porque sabe que tú no participaste.`,
    personaje: `Simón`, personajeEstado: `incómodo, no quiere que sigan hablando de su vida privada`,
    apertura: `¿Tú sabes qué están diciendo de mí en el chat? Preferiría que la gente no especule.`,
    objetivo: `Apoyarlo sin presionarlo a contar algo que no quiere compartir.`
  },

  {
    id: "nuevo-pueblo", catId: "origen", title: `El que llegó de otro pueblo`,
    text: `Santiago llegó este semestre a tu colegio en Medellín. Su familia tuvo que salir de su pueblo en el oriente antioqueño por la situación de orden público. Algunos compañeros imitan su acento y se ríen cuando participa en clase. Hoy quedaron en el mismo grupo de ciencias.`,
    personaje: `Santiago`, personajeEstado: `a la defensiva, cansado de que se burlen de su acento`,
    apertura: `Ya sé que se van a reír, así que si quieres hago la parte yo solo y ya.`,
    objetivo: `Hacerlo sentir parte del grupo sin minimizar lo que le ha pasado.`
  },
  {
    id: "uniforme-distinto", catId: "origen", title: `El uniforme distinto`,
    text: `Manuela empezó el año con el uniforme de su colegio anterior porque su familia no tenía cómo comprar el nuevo todavía. Algunos compañeros se lo recuerdan cada tanto como burla.`,
    personaje: `Manuela`, personajeEstado: `incómoda por la situación económica de su familia`,
    apertura: `Sé que se nota que el uniforme es distinto, no hace falta que lo digan cada rato.`,
    objetivo: `Mostrarle apoyo sin hacerla sentir que le tienes lástima.`
  },
  {
    id: "almuerzo-diferente", catId: "origen", title: `El almuerzo diferente`,
    text: `Iván trae siempre el mismo almuerzo sencillo y unos compañeros comentan en voz alta que "eso no es almuerzo de verdad". Iván se sienta cada vez más lejos del grupo a la hora de comer.`,
    personaje: `Iván`, personajeEstado: `apenado, prefiere comer solo antes que ser el centro de burlas`,
    apertura: `Tranquilo, prefiero comer aquí. No es gran cosa.`,
    objetivo: `Acercarte sin forzar la situación ni hacerla más incómoda.`
  },
  {
    id: "familia-otro-pais", catId: "origen", title: `La familia que llegó de otro país`,
    text: `Estefanía y su familia llegaron de Venezuela hace un año. En un trabajo de historia, un compañero del grupo dijo en broma que ella "no tiene por qué opinar de la historia de Colombia".`,
    personaje: `Estefanía`, personajeEstado: `dolida, siente que no la dejan participar igual que a los demás`,
    apertura: `¿En serio creen que no puedo opinar solo porque no nací aquí?`,
    objetivo: `Reconocer lo que pasó y ayudar a que su punto de vista cuente en el trabajo.`
  },
  {
    id: "apodo-pelo", catId: "origen", title: `El apodo por el pelo`,
    text: `A Tatiana le pusieron un apodo relacionado con su pelo afro que ella no eligió y que no le gusta. Algunos lo siguen usando como si fuera normal, incluso frente a los profesores.`,
    personaje: `Tatiana`, personajeEstado: `cansada de tener que explicar por qué le molesta`,
    apertura: `Ya dije varias veces que no me gusta ese apodo, no sé por qué lo siguen usando.`,
    objetivo: `Tomar en serio lo que pide sin minimizarlo ni justificar a quienes lo usan.`
  },

  {
    id: "trabajo-nadie-entrega", catId: "equipo", title: `El trabajo que nadie entrega`,
    text: `Llevan tres semanas con el trabajo de sociales en grupo. Mateo dice en el chat que Laura no ha hecho nada. Laura te escribe a ti, el tercer integrante, para darte su versión antes de que el trabajo se entregue mañana.`,
    personaje: `Laura`, personajeEstado: `frustrada porque siente que su parte sí la mandó y nadie la vio`,
    apertura: `Yo sí mandé mi parte al chat hace días, nadie contestó. No es justo que digan que no hice nada.`,
    objetivo: `Escuchar su versión y ayudar a armar una solución antes de la entrega.`
  },
  {
    id: "credito-ajeno", catId: "equipo", title: `El que se lleva el crédito`,
    text: `En la exposición de biología, Felipe presentó como si fuera suyo un análisis que en realidad hizo Daniela sola un fin de semana. Daniela te lo cuenta molesta después de clase.`,
    personaje: `Daniela`, personajeEstado: `indignada porque su esfuerzo no se reconoció`,
    apertura: `Yo hice ese análisis sola y él lo presentó como si fuera de los dos. Eso no se sintió bien.`,
    objetivo: `Validar lo que siente y pensar juntos cómo plantearlo sin que se vuelva un pleito.`
  },
  {
    id: "cambio-sin-avisar", catId: "equipo", title: `El grupo que decide sin avisar`,
    text: `El grupo de emprendimiento cambió la idea completa sin avisarle a Ricardo, que llevaba dos semanas trabajando en la propuesta original. Se enteró cuando ya estaba todo decidido.`,
    personaje: `Ricardo`, personajeEstado: `sorprendido y algo dolido de haber quedado por fuera de la decisión`,
    apertura: `¿Cambiaron todo el proyecto y nadie me avisó? Yo llevaba semanas en la otra idea.`,
    objetivo: `Reconocer el error de comunicación y buscar cómo incluirlo de verdad ahora.`
  },
  {
    id: "nota-bajo-uno", catId: "equipo", title: `La nota que bajó por uno solo`,
    text: `El grupo de química sacó una nota más baja porque Cristian llegó tarde el día de la entrega y faltó una parte. Los demás están molestos, y Cristian llega a hablar contigo porque tú organizas al grupo.`,
    personaje: `Cristian`, personajeEstado: `apenado y a la defensiva por la situación que causó`,
    apertura: `Sé que la regué con la entrega, pero tampoco es que lo haya hecho a propósito.`,
    objetivo: `Hablar del error sin humillarlo, y pensar en cómo evitar que se repita.`
  },
  {
    id: "no-lo-dejan-hablar", catId: "equipo", title: `El que no lo dejan hablar`,
    text: `Cada vez que Rafael propone una idea en el grupo de proyecto, dos compañeros lo interrumpen o dicen "mejor hagámoslo como yo digo". Rafael ya casi no participa en las reuniones del grupo.`,
    personaje: `Rafael`, personajeEstado: `desanimado, siente que sus ideas no cuentan`,
    apertura: `Para qué propongo algo si ya sé que lo van a descartar sin escucharlo.`,
    objetivo: `Hacer espacio real para que su idea se escuche esta vez.`
  },

  {
    id: "partido-miercoles", catId: "espacio", title: `El partido de los miércoles`,
    text: `En el microfútbol del descanso, un gol dudoso hace que las voces suban. Julián empuja a Kevin por el hombro. Después del recreo, Kevin te busca para contarte su versión, porque sabe que ustedes son amigos de ambos.`,
    personaje: `Kevin`, personajeEstado: `todavía alterado por el empujón, mezcla de rabia y ganas de que alguien le dé la razón`,
    apertura: `¿Viste cómo me empujó? Y encima dicen que yo empecé todo.`,
    objetivo: `Escuchar sin tomar partido de inmediato y ayudarlo a pensar en el siguiente paso.`
  },
  {
    id: "ultimo-equipo", catId: "espacio", title: `El que siempre queda de último`,
    text: `A la hora de armar los equipos de voleibol, Samuel queda de último casi siempre y los capitanes lo reciben con caras de fastidio. Hoy se sentó en la banca en vez de jugar.`,
    personaje: `Samuel`, personajeEstado: `resignado, cansado de sentirse "el peso" del equipo`,
    apertura: `Prefiero no jugar hoy. Igual siempre me reciben como si fuera un problema.`,
    objetivo: `Invitarlo a participar sin forzarlo, y pensar cómo cambiar la dinámica de los equipos.`
  },
  {
    id: "cancha-pelea", catId: "espacio", title: `La cancha que se pelean`,
    text: `Dos cursos llegan al mismo tiempo a la única cancha disponible en el recreo. Tomás, de noveno, empieza a decir que la cancha "es de ellos siempre" y sube el tono.`,
    personaje: `Tomás`, personajeEstado: `territorial, cree que tiene más derecho a la cancha`,
    apertura: `Nosotros llegamos primero toda la semana, la cancha es nuestra hoy.`,
    objetivo: `Buscar un acuerdo justo sin que la discusión escale.`
  },
  {
    id: "juego-mesa", catId: "espacio", title: `El juego de mesa que terminó mal`,
    text: `Durante un juego de mesa en proyecto de vida, Salomé acusó a Nicolás de hacer trampa. Nicolás lo niega y casi no se hablan, aunque siguen en el mismo grupo de trabajo.`,
    personaje: `Nicolás`, personajeEstado: `ofendido porque siente que lo acusaron sin pruebas`,
    apertura: `Yo no hice trampa, y me molesta que lo diga como si fuera un hecho.`,
    objetivo: `Aclarar lo que pasó sin que ninguno quede como el culpable de entrada.`
  },
  {
    id: "ensayo-porra", catId: "espacio", title: `El que no lo dejan entrenar tranquilo`,
    text: `En los ensayos de la porra para el festival deportivo, un grupo se burla cada vez que Gabriela se equivoca en un paso. Ella sigue intentando, pero cada vez participa con menos ganas.`,
    personaje: `Gabriela`, personajeEstado: `frustrada, empezando a dudar si vale la pena seguir en la porra`,
    apertura: `Cada vez que me equivoco se ríen, ya ni sé si quiero seguir en esto.`,
    objetivo: `Animarla de una forma genuina y pensar cómo cambiar el ambiente del ensayo.`
  },

  {
    id: "foto-sin-permiso", catId: "consentimiento", title: `La foto que no pidieron compartir`,
    text: `Alguien tomó una foto de Camila en un mal momento durante educación física y la subió a una historia con un comentario burlón. Un amigo te la reenvía "para que veas", y minutos después Camila te escribe porque sabe que la viste.`,
    personaje: `Camila`, personajeEstado: `avergonzada y molesta de que la foto siga circulando`,
    apertura: `Ya viste la foto, ¿cierto? ¿Tú sabes quién más la tiene?`,
    objetivo: `Apoyarla y pensar juntos qué hacer para que deje de circular.`
  },
  {
    id: "video-sin-permiso", catId: "consentimiento", title: `El video sin permiso`,
    text: `En un ensayo de teatro, alguien grabó a Adriana cayéndose durante un paso de baile y lo subió como video gracioso. Adriana no sabía que la estaban grabando.`,
    personaje: `Adriana`, personajeEstado: `incómoda, siente que se rieron de ella sin su permiso`,
    apertura: `Ni siquiera sabía que me estaban grabando. ¿Por qué lo subieron sin preguntarme?`,
    objetivo: `Reconocer que fue un límite que no se respetó y ayudar a resolverlo.`
  },
  {
    id: "ubicacion-compartida", catId: "consentimiento", title: `La ubicación compartida`,
    text: `Un compañero compartió en el chat del curso, como broma, la ubicación en tiempo real de Miguel, después de que él dijera que estaba en un lugar "vergonzoso" para él.`,
    personaje: `Miguel`, personajeEstado: `violado en su privacidad, molesto de que jugaran con eso`,
    apertura: `¿Por qué compartieron dónde estaba? Ni siquiera me preguntaron.`,
    objetivo: `Validar que fue un límite cruzado y pensar cómo evitar que se repita.`
  },
  {
    id: "chisme-relacion", catId: "consentimiento", title: `El chisme sobre la relación`,
    text: `Empezaron a circular capturas privadas de una conversación entre Lorena y su pareja, sacadas de contexto y comentadas en el chat del curso. Lorena está evitando ir a clase por la vergüenza.`,
    personaje: `Lorena`, personajeEstado: `avergonzada, evitando el colegio por lo que están diciendo`,
    apertura: `No sé si quiero ir mañana, todo el mundo debe estar hablando de eso.`,
    objetivo: `Apoyarla sin juzgar y pensar en un paso concreto para que no se sienta sola.`
  },
  {
    id: "perfil-falso", catId: "consentimiento", title: `El perfil falso`,
    text: `Alguien creó un perfil falso usando fotos reales de David para hacer comentarios pesados a su nombre. David se enteró porque un profesor le preguntó por un comentario que "él" supuestamente hizo.`,
    personaje: `David`, personajeEstado: `indignado y preocupado de que lo culpen por algo que no hizo`,
    apertura: `Ni siquiera es mi cuenta, pero ya un profesor me preguntó por eso. Esto se me está saliendo de las manos.`,
    objetivo: `Ayudarlo a pensar en cómo aclarar la situación con calma.`
  },

  {
    id: "elecciones-estudiantiles", catId: "opinion", title: `La discusión por el personero`,
    text: `En proyecto de vida discuten sobre por quién votar para personero. Sebastián y otro compañero suben el tono defendiendo candidatos distintos, y la discusión se está saliendo del tema.`,
    personaje: `Sebastián`, personajeEstado: `acalorado, siente que no lo dejan explicar su punto completo`,
    apertura: `Es que no me dejan ni terminar la idea antes de decir que estoy equivocado.`,
    objetivo: `Bajar el tono de la conversación sin invalidar lo que piensa cada uno.`
  },
  {
    id: "opinion-religion", catId: "opinion", title: `La opinión sobre la religión`,
    text: `En un trabajo sobre ética, Paula comenta su punto de vista religioso y otro compañero se ríe diciendo que "eso ya nadie lo cree". Paula se queda callada el resto de la clase.`,
    personaje: `Paula`, personajeEstado: `incómoda, siente que se burlaron de algo importante para ella`,
    apertura: `No tenía que reírse así solo porque pienso distinto.`,
    objetivo: `Mostrar respeto por su punto de vista sin tener que compartirlo para hacerlo.`
  },
  {
    id: "debate-uniforme", catId: "opinion", title: `El debate sobre el uniforme`,
    text: `El curso discute si pedir que se flexibilice el uso del uniforme. Natalia defiende con fuerza mantenerlo igual, y algunos la acusan de "no entender a los demás" solo por opinar distinto.`,
    personaje: `Natalia`, personajeEstado: `a la defensiva, siente que la atacan por su opinión, no que debaten la idea`,
    apertura: `Puedo pensar distinto sin que eso signifique que no entiendo a nadie.`,
    objetivo: `Debatir la idea sin desacreditar a la persona.`
  },
  {
    id: "reunirse-en-persona", catId: "opinion", title: `La discusión por cómo organizarse`,
    text: `El grupo de trabajo no se pone de acuerdo en algo simple: si organizarse por WhatsApp o reunirse en persona. Lo que empezó como una diferencia práctica terminó en mensajes cortantes entre Alejandro y otro integrante.`,
    personaje: `Alejandro`, personajeEstado: `molesto, siente que sus razones no se están teniendo en cuenta`,
    apertura: `No es capricho, para mí reunirnos en persona sí hace diferencia, y siento que ni lo consideran.`,
    objetivo: `Encontrar un punto medio sin que la diferencia se vuelva pelea personal.`
  },
  {
    id: "gusto-musical", catId: "opinion", title: `El comentario sobre la música`,
    text: `Un compañero se burla del género de música que le gusta a Melany frente a todo el salón, diciendo que "eso ni es música de verdad". Melany deja de comentar sus gustos desde entonces.`,
    personaje: `Melany`, personajeEstado: `cohibida, ya no comparte lo que le gusta por miedo a la burla`,
    apertura: `Ya ni cuento lo que escucho porque siempre alguien tiene algo que decir.`,
    objetivo: `Mostrar interés genuino sin necesidad de compartir el mismo gusto.`
  },

  {
    id: "cumpleanos-sin-invitar", catId: "exclusion", title: `El que dejaron por fuera del cumpleaños`,
    text: `Todo el salón fue invitado a un cumpleaños, excepto Esteban. Cuando pregunta si va a haber algo el fin de semana, algunos evaden la pregunta o cambian de tema.`,
    personaje: `Esteban`, personajeEstado: `dolido, sospecha que lo dejaron por fuera a propósito`,
    apertura: `¿Va a haber algo el sábado? Como que todo el mundo anda raro cuando pregunto.`,
    objetivo: `Ser honesto sin hacerlo sentir peor, y pensar cómo incluirlo de ahora en adelante.`
  },
  {
    id: "almuerza-solo", catId: "exclusion", title: `El que se sienta solo`,
    text: `Desde hace un mes, Juan Pablo almuerza solo porque el grupo con el que se sentaba dejó de invitarlo sin decirle por qué. Nadie ha hablado con él directamente sobre lo que pasó.`,
    personaje: `Juan Pablo`, personajeEstado: `confundido y triste, no entiende qué hizo mal`,
    apertura: `¿Hice algo? Nadie me ha dicho nada, simplemente dejaron de sentarse conmigo.`,
    objetivo: `Averiguar qué pasó realmente y ayudar a reconstruir el grupo o encontrar apoyo.`
  },
  {
    id: "burla-costumbre", catId: "exclusion", title: `La burla que se volvió costumbre`,
    text: `A Antonia le pusieron un apodo burlón hace meses y ya se volvió tan normal en el salón que hasta los profesores lo usan sin darse cuenta. Antonia dejó de corregir a la gente porque siente que no sirve de nada.`,
    personaje: `Antonia`, personajeEstado: `resignada, ya no cree que valga la pena pedir que paren`,
    apertura: `Ya ni digo nada, para qué, si de todas formas lo siguen usando.`,
    objetivo: `Mostrarle que sí vale la pena decir algo, y acompañarla a hacerlo.`
  },
  {
    id: "presion-molestar", catId: "exclusion", title: `El grupo que presiona a molestar a alguien`,
    text: `Un grupo de compañeros le insiste a Diego que se burle de un estudiante nuevo "para que se integre al grupo". Diego no quiere hacerlo, pero le preocupa quedar por fuera si se niega.`,
    personaje: `Diego`, personajeEstado: `dividido entre lo que sabe que está bien y el miedo a quedar excluido`,
    apertura: `No quiero hacerlo, pero si no me uno capaz me dejan a mí por fuera después.`,
    objetivo: `Ayudarlo a encontrar una forma de decir que no sin quedar aislado.`
  },
  {
    id: "culpan-de-todo", catId: "exclusion", title: `El que lo culpan de todo`,
    text: `Cada vez que algo sale mal en el salón, media clase mira primero hacia Pablo, aunque muchas veces él ni tuvo que ver. Hoy volvió a pasar con un desorden que hicieron entre varios.`,
    personaje: `Pablo`, personajeEstado: `cansado de cargar con la culpa de cosas que no hizo`,
    apertura: `Otra vez me están mirando a mí, y ni siquiera estaba cerca cuando pasó.`,
    objetivo: `Escuchar su versión y ayudar a que la responsabilidad se reparta de verdad.`
  },

  {
    id: "grito-en-clase", catId: "ira", title: `El grito en plena clase`,
    text: `Durante un trabajo en parejas, Vanessa le gritó a su compañero frente a todo el salón después de que él borrara sin querer parte de lo que llevaban. El profesor los separó, pero el ambiente sigue tenso.`,
    personaje: `Vanessa`, personajeEstado: `todavía alterada, un poco avergonzada de haber gritado`,
    apertura: `Sé que grité, pero es que llevábamos una hora en eso y lo borró sin cuidado.`,
    objetivo: `Ayudarla a bajar la tensión y pensar cómo seguir trabajando juntos.`
  },
  {
    id: "empujon-fila", catId: "ira", title: `El empujón en la fila`,
    text: `En la fila de la cafetería, Jorge empujó a un compañero que se coló, y casi se arma una pelea. Un profesor los separó a tiempo, pero Jorge sigue con el pulso acelerado cuando te busca.`,
    personaje: `Jorge`, personajeEstado: `todavía con adrenalina, defendiendo que tenía razón en molestarse`,
    apertura: `Se coló, eso no es justo, por eso reaccioné así.`,
    objetivo: `Reconocer que tenía razón en molestarse, sin justificar el empujón.`
  },
  {
    id: "portazo", catId: "ira", title: `El portazo`,
    text: `Camilo salió del salón dando un portazo después de que el profesor le llamara la atención frente a todos por llegar tarde otra vez. Ahora está afuera, todavía molesto, y tú saliste a ver cómo está.`,
    personaje: `Camilo`, personajeEstado: `humillado, más enojado consigo mismo que con el profesor`,
    apertura: `No tenía que decirlo así, delante de todos. Ya sé que llegué tarde.`,
    objetivo: `Ayudarlo a calmarse antes de que decida qué hacer después.`
  },
  {
    id: "insulto-partido", catId: "ira", title: `El insulto que se le salió`,
    text: `En medio de una discusión por una jugada en el partido de baloncesto del colegio, a Ivonne se le salió un insulto fuerte contra una compañera de otro curso. Ahora se siente mal por lo que dijo.`,
    personaje: `Ivonne`, personajeEstado: `arrepentida, pero también todavía sensible por la discusión`,
    apertura: `No debí decir eso, se me salió sin pensar. Pero tampoco fue solo culpa mía lo que pasó antes.`,
    objetivo: `Ayudarla a asumir su parte sin que se sienta como el único punto de la historia.`
  },
  {
    id: "cuadernos-al-piso", catId: "ira", title: `El que rompe algo con rabia`,
    text: `Después de perder por poco un examen de matemáticas por un punto, Sara tiró sus cuadernos al piso con rabia frente al salón. Algunos se ríen, lo que la hace enojar todavía más.`,
    personaje: `Sara`, personajeEstado: `frustrada consigo misma y avergonzada de que la vieran así`,
    apertura: `No es por el examen, es que llevo semanas estudiando y aun así no me alcanza.`,
    objetivo: `Ayudarla a bajar la frustración y pensar en un paso siguiente concreto.`
  },

  {
    id: "castigo-todo-salon", catId: "justicia", title: `El castigo para todo el salón`,
    text: `Por el desorden de unos pocos estudiantes, el profesor quitó el descanso a todo el salón. Varios están molestos porque sienten que pagan por algo que no hicieron, y culpan directamente a Fabián, uno de los que sí causó el desorden.`,
    personaje: `Fabián`, personajeEstado: `avergonzado, pero también molesto porque siente que otros también tuvieron culpa`,
    apertura: `Sé que la regué, pero no fui solo yo, y ahora todos me están mirando feo.`,
    objetivo: `Ayudarlo a asumir su parte sin cargar con toda la responsabilidad del grupo.`
  },
  {
    id: "favoritismo", catId: "justicia", title: `El favoritismo que se nota`,
    text: `Varios estudiantes sienten que un profesor siempre le da el beneficio de la duda a los mismos compañeros y es más estricto con otros. Carolina, que suele salir perjudicada, quiere hablar contigo antes de decidir si dice algo.`,
    personaje: `Carolina`, personajeEstado: `frustrada, no sabe si hablar va a servir de algo o solo le va a traer problemas`,
    apertura: `Siempre es igual, a ellos se les pasa todo y a mí me llaman la atención por lo mismo.`,
    objetivo: `Ayudarla a pensar cómo plantear la situación de forma justa y sin miedo.`
  },
  {
    id: "acusacion-sin-pruebas", catId: "justicia", title: `La acusación sin pruebas`,
    text: `Desapareció dinero de la caja del comité del salón, y varios compañeros empezaron a señalar a Melissa sin ninguna prueba, solo porque ella la tuvo en sus manos por última vez visible. Melissa está muy afectada por los señalamientos.`,
    personaje: `Melissa`, personajeEstado: `indignada y dolida por sentirse juzgada sin pruebas`,
    apertura: `Todo el mundo ya me está viendo como la ladrona y ni siquiera saben qué pasó de verdad.`,
    objetivo: `Mantener una posición justa: ni asumir que es culpable ni ignorar la situación.`
  },
  {
    id: "reconocimiento-perdido", catId: "justicia", title: `El reconocimiento que no llegó`,
    text: `En la izada de bandera, reconocieron el trabajo de un grupo de proyecto ambiental, pero olvidaron mencionar a Andrea, quien había propuesto la idea original meses atrás. Andrea no dijo nada en el momento, pero después te lo cuenta.`,
    personaje: `Andrea`, personajeEstado: `dolida por no ser reconocida, pero insegura de si vale la pena decir algo`,
    apertura: `No dije nada porque no quería hacer show, pero sí me dolió que ni me nombraran.`,
    objetivo: `Ayudarla a decidir si y cómo comunicar lo que siente.`
  },
  {
    id: "regla-desigual", catId: "justicia", title: `La regla que solo aplica para algunos`,
    text: `El colegio permite que algunos estudiantes usen el celular en el descanso "porque tienen buen comportamiento", mientras a otros, como Emiliano, se lo quitan por cualquier motivo. Emiliano siente que la regla no se aplica igual para todos.`,
    personaje: `Emiliano`, personajeEstado: `frustrado por lo que percibe como trato desigual`,
    apertura: `A ellos nunca les dicen nada y a mí me lo quitan por cualquier cosa. Eso no es parejo.`,
    objetivo: `Escuchar su punto sin necesariamente estar de acuerdo con cada detalle, y pensar en un canal para plantearlo.`
  },

  {
    id: "mudanza-nadie-sabe", catId: "familiar", title: `La mudanza que nadie sabe`,
    text: `La familia de Isabella se va a mudar de barrio por temas económicos, y ella tendrá que cambiarse de colegio a mitad de año. No se lo ha contado a casi nadie, pero hoy te lo dice a ti.`,
    personaje: `Isabella`, personajeEstado: `triste, todavía procesando la noticia ella misma`,
    apertura: `Nos vamos a mudar, y me toca cambiarme de colegio. No sé cómo decirle a los demás.`,
    objetivo: `Acompañarla en la conversación sin minimizar lo que está sintiendo.`
  },
  {
    id: "cuida-hermanos", catId: "familiar", title: `El que cuida a los hermanos`,
    text: `Desde que sus papás empezaron a trabajar en turnos distintos, a Sebastián le toca recoger a sus hermanos menores del colegio todos los días, lo que lo hace faltar a los entrenamientos de fútbol.`,
    personaje: `Sebastián`, personajeEstado: `cansado, sintiendo que no puede explicarle bien al equipo por qué falta tanto`,
    apertura: `No es que no quiera entrenar, es que me toca recoger a mis hermanos todos los días.`,
    objetivo: `Entender su situación real antes de sacar conclusiones sobre su compromiso.`
  },
  {
    id: "ausencia-sin-explicar", catId: "familiar", title: `La ausencia que nadie explicó`,
    text: `Luciana faltó una semana entera al colegio sin que nadie supiera bien por qué. Cuando vuelve, algunos compañeros hacen comentarios como si se hubiera estado "escapando de clase".`,
    personaje: `Luciana`, personajeEstado: `agotada, no tiene ganas de dar explicaciones sobre algo difícil en su casa`,
    apertura: `No falté porque quise, prefiero no entrar en detalles, pero no fue lo que están pensando.`,
    objetivo: `Respetar su espacio sin dejar que los rumores sigan circulando sin más.`
  },
  {
    id: "materiales-proyecto", catId: "familiar", title: `El que no tiene para las cosas del proyecto`,
    text: `Para el proyecto final de arte piden materiales costosos, y Camilo no se ha animado a decirle al grupo que en su casa no hay para comprarlos esta semana. Prefiere decir que "se le olvidó".`,
    personaje: `Camilo`, personajeEstado: `apenado, prefiriendo mentir antes que admitir la situación económica`,
    apertura: `Se me olvidó traer los materiales... en realidad no es que se me olvidó.`,
    objetivo: `Crear un espacio donde pueda decir la verdad sin sentir vergüenza.`
  },
  {
    id: "duelo-abuelo", catId: "familiar", title: `El duelo que no ha contado`,
    text: `Hace dos semanas murió el abuelo de Renata, con quien vivía. Ha vuelto al colegio, pero se queda callada casi toda la clase y evita hablar del tema cuando alguien pregunta si está bien.`,
    personaje: `Renata`, personajeEstado: `en duelo, no tiene ganas de hablar del tema todavía pero tampoco quiere estar completamente sola`,
    apertura: `Estoy bien, en serio. No hace falta que todos me pregunten a cada rato.`,
    objetivo: `Estar presente sin presionarla a hablar de algo para lo que no está lista.`
  }
];

export const COLOR_MAP = {
  jade: { main: "jade", soft: "jade-soft" },
  gold: { main: "gold", soft: "gold-soft" },
  slate: { main: "slate", soft: "slate-soft" },
  moss: { main: "moss", soft: "moss-soft" },
  teal: { main: "teal", soft: "teal-soft" },
  indigo: { main: "indigo", soft: "indigo-soft" },
  plum: { main: "plum", soft: "plum-soft" },
  clay: { main: "clay", soft: "clay-soft" },
  berry: { main: "berry", soft: "berry-soft" },
  olive: { main: "olive", soft: "olive-soft" },
  alert: { main: "alert", soft: "alert-soft" }
};

export function catOf(catId) {
  return CATEGORIES.find((c) => c.id === catId) || CATEGORIES[0];
}
