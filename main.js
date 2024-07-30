//////////////////////////////
// organizar el codigo js en módulos es 100% opcional (pero muuuy recomendable)
// para hacerlo así es importante agregarle el atributo type en la etiqueta html:
// <script type="module" src="./main.js"></script>

// desde el main.js se llama a los primeros fragmentos de códigos (modulos)
// según el orden que corresponda. y a su vez, desde esos archivos también
// se llaman a otros módulos a medida que van siendo necesarios

// un tutorial para aprender más sobre ecmascript modules:
// https://lenguajejs.com/javascript/modulos/que-es-esm/ (son tres paginas,
// "intro", "exportar", "importar". al inicio y final hay botones pa navegar)

import { sketch0 } from "./sketches/sketch0.js";
import { sketch1 } from "./sketches/sketch1.js";

new p5(sketch0);
new p5(sketch1);

// es importante el orden exacto en que se crean las instancias (new p5)
// pq afectará al id del elemtos <canvas> q se crea. ahora tenemos:
//
//  <canvas id="defaultCanvas0" class="p5Canvas" etc... ></canvas>
//  <canvas id="defaultCanvas1" class="p5Canvas" etc... ></canvas>
//
// (estos id son los que se capturan desde windowResized)


//////////////////////////////
// ojo. en la consola aparecerá esta advertencia:
//
//  p5.js seems to have been imported multiple times.
//  Please remove the duplicate import
//
// es sobre rendimiento. lo dice pq hay mas de una llamada a la librería,
// cosa que en este caso está bien, pq hay más de una instancia (ver sketch0.js)
