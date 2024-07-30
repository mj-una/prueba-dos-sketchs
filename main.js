//////////////////////////////
// organizar el codigo js en módulos es 100% opcional (pero muuuy recomendable)
// para hacerlo así es necesario agregarle el atributo type a la etiqueta html:
// <script type="module" src="./main.js"></script>

// desde el archivo main.js se llama a los fragmentos de código (modulos)
// según el orden que corresponda. y a su vez, desde esos archivos también
// se llaman a otros módulos a medida que van siendo necesarios

// un tutorial para aprender sobre ecmascript modules:
// https://lenguajejs.com/javascript/modulos/que-es-esm/ (son tres paginas,
// "intro", "exportar", "importar". al inicio y final hay botones pa navegar)

import { sketch0 } from "./sketches/sketch0.js";
import { sketch1 } from "./sketches/sketch1.js";


// ESTAS 2 LINEAS SON FUNDAMENTALESSS
new p5(sketch0); // estamos creando nuevas instancias del objeto p5
new p5(sketch1); // y cada sketch tiene la suya propia, independiente

// es importante el orden exacto en que se crean las instancias
// pq determina cual sketch estara mas "arriba" en el renderizado
// y pq afecta al id del elemento <canvas> q se crea. ahora tenemos:
//
//  <canvas id="defaultCanvas0" class="p5Canvas" etc... ></canvas>
//  <canvas id="defaultCanvas1" class="p5Canvas" etc... ></canvas>
//
// estos id son los que se capturan desde windowResized con getElementById.
// el primero siempre es defaultCanvas0, luego se va incrementando el numero


//////////////////////////////
// ojo. en la consola aparecerá esta advertencia:
//
//  p5.js seems to have been imported multiple times.
//  Please remove the duplicate import
//
// es sobre rendimiento. lo dice pq hay mas de una llamada a la librería,
// cosa que en este caso está bien, pq hay más de una instancia (ver sketch0.js)
