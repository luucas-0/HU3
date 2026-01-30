
// TASK 2: Selección e Inspección

const inputNota = document.getElementById("inputNota"); // Método 1
const btnAgregar = document.querySelector("#btnAgregar"); // Método 2
const listaUl = document.getElementById("listaNotas");

console.log("Referencias cargadas:", { inputNota, btnAgregar, listaUl });

// TASK 5: Arreglo en memoria para persistencia
let notas = [];


// TASK 5: Carga inicial desde Local Storage

window.addEventListener("DOMContentLoaded", () => {
    const notasGuardadas = localStorage.getItem("notas");
    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);
        console.log(`Se cargaron ${notas.length} notas desde Local Storage.`);
        renderizarNotas();
    }
});


// TASK 3: Agregar Notas

btnAgregar.addEventListener("click", () => {
    const texto = inputNota.value.trim();

    // Validación básica
    if (texto === "") {
        alert("¡Error! La nota no puede estar vacía.");
        console.error("Intento de agregar nota vacía.");
        return;
    }

    // Actualizar arreglo y guardar
    notas.push(texto);
    actualizarStorage();

    // Renderizar
    crearElementoNota(texto, notas.length - 1);

    // Limpiar input y enfocar
    inputNota.value = "";
    inputNota.focus();
    console.log("Nota agregada correctamente.");
});


// TASK 4: Eliminar Notas

function eliminarNota(indice) {
    // Eliminar del arreglo
    const notaEliminada = notas.splice(indice, 1);
    
    actualizarStorage();
    renderizarNotas(); // Volvemos a dibujar para mantener los índices sincronizados
    
    console.log(`Se eliminó la nota: "${notaEliminada}"`);
}


// Funciones de Apoyo (DOM API)


function crearElementoNota(texto, indice) {
    const li = document.createElement("li");
    li.className = "nota-item";
    li.textContent = texto; // Modifica contenido con textContent

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "delete";
    
    // Al hacer click en eliminar del <li>
    btnEliminar.onclick = () => eliminarNota(indice);

    li.appendChild(btnEliminar); // Insertar con appendChild
    listaUl.appendChild(li);
}

function renderizarNotas() {
    listaUl.innerHTML = ""; // Limpiar lista actual
    notas.forEach((nota, index) => {
        crearElementoNota(nota, index);
    });
}

function actualizarStorage() {
    localStorage.setItem("notas", JSON.stringify(notas));
}