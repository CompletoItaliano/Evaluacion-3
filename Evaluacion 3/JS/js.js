window.onload = function() {
  mostrarAutos();
};

function guardarAuto() {
  var autos = JSON.parse(localStorage.getItem("autos")) || [];

  var id = document.getElementById("autoId").value;
  if (id === "") {
    id = new Date().getTime().toString();
  }

  var auto = {
    id: id,
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    año: document.getElementById("año").value,
    transmision: obtenerTransmision()
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

function mostrarAutos() {
  var autos = JSON.parse(localStorage.getItem("autos")) || [];
  var tabla = document.querySelector("#tablaAutos tbody");
  tabla.innerHTML = "";

  for (var i = 0; i < autos.length; i++) {
    var fila = "<tr>";
    fila += "<td>" + autos[i].marca + "</td>";
    fila += "<td>" + autos[i].modelo + "</td>";
    fila += "<td>" + autos[i].año + "</td>";
    fila += "<td>" + autos[i].transmision + "</td>";
    fila += "<td>";
    fila += "<button class='btn btn-sm btn-warning' onclick='editarAuto(\"" + autos[i].id + "\")'>Editar</button> ";
    fila += "<button class='btn btn-sm btn-danger' onclick='eliminarAuto(\"" + autos[i].id + "\")'>Eliminar</button>";
    fila += "</td></tr>";

    tabla.innerHTML += fila;
  }
}

function editarAuto(id) {
  var autos = JSON.parse(localStorage.getItem("autos")) || [];

  for (var i = 0; i < autos.length; i++) {
    if (autos[i].id === id) {
      document.getElementById("autoId").value = autos[i].id;
      document.getElementById("marca").value = autos[i].marca;
      document.getElementById("modelo").value = autos[i].modelo;
      document.getElementById("año").value = autos[i].año;
      var radios = document.getElementsByName("transmision");
      for (var j = 0; j < radios.length; j++) {
        if (radios[j].value === autos[i].transmision) {
          radios[j].checked = true;
        }
      }
      break;
    }
  }
}

function eliminarAuto(id) {
  var autos = JSON.parse(localStorage.getItem("autos")) || [];
  var nuevos = [];

  for (var i = 0; i < autos.length; i++) {
    if (autos[i].id !== id) {
      nuevos.push(autos[i]);
    }
  }

  localStorage.setItem("autos", JSON.stringify(nuevos));
  mostrarAutos();
}

function obtenerTransmision() {
  var radios = document.getElementsByName("transmision");
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return "";
}

function limpiarFormulario() {
  document.getElementById("autoForm").reset();
  document.getElementById("autoId").value = "";
}