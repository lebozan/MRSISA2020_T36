import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiYjBkemFuIiwiYSI6ImNrYXNmMWF1OTBqbGIyd281OGphcW94ZDAifQ.FwfJC9DbKCnDYco39-3l1Q';


export class CustomMap extends Component {
  mapRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      lng: props.lng,
      lat: props.lat,
      zoom: 13,
      clinicName: props.clinicName
    };
  }

  componentDidMount() {
    const { lng, lat, zoom, clinicName } = this.state;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom
    });

    map.setMaxZoom(15.5);
    map.setMinZoom(12)

    var popup = new mapboxgl.Popup({ offset: 25 }).setText(clinicName);

    var marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map);
    

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {

    const { lng, lat, zoom } = this.state;
    
    return (
      <div>
        <div id='map' className='map' />
      </div>
    )
  }
}

export default CustomMap

