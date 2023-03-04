var cont = 12;
var beforeCont = 0;
var quant = 0;
var user;
var obj;

function getModels(){
    fetch("../json/models.json").then(function(response){
        return response.json();
    }).then(function(obj){
        var url = window.location.href;

        for (let i = 0; i < obj.length; i++) {
            if(url.includes(obj[i].user)){
                obj = obj[i];
                user = obj.user;
                let nome = obj.nome;
                let imagem = obj.imagem;
                let capa = obj.capa;

                var header = document.querySelector(".header-model");

                if (beforeCont == 0){

                header.innerHTML +=`
                <div class="container-header" style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.9), transparent), url(${capa});">
                    <div class="card-header" ;">
                        <div class="card-header-content">
                            <div class="card-header-img">
                                <img src="${imagem}" alt="">
                            </div>
                            <div class="card-header-text">
                                <h1>${nome}</h1>
                            </div>
                        </div>
                        <div class="card-header-btn">
                            <a href="../index.html">Voltar ao inicio</a>
                        </div>
                    </div>
                </div> `

                }

                getVideos(obj, user);

            }
        }
    });
}

getModels();

function getjson(){
    var videos = document.querySelectorAll(".videopostagem");
    const arrayVideos = [];



    for (let i = 0; i < videos.length; i++) { 
    const video = videos[i].href;
    arrayVideos.push(video);
    }

    var obj = JSON.stringify(arrayVideos);

    console.log(obj);
}



function getVideos(json, user){
    fetch(`../json/${user}.json`).then(function(response){
        return response.json();
    }).then(function(data){
        quant = data.length;
  

        createPage(data, quant);
    });
}


function createPage(obj, quant){
    var conatiner = document.querySelector(".container-video");

    if(cont <= quant){

        for (let i = beforeCont; i < cont; i++) {

            if(obj[i].includes("image.privacy")){
                conatiner.innerHTML += `
                <div class="card-content">
                    <a href="${obj[i]}" class="lightbox" data-fancybox="Owl Manual">
                        <img src="${obj[i]}" alt="" >
                    </a>
                </div>
                `;
            } else{
                conatiner.innerHTML += `
                <div class="card-content">
                    <a href="${obj[i]}" class="lightbox" data-fancybox="Owl Manual">
                        <video controls>
                            <source src="${obj[i]}" type="video/mp4">
                        </video>
                    </a>
                </div>
                `;
            }
        }
        if (cont == quant){
            let btn = document.querySelector("#btn-vermais");
            btn.style.display = "none";
        } 
    }

    
}


//pagination
var btn = document.querySelector("#btn-vermais");
btn.addEventListener("click", function(){

    if(quant - cont <= 12){
        beforeCont = cont;
        cont = quant;
        getVideos(obj, user);
    } else{
        beforeCont = cont;
        cont += 12;
        getVideos(obj, user);
    }
});
