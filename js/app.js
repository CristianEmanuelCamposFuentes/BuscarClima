const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);

})

function buscarClima(e){
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        //Hubo un error
        mostrarError('Ambos campos son obligatorios');

        return;
    }

    //Consultamos la API
    consultarAPI(ciudad, pais);
}


function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        // Crear una alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
            'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    
    `;

        container.appendChild(alerta);

    // Se elimina la alerta despues de 5 segundos

    setTimeout(() => {
        alerta.remove();
    }, 5000);

    }
    
}

function consultarAPI(ciudad, pais){
    // Key de la cuenta de usuario
    const appID = 'd4bab971d3535b69e7123fc73cc89de4'

    // Seguir las reglas para consumir una API sino no envia datos
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    Spinner();
    fetch(url)
        .then(resp => resp.json())
        .then(datos => {
            limpiarHTML();
            //Validar datos
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada')
                return;
            } else{
                console.log(datos);
            }

            //Imprime la informacion obtenida de la API en el HTML
            mostrarClima(datos);

        })


}

//Function Helper, solo hace una cosa de forma directa
const kelvinACentigrados = grados => parseInt( grados - 273.15);



function mostrarClima(datos){
    const { name, main:{ temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451; `;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Máxima: ${max} &#8451`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Mínima: ${min} &#8451`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMinima);
    resultadoDiv.appendChild(tempMaxima);

    resultado.appendChild(resultadoDiv);

}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){
    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('sk-circle');
    spinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;

    resultado.appendChild(spinner);
}