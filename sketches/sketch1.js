// este sketch (y cualquier otro mas que se quiera agregar despues)
// se trabaja como instancia multiple normal, que es tremenda paja.
// ejemplo: https://editor.p5js.org/caminofarol/sketches/r609C2cs
// (cualquier cosa q sea de p5 tiene que estar escrita con "p.")

// todo el bloque se exporta en una funcion flecha
export const sketch1 = (p) => { // "p" es convencion, se puede ser cualquiera

  const id = 1; // identificador sketch

  p.setup = () => {
    const canvas = p.createCanvas(500, 500);
    canvas.parent("contenedor__sketch--" + id);
    p.windowResized(); // responsive
    p.stroke(255);
    p.strokeWeight(p.width / 180);
    p.textAlign(CENTER, CENTER);
    p.textStyle(BOLD);
  };

  p.draw = () => {
    p.clear();
    p.translate(p.width / 2, p.height / 2);
    
    p.noFill();
    for (let i = 0; i < 8; i++) {
      p.circle(0, 0, (sin((p.frameCount - 10 * i) / 50) + 2) * (70 + i * 4));
    }

    p.fill(p.frameCount % 255, 200, 150);
    p.circle(0, 0, (sin(p.frameCount / 50) + 2) * 70);

    p.push();
    p.fill(255);
    p.noStroke();
    p.textSize((sin(p.frameCount / 50) + 2) * 25);
    p.text("uno", 0, 0);
    p.pop();
  };

  p.windowResized = () => {
    const container = document.getElementById("contenedor__sketch--" + id);
    const canvas = document.getElementById("defaultCanvas" + id);
    const containerStyle = window.getComputedStyle(container);
    canvas.style.width = containerStyle.width;
    canvas.style.height = containerStyle.height;
  };
};
