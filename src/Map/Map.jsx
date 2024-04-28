import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './map.css'
import { latLngStates } from "../util/Consts";
import L from 'leaflet'
import { getNomeEstado, getQtdPacientes } from "../util/Functions";

function Map(props) {
  const position = [-15.83, -47.86]

  const icon = new L.Icon({
    iconUrl: require('../marker.png'),
    iconSize: new L.Point(15, 15)
  })

  return(
    <MapContainer
      center={position}
      zoom={5}
      scrollWheelZoom={true}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
        latLngStates.map(item => {
          return (
            <Marker position={[item.latitude, item.longitude]} icon={icon}>
              <Popup>
                <span>{
                  getQtdPacientes(props.listPacientes, item.sigla) === 0 ? 
                  `Não temos pacientes cadastrados no estado do ${getNomeEstado(item.sigla)}` :
                  getQtdPacientes(props.listPacientes, item.sigla) === 1 ?
                  `Temos um paciente cadastrado no estado do ${getNomeEstado(item.sigla)}` :
                  `Temos ${getQtdPacientes(props.listPacientes, item.sigla)} pacientes cadastrados no estado do ${getNomeEstado(item.sigla)}`
                    
                }</span>
              </Popup>
            </Marker>
          )
        })
      }
    </MapContainer>
  )
}

export default Map