import React, { memo, useEffect } from 'react';
import './App.css';

const Component = memo(() => {
  useEffect(() => {
    // Obtener referencia al botón "Agregar"
    var agregarUsuarioBtn = document.getElementById("agregarContacto");
    agregarUsuarioBtn.addEventListener("click", function() {
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
    obtenerContactosBtn.addEventListener("click", function() {
      obtenerContactos();
    });

    // Obtener referencia al botón "Eliminar"
    var eliminarContactosBtn = document.getElementById("eliminarContactos");
    eliminarContactosBtn.addEventListener("click", function() {
      var filasSeleccionadas = document.querySelectorAll("tr.selected");

      if (filasSeleccionadas.length > 0) {
        filasSeleccionadas.forEach(function(fila) {
          eliminarFilaTabla(fila);
        });
      } else {
        alert("Selecciona una o más filas para eliminar.");
      }
    });

    // Función para agregar un usuario a la tabla
    function agregarUsuarioTabla(nombre, apellido, telefono) {
      var tabla = document.getElementById("usersTableBody");
      var primeraFila = tabla.rows[0];

      var nuevaFila = tabla.insertRow(0);

      var celdaNombre = nuevaFila.insertCell(0);
      celdaNombre.innerHTML = nombre;

      var celdaApellido = nuevaFila.insertCell(1);
      celdaApellido.innerHTML = apellido;

      var celdaTelefono = nuevaFila.insertCell(2);
      celdaTelefono.innerHTML = telefono;

      nuevaFila.addEventListener("click", function() {
        marcarFilaSeleccionada(this);
      });

      tabla.insertBefore(nuevaFila, primeraFila);
    }

    // Función para obtener los contactos
    function obtenerContactos() {
      fetch("https://railway-node-express-production-3b13.up.railway.app/scrape")
        .then(function(response) {
          if (!response.ok) {
            throw new Error("Error en la solicitud. Estado: " + response.status);
          }
          return response.json();
        })
        .then(function(data) {
          var tabla = document.getElementById("usersTableBody");
          tabla.innerHTML = "";

          data.forEach(function(contact) {
            agregarUsuarioTabla(contact.nombre, contact.apellido, contact.telefono);
          });
        })
        .catch(function(error) {
          console.log("Error:", error);
        });
    }

    // Función para marcar una fila como seleccionada
    function marcarFilaSeleccionada(fila) {
      fila.classList.toggle("selected");
    }

    // Función para eliminar una fila de la tabla
    function eliminarFilaTabla(fila) {
      var tabla = document.getElementById("usersTableBody");
      tabla.removeChild(fila);
    }

    // Establecer estilos de cursor para los botones al pasar el mouse sobre ellos
    agregarUsuarioBtn.addEventListener("mouseover", function() {
      this.style.cursor = "pointer";
    });

    obtenerContactosBtn.addEventListener("mouseover", function() {
      this.style.cursor = "pointer";
    });

    eliminarContactosBtn.addEventListener("mouseover", function() {
      this.style.cursor = "pointer";
    });
  }, []);

  return (
    <div>
      <h2>Agregar usuarios</h2>

      <label htmlFor="nombre">Nombre:</label>
      <input type="text" id="nombre" required />
      <label htmlFor="apellido">Apellido:</label>
      <input type="text" id="apellido" required />
      <label htmlFor="telefono">Teléfono:</label>
      <input type="text" id="telefono" required />

      <div className="buttons-container">
        <button type="button" id="agregarContacto">Agregar</button>
        <button type="button" id="obtenerContactos">Obtener</button>
        <button type="button" id="eliminarContactos">Eliminar</button>
      </div>

      <table id="usersTable">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody id="usersTableBody"></tbody>
      </table>
    </div>
  );
});

export default Component;


