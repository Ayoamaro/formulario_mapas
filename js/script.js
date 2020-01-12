function cerrarSesion() {
  firebase.auth().signOut().then(function() {
    window.location.assign("../html/index.html")
  });
}

var markerGroupFiltro;
var mymap = L.map("mymap").setView([28.4895723, -16.31815646], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 100,
    id: "mapbox/streets-v11",
    accessToken:
      "pk.eyJ1IjoiamVzdXNvcmFuIiwiYSI6ImNrNGNxYndxejBkdG4zbG0wN2VkeXhwam0ifQ.PQYLiFFdeZtUIXlekRLpjg"
  }
).addTo(mymap);
mymap.setZoom(18);

const datos = getDatos();
var boton = document.getElementById("boton");
boton.addEventListener("click", filtroBusqueda);

var markerGroup = L.layerGroup().addTo(mymap);
for (var i = 0; i < datos[0].features.length; i++) {
  L.marker([
    datos[0].features[i].geometry.coordinates[1],
    datos[0].features[i].geometry.coordinates[0]
  ])
    .bindPopup("<b>" + datos[0].features[i].properties.nombre)
    .addTo(markerGroup);
}
mymap.addLayer(markerGroup);

function filtroBusqueda() {
  mymap.removeLayer(markerGroup);
  var opcion = document.getElementById("opcion").value;
  var arrayCoord = [];
  var valor = document.getElementById("valor").value;

  switch (opcion) {
    case "Nombre":
      for (var i = 0; i < datos[0].features.length; i++) {
        if (datos[0].features[i].properties.nombre.includes(valor)) {
          arrayCoord.push({
            coord1: datos[0].features[i].geometry.coordinates[1],
            coord2: datos[0].features[i].geometry.coordinates[0],
            nombre: datos[0].features[i].properties.nombre
          });
        }
      }
      break;
    case "Código postal":
      for (var i = 0; i < datos[0].features.length; i++) {
        if (datos[0].features[i].properties.cp === parseInt(valor)) {
          arrayCoord.push({
            coord1: datos[0].features[i].geometry.coordinates[1],
            coord2: datos[0].features[i].geometry.coordinates[0],
            nombre: datos[0].features[i].properties.nombre
          });
        }
      }
      break;
  }
  if (markerGroupFiltro != undefined) {
    mymap.removeLayer(markerGroupFiltro);
  }
  markerGroupFiltro = L.layerGroup().addTo(mymap);
  for (var i = 0; i < arrayCoord.length; i++) {
    L.marker([arrayCoord[i].coord1, arrayCoord[i].coord2])
      .bindPopup("<b>" + arrayCoord[i].nombre)
      .addTo(markerGroupFiltro);
  }
  mymap.addLayer(markerGroupFiltro);
}

