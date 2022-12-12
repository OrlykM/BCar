import React from 'react';

import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css';
import {Marker, Popup, ZoomControl} from "react-leaflet";



const center = [49.841908, 24.031519];
const position = [49.8382600, 24.0232400];


function Map() {

    return (

        <div style={{overflow: 'hidden', marginTop: '-17px'}}>
            <MapContainer
                zoomControl={false}
                center={center}
                zoom={15}
                style={{width: '100vw', height: '90.8vh'}}>

                <ZoomControl position='bottomright' />
                <TileLayer
                    url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=spmECc6zOXa7b6ZMwEIE"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>
                    <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors
                    </a>'
                />

                <Marker position={center} >
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    );
}

export default Map;