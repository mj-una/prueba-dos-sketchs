//////////////////////////////
// sketch principal. recomendacion: elegir el que tenga mas lineas!!
// o desde el que se vayan a importar mas clases o codigo de p5

//////////////////////////////
//  _____   _   _   _____    ___    ___    ___     _     _    
// |_   _| | | | | |_   _|  / _ \  | _ \  |_ _|   /_\   | |   
//   | |   | |_| |   | |   | (_) | |   /   | |   / _ \  | |__ 
//   |_|    \___/    |_|    \___/  |_|_\  |___| /_/ \_\ |____|                            
//
// PARA COLOCAR VARIOS SKETCHES (.js) EN UNA MISMA PÁGINA (.html)
// usando instancias múltiples, pero con un truco para que sea más cómodo
// 
// esto es lo "normal" que había visto que se hacía:
// https://editor.p5js.org/caminofarol/sketches/r609C2cs
//
// ,,,es horrible,,,
// odio estar escribiendo "p." a cada rato, me quita la fluidez de escribir p5 normal.
// y se hace increiblemente tedioso agregar nuevas instancias a un sketch que ya existe,
// sobretodo si son muchas lineas de codigo.
//
// ,,,por eso,,,
// inventé este atajo que permite trabajar en al menos un sketch sin estar repitiendo p,
// pero solo funciona una vez. todos los sketches extras seguirán necesitando "p." buu
//
// ,,,de todos modos,,,
// está genial aplicarlo en el codigo principal (por ejemplo un juegito con objetos
// que tenga muchas lineas). y luego se pueden agregar mas sketches en modulos aparte.
// lo ideal es que sean sketches pequeños (pq "p."), como mini lienzos secundarios,
// q ocupen distintas zonas de la pagina, o toda la pantalla (para capturar el touch
// por fuera del lienzo de sketch0 por ejemplo), o para animaciones independientes
// que se carguen en distintos momentos, etc, etc. 
//
//
//      |\---/|
//      | ,_, |  ohh, miau. que interesante!
//       \_`_/-..----.
//     ___/ `   ' ,""+ \ 
//    (__...'   __\    |`.___.';
//      (_,...'(_,.`__)/'.....+
//
//
// no es necesario entender toda la estructura, yo tampoco la entiendo por completo,
// solo sé que me sirve y la comparto pq es muuuy util y fácil de copiar y pegar.
// no habia visto nada parecido. escribi todo yo, con (99%) ayuda de chat gpt.
// https://chatgpt.com/share/1ab6d4b8-409d-43ad-ae89-f83526ac7d2d
//
// tengo claro que solo es un parche. por ahora me basta con que sea comodo y no se rompa.
// ojalá algún dia exista algo "oficial". estaría lindo pq tendría soporte a largo plazo.
// 
// si o si es una mejora cosiderable respecto a las instancias multiples "normales",
// pero me sigue pareciendo mas recomendable trabajar con iframes. pero, como todo,
// depende del caso... los iframes tampoco son perfectos. consumen mucho mas recursos
// y para comunicarse entre los sketchs se necesita postMessage, q lo hace verboso.
// en otro tutorial explicare iframes con detalle. pq ambas son soluciones utiles
// y a veces lo mejor seria mezclar un poco de cada una.
//
// escribí el código pa usarlo en ideas que tengo ahora mismo, no pa que sea perfecto. 
// cualquier retroalimentación me sirve muchísimoooo. mi ig es: @sepintangatos
//
// al dominio publico - cc0 - no es necesario citar autoria
//////////////////////////////

// la importacion sirve para traer cosas desde de otros modulos
import Cosa from "../clases/Cosa.js"; // experimento para usar clases

// la exportacion sirve para que otros modulos puedan importar estas cosas
export let ocultarSketch1 = false; // experimento para conectarse con sketch1.js

// el código principal lo exporto como una funcion flecha que anida todo adentro,
// y q se la importa desde el modulo main.js (desde donde se crean las instancias).
// no es 100% necesario q sea asi, pero sí muy recomendable para mantener ordenado

