const TMDB_ENDPOINT = 'https://api.themoviedb.org/3';
const APIKEY = '64d059568c0e31389b9b682b5aa95e3f';
const IMG_PREFIX = 'https://image.tmdb.org/t/p/w500';

$(() => {

    $.get(TMDB_ENDPOINT + '/movie/popular' + '?api_key=' + APIKEY).then((data) => {
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
                    <a href="https://www.themoviedb.org/movie/${data.results[i].id}" class="btn btn-primary">Saiba Mais</a>
                </div>
            </div>`);
        }
    })

    $.get(TMDB_ENDPOINT + '/tv/top_rated' + '?api_key=' + APIKEY).then((data) => {
        $("#boxDentroDoCarrossel").html("");
        for (let i = 1; i < 4; i++) 
        {
            let nomeFilme = data.results[i].name;
            let lancamento = data.results[i].first_air_date;
            let nota = data.results[i].vote_average;
            let imagem = IMG_PREFIX + data.results[i].poster_path;
            let sinopese = data.results[i].overview; 
            if(i == 1)
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
                            <a href="https://www.themoviedb.org/movie/${data.results[i].id}" class="btn btn-primary">Saiba Mais</a>
                        </div>
                    </div>
                </div>`)
            }
            else if(i > 1)
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
                            <a href="https://www.themoviedb.org/movie/${data.results[i].id}" class="btn btn-primary">Saiba Mais</a>
                        </div>
                    </div>
                </div>`)
            }
        }
    })
})

