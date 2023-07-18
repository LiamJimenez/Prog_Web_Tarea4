import React, { memo } from 'react'
import './App.css';

const Component = memo(() => {
  return (
    <div>
        <h2>Agregar usuarios</h2>

      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" required></input>
      <label for="apellido">Apellido:</label>
      <input type="text" id="apellido" required></input>
      <label for="telefono">Teléfono:</label>
      <input type="text" id="telefono" required></input>

      <div class="buttons-container">
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
    
  )
})

export default Component