// la palabra clave default sirve para que en el import se pueda escribir un nombre generico
// por ejemplo: import cualquierNombre from "../clases/Cosa.js"; // (permite mayor flexibilidad)
// a diferencia de no usarlo, q tiene que ser exacto: import { Cosa } from "../clases/Cosa.js";
// solo hay un default por modulo. se pueden exportar otras cosas aparte (como ocultarSketch1).
// yo lo pongo casi q por costumbre (por ejemplo ahora no estaria siendo muy util)

// la constante "sketch0" almacena una funcion anonima (flecha). esto permite que:
// 
// a) si se llama a la constante por su nombre:
//    devuelve el bloque de codigo tal cual. es como "copiar" y "pegar" el codigo
//
// b) si se le llama con nombre + parentésis, tipo: "sketch0()":
//    ejecuta el código y retorna solamente el valor que le demos como return.
//
// en este caso usamos "sketch0" como parametro en el constructor del objeto p5 en main.js.
// entonces pasaremos el bloque completo, no el resultado de un return (q ni siquiera tiene)
export const sketch0 = (p) => { // el objeto "p" se refiere a la instancia del sketch.
  // la referencia a esta función flecha será recibida por "new p5(sketch0);" pero ojo:
  // no es en main.js donde será ejecutada, sino que dentro del nuevo objeto "p5".
  // entonces esa "p" no se le pasamos en "nuestro" código como parametro, sino que 
  // la recibimos desde "afuera" (porque sí, porque asi esta hecho p5 por dentro).
  // "p" es por convencion. podria ser cualquier otro nombre.


  // ___________________________________________________________________________________

  const id = 0; // identificador del sketch. por comodidad. se usa en .parent y en .getElementById
  let pruebaDeObjeto; // para experimento, no se usa en nada serio
  let bloquearClick = false; // para validacion en touchEnded
  

  // ___________________________________________________________________________________

  // # detalle importante: 
  // las funciones propias de p5 que esten en el nivel superior (globales en el módulo)
  // se tienen que escribir con "p." y se tienen que guardar como funciones anonimas
  p.setup = () => {
    
    let res = 500; // editable. resolucion interna (fraccionamiento)
    const canvas = p.createCanvas(res, res); // # createCanvas necesita "p."
    canvas.parent("contenedor__sketch--" + id); // para insertarlo en el div contenedor
    canvas.style('user-select', 'none'); // para quitar seleccion texto con doble click (opcional)
    canvas.style('touch-action', 'manipulation'); // para quitar zoom con doble touch (opcional)
    
  
    //////////////////////////////
    // # $ # $ # $ # $ # $ # $ # $
    // # ESTE ESSS !!! MI TRUCO 100% REAL NO FAKE:
    // ojo. se tiene que hacer despues de createCanvas
    // 
    //    ------------------------
    //
    //    QUIERO AGREGAR ALGUNA SOLUCION PARA ESCUCHAR LOS CAMBIOS EN LOS VARLORES DE P
    //    ASI, EN EL DRAW SE ACTUALIZARÁN AUTOMATICAMENTE (POR AHORA LO HICE A MANO).
    //    CREO Q SON LOS PROXYS ESO Q ANDO PENSANDO, PERO PA MAÑANA. BUENAS NOXYS
    //    https://youtu.be/7njrLMJgDtQ?si=3JAYjxF6pBy-8LRC
    //
    //    ------------------------
    //
    // asignar manualmente las palabras reservadas (de p5) al contexto global (objeto window)
    for (let prop in p) { // recorre las propiedades de "p". por ejemplo: height, rect(), PI
      
      // por cada palabra vemos si es una funcion o no
      if (typeof p[prop] === "function") { // # en caso de serlo, hay que "darle contexto"
        window[prop] = p[prop].bind(p); // (bind es de js más avanzado, sobre scope en .this)
      }
      else {
        window[prop] = p[prop]; // # en caso que no serlo, se asigna directamente
      }
    }
    //
    // # estamos accediendo a las propiedades deñ objeto window, igual q se hace cuando
    // se trabaja con un solo sketch. por eso, no se puede repetir este truco dos veces.
    // los demas sketches crean su propio objeto dentro de window, lo que los diferencia
    // de las propiedades globales (asi se mantienen los nombres independientes)
    // 
    // ,,,info extra,,,
    // el alcance de nombres es un problema muy frecuente en la computacion a nivel general.
    // hay conceptos reee interesantes de aprender, como por ejemplo lo que es un "namespace":
    // https://www.freecodecamp.org/espanol/news/como-utilizar-funciones-anonimas-para-namespacing/
    //
    // ,,,joya de youtube,,,
    // y para entender mejor lo anterior recomiendo ver los primeros 10 videos de esta lista:
    // https://youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP&si=fP_EUgtEsXtRKxy3
    // 
    // ,,,bueno,,,
    // fin de la presentacion. en main.js, sketch1.js y Cosa.js también hay comentarios
    //////////////////////////////

    //////////////////////////////
    // de aqui para abajo es como escribir un sketch cualquieraaaaa
    // salvo por algunos detalles que estan comentados con # (buscarlos)
    
    windowResized(); // para hacer responsive al canvas

    // generalidades
    rectMode(CENTER);
    strokeWeight(p.width / 180);
    textAlign(CENTER, CENTER);
    textSize(height / 22);
    textFont("system-ui");
    textStyle(BOLD);

    // experimento de usar clases
    pruebaDeObjeto = new Cosa("hola", "wachin"); // parametros al constructor
    pruebaDeObjeto.consolameEsta("jaja", "saludos"); // parametros al metodo1
  }
  

  // ___________________________________________________________________________________

  // # draw es otra funcion propia de p5, y está en el nivel global
  p.draw = () => { // (asi que "p." y funcion anonima)

    // propiedades q necesitan actualizacion constante:
    // solucion provisional pq estoy cansado jefe. tengo q estudiar sobre proxy
    // para lograr hacer esto automaticamente (y q perdure) con el truco en el setup
    window['mouseIsPressed'] = p['mouseIsPressed'];
    window['frameCount'] = p['frameCount'];
    window['mouseX'] = p['mouseX'];
    window['mouseY'] = p['mouseY'];

    //////////////////////////////
    // TODO LO DEMÁS DE ESTE ARCHIVO NO FORMA PARTE DEL TUTORIAL
    // estos dibujitos los inventé para ponerle una imagen q llame la atención

    // origen (0, 0) en el centro
    translate(width / 2, height / 2);

    // fondo. casi no se ve, pero porsiaca
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
      // cursor(HAND); // esto es mas complicado de resolver. imagino un 3er sketch para la ui
      if (mouseIsPressed) fill((frameCount % 255) * 0.8, (255 - frameCount % 255) * 0.8, 119);
      else fill((frameCount % 255) * 1.1, (255 - frameCount % 255) * 1.1, 163);
    }
    else {
      // cursor(ARROW); // ver comentario anterior
      fill(frameCount % 255, 255 - frameCount % 255, 148.75);
    }
    rect(-width * 0.36, height * 0.408, width / 8, height / 20);

    // texto
    push();
    fill(255);
    noStroke();
    text("click!", -width * 0.36, height * 0.41); // arriba
    text("y   \notro", 0, height * 0.36); // abajo
    
    // experimento de usar clases
    if (ocultarSketch1) pruebaDeObjeto.displayCualquierCosa();
    pop();
  }


  // ___________________________________________________________________________________

  // # touchEnded es una funcion propia de p5 (y es global)
  p.touchEnded = () => {

    // click derecho

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


  // ___________________________________________________________________________________
  
  // # windowResized es una funcion propia de p5 (y es global)
  p.windowResized = () => {
    
    // esto viene del tutorial sobre responsive, del ejemplo 2:
    // https://github.com/mj-una/tutorial-p5-responsive/blob/main/sketch.js
    
    const container = document.getElementById("contenedor__sketch--" + id);
    const canvas = document.getElementById("defaultCanvas" + id);
    const containerStyle = window.getComputedStyle(container); // medidas finales
    canvas.style.width = containerStyle.width;
    canvas.style.height = containerStyle.height;
  }
}
