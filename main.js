// esto es opcional, pero muuuy recomendable

import { sketch0 } from "./sketches/sketch0.js";
import { sketch1 } from "./sketches/sketch1.js";

new p5(sketch0);
new p5(sketch1);

// en vez de crear y ejecutar cada instancia en el mimso archivo
// es mejor asi, para tener control sobre el orden exacto, q no es
// solo por toc, sino q tambien afecta el id del canvas q se crea.
// se llaman "defaultCanvas" + numero de ejecucion. ahora tenemos:
//
//  <canvas id="defaultCanvas0" class="p5Canvas" etc... ></canvas>
//  <canvas id="defaultCanvas1" class="p5Canvas" etc... ></canvas>
//
// (y esos id son muy importantes pq se usan desde windowResized).
// 
// en la consola aparecerá esta advertencia:
//
//  p5.js seems to have been imported multiple times.
//  Please remove the duplicate import
//
// pero es normal, lo dice pq se confunden las instancias.
// ver los comentarios de sketch0.js