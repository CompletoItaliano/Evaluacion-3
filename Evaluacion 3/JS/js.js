function guardarAuto() {
  var marca = document.getElementById("marca").value.trim();
  var modelo = document.getElementById("modelo").value.trim();
  var año = parseInt(document.getElementById("año").value);
  var transmision = obtenerTransmision();

  // Validaciones
  if (marca === "" || modelo === "") {
    alert("Marca y modelo no pueden estar vacíos.");
    return;
  }

  var añoActual = new Date().getFullYear();
  if (isNaN(año) || año < 1900 || año > añoActual) {
    alert("Ingrese un año válido entre 1900 y " + añoActual);
    return;
  }

  if (transmision === "") {
    alert("Debe seleccionar una opción de transmisión.");
    return;
  }

  var autos = JSON.parse(localStorage.getItem("autos")) || [];

  var id = document.getElementById("autoId").value;
  if (id === "") {
    id = new Date().getTime().toString();
  }

  var auto = {
    id: id,
    marca: marca,
    modelo: modelo,
    año: año,
    transmision: transmision
  };

  var existe = false;
  for (var i = 0; i < autos.length; i++) {
    if (autos[i].id === id) {
      autos[i] = auto;
      existe = true;
      break;
    }
  }

  if (!existe) {
    autos.push(auto);
  }

  localStorage.setItem("autos", JSON.stringify(autos));
  limpiarFormulario();
  mostrarAutos();
}
