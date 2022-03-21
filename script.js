var cartaBranca = {
        nome: "",
        foto: "",
        atributos: {
            velocidade: "",
            peso: "",
            potencia: ""
        }
};
var  baralho = [
        carta1 = {
            nome: "Monza",
            foto: "imagens/monza.png",
            atributos: {
                velocidade: 173,
                peso: 1062,
                potencia: 99
        }
    },
        carta2 = {
            nome: "Celta",
            foto: "imagens/celta.png",
            atributos: {
                velocidade: 156,
                peso: 890,
                potencia: 77
            }
        },
        carta3 = {
            nome: "Corsa",
            foto: "imagens/corsa.png",
            atributos: {
                velocidade: 164,
                peso: 1020,
                potencia: 70
            } 
        },
        carta4 = {
            nome: "Argo",
            foto: "imagens/argo.png",
            atributos: {
                velocidade: 191,
                peso: 1105,
                potencia: 107
            } 
        },
        carta5 = {
            nome: "Renegade",
            foto: "imagens/renegade.png",
            atributos: {
                velocidade: 210,
                peso: 1448,
                potencia: 180
            } 
        },
        carta6 = {
            nome: "Audi TT",
            foto: "imagens/audi-tt.png",
            atributos: {
                velocidade: 250,
                peso: 1440,
                potencia: 400
            } 
        },
        carta7 = {
            nome: "Porsche Panamera",
            foto: "imagens/panamera.png",
            atributos: {
                velocidade: 315,
                peso: 2210,
                potencia: 600
            }
        },
        carta8 = {
            nome: "BMW M3",
            foto: "imagens/m3.png",
            atributos: {
                velocidade: 290,
                peso: 1595,
                potencia: 510
            } 
        },
        carta9 = {
            nome: "Audi R8",
            foto: "imagens/audi-r8.png",
            atributos: {
                velocidade: 330,
                peso: 1695,
                potencia: 610
            } 
        },
        carta10 = {
            nome: "Volvo S90",
            foto: "imagens/s90.png",
            atributos: {
                velocidade: 250,
                peso: 2095,
                potencia: 410
            } 
        },
]
var deckJogador = [];
var deckMaquina = [];
var cartaJogador;
var cartaMaquina;
var ganhador = 0;
var placar = [0,0];

function iniciar(){
    divideCartas();
    sortear();
    document.getElementById("mensagem").innerHTML = "Escolha o atributo do carro";
    document.getElementById("iniciar").disabled = true;
    document.getElementById("joga").disabled = false;
    exibirAtributos();
    document.getElementById("placar").innerHTML = `Placar ${placar[0]} x ${placar[1]}`;
}

function divideCartas() {
    let baralhoAux = baralho.slice();
    let carta;
  
    deckJogador = [];
    deckMaquina = [];
  
    while (baralhoAux.length > 0) {
        carta = parseInt(Math.random() * baralhoAux.length);
        deckJogador.push(baralhoAux[carta]);
        baralhoAux.splice(carta, 1);
    
        carta = parseInt(Math.random() * baralhoAux.length);
        deckMaquina.push(baralhoAux[carta]);
        baralhoAux.splice(carta, 1);
    }
}

function sortear(){
    ganhador = vencedor();
    if(ganhador == 0){
        let numeroCartaJogador = parseInt(Math.random() * deckJogador.length);
        let numeroCartaMaquina = parseInt(Math.random() * deckMaquina.length);
        cartaJogador = deckJogador[numeroCartaJogador];
        cartaMaquina = deckMaquina[numeroCartaMaquina];
        exibirCartaJogador();
        exibirAtributos();
        limpaCartaMaquina();
        document.getElementById("sorteio").disabled = true;
        document.getElementById("joga").disabled = false;
        document.getElementById("mensagem").innerHTML = "Escolha o atributo do carro";
    }else{
        placar = [0,0];
        cartaJogador = null;
        cartaMaquina = null;
    }
}

function exibirCartaJogador(){
    let carta = document.getElementById("areaJogador");
    carta.style.backgroundImage = `url(${cartaJogador.foto})`;
}

