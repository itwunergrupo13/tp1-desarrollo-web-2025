export const SALONES_KEY = 'salones';

const salonesIniciales = [
  {
    id: crypto.randomUUID(),
    nombre: 'Salón Dorado',
    capacidad: 150,
    direccion: 'Av. Siempreviva 123',
    precio: 50000
  },
  {
    id: crypto.randomUUID(),
    nombre: 'Salón Cristal',
    capacidad: 200,
    direccion: 'Calle Falsa 456',
    precio: 75000
  }
];

export function inicializarLocalStorage() {
  if (!localStorage.getItem(SALONES_KEY)) {
    localStorage.setItem(SALONES_KEY, JSON.stringify(salonesIniciales));
  }
}

export function obtenerSalones() {
  return JSON.parse(localStorage.getItem(SALONES_KEY)) || [];
}

export function renderizarTabla() {
  const salones = obtenerSalones();
  const tbody = document.querySelector('#tabla-salones tbody');
  tbody.innerHTML = '';

  salones.forEach((salon) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${salon.nombre}</td>
      <td>${salon.capacidad}</td>
      <td>${salon.direccion}</td>
      <td>${salon.precio}</td>
      <td>
        <button onclick="editarSalon('${salon.id}')">Editar</button>
        <button onclick="eliminarSalon('${salon.id}')">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

document.getElementById('form-salon').addEventListener('submit', function (e) {
  e.preventDefault();
  const id = document.getElementById('idSalon').value;
  const nuevoSalon = {
    id: id || crypto.randomUUID(),
    nombre: document.getElementById('nombre').value,
    capacidad: parseInt(document.getElementById('capacidad').value),
    direccion: document.getElementById('direccion').value,
    precio: parseFloat(document.getElementById('precio').value)
  };

  let salones = obtenerSalones();
  if (id) {
    salones = salones.map(s => s.id === id ? nuevoSalon : s);
  } else {
    salones.push(nuevoSalon);
  }

  localStorage.setItem(SALONES_KEY, JSON.stringify(salones));
  this.reset();
  renderizarTabla();
});

window.editarSalon = function (id) {
  const salon = obtenerSalones().find(s => s.id === id);
  document.getElementById('idSalon').value = salon.id;
  document.getElementById('nombre').value = salon.nombre;
  document.getElementById('capacidad').value = salon.capacidad;
  document.getElementById('direccion').value = salon.direccion;
  document.getElementById('precio').value = salon.precio;
};

window.eliminarSalon = function (id) {
  const salones = obtenerSalones().filter(s => s.id !== id);
  localStorage.setItem(SALONES_KEY, JSON.stringify(salones));
  renderizarTabla();
};
