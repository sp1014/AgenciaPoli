document.addEventListener('DOMContentLoaded', () => {
    const destinosSection = document.getElementById('destinos');
    const paginator = document.getElementById('paginator');

    let currentPage = 1;
    const itemsPerPage = 4;
    let trips = [];

    fetch('ciudades.json')
        .then(response => response.json())
        .then(data => {
            trips = data.trips;
            displayDestinos(trips, currentPage);

            const searchButton = document.getElementById('search-button');
            searchButton.addEventListener('click', () => {
                const searchDestination = document.getElementById('search-destination').value.toLowerCase();
                const searchDate = document.getElementById('search-date').value;
                const searchPeople = document.getElementById('search-people').value;

                const filteredTrips = trips.filter(trip => {
                    const tripDestination = trip.destination.toLowerCase();
                    const tripDate = new Date(trip.date);
                    const inputDate = new Date(searchDate);

                    return (
                        (searchDestination === '' || tripDestination.includes(searchDestination)) &&
                        (searchDate === '' || tripDate >= inputDate) &&
                        (searchPeople === '' || trip.price <= searchPeople)
                    );
                });

                currentPage = 1; // Reset to the first page for the new search
                displayDestinos(filteredTrips, currentPage);
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));

    function displayDestinos(trips, page) {
        destinosSection.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedTrips = trips.slice(start, end);

        paginatedTrips.forEach(trip => {
            const tourDiv = document.createElement('div');
            tourDiv.classList.add('tours');

            const frontDiv = document.createElement('div');
            frontDiv.classList.add('tour1', 'front');
            const img = document.createElement('img');
            img.src = `Imagenes/${trip.destination}.jpg`; // Suponiendo que tienes imágenes con los nombres de los destinos
            img.alt = trip.destination;
            const h3Front = document.createElement('h3');
            h3Front.textContent = trip.destination;
            frontDiv.appendChild(img);
            frontDiv.appendChild(h3Front);

            const backDiv = document.createElement('div');
            backDiv.classList.add('tour1', 'back');
            const h3Back = document.createElement('h3');
            h3Back.textContent = trip.destination;
            const p = document.createElement('p');
            p.textContent = trip.description;
            const linkDiv = document.createElement('div');
            linkDiv.classList.add('link');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = 'Detalles';
            linkDiv.appendChild(a);
            backDiv.appendChild(h3Back);
            backDiv.appendChild(p);
            backDiv.appendChild(linkDiv);

            tourDiv.appendChild(frontDiv);
            tourDiv.appendChild(backDiv);
            destinosSection.appendChild(tourDiv);
        });

        updatePaginator(trips.length, page);
    }

    function updatePaginator(totalItems, currentPage) {
        paginator.innerHTML = '';
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        for (let page = 1; page <= totalPages; page++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = page;
            pageButton.disabled = page === currentPage;
            pageButton.addEventListener('click', () => {
                currentPage = page;
                displayDestinos(trips, currentPage);
            });
            paginator.appendChild(pageButton);
        }
    }
});
