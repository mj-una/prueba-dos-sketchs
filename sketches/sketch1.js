// este sketch (y cualquier otro que se quiera ir agregando despues)
// se trabaja como instancia multiple "normal", que es una paja.
// ejemplo: https://editor.p5js.org/caminofarol/sketches/r609C2cs
// (cualquier palabra q sea de p5 tiene que estar escrita con "p.")

// flag que determina visibilidad de este dibujo
import { ocultarSketch1 } from "./sketch0.js";

// todo el bloque se exporta en una funcion flecha
export const sketch1 = (p) => { // "p" es la instancia del sketch

  const id = 1; // identificador sketch

  // frecuencia (afecta seno de diametro del circulo)
  // tendria que haber hecho el calculo para sincronizar con frameCount % 255
  let f = 40.78; // me dio flojera pensar. valor hardcodeado viendo la consola

  // inicio
  p.setup = () => {
    
    // lienzo
    let res = 500; // resolucion interna
    const canvas = p.createCanvas(res, res);
    canvas.parent("contenedor__sketch--" + id); // insertar en div contenedor
    canvas.style('user-select', 'none'); // quitar seleccion de texto
    canvas.style('touch-action', 'manipulation'); // quitar zoom
    p.windowResized(); // responsive

    // generalidades
    p.stroke(255);
    p.strokeWeight(p.width / 180);
    p.textAlign(CENTER, CENTER);
    p.textFont("system-ui");
    p.textStyle(BOLD);
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
      p.circle(0, 0, (sin((p.frameCount - 10 * i) / f) + 2) * (70 + i * 4));
    }

    // circulo color
    p.fill(p.frameCount % 255, (255 - p.frameCount % 255) * 0.8, 185);
    p.circle(0, 0, (sin(p.frameCount / f) + 2) * 70);

    // progresismo jaja
    let unoColor = 255;
    if (p.frameCount % 255 >= 180) {
      let alpha = map(p.frameCount % 255, 180, 254, 0, 260);
      p.fill(255, alpha);
      p.circle(0, 0, (sin(p.frameCount / f) + 2) * 70);
      unoColor = 255 - alpha; // */
    }

    // parpadeo
    if (p.frameCount % 255 >= 251) {
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
    p.textSize((sin(p.frameCount / f) + 2) * 25);
    p.text("UNO", 0, p.width / 92);
    p.pop();
  }

  // tutorial responsive, ejemplo 2
  p.windowResized = () => {
    const container = document.getElementById("contenedor__sketch--" + id);
    const canvas = document.getElementById("defaultCanvas" + id);
    const containerStyle = window.getComputedStyle(container);
    canvas.style.width = containerStyle.width;
    canvas.style.height = containerStyle.height;
  }
}
