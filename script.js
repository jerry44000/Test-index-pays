 

let listePays = [];
let tableauFin = [];

const input = document.querySelector(".recherche-pays input");
const listeP = document.querySelector(".liste-pays");
const chargement = document.querySelector('.loader');


function fetchCountries(){

    fetch("https://restcountries.eu/rest/v2/all")
        .then(reponse => reponse.json())
        .then((allCountries)=>{



            allCountries.forEach((pays) => {

                fetchPaysComplet(pays)


            });
        })

}

fetchCountries();


function fetchPaysComplet(pays){

    let objPaysComplet = {}
    let flag = pays.flag


    objPaysComplet.pic = flag
    objPaysComplet.name = pays.translations.fr
    objPaysComplet.region = pays.region
    objPaysComplet.capital = pays.capital

    
    
    listePays.push(objPaysComplet)

    for(i=0; i<listePays.length; i++){

      if(i===182){

        listePays[i].name = "Kosovo"

      }
    }

    if(listePays.length ===250){ 


    //tableauFin = listePays.slice(0,21);

    tableauFin = listePays.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0).slice(0,21);
  }
  
    

    


    createFlag(tableauFin);

    chargement.style.display = "none"
  }





//afficher les drapeaux

 function createFlag(arr)
{

  for(i=0;i<arr.length; i++){

        const flag = document.createElement("li");
        const front = document.createElement("div");
        const inner = document.createElement("div");
        const back = document.createElement("div");
        const txtPays = document.createElement('h5');
        const txtCapitale = document.createElement('h2');
        txtPays.innerText = arr[i].name;
        txtCapitale.innerText = arr[i].capital;
        const imgDrapeau = document.createElement('img');
        imgDrapeau.src = arr[i].pic;



        flag.appendChild(inner);
        inner.appendChild(front);
        inner.appendChild(back);
        back.appendChild(txtCapitale);
        front.appendChild(imgDrapeau);
        front.appendChild(txtPays);
        listeP.appendChild(flag);

        inner.classList.add("shadow");

        flag.addEventListener('mouseover', function(e) {

          flag.classList.add('flip-card');
          inner.classList.add('flip-card-inner');
          front.classList.add('flip-card-front');

          
      
      })

      back.classList.add("flip-card-back");
  
  
      }

}

// Scroll Infini

window.addEventListener('scroll', () => {  

const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
// scrollTop = scroll depuis top
// scrollHeight = scroll total
// clientHeight = hauteur de la fenêtre visible

//console.log(scrollTop, scrollHeight, clientHeight);

if(clientHeight + scrollTop >= scrollHeight - 20){

  addPays(6);
}


})

let index = 21;

function addPays(nb){

  if(index >250){
    return;
  }

  const arrToAdd = listePays.slice(index, index + nb);
  createFlag(arrToAdd)
  index +=nb;

  
}

// Recherche

input.addEventListener('keyup', recherche);

function recherche(){

    if(index < 250) {
        addPays(129);
    }

    let filter, allLi, titleValue, allTitles;
    filter = input.value.toUpperCase();
    allLi = document.querySelectorAll('li');
    allTitles = document.querySelectorAll('li > div > div > h5');
    
    
    for(i = 0; i < allLi.length; i++) {

        titleValue = allTitles[i].innerText;

        if(titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";
        } else {
            allLi[i].style.display = "none";
        }

    }

}
