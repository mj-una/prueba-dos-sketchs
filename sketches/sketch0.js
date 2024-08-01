////////////////////////////////
// sketch principal. recomendacion: elegir el que tenga mas lineas!!
// o desde el que se vayan a importar mas clases, o mas codigo de p5

////////////////////////////////
//  _____   _   _   _____    ___    ___    ___     _     _    
// |_   _| | | | | |_   _|  / _ \  | _ \  |_ _|   /_\   | |   
//   | |   | |_| |   | |   | (_) | |   /   | |   / _ \  | |__ 
//   |_|    \___/    |_|    \___/  |_|_\  |___| /_/ \_\ |____|                            
//
// PARA COLOCAR VARIOS SKETCHES (.js) EN UNA MISMA PÁGINA (.html)
// usando instancias múltiples, pero con un truco para que sea más cómodo
// 
// esto es lo "normal" que había visto que se hacía:
// https://p5js.org/es/examples/advanced-canvas-rendering-multiple-canvases/
//
// __es horrible__
// odio estar escribiendo "p." en cada palabra, porque quita fluidez (q es lo mas atractivo de p5).
// ademas, se hace increiblemente tedioso agregarle nuevas instancias a un sketch que ya existe,
// y probablemente si queremos agregarle instancias es porque se trata de un proyecto complejo
// que ya tiene muchas lineas de codigo.
//
// __por eso__
// inventé este atajo que permite trabajar en ~al menos un sketch~ sin repitir "p." miles de veces.
// solo funciona ~una~ vez, asique todos los sketches extras q se agreguen necesitan la "p." siosi,
// esta buenisimo para aplicarlo al codigo principal. funciona bien incluso si se trabaja con
// modulos y clases. tambien es compatible con otra solucion (los iframes) q menciono luego.
//
// __usos__
// lo ideal es que las nuevas instancias sean pequeñas (pq "p."), como mini lienzos secundarios.
// supongo q no se suelen usar por lo incomodo y poco intuitivo que es escribirlas o adaptarlas,
// pero hay muchísimas aplicaciones en que pueden ser utiles. dejo algunas q se me ocurren:
// - para animaciones independientes, que se carguen, ejecuten y eliminen a medida q es necesario.
// - para sketchs que se puedan recibir de forma asincrona, y se ~sumen~ al hilo principal.
// - para ir cargando distintos niveles de un juego de forma modular, sin colapsar el inicio.
// - para UI basada en colisiones segun colores. y asi tener botones de formas poco convencionales.
// - y uno obvio: para capturar los clicks en toda la pantalla (por fuera del sketch principal).
//
//      |\---/|
//      | ,_, |  ohh, miau. que interesante!
//       \_`_/-..----.
//     ___/ `   ' ,""+ \ 
//    (__...'   __\    |`.___.';
//      (_,...'(_,.`__)/'.....+
//
//
// __mi truco__
// asigno las palabras reservadas (de la instancia de p5) al contexto global (objeto window),
// igual q pasa cuando se trabaja con un solo sketch. por eso no se puede repetir dos veces.
// los demas sketches crean su propio objeto como propiedad en window, lo que los diferencia
// de las propiedades globales (y asi mantienen sus nombres independientes).
//
// si o si es una mejora cosiderable respecto a las instancias multiples "normales",
// pero me sigue pareciendo mas recomendable trabajar con iframes. aunque (como todo)
// depende del caso... los iframes no son perfectos, p.ej consumen mucho mas recursos
// y para comunicarse de un sketch a otro se necesita postMessage, q se hace verboso.
// en otro tutorial explicare iframes con detalle, pq ambas son soluciones validas
// y a veces lo mejor es mezclar un poco de cada una.
//
// existe otra alternativa, q es usar "with", pero esta recontra desaconsejado su uso.
// "with" sirve para extender el ambito de un objeto, y asi poder acceder a las propiedades
// sin tener que referirse al objeto cada vez (literalmente lo q buscaba hacer con "p").
// el problema esta en q el codigo aparenta hacer algo q no esta haciendo. ademas tiene problemas
// de rendimiento, pq es una estructura obsoleta, q ya no se le presta soporte. por lo mismo,
// no se permite su uso en strict mode, y los modulos trabajan con ese modo obligatoriamente.
// en la documentacion de q5 (una adaptacion de p5) hay un ejemplo de como se puede usar:
// https://github.com/q5js/q5.js?tab=readme-ov-file#namespace-mode
//
// __ñeeee__
// aprendo mientras voy avanzando. aun no entiendo todo lo q hice y supongo q se puede mejorar.
// no habia visto este enfoque antes. lo comparto pq me parece muy util y es fácil de copiar. 
// las partes de js duro las escribi casi por completo (99%) con ayuda de chat gpt.
// https://chatgpt.com/share/1ab6d4b8-409d-43ad-ae89-f83526ac7d2d
//
// tengo claro que solo es un parche. por ahora me basta con que sea comodo y no se rompa.
// ojalá algún dia exista algo ~oficial~. estaría lindo pq tendría soporte a largo plazo.
// cualquier retroalimentación me sirve muchísimoooo. mi ig es: @sepintangatos
//
// para usar libremente, no es necesario citar autoria. cc0. al dominio publico
// 2.5.O.2.5.2.5.O.2.5.2.5.O.2.5
////////////////////////////////

