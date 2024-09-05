// Se asegura que el código dentro de la función solo se ejecute después de que todo el contenido de la página web esté completamente cargado:

document.addEventListener('DOMContentLoaded', () => {

    // Mediante el id de los elementos que estan en el html puedo manipularlo desde js: 

    let inputNombres = document.getElementById("nombres");
    let botonAgregar = document.getElementById("agregar");
    let botonGuardar = document.getElementById("guardar");
    let divMostrarLista = document.getElementById("mostrarLista");

    // Lee la lista de estudiantes guardada en el almacenamiento local del localStorage:

    function obtenerEstudiantes () {
        let estudiantesString = localStorage.getItem("estudiantes");
        return estudiantesString ? estudiantesString.split(",") : [];
    }

    // Llama a la función obtenerEstudiantes() y guarda la lista de estudiantes en la variable estudiantes:

    let estudiantes = obtenerEstudiantes();

    // Esta funcion actualiza el contenido de divMostrarLista para mostrar la lista de estudiantes:

    function mostrarLista() {
        divMostrarLista.innerHTML = estudiantes.length > 0
            ? estudiantes.map(nombre => `<p>${nombre}</p>`).join('')
            : '<p>No hay estudiantes en la lista.</p>';
    }

    // Añade un nombre nuevo a la lista si coloca el nombre, si no coloca un nombre o repite el mismo nombre devuelve una alerta:

    function agregarEstudiante() {
        const nombre = inputNombres.value.trim();
        if (nombre) {
            if (!estudiantes.includes(nombre)) {
                estudiantes.push(nombre);
                inputNombres.value = '';
                mostrarLista();
            } else {
                alert('El estudiante ya está en la lista.');
            }
        } else {
            alert('Ingrese un nombre.');
        }
    }

    // Guarda la lista de estudiantes en localStorage como una cadena de texto:

    function guardarEstudiantes() {
        localStorage.setItem('estudiantes', estudiantes.join(','));
    }

    // Puse "escuchadores" para los eventos de clic en los botones

    botonAgregar.addEventListener('click', agregarEstudiante);
    botonGuardar.addEventListener('click', guardarEstudiantes);

    // Para mostrar la lista de estudiantes una vez que cargue la página:

    mostrarLista();
})
