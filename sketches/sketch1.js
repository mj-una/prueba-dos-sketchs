// este sketch (y cualquier otro mas que se quiera agregar despues)
// se trabaja como instancia multiple "normal", que es tremenda paja.
// ejemplo: https://editor.p5js.org/caminofarol/sketches/r609C2cs
// (cualquier palabra q sea de p5 tiene que estar escrita con "p.")

// flag para visibilidad de este dibujo
import { ocultarSketch1 } from "./sketch0.js";

// todo el bloque se exporta en una funcion flecha
export const sketch1 = (p) => { // "p" es convencion, se puede ser cualquiera

  const id = 1; // identificador sketch

  let f = 50; // frecuencia (pendiente: ajustar para sincronizar con framecount % 255)

  // inicio
  p.setup = () => {
    
    // lienzo
    const canvas = p.createCanvas(500, 500);
    canvas.parent("contenedor__sketch--" + id);
    p.windowResized(); // responsive

    // generalidades
    p.stroke(255);
    p.strokeWeight(p.width / 180);
    p.textAlign(CENTER, CENTER);
    p.textFont("system-ui");
    p.textStyle(BOLD);
  };

  // dibujos
  p.draw = () => {

    // fondo
    p.clear(); // equivalente a background, pero borra a transparente

    // # ejemplo de comunicación entre distintas instancias
    // en este caso, usamos una variable que depende del sketch0
    if (ocultarSketch1) {
      
      return; // salida temprana (desercion,,,)
    }
    
    // origen
    p.translate(p.width / 2, p.height / 2);
    p.rotate(-0.165);    

    // estelas
    p.noFill();
    for (let i = 0; i < 8; i++) {
      p.circle(0, 0, (sin((p.frameCount - 10 * i) / f) + 2) * (70 + i * 4));
    }

    // circulo color
    p.fill(p.frameCount % 255, 200, 150);
    p.circle(0, 0, (sin(p.frameCount / f) + 2) * 70
    );

    // texto
    p.push();
    p.fill(255);
    p.noStroke();
    p.textSize((sin(p.frameCount / f) + 2) * 25);
    p.text("UNO", 0, +p.width / 92);
    p.pop();
  };

  // responsive
  p.windowResized = () => {
    const container = document.getElementById("contenedor__sketch--" + id);
    const canvas = document.getElementById("defaultCanvas" + id);
    const containerStyle = window.getComputedStyle(container);
    canvas.style.width = containerStyle.width;
    canvas.style.height = containerStyle.height;
  };
};
