const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const nota1Input = document.getElementById("nota1");
const nota2Input = document.getElementById("nota2");
const nota3Input = document.getElementById("nota3");
const asistenciaInput = document.getElementById("asistencia");
const tablaEstudiantes = document.getElementById("tablaEstudiantes");
const formEstudiante = document.getElementById("formEstudiante");
 //añadimos las 3 notas para que funcionen con las nuevas div dentro del form 
function agregarEstudiante() {
    const nombreValor = nombreInput.value.trim();
    const apellidoValor = apellidoInput.value.trim();
    const n1 = parseFloat(nota1Input.value);
    const n2 = parseFloat(nota2Input.value);
    const n3 = parseFloat(nota3Input.value);
    const asistenciaValor = parseFloat(asistenciaInput.value);

    //Validar campos obligatorios de texto
    if (nombreValor === "" || apellidoValor === "") {
        alert("El nombre y el apellido no pueden quedar vacíos.");
        return;
    }

    //Validar que las 3 notas estén en el rango de 1.0 a 7.0
    const notas = [n1, n2, n3];
    const notasValidas = notas.every(nota => !isNaN(nota) && nota >= 1.0 && nota <= 7.0);
     //se ve que si no hay notas validas, se de una alerta que los valores deben ser los correctos
    if (!notasValidas) {
        alert("Todas las notas deben ser valores numéricos válidos entre 1.0 y 7.0.");
        return;
    }

    //Validar que la asistencia esté entre 0 y 100%
    if (isNaN(asistenciaValor) || asistenciaValor < 0 || asistenciaValor > 100) {
        alert("La asistencia debe ser un valor entre 0 y 100%.");
        return;
    }

    //Fórmula ponderada: Nota 1 (30%), Nota 2 (40%), Nota 3 (30%) -
    const promedioCalculado = (n1 * 0.3 + n2 * 0.4 + n3 * 0.3).toFixed(1);
    const promedioFinal = parseFloat(promedioCalculado);

    //Crear fila y celdas
    const fila = document.createElement("tr");

    //Array con datos base para iterar y no repetir document.createElement - 
    const celdasDatos = [nombreValor, apellidoValor, n1.toFixed(1), n2.toFixed(1), n3.toFixed(1)];
    celdasDatos.forEach(texto => {
        const celda = document.createElement("td");
        celda.textContent = texto;
        fila.appendChild(celda);
    });

    // Celda del promedio
    const celdaPromedio = document.createElement("td");
    celdaPromedio.textContent = promedioFinal.toFixed(1);
    if (promedioFinal < 4.0) {
        celdaPromedio.classList.add("nota-roja");
    }
    fila.appendChild(celdaPromedio);

    // Celda de Asistencia
    const celdaAsistencia = document.createElement("td");
    celdaAsistencia.textContent = `${asistenciaValor}%`;
    fila.appendChild(celdaAsistencia);

    //Celdas estado en sentido si está aprobado o no
    const celdaEstado = document.createElement("td");

    if (asistenciaValor < 60) {
        celdaEstado.textContent = "Reprobado por inasistencia";
        celdaEstado.classList.add("inasistencia");
    } else if (asistenciaValor < 70) {
        if (promedioFinal >= 5.0) {
            celdaEstado.textContent = "Aprobado";
            celdaEstado.classList.add("aprobado");
        } else {
            celdaEstado.textContent = "Reprobado";
            celdaEstado.classList.add("reprobado");
        }
    } else {
        if (promedioFinal >= 4.0) {
            celdaEstado.textContent = "Aprobado";
            celdaEstado.classList.add("aprobado");
        } else {
            celdaEstado.textContent = "Reprobado";
            celdaEstado.classList.add("reprobado");
        }
    }
    fila.appendChild(celdaEstado);

    //Se inserta la fila y se resetea el formulario
    tablaEstudiantes.appendChild(fila);
    formEstudiante.reset();
}