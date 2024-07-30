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
// con sketches muy grandes se hace imposible estar escribiendo "p." a cada rato.
//
// ,,,por eso,,,
// inventé este atajo que permite trabajar en al menos un sketch sin estar repitiendo,
// pero solo funciona una vez. todos los sketches extras seguirán necesitando "p." buu
//
// ,,,igualmente,,,
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
// tengo claro que solo es un parche, y por ahora me basta con que no se rompa.
// ojalá algún dia exista una solución "oficial". estaría lindo pq le daría soporte
// a muchas formas de uso posible q eran casi imposibles de implementar.
// 
// si o si es una mejor solucion que las instancias multiples "normales",
// pero me sigue pareciendo peor que trabajar con iframes. (depende del caso).
// igual... los iframes tampoco son perfectos, tienen varios problemitas.
// en otro tutorial los explicare con detalle
//
// escribí el código pa usarlo en ideas que tengo ahora mismo, no pa que sea perfecto. 
// cualquier retroalimentación me sirve muchísimoooo. mi ig es: @sepintangatos
//
// al dominio publico - cc0 - no es necesario citar autoria
//////////////////////////////

// se importan cosas para traer cosas desde de otros modulos
import Cosa from "./clases/Cosa.js"; // experimento para usar clases

// se exportan cosas para que otros modulos las puedan importar 
export let ocultarSketch1 = false; // experimento para conectarse con sketch1.js

// el código principal lo exporto como una funcion flecha que anida todo adentro,
// y q se la importa desde un modulo anterior (desde donde se crean las instancias).
// no es 100% necesario q sea asi, pero sí muy recomendable para mantener ordenado

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
  // la recibimos desde "afuera" (porque sí, porque asi esta hecho p5 por dentro)


  // ___________________________________________________________________________________

  const id = 0; // identificador del sketch. por comodidad. para usar en getElemtById
  let pruebaDeObjeto; // para experimento, no se usa en nada serio
  let bloquearClick = false; // para validacion en touchEnded
  

  // ___________________________________________________________________________________

  // # detalle importante: 
  // las funciones propias de p5 que esten en el nivel superior (globales en el módulo)
  // se tienen que escribir con "p." y se tienen que guardar como funciones anonimas
  p.setup = () => {
    
    const res = 500; // fraccionamiento interno. editable. ir probando fps
    const canvas = p.createCanvas(res, res); // # createCanvas necesita "p."
    canvas.parent("contenedor__sketch--" + id); // para meterlo en el div contenedor
    canvas.style('user-select', 'none'); // para quitar seleccion texto con doble click (opcional)
    canvas.style('touch-action', 'manipulation'); // para quitar zoom con doble touch (opcional)
    
  
    //////////////////////////////
    // # $ # $ # $ # $ # $ # $ # $
    // # ESTE ESSS !!! MI TRUCO 100% REAL NO FAKE:
    // ojo. se tiene que hacer despues de createCanvas
    // 
    // asignar manualmente las palabras reservadas (de p5) al contexto global (objeto window)
    for (let prop in p) { // recorre las propiedades de "p". por ejemplo: height, rect(), PI
      
      // por cada palabra vemos si es una funcion o no
      if (typeof p[prop] === "function") { // # en caso de serlo, hay que "darle contexto"
        window[prop] = p[prop].bind(p); // bind es de js más avanzado, sobre scope en .this
      }
      else {
        window[prop] = p[prop]; // # en caso que no lo sea, se agrega directamente
        // AQUI QUIERO AGREGAR ALGUNA SOLUCION PARA SEGUIR LOS CAMBIOS EN LOS VARLORES DE P
        // CREO Q SON LOS PROXYS ESO Q ANDO PENSANDO, PERO PA MAÑANA. BUENAS NOXYS
      }
    }
    //
    // # estamos accediendo directo al objeto window, como se hace normalmente cuando
    // se tratara de un solo sketch. por eso no se puede repetir este truco dos veces.
    // los demas sketches crean su propia instancia por lo q tienen nombres independiente.
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
    pruebaDeObjeto.consolameEsta("jaja saludos"); // parametros a un metodo
  };
  

  // ___________________________________________________________________________________

  // # draw es otra funcion propia de p5, y está en el nivel global
  p.draw = () => { // (asi que "p." y funcion anonima)

    // solucion provisional pq estoy cansado jefe. tengo q estudiar sobre proxy
    // para lograr hacer esto automaticamente desde el forIn edl setup
    let mouseIsPressed = p.mouseIsPressed;
    let frameCount = p.frameCount;
    let mouseX = p.mouseX;
    let mouseY = p.mouseY;

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
      mouseX > width * 0.073 &&
      mouseX < width * 0.203 &&
      mouseY > height * 0.112 &&
      mouseY < height * 0.166
    ) {
      cursor(HAND);
      fill((sin((frameCount - 30) / 51) + 2) * 125, 200, 150);
      if (mouseIsPressed) {
        fill((sin((frameCount - 30) / 51) + 2) * 125, 150, 100);
      }
    }
    else {
      cursor(ARROW);
      fill((sin((frameCount - 30) / 51) + 2) * 125, 180, 130);
    }
    rect(-width * 0.36, -height * 0.362, width / 8, height / 20);

    // texto 
    push();
    fill(255);
    noStroke();
    text("click!", -width * 0.36, -height * 0.36); // arriba
    text("y   \notro", 0, height * 0.36); // abajo
    pop();

    // experimento de usar clases
    if (ocultarSketch1) pruebaDeObjeto.displayMinimo(frameCount);
  }


  // ___________________________________________________________________________________

  // # touchEnded es una funcion propia de p5 (y es global)
  p.touchEnded = () => {
    console.log("E___________");

    // evitar doble touch
    // if (bloquearClick) return;
    // bloquearClick = true;
    // setTimeout(function(){
    //   bloquearClick = false;
    // }, 200);
    
    if ( // solucion provisional
      p.mouseX > width * 0.073 &&
      p.mouseX < width * 0.203 &&
      p.mouseY > height * 0.112 &&
      p.mouseY < height * 0.166
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
