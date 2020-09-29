import TitleBar from 'frameless-titlebar';
import { useMenu } from './menu';
import React, { useEffect, useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { useSnackbar } from 'notistack'

const position = [60.16985569999999, 24.938379]

const App = () => {
  const [data, setData] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const defaultMenu = useMenu(enqueueSnackbar)
  useEffect( () => {
    fetch("https://api.citybik.es/v2/networks/citybikes-helsinki")
    .then(res => res.json())
    .then(res => setData(res.network.stations) )
  }, [])

  const showMarkers = () => data.map( e => 
    <Marker key={e.id} position={[e.latitude, e.longitude]}>
      <Popup>
        <h3>{e.name}</h3>
        <p className="my-0">Pyöriä jäljellä: {e.free_bikes}</p>
        <p className="my-0">Paikkoja vapaana: {e.empty_slots}</p>
      </Popup>
    </Marker>
    )

    return(<>
    <TitleBar
      // eslint-disable-next-line jsx-a11y/alt-text
      icon={<img src="./icon.png" className="icon" />}
      app="Electron"
      menu={defaultMenu}
      className="titleBar"
      onClose={() => { enqueueSnackbar('close clicked', { variant: 'error' }) }}
      onMinimize={() => { enqueueSnackbar('minimized clicked', { variant: 'success' }) }}
      onMaximize={() => { enqueueSnackbar('maximized clicked', { variant: 'success' }) }}
      onDoubleClick={() => { enqueueSnackbar('double clicked', { variant: 'success' }) }}
    />
    <Map center={position} zoom={15}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {showMarkers()}
    </Map>
    </>
  );
}

export default App;