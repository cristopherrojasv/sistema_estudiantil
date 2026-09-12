const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const promedioInput = document.getElementById("promedio");
const tablaEstudiantes = document.getElementById("tablaEstudiantes");
const formEstudiante = document.getElementById("formEstudiante");

function agregarEstudiante(){
    const nombreValor = nombreInput.value.trim();
    const apellidoValor = apellidoInput.value.trim();
    const promedioValor = parseFloat(promedioInput.value);

    if (nombreValor === "" || apellidoValor === ""){
        alert ("El nombre y apellido no pueden quedar vacios.");
        return;
    }

    if (isNaN(promedioValor) || promedioValor < 1.0 || promedioValor >7.0) {
        alert ("El promedio debe estar entre 1.0 y 7.0.");
        return;
    }

    const fila =document.createElement("tr")

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = nombreValor;

    const celdaApellido = document.createElement("td");
    celdaApellido.textContent = apellidoValor;

    const celdaPromedio = document.createElement("td");
    celdaPromedio.textContent = promedioValor.toFixed(1);
    if (promedioValor < 4.0){
        celdaPromedio.classList.add("nota-roja");
    }

    const celdaEstado = document.createElement("td");
    if (promedioValor >= 4.0){
        celdaEstado.textContent = "Aprobado";
        celdaEstado.classList.add("aprobado");
    } else {
        celdaEstado.textContent = "Reprobado";
        celdaEstado.classList.add("reprobado");
    }


    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellido);
    fila.appendChild(celdaPromedio);
    fila.appendChild(celdaEstado);

    tablaEstudiantes.appendChild(fila);

    formEstudiante.reset();
}