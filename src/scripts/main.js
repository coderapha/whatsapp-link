//Define as variáveis do projeto
var inputNumero = document.querySelector(".input-numero")
var inputMensagem = document.querySelector(".input-mensagem")
var areaCelular = document.querySelector(".area-celular")
var telaCelular = document.querySelector(".tela-celular")
var gerarLinkBtn = document.querySelector(".gerar-link")
var confettiN = document.querySelector("#confetti")
var popUpLink = document.querySelector(".area-link-popup")
var linkGerado = document.querySelector(".link-gerado")
var abrirLink = document.querySelector(".abrir-link")
var copiarLink = document.querySelector(".copiar-link")
var reload = document.querySelector(".reload")

//Adiciona a class ativa na div do celular e escreve o conteúdo na tela
inputMensagem.onkeyup = function() {
  areaCelular.classList.add("active")
  telaCelular.innerHTML = inputMensagem.value
  inputMensagem.classList.remove("alerta")
}

inputNumero.onkeyup = function() {
  inputNumero.classList.remove("alerta")
}

//Gera o link e formatado, abre popup e ativa o confetti
gerarLinkBtn.onclick = function() {
  let linkFormatado = "https://api.whatsapp.com/send?phone=55" + inputNumero.value.replace(/\s/g, "%20") + "&text=" + inputMensagem.value.replace(/\s/g, "%20")

  linkGerado.innerHTML = linkFormatado

  if (inputNumero.value != "" && inputMensagem.value != "") {
    popUpLink.classList.add("active")
    confettiN.classList.add("active")
  }
  if (inputNumero.value == "") {
    inputNumero.classList.add("alerta")
  }else {
    inputNumero.classList.remove("alerta")
  }

  if (inputMensagem.value == "") {
    inputMensagem.classList.add("alerta")
  }else {
    inputMensagem.classList.remove("alerta")
  }

  abrirLink.href = linkFormatado
}

//Copia o link gerado
copiarLink.onclick = function copiarLink() {
  var range = document.createRange();
  range.selectNode(document.querySelector(".link-gerado"));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy")
}

//Botão para remoceçar
reload.onclick = function() {
  areaCelular.classList.remove("active")
  popUpLink.classList.remove("active")
  confettiN.classList.remove("active")
  inputNumero.value = ""
  inputMensagem.value =""
}

//Configurações do confetti
var confettiSettings = { target: 'confetti' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

//Cria a máscara de número de celular para o input
function mask(o, f) {
  setTimeout(function () {
    var v = mphone(o.value)
    if (v != o.value) {
      o.value = v
    }
  }, 1)
}

function mphone(v) {
  var r = v.replace(/\D/g, "")
  r = r.replace(/^0/, "")
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3")
  } else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3")
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2")
  } else {
    r = r.replace(/^(\d*)/, "($1")
  }
  return r
}