// la importacion sirve para traer codigo desde de otros modulos
import Cosa from "../clases/Cosa.js"; // experimento para usar clases

// la exportacion sirve para que otros modulos puedan importar estas cosas
export let listoSketch0 = false; // experimento para determinar inicio desde main.js
export let ocultarSketch1 = false; // experimento para ocultar visibilidad de sketch1.js

// el código principal se exporta como una funcion flecha que anida todo adentro,
// y q se la importa desde el modulo main.js (desde donde se crean las instancias).
// no es 100% necesario q sea asi, pero sí muy recomendable para mantener ordenado

// la palabra clave default sirve para que en el import se pueda escribir un nombre generico
// por ejemplo: import cualquierNombre from "../clases/Cosa.js"; // (permite mayor flexibilidad)
// a diferencia de no usarlo, q tiene que ser exacto: import { Cosa } from "../clases/Cosa.js";
// solo hay un default por modulo. se pueden exportar otras cosas aparte (como ocultarSketch1).
// yo pongo default casi q por costumbre, por ejemplo aqui no estaria siendo muy util

// la constante "sketch0" almacena una funcion anonima (flecha). esto permite que:
// 
// a) si se llama a la constante por su nombre:
//    devuelve el bloque de codigo tal cual. como "copiar" y "pegar" el codigo
//
// b) si se le llama con nombre + parentésis, tipo: "sketch0()":
//    ejecuta el código y retorna solamente el valor que le demos como return.
//
// en este caso usaremos "sketch0" como parametro en el constructor del objeto p5 en main.js.
// entonces pasaremos el bloque completo, no el resultado de un return (q ni siquiera tiene)
export const sketch0 = (p) => { // el objeto "p" se refiere a la instancia de ~este~ sketch.
  // la referencia a esta función flecha será recibida por "new p5(sketch0);" pero ojo:
  // no es en main.js donde será ejecutada, sino que dentro del nuevo objeto "p5".
  // entonces esa "p" no se le pasamos en "nuestro" código como parametro, sino que 
  // la recibimos desde "afuera" (porque sí, porque asi esta hecho p5 por dentro).
  // "p" es por convencion. podria ser cualquier otro nombre.


  // ___________________________________________________________________________

  const id = 0; // identificador del sketch. por comodidad. se usa en .parent y en .getElementById
  let pruebaDeObjeto; // para experimento, no se usa en nada serio
  let bloquearClick = false; // para validacion en touchEnded
  let dejavuBoldCond, dejavuBold; // para guardar las fuentes

  // ___________________________________________________________________________
  
  // # detalle importante: 
  // las funciones propias de p5 que esten en el nivel superior (globales en el módulo)
  // se tienen que escribir con "p." y se tienen que guardar como funciones anonimas
  p.preload = () => {

    // el truco se ejecuta en el setup, despues de createCanvas, asique cualquier cosa de p5
    // que este "antes" de eso tiene q escribirse como instancia multiple normal (con p.)
    dejavuBoldCond = p.loadFont("./fonts/DejaVuSansCondensed-Bold.ttf");
    dejavuBold = p.loadFont("./fonts/DejaVuSans-Bold.ttf");
  }


  // ___________________________________________________________________________

  // # setup es otra funcion propia de p5, y está en el nivel global de const sketch0
  p.setup = () => { // (asi que "p." y funcion anonima)
    
    let res = 500; // editable. resolucion interna (fraccionamiento)
    const canvas = p.createCanvas(res, res); // # createCanvas necesita "p."
    canvas.parent("contenedor__sketch--" + id); // para insertarlo en el div contenedor
    canvas.style("user-select", "none"); // para quitar seleccion texto con doble click (opcional)
    canvas.style("touch-action", "manipulation"); // para quitar zoom con doble touch (opcional)
    
  
    ////////////////////////////////
    // % $ % $ % $ % $ % $ % $ % $ %
    // # ESTE ESSS !!! MI TRUCO 100% REAL NO FAKE:
    // ojo. se tiene que hacer despues de createCanvas
    //
    // asignar las palabras reservadas (de esta instancia de p5) al contexto global (objeto window)
    for (let prop in p) { // recorre las propiedades de "p", por ejemplo: height, rect(), PI
      
      // por cada propiedad vemos si es una funcion o no
      if (typeof p[prop] === "function") { // # en caso de serlo, hay que "darle contexto"
        window[prop] = p[prop].bind(p); // (bind es de js avanzado, sobre el scope en .this)
      }
      else {
        window[prop] = p[prop]; // # en caso que no serlo, se asigna directamente
      }
    }
    // 
    // °°tutorial. sobre el contexto (scope) de .this:
    // https://www.youtube.com/watch?v=bS71_W_BDFE&list=PLfWyZ8S-XzecAttp3QU-gBBXvMqEZTQXB&index=9
    // "15. This en JavaScript (bind y más)" - video por Sacha Lifszyc (La Cocina del Código)
    //
    // -----------------------------
    // * PROBLEMAS DE NOMBRAMIENTO *
    //
    // el alcance de nombres es un problema muy frecuente en la computacion a nivel general.
    // hay conceptos reee interesantes de aprender, como por ejemplo lo que es un "namespace":
    //
    // °°tutorial. una excelente explicacion del concepto:
    // https://www.aluracursos.com/blog/namespaces-como-evitar-conflictos
    // "Namespaces: cómo evitar conflictos en código JavaScript" - articulo por Camila Pêssoa
    //
    // °°tutorial. una joya de playlist sobre la ejecucion y el entorno lexico de javascript
    // https://youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP&si=fP_EUgtEsXtRKxy3
    // "Namaste Javascript" (del 1 al 10) - videos por Akshay Saini
    //
    // -----------------------------
    // * PROBLEMAS DE CONCURRENCIA *
    //
    // la creacion del <canvas> en el dom puede retrasarse (p.ej: por las fuentes o imagenes).
    // como son varios sketchs, pueden surgir conflictos en el orden de ejecucion de cada uno.
    // esto es un tipo de problemas que en computacion se les conoce como "concurrencia".
    //
    // los interpretes de javascript tienen un "event loop" para trabajar asincrónicamente,
    // (es decir, para ejecutar funciones sin saber exactamente el orden en que llegarán)
    //
    // °°tutorial. event loop en javascript:
    // https://www.youtube.com/watch?v=rvzItyLuh28&list=PLJpymL0goBgE1RM5BRb7tcohwqffviqk0&index=7
    // "Qué es el Event Loop en JavaScript. Paso a paso" - video por Eduardo Fierro
    // 
    // en la funcion windowResized hay una llamada al elemento <canvas>, q tal vez no exista aun.
    // la solucion q se me ocurrio fue mandar esta llamada al final de la cola de tareas. no se(?)
    // 
    // # responsive asincrono
    setTimeout( function() { // setTimeout ~saca~ este bloque del hilo principal
      windowResized(); // responsive y dom. ver codigo al final de este archivo
      listoSketch0 = true; // flag para avisar que se termino de cargar el sketch
    }, 0); // temporizador sin delay. se usa para provocar la asincronia
    //
    //
    // este tema es un dolor de cabeza. les comparto algunas de mis aspirinas favoritas
    //
    // °°tutorial. introduccion a la concurrencia:
    // https://youtu.be/jw_vraxfnQw?si=5OwKiJcZmwfECiYm
    // "¿Qué Diablos es Programacion Concurrente?" - video por Hector de Leon (hdeleon.net)
    // 
    // °°tutorial. concurrencia explicada con calma:
    // https://www.youtube.com/watch?v=Vxo5n1vmBbE&list=PLD2wfKpqmxnldrDCjmGIOjC2Kl6UqP88q&index=7
    // "Code Time" (episodios 36, 37, 38, 39, 40, 43 y 46) - podcast por David Giordana
    //
    // son muchas cosas. yo no entiendo ni la mitad. las menciono por si alguien quiere chusmear.
    // imposible aprenderselas todas en profundidad o con apuro. pero esta bueno tener una nocion
    ////////////////////////////////

    ////////////////////////////////
    // de aqui para abajo es como escribir un sketch cualquieraaaaa
    // salvo por algunos detalles que estan comentados con # (buscarlos con ctrl f)

    // generalidades
    rectMode(CENTER);
    strokeWeight(p.width / 180);
    textAlign(CENTER, CENTER);
    textSize(height / 22);
    textFont(dejavuBoldCond);
    noLoop(); // inicia pausado, hasta q desde main.js se active
    frameRate(30); // # un detalle interesante: no es seguro q los draw esten sincronizados.
    // los sketches se ejecutan en procesos separados asi q pueden tener distintas velocidades.
    // significa q: si uno consume muchos recursos, no afecta directamente al rendimiento del otro.
    // la funcion frameRate establece una velocidad maxima. la vel final puede variar, q esta bien!!
    // p.ej: en la compu se ven sincronizados y en el celu no. depende del hardware y del navegador.
    // a nivel visual (para esta imagen) resulta contraproducente, pero tecnicamente es una ventaja.
    // si se necesita q mantengan exactamente la misma velocidad entonces mejor usar un solo sketch.
    
    // experimento de usar clases
    pruebaDeObjeto = new Cosa("hola", "wachin"); // parametros al constructor
    pruebaDeObjeto.consolameEsta("jaja", "saludos"); // parametros al metodo_A
  }
  

  // ___________________________________________________________________________

  // # draw es una funcion propia de p5, y es global en sketck0
  p.draw = () => { // (asi que "p." y funcion anonima)

    ////////////////////////////////
    // -----------------------------
    // ME FALTA UNA SOLUCION PARA ESCUCHAR LOS CAMBIOS EN LOS VARLORES DE P.
    // ASI EN EL DRAW SE ACTUALIZAN AUTOMATICAMENTE (POR AHORA LO HICE A MANO).
    // CREO Q ESO Q ANDO PENSANDO SON LOS PROXYS, PERO PA MAÑANA. BUENAS NOXYS
    //
    // °°tutorial. una introduccion al objeto proxy
    // https://youtu.be/7njrLMJgDtQ?si=3JAYjxF6pBy-8LRC
    // "Curso JavaScript: 55. Proxies" - videos por Jon Mircha
    //
    // -----------------------------
    // 
    // propiedades q necesitan actualizacion constante:
    window["mouseIsPressed"] = p["mouseIsPressed"];
    window["frameCount"] = p["frameCount"];
    window["mouseX"] = p["mouseX"];
    window["mouseY"] = p["mouseY"];
    // solucion provisional pq estoy cansado jefe. tengo q estudiarlo con calma.
    // quiero lograr hacer esto automaticamente (y q perdure) desde el setup
    ////////////////////////////////

    ////////////////////////////////
    // TODO LO DEMÁS DE ESTE ARCHIVO NO FORMA PARTE DEL TUTORIAL
    // fue muy poco texto?? en main.js, sketch1.js y Cosa.js hay mas jeje
    // 
    // estos dibujitos los inventé para poner una imagen q llame la atención

    // origen (0, 0) en el centro
    translate(width / 2, height / 2);

    // fondo. casi ni se ve
    background(frameCount % 255, 255 - frameCount % 255, 255 - (255 / 96) * 100);
    
    // circulos en espiral del fondo
    noFill();
    stroke(255);
    for (let i = 100; i > 0 ; i--) {
      fill(frameCount % 255, 255 - frameCount % 255, 255 - (255 / 96) * i);
      circle(
        sin((frameCount - 5 * i) / 25 * (i / 97)) * height / 3,
        cos((frameCount - 5 * i) / 25 * (i / 97)) * height / 3,
        (height / 50) * i
      );
    }

    // boton
    if (
      mouseX > width * 0.075 &&
      mouseX < width * 0.205 &&
      mouseY > height * 0.881 &&
      mouseY < height * 0.934
    ) {
      // cursor(HAND); // > es complicado resolverlo aca. imagino en un 3er sketch para la ui.
      if (mouseIsPressed) fill((frameCount % 255) * 0.8, (255 - frameCount % 255) * 0.8, 119);
      else fill((frameCount % 255) * 1.1, (255 - frameCount % 255) * 1.1, 163);
    }
    else {
      // cursor(ARROW); // ...ver comentario anterior <
      fill(frameCount % 255, 255 - frameCount % 255, 148.75);
    }
    rect(-width * 0.36, height * 0.408, width / 8, height / 20);

    // texto
    push();
    fill(255);
    noStroke();
    text("click", -width * 0.36, height * 0.404);
    text("y   \notro", 0, height * 0.354);
    
    // experimento de usar clases
    if (ocultarSketch1) {
      push();
      textFont(dejavuBold);
      pruebaDeObjeto.displayCualquierCosa();
      pop();
    }
    pop();
  }


  // ___________________________________________________________________________

  // # touchEnded es una funcion propia de p5 (y es global)
  p.touchEnded = () => {

    // descartar click derecho
    if (p.mouseButton !== p.LEFT) return;

    // evitar doble accion
    if (bloquearClick) return;
    bloquearClick = true;
    setTimeout(function() {
      bloquearClick = false;
    }, 200);
    
    if (
      mouseX > width * 0.075 &&
      mouseX < width * 0.205 &&
      mouseY > height * 0.881 &&
      mouseY < height * 0.934
    ) {
      console.log("click validado! ___ocultarSketch1 = " + ocultarSketch1);
      if (ocultarSketch1) ocultarSketch1 = false;
      else ocultarSketch1 = true;
    }
  }


  // ___________________________________________________________________________
  
  // # windowResized es una funcion propia de p5 (y es global)
  p.windowResized = () => {
    
    // esto lo expliqué en el ejemplo 2 del tutorial sobre p5 responsive:
    // https://github.com/mj-una/tutorial-p5-responsive/blob/main/sketch.js
    
    // tiene un setTimeout para asegurar q el contenedor ya este renderizado
    const cont = document.getElementById("contenedor__sketch--" + id);
    const canv = document.getElementById("defaultCanvas" + id);
    setTimeout( function() { // hacer asincrono
      const contAdaptado = window.getComputedStyle(cont); // medidas finales
      canv.style.width = contAdaptado.width;
      canv.style.height = contAdaptado.height;
    }, 0);
  }
}
