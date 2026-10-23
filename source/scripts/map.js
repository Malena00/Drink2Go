import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function initMap() {
  const mapClass = document.querySelector('.map');
  const coordinates = [59.9684, 30.3174];
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
    draggable: false,
    icon: customIcon,
  };

  const marker = L.marker(coordinates, markerOptions);
  marker.addTo(map);

}

export default initMap;
