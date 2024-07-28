// sketch principal. el que tenga mas lineassssssssss
// o desde el que se vaya a importar mas clases o codigo de p5

import Cosa from "./clases/Cosa.js"; // un experimento q hice

// el modulo completo se exporta como una funcion flecha que anida todo adentro,
// y se le importa desde un modulo anterior (desde donde se crean las instancias).
// no es 100% necesario q sea asi, pero si muy recomendable para mantener ordenado

export const sketch0 = (p) => { // el objeto "p" se refiere a la instancia de p5

  const id = 0; // identificador sketch. por comodidad. para usar en getElemtById
  let pruebaDeObjeto; // para experimento, no se usa en nada serio

  // de aqui para abajo es como escribir un sketch cualquieraaaaa
  // salvo por algunos detalles que estan comentados con # (buscarlos)
  p.setup = () => {
    
    const canvas = p.createCanvas(500, 500); // # createCanvas necesita "p."
    canvas.parent("contenedor__sketch--" + id); // para meterlo en el div contenedor
    
    // # ESTE ESSS !!! MI TRUCO 100% REAL NO FAKE:
    // asignar las funciones de p5 al contexto global
    for (let prop in p) { // recorre las propiedades de "p"
      if (typeof p[prop] === "function") {
        window[prop] = p[prop].bind(p); // # bind es algo medio complejo sobre el scope
      }
      else {
        window[prop] = p[prop];
        // # en esencia lo q se hace es agregar los elementos propios de p5 directamente
        // al objeto window (por eso no se puede repetir este truco). los demas sketchs
        // crean su propia instancia por lo q obtienen un namenspace independiente
      }
    }

    // # con este truco se puede trabajar el sketch sin estar poniendo "p." en cada linea
    // pero solo funciona para un sketch. los demas sí necesitan el "p." (q es una paja)
    // igual, sirve mucho tener el codigo principal aca, por ejemplo un juego completo
    // que tuviera muchas lineas. y luego agregar otros sketchs en modulos aparte
    // (pero que sean cortos, sino se vuelve inmanejable el tema de las "p.")

    // # no habia visto nunca nada parecido. escribi todo yo, con (mucha) ayuda de chat gpt.
    // si o si es una mejor solucion que las instancias multiples normales, pero sigue
    // siendo mas logico trabajar con iframes. pero... los iframes tampoco son perfectos.
    // en la proxima prueba explicare algunos problemitas q tienen

    windowResized(); // para hacerlo responsive al canvas

    strokeWeight(p.width / 180);
    textAlign(CENTER, CENTER);
    textSize(height / 20);
    textStyle(BOLD);

    // experimento de usar clases
    pruebaDeObjeto = new Cosa("hola", "wachin");
    pruebaDeObjeto.consolameEsta("jaja saludos");
  };
  
  // # detalle: las funciones propias de p5 que esten en el nivel superior (globales)
  // se tienen que escribir con "p." y se tiene que usar la sintaxis de funcion flecha
  p.draw = () => {
    frameCount = p.frameCount; // # detalle: no se pq no permite asignarlo en setup

    translate(width / 2, height / 2);
    clear();

    noFill();
    stroke(255);
    
    // circulos en espiral del fondo
    for (let i = 100; i > 0 ; i--) {
      fill(frameCount % 255, 255 - frameCount % 255, 255 - (255 / 100) * i);
      circle(
        sin((frameCount - 5 * i) / 25 * (i / 97)) * height / 3,
        cos((frameCount - 5 * i) / 25 * (i / 97)) * height / 3,
        (height / 50) * i
      );
    }

    // texto fijo abajo
    push();
    fill(255);
    noStroke();
    text("y   \notro", 0, height * 0.36);
    pop();

    // experimento de usar clases
    pruebaDeObjeto.displayMinimo();
  };

  p.windowResized = () => {
    const container = document.getElementById("contenedor__sketch--" + id);
    const canvas = document.getElementById("defaultCanvas" + id);
    const containerStyle = window.getComputedStyle(container); // medidas finales
    canvas.style.width = containerStyle.width;
    canvas.style.height = containerStyle.height;
  };
};
