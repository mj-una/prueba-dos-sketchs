//////////////////////////////
// organizar el codigo js en módulos es 100% opcional (pero muuuy recomendable)
// para hacerlo así es necesario agregarle el atributo type a la etiqueta html:
// <script type="module" src="./main.js"></script>

// desde el archivo main.js se llama a los fragmentos de código (modulos)
// según el orden que corresponda. y a su vez, desde esos archivos también
// se llaman a otros módulos a medida que van siendo necesarios

// °°tutorial. sobre ecmascript modules:
// https://lenguajejs.com/javascript/modulos/que-es-esm/
// https://lenguajejs.com/javascript/modulos/export/
// https://lenguajejs.com/javascript/modulos/import/
// "¿Qué son los módulos (ESM)?" - paginas por Manz.dev

import { sketch0, listoSketch0 } from "./sketches/sketch0.js";
import { sketch1, listoSketch1 } from "./sketches/sketch1.js";


// ESTAS 2 LINEAS SON FUNDAMENTALESSS
let sk0 = new p5(sketch0); // estamos creando nuevas instancias del objeto p5
let sk1 = new p5(sketch1); // y cada sketch tiene la suya propia, independiente

// es importante el orden exacto en que se crean las instancias
// pq determina cual sketch estara mas "arriba" en el renderizado
// y pq afecta al id del elemento <canvas> q se crea. ahora tenemos:
//
//  <canvas id="defaultCanvas0" class="p5Canvas" etc... ></canvas>
//  <canvas id="defaultCanvas1" class="p5Canvas" etc... ></canvas>
//
// estos id son los que se capturan desde windowResized con getElementById.
// el primero siempre es defaultCanvas0, luego se va incrementando el numero

// iniciar
verificarListos(); // verificar si los sketches estan listos
function verificarListos() {
	if (listoSketch0 && listoSketch1) {
			sk0.loop();
			sk1.loop();
	}
	else {
			// volver a verificar después de 1 ms
			setTimeout(verificarListos, 1); // recursion
	}
}


//////////////////////////////
// ojo. en la consola aparecerá esta advertencia:
//
//  p5.js seems to have been imported multiple times.
//  Please remove the duplicate import
//
// es sobre rendimiento, pq es raro q haya mas de una ejecucion de la librería,
// pero en este caso está bien, pq hay más de una instancia (ver sketch0.js)
