
  document.addEventListener("DOMContentLoaded", function() {
    const origenSelect = document.getElementById("origen");
    const destinoSelect = document.getElementById("destino");
    const imagenOrigen = document.querySelector("#imagenOrigen img");
    const imagenDestino = document.querySelector("#imagenDestino img");
  
    // JSON con las ciudades y sus imágenes
    const ciudades = [
        {
          nombre: "Nueva York",
          imagen: "https://www.civitatis.com/blog/wp-content/uploads/2016/05/Estatua-de-la-Libertad.jpg"
        },
        {
          nombre: "París",
          imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/640px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"
        },
        {
          nombre: "Tokio",
          imagen: "https://www.clarin.com/2024/03/08/519tvLY2p_2000x1500__1.jpg"
        }
      ];
  
    // Función para cargar opciones de ciudades en los select
    function cargarCiudades(select) {
      ciudades.forEach(ciudad => {
        const option = document.createElement("option");
        option.text = ciudad.nombre;
        select.add(option);
      });
    }
  
    // Cargar opciones de ciudades en los select
    cargarCiudades(origenSelect);
    cargarCiudades(destinoSelect);
  
    // Evento change para el select de origen
    origenSelect.addEventListener("change", function() {
      const selectedCiudad = this.value;
      const selectedCityData = ciudades.find(ciudad => ciudad.nombre === selectedCiudad);
      if (selectedCityData) {
        imagenOrigen.src = selectedCityData.imagen;
        imagenOrigen.alt = `Imagen de ${selectedCityData.nombre}`;
      }
    });
  
    // Evento change para el select de destino
    destinoSelect.addEventListener("change", function() {
      const selectedCiudad = this.value;
      const selectedCityData = ciudades.find(ciudad => ciudad.nombre === selectedCiudad);
      if (selectedCityData) {
        imagenDestino.src = selectedCityData.imagen;
        imagenDestino.alt = `Imagen de ${selectedCityData.nombre}`;
      }
    });
  });
  