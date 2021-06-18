const ENDPOINT = 'https://api.themoviedb.org/3';
const KEY = '64d059568c0e31389b9b682b5aa95e3f';
const IMG = 'https://image.tmdb.org/t/p/w500';
let xhr;

console.log(3);
function pesquisaFilmes () {
    xhr = new XMLHttpRequest ();

    let query = $('#barra').val();

    xhr.open ('GET', ENDPOINT + '/search/movie' + '?api_key=' + KEY + '&query=' + query, true);
    xhr.onload = exibeFilmes;
    xhr.send();
}

function exibeFilmes ()
{
    let data = JSON.parse (xhr.responseText);
    let textoHTML = '';

    for (let i = 0; i < data.results.length; i++) {
        let nomeFilme = data.results[i].title;
        let sinopse = data.results[i].overview;
        let imagem = IMG + data.results[i].poster_path;

        textoHTML += `<div class="card col-md-4">
            <img src="${imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nomeFilme}</h5>
                <p class="card-text">${sinopse}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`
    }

    document.getElementById('boxPesquisa').innerHTML = textoHTML;
}