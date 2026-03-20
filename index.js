import fs from 'fs';


function ej1() {
    fs.readFile('productos.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer:", err);
            return;
        }
        console.log(data);
    });
}
ej1();