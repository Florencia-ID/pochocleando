'use strict'
const URLseries = 'http://localhost:3000/series';
const URLpeliculas = 'http://localhost:3000/peliculas';
const containerMain = document.querySelector('#container-main');
const containerSlider = document.getElementById('inner-carousel');
const carouselIndicators = document.querySelector('.carousel-indicators');

async function getSeries() {
    const response = await fetch(URLseries);
    const data = await response.json();
    return data;
}
async function getPeliculas() {
    const response = await fetch(URLpeliculas);
    const data = await response.json();
    return data;
}
async function buildSlides() {
    let series = await getSeries();
    let peliculas = await getPeliculas();
    const contenido = series.concat(peliculas);
    const datos = contenido.filter(isOutstanding);

    for (let i = 0; i < datos.length; i++) {
        if (datos[i].destacada === true) {
            containerSlider.innerHTML += `                 
            <div class="carousel-item hero ${i === 0 ? 'active' : ''}" >
             <img src="${datos[i].imagen}" class="d-block w-100 img-hero img-fluid" alt="img-serie">
              <div class="carousel-caption">
                    <div class= "d-flex align-items-center flex-column data-hero">
                    <h5 class="text title-black title titlesandbtns">${datos[i].nombre}</h5>
                    <p class="user-select-none p-black text-center commontexts">${datos[i].descripcion}</p>
                    <a href="error404.html"> <button class="btn-hero bi bi-play p-black titlesandbtns" id="btn-slide">
                    <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor"
                       xmlns="http://www.w3.org/2000/svg">
                       <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg> REPRODUCIR </button>
                    </a>
                    </div>
              </div>              
            </div> 
             `
            carouselIndicators.innerHTML += `
             <li data-target="#container-main" data-slide-to="${i}" class="${i === 0 ? 'active' : ''}"></li>
              `
        }
    }
    buildControl();
}

buildSlides();

function buildControl() {
    containerMain.innerHTML += `
<a class="carousel-control-prev d-none d-sm-flex" href="#container-main" id="" role="button" data-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="sr-only">Previous</span></a>
<a class="carousel-control-next d-none d-sm-flex" href="#container-main" id="next-slide" role="button" data-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="sr-only">Next</span></a>`
}

function isOutstanding(objeto) {
    if (objeto.destacada === true) {
        return objeto;
    }
}

