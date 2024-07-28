// esto es solamente de prueba. para ver cómo importar una clase
// y revisar so no se rompe lo de la instancia trucada del sketch0.
// para los otros sketches no se puede trabajar con clases tan facil
// porque entra el tema del scope y es un caos (ademas del p. a todo)

export default class Cosa {

  constructor(_a, _b) {
    this.a = _a;
    this.b = _b;
  }
 
  consolameEsta(_c) {

    // a ver como funcionan las cosas de p5 aqui
    let rdm = randomGaussian(50, 3) * HALF_PI; // será 78 aprox 

    console.log(`Prueba: ${this.a} ${this.b}`);
    console.log(`Prueba: ${rdm}`);
    console.log(`Prueba: ${_c}`);
  }

  displayMinimo() {

    // para devolver (0, 0) a la esquina sup izq
    resetMatrix();

    // el mini rectangulo verde :)
    fill(sin(((frameCount - 10) / 50) + 2) * 80, 200, 105);
    rect(height / 20, height / 20, height / 28, height / 20);
    
    // esto es muy muy genial. me emosionaaaaa. todo funciona perfecto. 
    // incluso se puede usar frameCount, q lo declaramos en el draw!!!
    // lo interesante es que se pueden instanciar clases desde sketch0
    // y usarlas como lo hariamos normalmente, con todas las utilidades
    // de p5. esto no era algo obvio q pasara, pq el objeto window bien
    // podria haber tenido otros comporamientos con el scope de modulos
    // y/o de clases. entonces se puede hacer un juego complejooooooooo
    // y agregarle mini sketchs extras para animaciones independientes
    // o para manejar eventos especiales (p.ej una capa para el touch).
    // gracias por tanto javascript <3 <3 <3
  }


}