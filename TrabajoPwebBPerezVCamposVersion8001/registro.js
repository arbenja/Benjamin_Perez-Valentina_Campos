const form             = document.getElementById("form")
const nombre           = document.getElementById("nombre")
const apellido         = document.getElementById("apellido")
const fechNac          = document.getElementById("fechNac")
const checkMale        = document.getElementById("check-male")
const checkFemale      = document.getElementById("check-female")
const checkOther       = document.getElementById("check-other")
const email            = document.getElementById("correo")
const contraseña       = document.getElementById("contraseña")
const contraseña2      = document.getElementById("contraseña2")
const checkTerminos    = document.getElementById("checkTerminos")
const parrafo          = document.getElementById("warnings")
var fechaAhora = new Date().toISOString().split('T')[0];

var fechaActual = new Date();
fechaActual.setFullYear(fechaActual.getFullYear() - 18);
var fechaMenos18 = fechaActual.toISOString().split('T')[0];



document.getElementById("fechNac").setAttribute('max', fechaMenos18);
// Capturando el DIV alerta y mensaje
let alerta             = document.getElementById("alerta");
let mensaje            = document.getElementById("mensaje");

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings    = ""
    let entrar      = false
    let regexEmail  = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    let regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/
    parrafo.innerHTML = ""
    //restar 18 años

    //validacion de Nombre y apellido
    if(!regexNombre.test(nombre.value ) && !regexNombre.test(apellido.value)){
        warnings += `Nombre y/o apellido inválidos<br>`
        entrar = true
    }
    //Validacion de correo electronico
    if(!regexEmail.test(email.value)){
        warnings += `Email inválido<br>`
        entrar = true
    }
    //validacion de contraseñas
    if(contraseña.value.length < 8){
        warnings += `La contraseña debe ser mayor a 8 dígitos<br>`
        entrar = true
    }
    if(contraseña2.value!=contraseña.value){
        warnings += `Las contraseñas no coinciden<br>`
        entrar = true
    }
    //Terminos y servicios
    if(!checkTerminos.checked){
        warnings +=`Debe aceptar los términos y condiciones<br>`
        entrar = true
    }
    //Género
    if(!checkMale.checked  && !checkFemale.checked && !checkOther.checked){
      warnings +=`Debe seleccionar un género`
      entrar = true
    }
    
    /*Confirmar */
    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        parrafo.innerHTML = "Enviado"
        window.location.href = "index.html";
    }
})

//Rut



// Permitir sólo números y letra K en el imput
function isNumber(evt) {
  let charCode = evt.which;

  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode === 75) {
    return false;
  }

  return true;
}

function checkRut(rut) {

  if (rut.value.length <= 1) {
    alerta.classList.remove('alert-success', 'alert-danger');
    alerta.classList.add('alert-info');
    mensaje.innerHTML = 'Ingrese su RUT';
  }

  // Obtiene el valor ingresado quitando puntos y guión.
  let valor = clean(rut.value);

  // Divide el valor ingresado en dígito verificador y resto del RUT.
  let bodyRut = valor.slice(0, -1);
  let dv = valor.slice(-1).toUpperCase();

  // Separa con un Guión el cuerpo del dígito verificador.
  rut.value = format(rut.value);

  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if (bodyRut.length < 7) {
    
    alerta.classList.remove('alert-success', 'alert-danger');
    alerta.classList.add('alert-info');
    mensaje.innerHTML = 'Ingresó un RUT muy corto, el RUT debe ser mayor a 7 Dígitos. Ej: x.xxx.xxx-x';
    return false;
  }

  // Calcular Dígito Verificador "Método del Módulo 11"
  suma = 0;
  multiplo = 2;

  // Para cada dígito del Cuerpo
  for (i = 1; i <= bodyRut.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    index = multiplo * valor.charAt(bodyRut.length - i);

    // Sumar al Contador General
    suma = suma + index;

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  dvEsperado = 11 - (suma % 11);

  // Casos Especiales (0 y K)
  dv = dv == "K" ? 10 : dv;
  dv = dv == 0 ? 11 : dv;

  // Validar que el Cuerpo coincide con su Dígito Verificador
  if (dvEsperado != dv) {
    

    alerta.classList.remove('alert-info', 'alert-success');
    alerta.classList.add('alert-danger');
    mensaje.innerHTML = 'El RUT ingresado: ' + rut.value + ' Es <strong>INCORRECTO</strong>.';

    return false;
  } else {

    alerta.classList.remove('d-none', 'alert-danger');
    alerta.classList.add('alert-success');
    mensaje.innerHTML = 'El RUT ingresado: ' + rut.value + ' Es <strong>CORRECTO</strong>.';
    return true;
  }
}

function format (rut) {
  rut = clean(rut)

  var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
  for (var i = 4; i < rut.length; i += 3) {
    result = rut.slice(-3 - i, -i) + '.' + result
  }

  return result;
}

function clean (rut) {
  return typeof rut === 'string'
    ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
    : ''
}
