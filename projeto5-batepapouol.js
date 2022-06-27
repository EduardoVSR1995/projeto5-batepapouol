const nameUser = [];

const userOnline= [];

const visible=[];

let valur ;

let tru="";

let tru2="";

initialscreen();

function submits() {
    let toUser= "";
    
    if(userOnline.length>0){
        document.querySelector("p").innerHTML=``;
        toUser = userOnline[0].textContent;
        tru = visible[0].innerHTML === `<h4> <img src="img/Vector3.png"> &nbsp; Público</h4><p><ion-icon class="y md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></ion-icon></p>`;
        tru2 = visible[0].innerHTML === `<h4><img src="img/Vector 4.png">&nbsp; Reservadamente</h4><p><ion-icon class="y md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></ion-icon></p>`;
        
    }
    
    if (userOnline.length === 1 && tru === true  ) {
        const newMesenger = document.querySelector("textarea").value;
        let mesenge = {
            from: nameUser[0].name,
            to: toUser,
            text: newMesenger,
            type: "message" 
        };
        axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",mesenge);
        document.querySelector("textarea").value = "";
        document.querySelector("p").innerHTML=`Enviando para${toUser} (Publicamente)`;
        getMesenger();
        return;
    }

    if (userOnline.length === 1 && tru2 === true  ) {
        const newMesenger = document.querySelector("textarea").value;
        let mesenge = {
            from: nameUser[0].name,
            to: toUser,
            text: newMesenger,
            type: "private_message" 
        };
        axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",mesenge);
        document.querySelector("textarea").value = "";
        document.querySelector("p").innerHTML=`Enviando para${toUser} (reservadamente)`;
        getMesenger();
        return;
    }

    const newMesenger = document.querySelector("textarea").value;
    let mesenge = {
        from: nameUser[0].name,
        to: "Todos",
        text: newMesenger,
        type: "message" 
    };
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",mesenge);
    document.querySelector("textarea").value = "";
    getMesenger();
}

function getMesenger(){
    const promes = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promes.then(getMeseng);
    
}
function getMeseng(resposta){
    document.querySelector("li").innerHTML = "";
    for (let index = 0; index < resposta.data.length; index++) {
        if(resposta.data[index].type === "status" ){
         const i = document.querySelector("li").innerHTML +=`<h1 class="xx"><span>(${resposta.data[index].time})</span> &nbsp; <b>${resposta.data[index].from}</b>: ${resposta.data[index].text} </h1> `;
        }

        if ( resposta.data[index].type === "message") {
            document.querySelector("li").innerHTML +=`<h2 class="xx"><span>(${resposta.data[index].time})</span> &nbsp;<b>${resposta.data[index].from}</b> &nbsp;para&nbsp;<b>${resposta.data[index].to}</b>: ${resposta.data[index].text} </h2> `;
        }
        
        if ((resposta.data[index].to === nameUser[0].name || resposta.data[index].from === nameUser[0].name  ) &&  resposta.data[index].type === "private_message") {
            document.querySelector("li").innerHTML +=`<h3 class="xx"><span>(${resposta.data[index].time})</span> &nbsp;<b>${resposta.data[index].from}</b> &nbsp;reservadamente para &nbsp; <b>${resposta.data[index].to}</b>: ${resposta.data[index].text} </h3> `;
        } 
    
    const ultimaMensagem = document.querySelector(".xx:last-child");
    if(ultimaMensagem !== null){
        ultimaMensagem.scrollIntoView();
    }
    }
    
}

function catchName(element){
    const i = document.querySelector(".x"); 
    if (userOnline.length > 1) {
        userOnline.splice(0, userOnline.length);
        return;
    }
     if( i!==null ){
          i.remove("x");
          userOnline.splice(0, userOnline.length);
        return;
        }
        userOnline.push(element);
        userOnline[0].querySelector(".tag").innerHTML=`<ion-icon class="x" name="checkmark-outline"></ion-icon>`;
}

