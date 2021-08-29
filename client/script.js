


//---Get the elementS array

const container=document.getElementsByClassName('container')[0];

const wholeURLs= {
    peluche:"http://127.0.0.1:3000/api/teddies",
    furniture:"http://127.0.0.1:3000/api/furniture",
    caméra:"http://127.0.0.1:3000/api/cameras"
}

//take an answer for a -- element/ -- request
//add a line in the Dom
const accueilAddLine = (elementArray,elementType) => {

    let div = document.createElement('div');
    div.className='row';
    const divContent=`<div class="col-12 col-md-4"><a href="produit.html#${elementType}"><img class="image-accueil" src="${elementArray[0].imageUrl}"></a></div>
    <div class="col-6 col-md-4 accueil-name"><p>${elementType}</p></div>
    <div class="col-6 col-md-4 accueil-price"><p>${elementArray[0].price} €</p></div>`;
    div.innerHTML=divContent;
    container.appendChild(div);
}



const fetchElement = (url) => {
    const type=url.match(/\/api\/.*$/)[0].replace("/api/","");
    fetch(url)
    .then(rawJson => rawJson.json())
    .then(json => {
        sessionStorage.setItem(type,JSON.stringify(json));
        console.log(json);
        console.log("type",type);
        accueilAddLine(json,type);
    });
}


for (let url of Object.keys(wholeURLs)){
    fetchElement(wholeURLs[url]);
}

//change the "shopping icon" if there is any item in sessionStorage
const basket = () => {
    if (sessionStorage.getItem('listToBuy')){
        document.querySelector('.basket').innerHTML='<i class="bi bi-cart-fill"></i>';
    }else{
        document.querySelector('.basket').innerHTML='<i class="bi bi-cart"></i>';
    }
}

basket();

