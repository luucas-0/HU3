/**
 * PROYECTO FINAL - MÓDULO 3
 * Estudiante: Coder
 * Tecnologías: DOM, LocalStorage, Fetch API (CRUD), JSON Server
 */

// 1. Configuración y Referencias
const API_URL = 'http://localhost:3000/tareas';
const inputTarea = document.getElementById('inputTarea');
const btnAgregar = document.getElementById('btnAgregar');
const btnSincronizar = document.getElementById('btnSincronizar');
const listaTareasUI = document.getElementById('listaTareas');

// Estructura de datos global
let tareas = [];

// ==========================================
// PERSISTENCIA: Cargar datos al iniciar
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const storage = localStorage.getItem('tareas_cache');
    if (storage) {
        tareas = JSON.parse(storage);
        renderizarDOM();
        console.log("INFO: Datos recuperados de LocalStorage");
    }
    // Opcional: Sincronizar con el servidor automáticamente al cargar
    obtenerDatosServidor();
});

// ==========================================
// FETCH API: Operaciones CRUD
// ==========================================

// GET - Obtener datos
async function obtenerDatosServidor() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("No se pudo conectar al servidor");
        const datosServidor = await res.json();
        
        // Sincronizamos: lo que diga el servidor es la verdad absoluta
        tareas = datosServidor;
        actualizarCacheYDOM();
        console.log("GET: Datos sincronizados desde JSON Server", datosServidor);
    } catch (err) {
        console.error("ERROR GET:", err.message);
    }
}

// POST - Crear dato
async function postServidor(nuevaTarea) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaTarea)
        });
        const data = await res.json();
        console.log("POST: Guardado en db.json", data);
    } catch (err) {
        console.error("ERROR POST:", err);
    }
}

// DELETE - Eliminar dato
async function deleteServidor(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) console.log(`DELETE: ID ${id} eliminado del servidor`);
    } catch (err) {
        console.error("ERROR DELETE:", err);
    }
}

// ==========================================
// DOM & INTERACCIÓN
// ==========================================

btnAgregar.addEventListener('click', () => {
    const texto = inputTarea.value.trim();

    // Validación
    if (!texto) {
        console.error("VALIDACIÓN: El campo está vacío");
        alert("Escribe una tarea válida");
        return;
    }

    // Crear objeto (usamos string para el ID para compatibilidad con JSON Server)
    const nuevaTarea = {
        id: Date.now().toString(),
        texto: texto
    };

    // Actualizar Local
    tareas.push(nuevaTarea);
    actualizarCacheYDOM();
    
    // Sincronizar Servidor
    postServidor(nuevaTarea);

    inputTarea.value = "";
    inputTarea.focus();
});

btnSincronizar.addEventListener('click', obtenerDatosServidor);

function actualizarCacheYDOM() {
    localStorage.setItem('tareas_cache', JSON.stringify(tareas));
    renderizarDOM();
}

function renderizarDOM() {
    listaTareasUI.innerHTML = "";
    
    tareas.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t.texto;

        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = "Eliminar";
        btnBorrar.className = "btn-delete";
        
        btnBorrar.onclick = () => {
            // Filtramos el arreglo local
            tareas = tareas.filter(item => item.id !== t.id);
            actualizarCacheYDOM();
            // Borramos en servidor
            deleteServidor(t.id);
        };

        li.appendChild(btnBorrar);
        listaTareasUI.appendChild(li);
    });
}