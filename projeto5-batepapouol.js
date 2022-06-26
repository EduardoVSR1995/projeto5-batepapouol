const nameUser = [];

const userOnline= [];

let value ;

const click = [];

initialscreen();

function submits() {
    const newMesenger = document.querySelector("textarea").value;
    mesenge = {
        from: nameUser[0].name,
        to: "Todos",
        text: newMesenger,
        type: "message" 
    };
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",mesenge);
    
    document.querySelector("textarea").value = "";
 
}

function getMesenger(){
    const promes = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promes.then(getMeseng);
    
}
function getMeseng(resposta){
    document.querySelector("li").innerHTML = "";
    for (let index = 0; index < resposta.data.length; index++) {
        if(resposta.data[index].to !== "private_message" && resposta.data[index].type === "status" ){
         const i = document.querySelector("li").innerHTML +=`<h1 class="xx"><span>(${resposta.data[index].time})</span> &nbsp; <b>${resposta.data[index].from}</b>:&nbsp; ${resposta.data[index].text} </h1> `;
        
        }

        if (resposta.data[index].to === "private_message" &&  resposta.data[index].type === "message") {
            document.querySelector("li").innerHTML +=`<h2 class="xx"><span>(${resposta.data[index].time})</span> &nbsp;<b>${resposta.data[index].from}</b> &nbsp;para&nbsp; <b>${resposta.data[index].to}</b>:&nbsp; ${resposta.data[index].text} </h2> `;
        } 
    
    const ultimaMensagem = document.querySelector(".xx:last-child");
    console.log(ultimaMensagem);
    ultimaMensagem.scrollIntoView();
    }
}

function showTag(element){
    const i = document.querySelector("ion-icon");
    if (element === click[0]) {
        i.remove("ion-icon");
        click.splice(0, click.length);
        return;
    }
    if( i!==null ){
         i.remove("ion-icon");
         click.splice(0, click.length);
    }
    element.querySelector(".tag").innerHTML=`<ion-icon name="checkmark-outline"></ion-icon>` ;
    click.push(element);
}



function putUser(resposta1){
    document.querySelector("ul").innerHTML =``;
    for (let index = 0; index < resposta1.data.length; index++) {
    document.querySelector("ul").innerHTML +=`<div class="allUsers" onclick="showTag(this)"><div class="name"><img src="img/Vector 5.png">&nbsp ${resposta1.data[index].name}</div><div class="tag"></div></div>`;
    }
}

function putOnUser(){
    const promes = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promes.then(putUser);
}

function options(){
    const optionsScreen = `<div class="total3"><div class="sairUsuarioAtivo" onclick="exitUsuarioAtivo()"></div><div class="usuariosAtivos"> <p> Escolha um contato<br> para enviar mensagem:</p> <span><img src="img/Vector.png">&nbsp Todos </span><ul> </ul><p>Escolha a visibilidade:</p> <span> <img src="img/Vector3.png"> &nbsp Público</span> <span><img src="img/Vector 4.png">&nbsp Reservadamente </span></div></div>`;
    putOnUser();
    document.querySelector("body").innerHTML+= optionsScreen;
    //value = setInterval(putOnUser, 3000);
}

function exitUsuarioAtivo(){
    clearInterval(value);
    document.querySelector(".total3").remove();

}

function secondScreen(){
    const secondScreen =`<div class="total2"><div class="topo"> <img src="img/logo 1.png" alt="">  <img src="img/Vector.png" onclick="options()"></div><li></li><div class="caixaDeEscrever"><textarea placeholder="Escreva aqui..."></textarea> <img src="img/Vector(1).png" onclick="submits()"></img></div></div>` ;
    document.querySelector("body").innerHTML=secondScreen;
    getMesenger();
    //setInterval(getMesenger, 3000);

}

function deletInitialPage(){
    document.querySelector(".total").remove();
    secondScreen();
}

function remain(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status",nameUser[0]); 
}

function checkName(getName){
    deletInitialPage();
    setInterval(remain, 5000);
}

function noName(getName){
    window.location.reload();
}

function putName(){
    const nameEnter = document.querySelector("textarea").value;
    const namePush = {
        name: nameEnter
    };
    nameUser.push(namePush);
    const promes= axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",namePush)  
    promes.then(checkName);
    promes.catch(noName);
}

 function initialscreen(){
     const initial =`<div class="total"> <img src="img/logo 2.png"> <p> <textarea type="text" placeholder="Digite seu nome"></textarea>  <ul onclick="putName()"> Entrar </ul> </p> </div>` ;
     document.querySelector("body").innerHTML=initial;
 }