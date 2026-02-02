const API_URL = 'http://localhost:3000/tareas';
const inputTarea = document.getElementById('inputTarea');
const btnAgregar = document.getElementById('btnAgregar');
const btnSincronizar = document.getElementById('btnSincronizar');
const listaTareasUI = document.getElementById('listaTareas');

// aquí guardamos la lista de tareas para tenerlas a mano
let tareas = [];

window.addEventListener('DOMContentLoaded', () => {
    const storage = localStorage.getItem('tareas_cache');
    if (storage) {
        // si ya teníamos tareas guardadas en el navegador, las sacamos del "baúl"
        tareas = JSON.parse(storage);
        renderizarDOM();
        console.log("info: datos recuperados de localstorage");
    }
    // intentamos ver qué hay en el servidor apenas abre la página
    obtenerDatosServidor();
});

//
// fetch api: operaciones para hablar con el servidor
//

// get - traer los datos del servidor
async function obtenerDatosServidor() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("No se pudo conectar al servidor");
        const datosServidor = await res.json();
        
        // lo que diga el servidor manda, así que actualizamos nuestra lista
        tareas = datosServidor;
        actualizarCacheYDOM();
        console.log("get: datos sincronizados desde json server", datosServidor);
    } catch (err) {
        console.error("error get:", err.message);
    }
}

// post - mandarle una tarea nueva al servidor para que la guarde
async function postServidor(nuevaTarea) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaTarea)
        });
        const data = await res.json();
        console.log("post: guardado en db.json", data);
    } catch (err) {
        console.error("error post:", err);
    }
}

// delete - decirle al servidor que borre una tarea específica
async function deleteServidor(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) console.log(`delete: id ${id} eliminado del servidor`);
    } catch (err) {
        console.error("error delete:", err);
    }
}

//
// dom & interacción: lo que el usuario ve y hace
//

btnAgregar.addEventListener('click', () => {
    const texto = inputTarea.value.trim();

    // revisamos que no nos manden algo vacío
    if (!texto) {
        console.error("validación: el campo está vacío");
        alert("Escribe una tarea válida");
        return;
    }

    // creamos la tarea con un id único basado en el tiempo
    const nuevaTarea = {
        id: Date.now().toString(),
        texto: texto
    };

    // la metemos en nuestra lista local primero para que sea rápido
    tareas.push(nuevaTarea);
    actualizarCacheYDOM();
    
    // avisamos al servidor que hay algo nuevo
    postServidor(nuevaTarea);

    // limpiamos el input para la siguiente tarea
    inputTarea.value = "";
    inputTarea.focus();
});

// botón manual por si queremos forzar la actualización
btnSincronizar.addEventListener('click', obtenerDatosServidor);

function actualizarCacheYDOM() {
    // guardamos una copia en el navegador por si se va la luz o el internet
    localStorage.setItem('tareas_cache', JSON.stringify(tareas));
    renderizarDOM();
}

function renderizarDOM() {
    // limpiamos la lista antes de dibujar todo otra vez
    listaTareasUI.innerHTML = "";
    
    tareas.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t.texto;

        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = "Eliminar";
        btnBorrar.className = "btn-delete";
        
        btnBorrar.onclick = () => {
            // quitamos la tarea de nuestra lista actual
            tareas = tareas.filter(item => item.id !== t.id);
            actualizarCacheYDOM();
            // y le decimos al servidor que también la borre de allá
            deleteServidor(t.id);
        };

        li.appendChild(btnBorrar);
        listaTareasUI.appendChild(li);
    });
}