function visibility(element){
    const i = document.querySelector(".y"); 
    if( i!==null ){
         i.remove("y");
         visible.splice(0,visible.length);
    return;
    }
    visible.push(element);
    element.querySelector("p").innerHTML=`<ion-icon class="y" name="checkmark-outline"></ion-icon>`;
    if (userOnline.length === 0) {
    return;
    }
   
}

function putUser(resposta1){
    if (document.querySelector("ul") === null) {
        return;
    }
    document.querySelector("ul").innerHTML =``;
    for (let index = 0; index < resposta1.data.length; index++) {
    document.querySelector("ul").innerHTML +=`<div class="allUsers" onclick="catchName(this)"><div class="name"><img src="img/Vector 5.png">&nbsp ${resposta1.data[index].name}</div><div class="tag"></div></div>`;
    }
    if(userOnline.length !== 0){
        let users = document.querySelector("ul").children;
        for (let index = 0; index < users.length; index++) {
            if(userOnline[0].querySelector(".name").textContent === users[index].querySelector(".name").textContent && users[index].querySelector("y") === null ){
                users[index].querySelector(".tag").innerHTML=`<ion-icon class="y" name="checkmark-outline"></ion-icon>`;
            }
            
        }
    }
}

function putOnUser(){
    const promes = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promes.then(putUser);
}

function options(){
    const optionsScreen = `<div class="total3"><div class="sairUsuarioAtivo" onclick="exitUsuarioAtivo()"></div><div class="usuariosAtivos"> <p> Escolha um contato<br> para enviar mensagem:</p> <span><img src="img/Vector.png">&nbsp Todos </span><ul> </ul><p>Escolha a visibilidade:</p> <span onclick="visibility(this)"><h4> <img src="img/Vector3.png"> &nbsp Público</h4><p></p></span> <span onclick="visibility(this)" ><h4><img src="img/Vector 4.png">&nbsp Reservadamente</h4><p></p></span></div></div>`;
    putOnUser();
    document.querySelector("body").innerHTML+= optionsScreen;
    valur = setInterval(putOnUser, 3000);
}

function exitUsuarioAtivo(){
    clearInterval(valur);
    document.querySelector(".total3").remove();
    if (userOnline.length === 1 &&  visible[0].innerHTML === `<h4> <img src="img/Vector3.png"> &nbsp; Público</h4><p><ion-icon class="y md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></ion-icon></p>`) {
        document.querySelector("p").innerHTML=`Enviando para${userOnline[0].textContent} (Publicamente)`;
    }
    else if (userOnline.length === 1 && visible[0].innerHTML === `<h4><img src="img/Vector 4.png">&nbsp; Reservadamente</h4><p><ion-icon class="y md hydrated" name="checkmark-outline" role="img" aria-label="checkmark outline"></ion-icon></p>`) {
        document.querySelector("p").innerHTML=`Enviando para${userOnline[0].textContent} (reservadamente)`;

    }
    else{document.querySelector("p").innerHTML=``;}
}

function secondScreen(){
    const secondScreen =`<div class="total2"><div class="topo"> <img src="img/logo 1.png" alt="">  <img src="img/Vector.png" onclick="options()"></div><li></li><div class="caixaDeEscrever"><textarea placeholder="Escreva aqui..."></textarea> <img src="img/Vector(1).png" onclick="submits()"></img></div></div><p></p>` ;
    document.querySelector("body").innerHTML=secondScreen;
    document.querySelector("body").classList.add("background1");
    document.querySelector('textarea').addEventListener('keydown',enter2);
    getMesenger();
    setInterval(getMesenger, 3000);

}

function enter2(element){
    if(element.code === "Enter"){
        element.keyCode=0; 
        element.returnValue=false;
        submits()
    }
}

function deletInitialPage(){
    document.querySelector(".total").remove();
    document.querySelector("body").classList.remove("background");
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
     document.querySelector("body").classList.add("background");
     document.querySelector("body").innerHTML=initial;
     document.querySelector('textarea').addEventListener('keydown',enter);
 }

 function enter(element){
    if(element.code === "Enter"){
        element.keyCode=0; 
        element.returnValue=false;
        putName()
    }
 }