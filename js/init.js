function registroUsuarios() {
  var nuevoEmail = document.getElementById("nuevoEmail").value;
  var nuevaContrasenia = document.getElementById("nuevaContrasenia").value;

  firebase.auth().createUserWithEmailAndPassword(nuevoEmail, nuevaContrasenia).then(function() {
    verificacionEmail();
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function verificacionEmail() {
  firebase.auth().currentUser.sendEmailVerification().then(function() {
  var confirmacion = document.getElementById("emailConfirmacion");

  confirmacion.innerHTML = `<p style="color:green; font-size:small;">Te hemos enviado un correo de confirmación, por favor, confirma tu cuenta
  antes de iniciar sesión.</p>`;
  });
}

function inicioSesion() {
  var email = document.getElementById("inputEmail").value;
  var contrasenia = document.getElementById("inputContrasenia").value;

  firebase.auth().signInWithEmailAndPassword(email, contrasenia).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var errores = document.getElementById("errorInicioSesion");
    errores.innerHTML = `<p style="color:red; font-size:x-small;">${errorMessage}</p>`;
  });
}

usuarioExistente();
function usuarioExistente() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      usuarioActivo(user);
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log("Se ha iniciado sesión");
    } else {
      console.log("No se ha iniciado sesión");
    }
  });
}

function usuarioActivo(user) {
  var user = user;
  var contenido = document.getElementById("contenido");

  if (user.emailVerified) {
    window.location.assign("html/mapas.html")
  } 
}

function cerrarSesion() {
  firebase.auth().signOut().then(function() {
    console.log("Se ha cerrado la sesión");
    location.reload();
  });
}

var GOOprovider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = "es";

function inicioSesionGoogle() {
  firebase.auth().signInWithPopup(GOOprovider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;

  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(email);
    console.log(credential);
  });
}

var FBprovider = new firebase.auth.FacebookAuthProvider();

function inicioSesionFacebook() {
  firebase.auth().signInWithPopup(FBprovider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;

  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(email);
    console.log(credential);
  });
}