//El siguiente código realiza lo siguiente:
//-> guarda en localStore la información que escribe el usuario para usarla si es necesario cuando vuelva nuevamente a la pagina para continuar con el formulario
//-> guarda una validación para mostrar una pantalla emergente que le diga al usuario que su mensaje a sido enviado
//-> verifica que el correo tenga la forma correcta
//-> verifica que el teléfono tenga la forma correcta para Colombia: inicio con 6 para #fijos o #3 para celulares con una tamaño de 10 dígitos 

// Variables para manipular ventanas emergentes
var modalContinuarFormulario = document.getElementById("modalContinuarFormulario");
var modalMensajeExitoso = document.getElementById("modalMensajeExitoso");
var cerrarModalExitoso = document.getElementsByClassName("cerrar")[0]; //Esta instrucción se parece a document.querySelectorAll
var botonSi = document.getElementById("botonSi");
var botonNo = document.getElementById("botonNo");

// instrucción donde valida si fue un éxito el envió del mensaje y muestra pantalla emergente confirmando al usuario el correcto envió
// en caso de que fuera falso, muestra pantalla emergente de continuar formulario
const validacion = localStorage.getItem('validacion');

if( validacion == 'enviado'){
  modalMensajeExitoso.style.display = "block"; //Abrir ventana Mensaje Exitoso
}else{
  if( localStorage.length != 0 ){
    modalContinuarFormulario.style.display = "block"; //Abrir ventana Continuar Formulario
  }
}

// Cerrar la ventana Mensaje Exitoso cuando se haga clic en la "X"
cerrarModalExitoso.onclick = function() {
  modalMensajeExitoso.style.display = "none";
  formulario.reset();
  localStorage.clear();
}

botonNo.onclick = function() {
  modalContinuarFormulario.style.display = "none";
  localStorage.clear();
}
botonSi.onclick = function() {
  modalContinuarFormulario.style.display = "none";
  rellenarFormulario();
}


// instrucciones para rellenar el formulario con datos anteriores
 //lista de los id de las cajas de texto
let identificadores = ['nombre','email','telefono','asunto','contenidoMsm']

//Función para asignar a cada cuadro de texto su ultimo contenido al recargar la pagina
function rellenarFormulario(){
  identificadores.forEach(element => {
    if(localStorage.getItem(element) != null){
      document.getElementById(element).value = localStorage.getItem(element)
    }
  });
}
 

  //evento de escucha cada vez que se salga de una caja guarda los datos
document.addEventListener("change", (event) => {
  if(event.target.localName == 'input'){
    localStorage.setItem(event.target.id,document.getElementById(event.target.id).value);
  }
  else if(event.target.localName == 'textarea'){
    localStorage.setItem(event.target.id,document.getElementById(event.target.id).value);
  }
});

//objeto con las expresiones que se usaran para validar la información ingresada
// si es un correo valida que:
// contenga al inicio los siguientes caracteres de la (a-z) (A-Z) (0-9) (_) (.) (+) (-)  [a-zA-Z0-9_.+-]
// después un único @ y asi sucesivamente 
// variable RegEdx (expresión regular) inicia (/^)  termina con ($/), esta variable es necesaria para poder usar .test()
const expresiones = {
  telefono: /^[36][0-9]{9,}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,3}$/
}


let email = document.getElementById('email');
let telefono = document.getElementById('telefono');

telefono.addEventListener('input', verificarTelefono);
email.addEventListener('input', verificarEmail);
  // if (email.validity.typeMismatch) esta validación no verifica si después del punto tiene dos o tres caracteres

  //las funciones verificarTelefono y verificarEmail se ejecutan cuando hay un cambio en la caja de texto correspondiente
  //Con setCustomValidity modificamos el mensaje que trae por defecto el formulario, este se muestra cuando el usuario
  //oprima en el botón para enviar y dejara de aparecer hasta que la el contenido sea el correcto
function verificarTelefono(){
  if(!expresiones.telefono.test(telefono.value)){
    telefono.setCustomValidity(
      "¡Los números validos empiezan con 6 para fijos o con 3 para celular, max 10 dígitos !",
    );
  } else {
    telefono.setCustomValidity("");
  }
}

function verificarEmail(){
  if(!expresiones.correo.test(email.value)){
    email.setCustomValidity(
      "¡El correo que ingresaste no es valido!",
    );
  } else {
    email.setCustomValidity("");
  }
}


// función que se ejecuta cuando el usuario oprime en enviar y los datos son correctos
let formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function(event) {
  localStorage.clear();
  localStorage.setItem('validacion','enviado');
  modalMensajeExitoso.style.display = "block"
});