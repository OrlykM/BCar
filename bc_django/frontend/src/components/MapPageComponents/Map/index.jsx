import React, {useState, useRef, useEffect} from "react";
import {useSelector} from "react-redux";
import './popup.css'
import "leaflet/dist/leaflet.css";
import {
    TileLayer,
    LayerGroup,
    MapContainer,
    LayersControl,
    Marker,
    Popup,
    ZoomControl,
} from "react-leaflet";
import {useDispatch} from "react-redux";
import {useMap} from "react-leaflet";
import L from "leaflet";
import test_2 from "../../../assets/img/img.png";
import сar_top from "../../../assets/img/carpictop.png";
import {updateCarZoom} from "../../../features/Cars";

function getIcon(_iconSize) {
    return L.icon({
        iconUrl: сar_top,
        iconSize: [_iconSize],
        //         iconSize: [32,45],
    });
}

let locations = [];
const center = [49.841908, 24.031519];

function Markers({data}) {
    const map = useMap();
    return (
        data.length > 0 &&
        data.map((marker, index) => {
            return (
                <Marker
                    eventHandlers={{
                        click: () => {
                            map.setView([marker.latitude, marker.longitude], 20);
                        },
                    }}
                    key={index}
                    position={{
                        lat: marker.latitude,
                        lng: marker.longitude,
                    }}
                    icon={L.icon({
                        iconUrl: сar_top,
                        iconSize: [30],
                    })}
                >
                    <Popup className='custom-popup' >
                        <span style={{marginLeft:"15px"}}>{marker.make + " " + marker.model}</span>

                        <button className="button-87" role="button">RENT</button>

                    </Popup>
                </Marker>
            );
        })
    );
}

function ChangeView({active}) {
    const dispatch = useDispatch();
    const markerRef = useRef(null);

    console.log("ChangeView before", active);
    const map = useMap();
    let pos = [active.latitude, active.longitude];

    function test() {
        alert("THe button rent was clicked");
    }

    if (active.isClicked) {
        var url = 'http://localhost:3000/car/' + active.car_id + '/rent?';

        var content=
            // "<br />'<a href='http://localhost:3000/car/16/rent' target='_blank'>Click here to rent a car</a>'";
            '<form action="' + url + '">' +
            "<input type='submit' class='btn btn-warning btn-block btn-sm gradient-custom-5 text-body\' value='Rent a car' />" +
            '</form>'
        ;
        map.setView([active.latitude, active.longitude], 20, {duration: 1});
        var popup = L.popup({className: "custom-popup" })
            .setLatLng(pos)
            .setContent(content)
            .openOn(map);
    }

    dispatch(updateCarZoom({car_id: active.car_id, isClicked: false}));
}

const disneyWorldLatLng = [28.3852, -81.5639];

function Map() {
    const [zoom, setZoom] = useState(false);

    const carsList = useSelector((state) => state.cars.value);
    // console.log("Is CLiked", carsList[0].isClicked);
    const [carData, setCarData] = useState([]);

    let result = null;
    const [category, setCategory] = useState("");
    const handleForSubmit = () => {
        // console.log(category);

        // sometimes the don`t return the cars. fix it
        fetch(
            `http://127.0.0.1:8000/car/search/?category_type=${encodeURIComponent(
                category
            )}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
            }
        ).then(async (response) => {
            if (response.ok) {
                result = await response.json();
                console.log("CAr search data", result.results);
                setCarData(result.results);

                for (var car of result.results) locations.push(car);
            }
        });
    };
    useEffect(() => {
        handleForSubmit();
    }, [category]);

    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (carsList[0].isClicked) setZoom(true);
        // else console.log("not clicked");

        console.log("useEffectData", carData);
    }, []);

    console.log("CAr list len", carsList.length);

    return (
        <div style={{overflow: "auto"}}>
            <MapContainer
                zoomControl={false}
                center={center}
                zoom={13}
                style={{width: "100vw", height: "100vh"}}
            >
                <ZoomControl position="bottomright"/>
                <ChangeView active={carsList[carsList.length - 1]}/>
                <TileLayer
                    url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=spmECc6zOXa7b6ZMwEIE"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>
                    <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors
                    </a>'
                />
                <Markers data={locations}/>
            </MapContainer>
        </div>
    );
}

export {Map, Markers};