function exibirCartaMaquina(){
    let maquina = document.getElementById("areaMaquina");
    let nome = `<p class="nomeCarta">${cartaMaquina.nome}</p>`;
    maquina.style.backgroundImage = `url(${cartaMaquina.foto})`; 
    let opcoes = document.getElementById("atributos-maquina");
    let texto = "";
    for(let atributo in cartaMaquina.atributos){
        texto+= "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + ": " + cartaMaquina.atributos[atributo] + "</p>";
    }
    opcoes.innerHTML = nome + texto;
}

function limpaCartaMaquina(){
    let revelar = document.getElementById("areaMaquina");
    revelar.style.backgroundImage = `${cartaBranca.foto}`;
    let maquina = document.getElementById("areaMaquina");
    let nome = `<p class="nomeCarta">${cartaBranca.nome}</p>`;
    maquina.style.backgroundImage = `url(${cartaBranca.foto})`;
    let opcoes = document.getElementById("atributos-maquina");
    let texto = "";
    for(let atributo in cartaBranca.atributos){
        texto+= "<p type='text' name='atributo' value='" + atributo + "'>" + " " + "</p>";
    }
    opcoes.innerHTML = nome + texto;
}

function exibirAtributos(){
    let opcoes = document.getElementById("opcoes-atributos");
    let nome = `<p class="nomeCarta">${cartaJogador.nome}</p>`;
    let texto = "";
    for(let atributo in cartaJogador.atributos){
        texto+= "<input type='radio' name='atributo' value='" + atributo + "' checked>" + atributo + ": " + cartaJogador.atributos[atributo] + "<br>";
    }
    opcoes.innerHTML = nome + texto;
}

function atributoSelecionado(){
    let pegaAtributo = document.getElementsByName("atributo");
    for(let i = 0; i < pegaAtributo.length; i++){
        if(pegaAtributo[i].checked){
            return pegaAtributo[i].value;
        }
    }
}

function jogar(){
    exibirCartaMaquina();
    let atributo = atributoSelecionado();
    let resultado = document.getElementById("mensagem");
    let valorCartaJogador = cartaJogador.atributos[atributo];
    let valorCartaMaquina = cartaMaquina.atributos[atributo];
    document.getElementById("sorteio").disabled = false;
    document.getElementById("joga").disabled = true;
    if(atributo == "peso" && valorCartaJogador > valorCartaMaquina){
        resultado.innerHTML = "Você perdeu, seu peso é maior!";
        placar[1]++;
    }else if(atributo == "peso" && valorCartaJogador < valorCartaMaquina){
        resultado.innerHTML = "Você venceu, seu peso é menor";
        placar[0]++;
    }else if((atributo == "velocidade" || atributo == "potencia") && valorCartaJogador > valorCartaMaquina){
        resultado.innerHTML = `Você venceu, sua ${atributo} é maior!`;
        placar[0]++;
    }else if((atributo == "velocidade" || atributo == "potencia") && valorCartaJogador < valorCartaMaquina){
        resultado.innerHTML = `Você perdeu, sua ${atributo} é menor!`;
        placar[1]++;
    }else if((atributo == "velocidade" || atributo == "potencia" || atributo == "peso") && valorCartaJogador == valorCartaMaquina){
        resultado.innerHTML = "Empate!"
    }
    document.getElementById("placar").innerHTML = `Placar ${placar[0]} x ${placar[1]}`;
}

function vencedor(){
    if(placar[0] == 10){
        document.getElementById("mensagem").innerHTML = "Parabéns você venceu!"
        document.getElementById("joga").disabled = true;
        document.getElementById("sorteio").disabled = true;
        document.getElementById("iniciar").disabled = false;
        return true;
    }else if(placar[1] == 10){
        document.getElementById("mensagem").innerHTML = "Infelizmente você perdeu!"
        document.getElementById("joga").disabled = true;
        document.getElementById("sorteio").disabled = true;
        document.getElementById("iniciar").disabled = false;
        return true;
    }else{
        return false;
    }
}