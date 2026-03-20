import fs from 'fs';
import dayjs from 'dayjs';


console.log("EJERCICIO 1");
function ej1() {
    try {
        const data = fs.readFileSync('productos.json', 'utf8');
        console.log(data);
    } catch (err) {
        console.error('Error al leer:', err);
    }
}
ej1();
console.log("\n\n");


console.log("EJERCICIO 2");
function agregarProducto(nombre, precio) {
    try {
        const data = fs.readFileSync('productos.json', 'utf8');
        const productos = JSON.parse(data);
        const nextId = productos.reduce((max, p) => Math.max(max, p.id || 0), 0) + 1;
        const nuevo = { id: nextId, nombre, precio: Number(precio) };
        productos.push(nuevo);
        fs.writeFileSync('productos.json', JSON.stringify(productos, null, 2), 'utf8');
        console.log('Producto agregado:', nuevo);
        return nuevo;
    } catch (err) {
        console.error('Error al agregar producto:', err);
        throw err;
    }
}
agregarProducto('LOL', 10.99);
console.log("\n\n");


console.log("EJERCICIO 3");
function ej3() {
    console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));
}
ej3();
console.log("\n\n");


console.log("EJERCICIO 4");
async function obtenerPais(countryName) {
    try {
        const respuesta = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`);
        const datos = await respuesta.json();
        const c = Array.isArray(datos) && datos.length ? datos[0] : datos;
        if (!c) {
            console.log('País: Desconocido\nCapital: Desconocido\nRegión: Desconocido\nPoblación: Desconocido');
            return;
        }
        const nombre = c.name && (typeof c.name === 'string' ? c.name : c.name.common || c.name.official) || countryName || 'Desconocido';
        const capital = Array.isArray(c.capital) && c.capital.length ? c.capital[0] : c.capital || 'Desconocido';
        const region = c.region || c.regionName || c.continent || 'Desconocido';
        const population = c.population ?? c.poblacion ?? 'Desconocido';
        console.log(`País: ${nombre}\nCapital: ${capital}\nRegión: ${region}\nPoblación: ${population}`);
    } catch (error) {
        console.error('Error:', error);
        console.log('País: Desconocido\nCapital: Desconocido\nRegión: Desconocido\nPoblación: Desconocido');
    }
}
obtenerPais('Spain');