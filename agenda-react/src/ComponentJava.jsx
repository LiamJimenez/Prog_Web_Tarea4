import React, { useEffect } from 'react';

function ComponentJava() {
  useEffect(() => {
    function agregarUsuarioTabla(nombre, apellido, telefono) {
      var tabla = document.getElementById("usersTableBody");
      var nuevaFila = tabla.insertRow();

      var celdaNombre = nuevaFila.insertCell();
      celdaNombre.innerHTML = nombre;

      var celdaApellido = nuevaFila.insertCell();
      celdaApellido.innerHTML = apellido;

      var celdaTelefono = nuevaFila.insertCell();
      celdaTelefono.innerHTML = telefono;

      nuevaFila.addEventListener("click", function () {
        marcarFilaSeleccionada(this);
      });
    }

    function obtenerContactos() {
      fetch("https://railway-node-express-production-3b13.up.railway.app/scrape")
        .then(function (response) {
          if (!response.ok) {
            throw new Error(
              "Error en la solicitud. Estado: " + response.status
            );
          }
          return response.json();
        })
        .then(function (data) {
          var tabla = document.getElementById("usersTableBody");
          tabla.innerHTML = "";

          data.forEach(function (contact) {
            agregarUsuarioTabla(
              contact.nombre,
              contact.apellido,
              contact.telefono
            );
          });
        })
        .catch(function (error) {
          console.log("Error:", error);
        });
    }

    function marcarFilaSeleccionada(fila) {
      fila.classList.toggle("selected");
    }

    function eliminarFilaTabla(fila) {
      fila.remove();
    }

    // Obtener referencia al botón "Agregar"
    var agregarUsuarioBtn = document.getElementById("agregarContacto");
    agregarUsuarioBtn.addEventListener("click", function () {
      var nombre = document.getElementById("nombre").value;
      var apellido = document.getElementById("apellido").value;
      var telefono = document.getElementById("telefono").value;

      agregarUsuarioTabla(nombre, apellido, telefono);

      document.getElementById("nombre").value = "";
      document.getElementById("apellido").value = "";
      document.getElementById("telefono").value = "";
    });

    // Obtener referencia al botón "Obtener"
    var obtenerContactosBtn = document.getElementById("obtenerContactos");
    obtenerContactosBtn.addEventListener("click", function () {
      obtenerContactos();
    });

    // Obtener referencia al botón "Eliminar"
    var eliminarContactosBtn = document.getElementById("eliminarContactos");
    eliminarContactosBtn.addEventListener("click", function () {
      var filasSeleccionadas = document.querySelectorAll("tr.selected");

      if (filasSeleccionadas.length > 0) {
        filasSeleccionadas.forEach(function (fila) {
          eliminarFilaTabla(fila);
        });
      } else {
        alert("Selecciona una o más filas para eliminar.");
      }
    });

    // Eliminar los event listeners al desmontar el componente
    return () => {
      agregarUsuarioBtn.removeEventListener("click", function () {});
      obtenerContactosBtn.removeEventListener("click", function () {});
      eliminarContactosBtn.removeEventListener("click", function () {});
    };
  }, []);

  useEffect(() => {
    var agregarUsuarioBtn = document.getElementById("agregarContacto");
    agregarUsuarioBtn.addEventListener("mouseover", function () {
      this.style.cursor = "pointer";
    });

    var obtenerContactosBtn = document.getElementById("obtenerContactos");
    obtenerContactosBtn.addEventListener("mouseover", function () {
      this.style.cursor = "pointer";
    });

    var eliminarContactosBtn = document.getElementById("eliminarContactos");
    eliminarContactosBtn.addEventListener("mouseover", function () {
      this.style.cursor = "pointer";
    });

    // Eliminar los event listeners al desmontar el componente
    return () => {
      agregarUsuarioBtn.removeEventListener("mouseover", function () {});
      obtenerContactosBtn.removeEventListener("mouseover", function () {});
      eliminarContactosBtn.removeEventListener("mouseover", function () {});
    };
  }, []);

  return (
    <div>
      {/* Contenido JSX del componente ComponentJava */}
    </div>
  );
}

export default ComponentJava;
