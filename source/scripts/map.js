import L from 'leaflet';

function initMap() {
  const mapClass = document.querySelector('.map');
  const coordinates = [57.1530, 65.5230];
  const map = new L.map(mapClass, {
    center: coordinates,
    zoom: 20,
  });

  const layer = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

  map.addLayer(layer);

  const iconOptions = {
    iconSize:     [32, 37],
    iconUrl: 'icons/stack.svg#map-pin',
  };

  const customIcon = L.icon(iconOptions);

  const markerOptions = {
    title: 'Location',
    clickable: true,
    draggable: true,
    icon: customIcon,
  };

  const marker = L.marker(coordinates, markerOptions);
  marker.addTo(map);

}

export default initMap;
