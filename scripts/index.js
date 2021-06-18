const TMDB_ENDPOINT = 'https://api.themoviedb.org/3';
const APIKEY = '64d059568c0e31389b9b682b5aa95e3f';
const IMG_PREFIX = 'https://image.tmdb.org/t/p/w500';
let xhr;

function carregaCarrossel () {
    xhr = new XMLHttpRequest ();

    xhr.open ('GET', TMDB_ENDPOINT + '/tv/top_rated' + '?api_key=' + APIKEY, true);
    xhr.onload = exibeCarrossel;
    xhr.send();
}

function carregaFilmes () {
    xhr = new XMLHttpRequest ();

    xhr.open ('GET', TMDB_ENDPOINT + '/movie/popular' + '?api_key=' + APIKEY, true);
    xhr.onload = exibeFilmes;
    xhr.send();
}

function pesquisaFilmes () {
    xhr = new XMLHttpRequest ();

    query = document.getElementById('pesquisa').value;

    xhr.open ('GET', TMDB_ENDPOINT + '/search/movie' + '?api_key=' + APIKEY + '&query=' + query, true);
    xhr.onload = exibeFilmes;
    xhr.send();
}

function carregaVideos () {
    xhr = new XMLHttpRequest ();

    xhr.open ('GET', TMDB_ENDPOINT + '/movie/popular' + '?api_key=' + APIKEY + '&append_to_response=videos', true);
    xhr.onload = exibeTrailers;
    xhr.send();
}

function exibeCarrossel()
{
    let data = JSON.parse (xhr.responseText);
    $("#boxDentroDoCarrossel").html("");
    for (let i = 0; i < 3; i++) 
    {
        let nomeFilme = data.results[i].name;
        let lancamento = data.results[i].first_air_date;
        let nota = data.results[i].vote_average;
        let imagem = IMG_PREFIX + data.results[i].poster_path;
        let sinopese = data.results[i].overview; 
        if(i == 0)
        {
            $("#boxDentroDoCarrossel").append(`
            <div class="carousel-item active">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-3">
                    <img src="${imagem}" class="imagemCarrossel" alt="...">
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-9">
                        <!--Texto 1-->
                        <h2>${nomeFilme}</h2>
                        <p> Sinopse: ${sinopese}.
                        </p>
                        <p>
                            Estreia: ${lancamento}
                        </p>
                        <p>Avaliação: ${nota} <i class="fas fa-star"></i></p>
                    </div>
                </div>
            </div>`)
        }
        else
        {
            $("#boxDentroDoCarrossel").append(`
            <div class="carousel-item">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-3">
                        <img src="${imagem}" class="imagemCarrossel" alt="...">
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-9">
                        <!--Texto 1-->
                        <h2>${nomeFilme}</h2>
                        <p> Sinopse: ${sinopese}.
                        </p>
                        <p>
                            Estreia: ${lancamento}
                        </p>
                        <p>Avaliação: ${nota} <i class="fas fa-star"></i></p>
                    </div>
                </div>
            </div>`)
        }
    }
}

function exibeFilmes () {
    let data = JSON.parse (xhr.responseText);
    $("#tela").html("");
    for (let i = 0; i < 4; i++) {
        let nomeFilme = data.results[i].title;
        let lancamento = data.results[i].release_date;
        let nota = data.results[i].vote_average;
        let imagem = IMG_PREFIX + data.results[i].poster_path;
        $("#tela").append(`<div class=" mx-auto card col-12 col-sm-12 col-md-3 col-lg-3">
            <img src="${imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nomeFilme}</h5>
                <p>Data de Lançamento: ${lancamento}</p>
                <p>Nota: ${nota}</p>
                <a href="https://www.themoviedb.org/movie/${data.results[i].id}" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`);
    }
}

function resultadoPesquisa () {
    let data = JSON.parse (xhr.responseText);
    $("#tela").html("");
    for (let i = 0; i < data.results.length; i++) {
        let nomeFilme = data.results[i].title;
        let data = data.results[i].release_date;
        let imagem = IMG_PREFIX + data.results[i].poster_path;
        $("#tela").append(`
        <div class=" mx-auto card col-12 col-sm-12 col-md-3 col-lg-3">
            <img src="${imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nomeFilme}</h5>
                <p class="card-text">${data}</p>
                <a href="https://www.themoviedb.org/movie/${data.results[i].id}" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`);
    }
}

function exibeTrailers()
{
    let data = JSON.parse (xhr.responseText);
    $("#rowTrailers").html("");
    for (let i = 0; i < 3; i++) {
        let nomeFilme = data.results[i].title;
        let lancamento = data.results[i].release_date;
        let id = data.results[i].id;

        $("#rowTrailers").append(`
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 entrevista_1">
        <div>
            <iframe src="https://www.youtube.com/embed/" class="videos_entrevistas"
                frameborder="0" allowfullscreen></iframe>
            <!--Video 1-->
        </div>
        <div>
            <h2 class="titulo_entrevistas">${nomeFilme}.</h2>
            <!--Texto 1-->
            <p class="Texto_entrevistas">
                Data de lançamento: ${lancamento}.
            </p>
        </div>
    </div>
        `);
    }
}

function carregaTudo(){
    carregaCarrossel();
    carregaFilmes();
}