
// Creación del objeto de productos

const productos = {
    prod_001: { id: 1, nombre: "Laptop Pro", precio: 1200 },
    prod_002: { id: 2, nombre: "Mouse Óptico", precio: 25 },
    prod_003: { id: 3, nombre: "Monitor Curvo", precio: 300 }
};


// Uso de Set

const idsRepetidos = [1, 2, 2, 3, 1, 4, 5, 5];
const setProductosUnicos = new Set(idsRepetidos);

setProductosUnicos.add(6);      // Agregamos el 6
setProductosUnicos.delete(1);   // Eliminamos el 1


// Creación de un Map

const mapaCategorias = new Map();
mapaCategorias.set("Computadoras", "Laptop Pro");
mapaCategorias.set("Accesorios", "Mouse Óptico");
mapaCategorias.set("Pantallas", "Monitor Curvo");


// Validación

const esProductoValido = (p) => {
    return p && p.id && p.nombre && typeof p.precio === 'number';
};


// Iteración e Impresión


console.log("Objeto (for...in) ---");
for (const propiedad in productos) {
    const p = productos[propiedad];
    if (esProductoValido(p)) {
        console.log(`Propiedad: ${propiedad} -> Producto: ${p.nombre} ($${p.precio})`);
    }
}

console.log("\n Set (for...of) ---");
// IMPORTANTE: Debe ser "of", no "de"
for (const id of setProductosUnicos) {
    console.log(`ID Único en el Set: ${id}`);
}

console.log("\n (forEach) ---");
mapaCategorias.forEach((valor, clave) => {
    console.log(`Categoría: ${clave} | Producto: ${valor}`);
});

console.log("\n-Métodos de Object ---");
console.log("Keys:", Object.keys(productos));
console.log("Values:", Object.values(productos));