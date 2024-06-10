document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const destinationInput = document.getElementById('destination');
  const dateInput = document.getElementById('date');
  const tripsContainer = document.getElementById('trips');
  const tripModal = document.getElementById('tripModal');
  const modalContent = document.getElementById('modalDetails');
  const span = document.getElementsByClassName('close')[0];
  const paginationContainer = document.getElementById('pagination');

  let currentPage = 1;
  const itemsPerPage = 6; // Mostrar 6 ciudades por página
  let currentTrips = [];

  destinationInput.addEventListener('input', fetchTrips);
  dateInput.addEventListener('change', fetchTrips);

  searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      fetchTrips();
  });

  span.onclick = function() {
      tripModal.style.display = 'none';
  };

  window.onclick = function(event) {
      if (event.target === tripModal) {
          tripModal.style.display = 'none';
      }
  };

  function fetchTrips() {
      fetch('data.json')
          .then(response => response.json())
          .then(data => {
              const destination = destinationInput.value.toLowerCase();
              const date = dateInput.value;
              currentTrips = data.trips.filter(trip => {
                  return (trip.destination.toLowerCase().includes(destination) || destination === '') &&
                         (trip.date === date || date === '');
              });
              displayTrips(currentTrips, currentPage);
              setupPagination(currentTrips.length);
          })
          .catch(error => console.error('Error fetching trips:', error));
  }

  function displayTrips(trips, page) {
      tripsContainer.innerHTML = '';
      const start = (page - 1) * itemsPerPage;
      const end = page * itemsPerPage;
      const paginatedTrips = trips.slice(start, end);

      if (paginatedTrips.length === 0) {
          tripsContainer.innerHTML = '<p>No se encontraron viajes para los criterios de búsqueda.</p>';
      } else {
          paginatedTrips.forEach(trip => {
              const tripCard = document.createElement('div');
              tripCard.className = 'trip-card';
              tripCard.innerHTML = `
                  <h3>${trip.destination}</h3>
                  <p>Fecha: ${trip.date}</p>
                  <p>Precio: $${trip.price}</p>
                  <button onclick="showTripDetails(${trip.id})">Ver Detalles</button>
              `;
              tripsContainer.appendChild(tripCard);
          });
      }
  }

  function setupPagination(totalItems) {
      paginationContainer.innerHTML = '';
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
          const pageButton = document.createElement('button');
          pageButton.innerText = i;
          pageButton.classList.add('page-btn');
          if (i === currentPage) {
              pageButton.classList.add('active');
          }
          pageButton.addEventListener('click', () => {
              currentPage = i;
              displayTrips(currentTrips, currentPage);
              document.querySelectorAll('.page-btn').forEach(btn => btn.classList.remove('active'));
              pageButton.classList.add('active');
          });
          paginationContainer.appendChild(pageButton);
      }
  }

  window.showTripDetails = function(id) {
      fetch('data.json')
          .then(response => response.json())
          .then(data => {
              const trip = data.trips.find(trip => trip.id === id);
              if (trip) {
                  modalContent.innerHTML = `
                      <h3>${trip.destination}</h3>
                      <p>Fecha: ${trip.date}</p>
                      <p>Precio: $${trip.price}</p>
                      <p>Descripción: ${trip.description}</p>
                  `;
                  tripModal.style.display = 'block';
              }
          })
          .catch(error => console.error('Error fetching trip details:', error));
  };

  // Initial fetch to display all trips
  fetchTrips();
});
