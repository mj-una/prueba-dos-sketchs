// esto es solamente de prueba. para ver cómo importar una clase
// y revisar si no se rompe lo de la instancia trucada del sketch0.
// para los otros sketches tambien se puede trabajar con clases
// pero hay que tener ojo con el tema del scope y de "p."

export default class Cosa {

  // metodo contructor
  // se ejecuta cuando se crea un objeto (en la linea "new Cosa()")
  constructor(_a, _b) {
    this.a = _a;
    this.b = _b;
  }
 
  // metodo 1
  // para probar si funcionan las cosas basicas como .this, parametros y palabras de p5
  consolameEsta(_c, _d) {

    // a ver si funcionan las cosas de p5 aqui ? ? ?
    let rdm = randomGaussian(50, 0.5) * HALF_PI; // es 78 aprox 

    // usare templates strings (con `backticks`) por comodidad
    console.log(`Prueba: ${this.a} ${this.b}`); // valores locales
    console.log(`Prueba: ${rdm}`); // siii, funcionaaannnnnn
    console.log(`Prueba: ${_c} ${_d}`); // valores por parametros
  }

  // metodo 2
  // para probar llamandolo desde el draw, cómo integra el dibujo
  // aqui tuve un primer problema, q es relacionado a propiedades de p5 q se actualizan en draw
  // como frameCount, q terminé pasandola como parametro. pendiente para resolver luego (proxy?)
  displayCualquierCosa() {
    
    // circulo
    push();
    stroke(255);
    fill(frameCount % 255, 255 - frameCount % 255, 148.75);
    circle(width * 0.38, height * 0.408, width / 20);
    pop();

    // firma
    push();
    let nums = ["2", "5", "O", "2", "5"];
    let posi = Math.floor(map(frameCount % 255, 0, 255, 0, 5));
    text(nums[posi], width * 0.38, height * 0.41);
    pop();
    
    // esto es muy muy genial! me emozzzionaaaaa! anda perfecto :)
    // incluso se puede usar frameCount que lo asignamos en el draw.
    // lo interesante es que se pueden instanciar clases desde sketch0
    // y usarlas como lo hariamos normalmente, con todas las utilidades
    // de p5. esto no era algo obvio q pasara, pq el objeto window bien
    // podria haber tenido otros comporamientos con el scope de modulos
    // y/o de clases. entonces sí, se pueden hacer juegos complejosssss
    // <3 <3 <3 gracias por tanto javascript <3 <3 <3
  }
}
