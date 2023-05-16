import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface ILatlongData {
  longitude: number;
  latitude: number;
}

function MapComponent({ latitude, longitude }: ILatlongData) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={{ lat: latitude, lng: longitude }}>
        <Popup>Code Himalaya</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
