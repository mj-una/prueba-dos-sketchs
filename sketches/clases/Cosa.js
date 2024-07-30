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

    // a ver si funcionan las cosas de p5 aqui ? ? ?
    let rdm = randomGaussian(50, 0.5) * HALF_PI; // es 78 aprox 

    // usare templates strings (con `backticks`) por comodidad
    console.log(`Prueba: ${this.a} ${this.b}`);
    console.log(`Prueba: ${rdm}`); // siii, funcionaaa
    console.log(`Prueba: ${_c}`);
  }

  displayMinimo(_frameCount) {
    
    // firma
    push();
    let nums = [2, 5, 0];
    textSize(height / 30);
    text(nums[(Math.floor(_frameCount * 0.05)) % 3], width * 0.38, height * 0.38);
    pop();
    
    // esto es muy muy genial! me emozzzionaaaaa! anda perfecto :)
    // lo interesante es que se pueden instanciar clases desde sketch0
    // y usarlas como lo hariamos normalmente, con todas las utilidades
    // de p5. esto no era algo obvio q pasara, pq el objeto window bien
    // podria haber tenido otros comporamientos con el scope de modulos
    // y/o de clases. entonces sí, se pueden hacer juegos complejosssss
    // <3 <3 <3 gracias por tanto javascript <3 <3 <3
  }
}
