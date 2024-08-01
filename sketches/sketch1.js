// este sketch (y cualquier otro que se quiera ir agregando despues)
// se trabaja como instancia multiple "normal", que es una paja.
// ejemplo: https://p5js.org/es/examples/advanced-canvas-rendering-multiple-canvases/
// (cualquier palabra q sea de p5 tiene que estar escrita con "p.")

import { ocultarSketch1 } from "./sketch0.js"; // flag de visibilidad. depende de sketch0.js

export let listoSketch1 = false; // para inicio desde main.js

// todo el bloque se exporta en una funcion flecha
export const sketch1 = (p) => { // "p" es la instancia de ~este~ sketch

  const id = 1; // identificador sketch
  let dejavuBoldCond; // fuente

  // frecuencia (afecta seno de diametro del circulo)
  // tendria que haber hecho el calculo para sincronizar con frameCount % 255
  let f = 40.78; // me dio flojera pensar. valor hardcodeado viendo la consola

  // otra forma de comunicacion con sketch0.js # canal externo
  sketch1.getFrameRate = () => p.frameRate();

  // carga fuente
  p.preload = () => {
    dejavuBoldCond = p.loadFont("./fonts/DejaVuSans-Bold.ttf");
  }

  // inicio
  p.setup = () => {
    
    // lienzo
    let res = 500; // resolucion interna
    const canvas = p.createCanvas(res, res);
    canvas.parent("contenedor__sketch--" + id); // insertar en div contenedor
    canvas.style("user-select", "none"); // quitar seleccion de texto
    canvas.style("touch-action", "manipulation"); // quitar zoom

    // responsive asincrono
    setTimeout( function() { 
      p.windowResized();
      listoSketch1 = true;
    }, 0);

    // generalidades
    p.stroke(255);
    p.strokeWeight(p.width / 180);
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont(dejavuBoldCond);
    p.noLoop(); // inicia pausado
    p.frameRate(30); // vel maxima
  }

  // dibujos
  p.draw = () => {

    // fondo
    p.clear(); // equivalente a background, pero borra a transparente

    // ejemplo de comunicación entre distintas instancias
    // en este caso, usamos una variable que depende del sketch0
    if (ocultarSketch1) return; // salida temprana (desercion,,,)
    
    // origen
    p.translate(p.width / 2, p.height / 2);
    p.rotate(-0.165);    

    // estelas
    p.noFill();
    for (let i = 0; i < 8; i++) {
      p.circle(0, 0, (p.sin((p.frameCount - 10 * i) / f) + 2) * (70 + i * 4));
    }

    // circulo color
    p.fill(p.frameCount % 255, (255 - p.frameCount % 255) * 0.8, 185);
    p.circle(0, 0, (p.sin(p.frameCount / f) + 2) * 70);

    // progresismo
    let unoColor = 255;
    if (p.frameCount % 255 >= 210) {
      let alpha = map(p.frameCount % 255, 210, 254, 0, 230);
      if (p.frameCount % 2 == 0) unoColor = 255;
      else { // parpadeo sombra
        p.push();
        p.resetMatrix();
        p.noStroke();
        p.fill(0, alpha * 0.4);
        p.rect(0, 0, p.width, p.height);
        p.pop();
        unoColor = 255 - alpha;
      }
      p.fill(255, alpha);
      p.circle(0, 0, (p.sin(p.frameCount / f) + 2) * 70);
    }

    // parpadeo final
    if (p.frameCount % 255 >= 252) {
      p.push();
      p.fill(255);
      p.resetMatrix();
      p.rect(0, 0, p.width, p.height);
      p.pop();
      unoColor = 255;
    }

    // texto
    p.push();
    p.fill(unoColor);
    p.noStroke();
    p.textSize((p.sin(p.frameCount / f) + 2) * 25);
    p.text("UNO", 0, 0);
    p.pop();
  }

  // tutorial responsive, ejemplo 2
  p.windowResized = () => {
    const canv = document.getElementById("defaultCanvas" + id);
    const cont = document.getElementById("contenedor__sketch--" + id);
    setTimeout( function() { // hacer asincrono
      const contAdaptado = window.getComputedStyle(cont); // medidas finales
      canv.style.width = contAdaptado.width;
      canv.style.height = contAdaptado.height;
    }, 0);
  }
}
