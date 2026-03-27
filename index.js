import fs from 'fs';
import dayjs from 'dayjs';
import Texto from './models/texto.js';


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


console.log("EJERCICIO 5");
function buscarProducto(nombre) {
    try {
        const data = fs.readFileSync('productos.json', 'utf8');
        const productos = JSON.parse(data);
        const encontrado = productos.find(p => p.nombre && p.nombre.toLowerCase() === String(nombre).toLowerCase());
        if (encontrado) {
            return { nombre: encontrado.nombre, precio: encontrado.precio, existe: true };
        } else {
            return { nombre, precio: null, existe: false };
        }
    } catch (err) {
        console.error('Error en buscarProducto:', err);
        return { nombre, precio: null, existe: false };
    }
}
console.log(buscarProducto('Mouse'));
console.log(buscarProducto('noExiste'));
console.log("\n\n");


console.log("EJERCICIO 6");
function archivoCSV() {
    fs.readFile('productos.json', 'utf8', (err, data) => {
        if (err) throw err;
        const productos = JSON.parse(data);
        let csv = 'nombre,precio\n';
        productos.forEach(prod => {
            csv += `${prod.nombre},${prod.precio}\n`;
        });
        fs.writeFile('productos.csv', csv, (err) => {
            if (err) throw err;
            console.log('Archivo CSV creado correctamente.');
            const data = fs.readFileSync('productos.csv', 'utf8');
            console.log(data);
        });
    });
}
archivoCSV();
console.log("\n\n");


console.log("EJERCICIO 7");
function temporizador() {
    let contador = 0;
    const intervalo = setInterval(() => {
        contador++;
        console.log(contador);
        if (contador === 10) {
            clearInterval(intervalo);
            console.log("Fin del contador");
        }
    }, 1000);
}
temporizador();
console.log("\n\n");


console.log("EJERCICIO 8");
function analizarTexto(texto) {
    const caracteres = texto.length;
    let cant = texto.trim().split(/\s+/);
    let palabras = cant.length;
    const vocales = (texto.match(/[aeiou]/gi)).length;
    const consonantes = (texto.match(/[bcdfghjklmnpqrstvwxyz]/gi)).length;
    return new Texto(caracteres, palabras, vocales, consonantes);
}
const texto = analizarTexto("Hola Mundo");
console.log(`Caracteres: ${texto.caracteres}\nPalabras: ${texto.palabras}\nVocales: ${texto.vocales}\nConsonantes: ${texto.consonantes}`);
console.log("\n\n");


console.log("EJERCICIO 9");
function validarPassword(password) {
    let passwordBien = false;
    if (password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password)) {
        passwordBien = true;
    }
    return passwordBien;
}
console.log(validarPassword('Abcdef1g'));
console.log(validarPassword('abcdef1g'));
console.log(validarPassword('Abcdefgh'));
console.log(validarPassword('Ab1g'));
console.log("\n\n");