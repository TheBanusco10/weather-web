// Desarrollado por David Jiménez Villarejo 2020


const API_URL = 'https://www.el-tiempo.net/api/json/v2/provincias';


document.addEventListener('DOMContentLoaded', () => {

    const provincia = document.querySelector('#input');
    const tbody = document.querySelector('#tbody');
    const imagenCargar = document.querySelector('#imagenCargar');

    imagenCargar.style.display = 'none';
    
    document.querySelector('#boton').addEventListener('click', () => {

        let busqueda = provincia.value;
        let provincias = [];
        let codProvincia = 0;

        getProvincias()
            .then( response => {

                imagenCargar.style.display = '';

                provincias = response;
                provincias.forEach(element => {
                    if (element.NOMBRE_PROVINCIA.includes(busqueda)) codProvincia = element.CODPROV;
                });

                getTiempo(codProvincia)
                    .then(mostrarTiempo);
        
            });

    });


    function getTiempo(codProvincia) {

        return fetch(`${API_URL}/${codProvincia}`)
            .then( response => {
                return response.json();
            })
            .then( result => {
                return result;
            });

    }

    function getProvincias() {


        return fetch(`${API_URL}`)
            .then( response => {
                return response.json();
            })
            .then( result => {
                return result.provincias;
            });

    }

    function mostrarTiempo(tiempo) {

        tbody.innerHTML = '';

        tiempo.ciudades.forEach(element => {

            let tr = document.createElement('tr');
            let tdNombre = document.createElement('td');
            let tdDescripcion = document.createElement('td');
            let tdMaxima = document.createElement('td');
            let tdMinima = document.createElement('td');

            tdNombre.innerHTML = element.name;
            tdDescripcion.innerHTML = element.stateSky.description;
            tdMaxima.innerHTML = element.temperatures.max;
            tdMinima.innerHTML = element.temperatures.min;
            tr.append(tdNombre, tdDescripcion, tdMaxima, tdMinima);
            tbody.appendChild(tr);

        });

        imagenCargar.style.display = 'none';

    }



});