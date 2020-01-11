var marcador;
var markerGroupFiltro;
var mymap = L.map("mymap").setView([28.0491390846109, -16.6629893552163], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 80,
    id: "mapbox/streets-v11",
    accessToken:
      "pk.eyJ1IjoiamVzdXNvcmFuIiwiYSI6ImNrNGNxYndxejBkdG4zbG0wN2VkeXhwam0ifQ.PQYLiFFdeZtUIXlekRLpjg"
  }
).addTo(mymap);

const datos = getDatos();
var boton = document.getElementById("boton");
boton.addEventListener("click", filtroBusqueda);

var markerGroup = L.layerGroup().addTo(mymap);
for (var i = 0; i < datos[0].features.length; i++) {
  L.marker([
    datos[0].features[i].geometry.coordinates[1],
    datos[0].features[i].geometry.coordinates[0]
  ]).addTo(markerGroup);
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
            coord2: datos[0].features[i].geometry.coordinates[0]
          });
        }
      }
      break;
    case "Código postal":
      for (var i = 0; i < datos[0].features.length; i++) {
        if (datos[0].features[i].properties.cp === parseInt(valor)) {
          arrayCoord.push({
            coord1: datos[0].features[i].geometry.coordinates[1],
            coord2: datos[0].features[i].geometry.coordinates[0]
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
    L.marker([arrayCoord[i].coord1, arrayCoord[i].coord2]).addTo(
      markerGroupFiltro
    );
  }
  mymap.addLayer(markerGroupFiltro);
}
