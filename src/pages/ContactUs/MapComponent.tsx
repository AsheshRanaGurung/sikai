import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

interface ILatlongData {
  longitude: number;
  latitude: number;
}

function MapComponent({ latitude, longitude }: ILatlongData) {
  function SetViewOnClick({ coords }: { coords: LatLngExpression }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  }
  return (
    <MapContainer
      center={[longitude, latitude]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[longitude, latitude]}>
        <Popup>Sikaai</Popup>
      </Marker>
      <SetViewOnClick coords={[longitude, latitude]} />
    </MapContainer>
  );
}

export default MapComponent;
